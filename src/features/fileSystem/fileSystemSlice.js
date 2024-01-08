import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JSONPath } from "jsonpath-plus";
import { createFolder, getFolders } from "../../api/folders";
import { getFiles, getFilesByFolder, uploadFile } from "../../api/files";
import { existingName } from "../../helpers/existingName";

export const getFoldersThunk = createAsyncThunk(
  "folders/getFoldersThunk",
  async (_, { dispatch }) => {
    const response = await getFolders();
    dispatch(setMainUnit(response.folder));
    dispatch(setRootFolders(response.folder.children));
  }
);

export const getFilesThunk = createAsyncThunk(
  "files/getFilesThunk",
  async (_, {dispatch}) => {
    const response = await getFiles();
    dispatch(setRootFiles(response));
  }
);

export const createFolderThunk = createAsyncThunk(
  "fileSystem/createFolderThunk",
  async (folderData, { getState, dispatch }) => {
    let { folderName, parentFolderId } = folderData;

    if (folderName == "") {
      folderName = "Nueva carpeta";
    }

    let newFolder = {
      folderName: folderName,
      parent: "",
    };

    // Si estoy creando el folder en la raiz
    if (parentFolderId === user) {
      if (existingName(getState().fileSystem.rootFolders, folderName, false)) {
        dispatch(setNameExists(true));
        return;
      }
      newFolder.parent = getState().fileSystem.mainUnit.fullPath;
    } else {
      let parentFolder = JSONPath({
        path: `$..children[?(@.id=='${parentFolderId}')]`,
        json: getState().fileSystem.mainUnit,
      });
      if (existingName(parentFolder[0].children, folderName, false)) {
        dispatch(setNameExists(true));
        return;
      }
      newFolder.parent = parentFolder[0].fullPath;
    }
    try {
      const resp = await createFolder(newFolder);
      // manejar el estado de éxito y añadir la carpeta al estado
      dispatch(setMainUnit(resp));
      dispatch(setRootFolders(resp.children));
      dispatch(setNameExists(false));
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFilesByFolderIdThunk = createAsyncThunk(
  "fileSystem/getFilesByFolderIdThunk",
  async (selectedFolder, {dispatch}) => {
    const resp = await getFilesByFolder(selectedFolder);
    dispatch(setFilesByFolderId(resp));
    return resp; // El resultado de esta promesa se manejará en el extraReducer
  }
);

export const uploadFileThunk = createAsyncThunk(
  "fileSystem/uploadFileThunk",
  async (fileData, { getState, dispatch }) => {
    let { formData, parentFolderId } = fileData;

    if (parentFolderId === user) {
      try {
        const response = await uploadFile(
          parentFolderId,
          getState().fileSystem.mainUnit.fullPath,
          formData
        );
        dispatch(addFileRoot(response));
        return response;
      } catch (error) {
        console.log(error);
      }
    } else {
      const result = JSONPath({
        path: `$..children[?(@.id=='${parentFolderId}')]`,
        json: getState().fileSystem.mainUnit,
      });
      try {
        const response = await uploadFile(
          parentFolderId,
          result[0].fullPath,
          formData
        );
        //Ejecutar método getFilesByFolderIdThunk para actualizar el estado
        dispatch(getFilesByFolderIdThunk(parentFolderId));
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  }
);

const user = localStorage.getItem("user-my-personal-workspace");

const initialState = {
  mainUnit: {},
  rootFolders: [],
  rootFiles: [],
  filesByFolderId: [],
  selectedFolder: user,
  loaderCreateFolder: false,
  loaderUploadFile: false,
  loaderFoldersFiles: false,
  nameExists: false,
};

const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    setMainUnit: (state, action) => {
      state.mainUnit = action.payload;
    },
    setRootFolders: (state, action) => {
      state.rootFolders = action.payload;
    },
    setRootFiles: (state, action) => {
      state.rootFiles = action.payload;
    },
    addFileRoot: (state, action) => {
      state.rootFiles.push(action.payload);
    },
    setFilesByFolderId: (state, action) => {
      state.filesByFolderId = action.payload;
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    setNameExists: (state, action) => {
      state.nameExists = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Folders
    builder
      .addCase(getFoldersThunk.pending, (state) => {
        state.loaderFoldersFiles = true;
      })
      .addCase(getFoldersThunk.fulfilled, (state) => {
        state.loaderFoldersFiles = false;
      })
      .addCase(getFoldersThunk.rejected, (state) => {
        state.loaderFoldersFiles = false;
      })
      .addCase(getFilesThunk.pending, (state) => {
        state.loaderFoldersFiles = true;
      })
      .addCase(getFilesThunk.fulfilled, (state) => {
        state.loaderFoldersFiles = false;
      })
      .addCase(getFilesThunk.rejected, (state) => {
        state.loaderFoldersFiles = false;
      })
      .addCase(createFolderThunk.pending, (state) => {
        state.loaderCreateFolder = true;
      })
      .addCase(createFolderThunk.fulfilled, (state) => {
        state.loaderCreateFolder = false;
      })
      .addCase(createFolderThunk.rejected, (state) => {
        state.loaderCreateFolder = false;
      })

      //Files
      .addCase(uploadFileThunk.pending, (state) => {
        state.loaderUploadFile = true;
        state.loaderFoldersFiles = false;
      })
      .addCase(uploadFileThunk.fulfilled, (state) => {
        state.loaderUploadFile = false;
        state.loaderFoldersFiles = false;
      })
      .addCase(uploadFileThunk.rejected, (state) => {
        state.loaderUploadFile = false;
        state.loaderFoldersFiles = false;
      })
      .addCase(getFilesByFolderIdThunk.pending, (state) => {
        state.loaderFoldersFiles = true;
      })
      .addCase(getFilesByFolderIdThunk.fulfilled, (state) => {
        state.loaderFoldersFiles = false;
      })
      .addCase(getFilesByFolderIdThunk.rejected, (state) => {
        state.loaderFoldersFiles = false;
      });
  },
});

export const {
  setMainUnit,
  setRootFolders,
  setRootFiles,
  setSelectedFolder,
  setFilesByFolderId,
  addFileRoot,
  setNameExists,
} = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
