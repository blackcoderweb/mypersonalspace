import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JSONPath } from "jsonpath-plus";
import { createFolder } from "../../api/folders";
import { getFilesByFolder, uploadFile } from "../../api/files";

export const createFolderThunk = createAsyncThunk(
  "fileSystem/createFolderThunk",
  async (folderData, { getState }) => {
    let { folderName, parentFolderId } = folderData;

    if (folderName == "") {
      folderName = "Nueva carpeta";
    }

    let folder = {
      folderName: folderName,
      parent: "",
    };

    // Si estoy creando el folder en la raiz
    if (parentFolderId === user) {
      folder.parent = getState().fileSystem.mainUnit.folder.fullPath;
    } else {
      let parentFolder = JSONPath({
        path: `$..children[?(@.id=='${parentFolderId}')]`,
        json: getState().fileSystem.mainUnit,
      });
      folder.parent = parentFolder[0].fullPath;
    }

    try {
      const resp = await createFolder(folder);
      return resp; // El resultado de esta promesa se manejará en el extraReducer
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
          getState().fileSystem.mainUnit.folder.fullPath,
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
    builder.addCase(createFolderThunk.fulfilled, (state, action) => {
      // manejar el estado de éxito y añadir la carpeta al estado
      state.mainUnit = action.payload;
      state.rootFolders = action.payload.children;
    });
    builder.addCase(getFilesByFolderIdThunk.fulfilled, (state, action) => {
      // manejar el estado de éxito y añadir la carpeta al estado
      state.filesByFolderId = action.payload;
    });
  },
});

export const { setMainUnit, setRootFolders, setRootFiles, setSelectedFolder, addFileRoot } =
  fileSystemSlice.actions;
export default fileSystemSlice.reducer;
