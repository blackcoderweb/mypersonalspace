import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  fileSystemItems: {
    root: {
      unidad: {
        folders: [],
        files: [],
      },
    },
  },
  expanded: false,
};

const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    createFolder: (state, action) => {
      const { folderName } = action.payload;
      const folder = {
        id: uuidv4(),
        name: folderName || "Nueva Carpeta",
        files: [],
        folders: [],
      };
      state.fileSystemItems.root.unidad.folders.push(folder);
    },
    getFolders: (state) => {
      return state.fileSystemItems.root.unidad.folders;
    },
  },
});

export const { createFolder, getFolders } = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
