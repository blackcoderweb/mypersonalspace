import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JSONPath } from "jsonpath-plus";
import { create } from "../../api/folders";

export const createFolder = createAsyncThunk(
  'fileSystem/createFolder',
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
    const root = localStorage.getItem("user-my-personal-workspace");
    // Si estoy creando el folder en la raiz
    if (parentFolderId === root) {
      folder.parent = root;
    } else {
      let parentFolder = JSONPath({
        path: `$..children[?(@.id=='${parentFolderId}')]`,
        json: getState().fileSystem.mainUnit,
      });
      folder.parent = parentFolder[0].name;
    }

    try {
      const resp = await create(folder, {
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
      state.mainUnit = (action.payload);
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
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFolder.fulfilled, (state, action) => {
        // manejar el estado de éxito y añadir la carpeta al estado
        //console.log(action.payload);
        state.mainUnit = action.payload;
        state.rootFolders = action.payload.children;
      });
  },
});

export const {
  setMainUnit,
  setRootFolders,
  setRootFiles,
  setSelectedFolder,
} = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
