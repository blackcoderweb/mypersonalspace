import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { existingName } from "../../helpers/existingName";
import { JSONPath } from "jsonpath-plus";

const initialState = {
  fileSystemItems: {
    root: {
      unidad: {
        folders: [],
        files: [],
      },
    },
  },
  parentFolder: "root.unidad",
};

const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    createFolder: (state, action) => {
      let { folderName, parentFolder, ext } = action.payload;
      if (folderName == "") {
        folderName = "Nueva carpeta";
      }
      const folder = {
        id: uuidv4(),
        name: folderName,
        files: [],
        folders: [],
      };
      //Cuando quiero crear una carpeta en la unidad principal
      if (parentFolder == "root.unidad") {
        let folders = state.fileSystemItems.root.unidad.folders;
        if (folders.length == 0) {
          state.fileSystemItems.root.unidad.folders.push(folder);
        } else {
          if (existingName(folders, folderName, ext)) {
            alert("Ya existe una carpeta con este nombre en esta ubicación");
          } else {
            state.fileSystemItems.root.unidad.folders.push(folder);
          }
        }
      } else {
        //Cuando quiero crear una carpeta en una carpeta que no es la unidad principal, busco su padre por el id usando jsonpath-plus
        let parent = JSONPath({
          path: `$..folders[?(@.id=='${parentFolder}')]`,
          json: state.fileSystemItems,
        });
        //Si el padre existe, busco si ya existe una carpeta con el mismo nombre
        if (parent.length > 0) {
          if (existingName(parent[0].folders, folderName, ext)) {
            alert("Ya existe una carpeta con este nombre en esta ubicación");
          } else {
            parent[0].folders.push(folder);
          }
        } else {
          alert("No se pudo crear la carpeta");
        }
      }
    },
    uploadFile: (state, action) => {
      let { selectedFile, fileUrl, tags, parentFolder, ext } = action.payload;
      let file = {
        id: uuidv4(),
        name: selectedFile,
        url: fileUrl,
        tags: tags,
      };

      //Cuando quiero subir un archivo a la unidad principal
      if (parentFolder == "root.unidad") {
        let files = state.fileSystemItems.root.unidad.files;
        if (files.length == 0) {
          state.fileSystemItems.root.unidad.files.push(file);
        } else {
          if (existingName(files, selectedFile, ext)) {
            alert("Ya existe un archivo con este nombre en esta ubicación");
          } else {
            state.fileSystemItems.root.unidad.files.push(file);
          }
        }
        //Cuando quiero subir un archivo a una carpeta que no es la unidad principal, busco su padre por el id usando jsonpath-plus
      } else {
        let parent = JSONPath({
          path: `$..folders[?(@.id=='${parentFolder}')]`,
          json: state.fileSystemItems,
        });
        //Si el padre existe, busco si ya existe un archivo con el mismo nombre
        if (parent.length > 0) {
          if (existingName(parent[0].files, selectedFile, ext)) {
            alert("Ya existe un archivo con este nombre en esta ubicación");
          } else {
            parent[0].files.push(file);
          }
        } else {
          alert("No se pudo subir el archivo");
        }
      }
    },
    updateParentFolder: (state, action) => {
      let { parentFolder } = action.payload;
      state.parentFolder = parentFolder;
    },
  },
});

export const { createFolder, uploadFile, updateParentFolder } =
  fileSystemSlice.actions;
export default fileSystemSlice.reducer;
