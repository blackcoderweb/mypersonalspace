import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JSONPath } from "jsonpath-plus";
import { createFolder } from "../../api/folders";
import { uploadFile } from "../../api/files";

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

    const token = localStorage.getItem("token-my-personal-workspace");

    // Si estoy creando el folder en la raiz
    if (parentFolderId === user) {
      folder.parent = user;
    } else {
      let parentFolder = JSONPath({
        path: `$..children[?(@.id=='${parentFolderId}')]`,
        json: getState().fileSystem.mainUnit,
      });
      folder.parent = parentFolder[0].name;
    }

    try {
      const resp = await createFolder(folder, {
        headers: {
          Authorization: token,
        },
      });
      return resp; // El resultado de esta promesa se manejará en el extraReducer
    } catch (error) {
      console.log(error);
    }
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
        console.log(response);
        
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
        //Ejecutar método getFilesByFolderId para actualizar el estado
        console.log(response);
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
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    addFileRoot: (state, action) => {
      state.rootFiles.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createFolderThunk.fulfilled, (state, action) => {
      // manejar el estado de éxito y añadir la carpeta al estado
      state.mainUnit = action.payload;
      state.rootFolders = action.payload.children;
    });
  },
});

export const { setMainUnit, setRootFolders, setRootFiles, setSelectedFolder, addFileRoot } =
  fileSystemSlice.actions;
export default fileSystemSlice.reducer;
