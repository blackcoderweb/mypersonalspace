import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JSONPath } from "jsonpath-plus";
import { createFolder } from "../../api/folders";
import { getFilesByFolder, uploadFile } from "../../api/files";
import { get } from "../../api";

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
      newFolder.parent = getState().fileSystem.mainUnit.fullPath;
    } else {
      let parentFolder = JSONPath({
        path: `$..children[?(@.id=='${parentFolderId}')]`,
        json: getState().fileSystem.mainUnit,
      });
      newFolder.parent = parentFolder[0].fullPath;
    }
    try {
      const resp = await createFolder(newFolder);
      // manejar el estado de éxito y añadir la carpeta al estado
      dispatch(setMainUnit(resp));
      dispatch(setRootFolders(resp.children));
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFilesByFolderIdThunk = createAsyncThunk(
  "fileSystem/getFilesByFolderIdThunk",
  async (selectedFolder) => {
    const resp = await getFilesByFolder(selectedFolder);
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
  },
  extraReducers: (builder) => {
    //Folders
    builder
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
      })
      .addCase(uploadFileThunk.fulfilled, (state) => {
        state.loaderUploadFile = false;
      })
      .addCase(uploadFileThunk.rejected, (state) => {
        state.loaderUploadFile = false;
      })
      .addCase(getFilesByFolderIdThunk.pending, (state) => {
        state.loaderFoldersFiles = true;
      })
      .addCase(getFilesByFolderIdThunk.fulfilled, (state, action) => {
        // manejar el estado de éxito y añadir la carpeta al estado
        state.filesByFolderId = action.payload;
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
  addFileRoot,
} = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
