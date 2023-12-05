import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { existingName } from "../../helpers/existingName";
import { JSONPath } from "jsonpath-plus";
import { parentFileIndex } from "../../helpers/parentFileIndex";

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
        share: [],
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
    changeFolderName: (state, action) => {
      let { folderId, newFolderName, parentFolder, ext } = action.payload;
      if (newFolderName == "") {
        alert("El nombre de la carpeta no puede estar vacío");
        return;
      }
      //Busco la carpeta por el id usando jsonpath-plus
      let folder = JSONPath({
        path: `$..folders[?(@.id=='${folderId}')]`,
        json: state.fileSystemItems,
      });
      //Cuando quiero cambiar el nombre de una carpeta en la unidad principal
      if (parentFolder == "root.unidad") {
        let folders = state.fileSystemItems.root.unidad.folders;
        if (folders.length == 0) {
          alert("No se pudo cambiar el nombre de la carpeta");
        } else {
          if (existingName(folders, newFolderName, ext)) {
            alert("Ya existe una carpeta con este nombre en esta ubicación");
          } else {
            folder[0].name = newFolderName;
          }
        }
      } else {
        //Cuando quiero cambiar el nombre de una carpeta en una carpeta que no es la unidad principal, busco su padre por el id usando jsonpath-plus
        let parent = JSONPath({
          path: `$..folders[?(@.id=='${parentFolder}')]`,
          json: state.fileSystemItems,
        });
        //Si el padre existe, busco si ya existe una carpeta con el mismo nombre
        if (parent.length > 0) {
          if (existingName(parent[0].folders, newFolderName, ext)) {
            alert("Ya existe una carpeta con este nombre en esta ubicación");
          } else {
            folder[0].name = newFolderName;
          }
        } else {
          alert("No se pudo cambiar el nombre de la carpeta");
        }
      }
    },
    shareFolderFile: (state, action) => {
      let { folderId, user, permission, parentFolder } = action.payload;
      //Busco la carpeta por el id usando jsonpath-plus
      let folder = JSONPath({
        path: `$..folders[?(@.id=='${folderId}')]`,
        json: state.fileSystemItems,
      });
    },
    deleteFolderFile: (state, action) => {
      let { id, parent, type } = action.payload;

      //Si voy a eliminar de la unidad principal
      if(parent == "root.unidad"){
        if(type === "folder"){
          let folders = state.fileSystemItems.root.unidad.folders;
          let index = folders.findIndex((folder) => folder.id === id);
          folders.splice(index, 1);
      }
    }
      
    },
    uploadFile: (state, action) => {
      let { selectedFile, fileUrl, tags, parentFolder, ext } = action.payload;
      let file = {
        id: uuidv4(),
        name: selectedFile,
        version: [
          {
            id: uuidv4(),
            url: fileUrl,
            name: selectedFile,
            tags: tags,
          },
        ],
        share: [],
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
    updateFileVersion: (state, action) => {
      let { fileParentId, fileUrl, selectedFile, tags, parentFolder } = action.payload;
      let newVersion = {
        id: uuidv4(),
        url: fileUrl,
        name: selectedFile,
        tags: tags,
      };
      //Si el archivo que quiero está en la unidad principal
      if (parentFolder == "root.unidad"){
        let files = state.fileSystemItems.root.unidad.files;
        //Busco el índice del padre del archivo que quiero actualizar
        let index = parentFileIndex(files, fileParentId);
        //En la propiedad version del archivo que quiero actualizar, agrego la nueva versión
        files[index].version.push(newVersion);    
      }else{
      //Si el archivo que quiero actualizar no está en la unidad principal, busco su padre por el id usando jsonpath-plus
      let parent = JSONPath({
        path: `$..folders[?(@.id=='${parentFolder}')]`,
        json: state.fileSystemItems,
      });
      //Busco el índice del padre del archivo que quiero actualizar
      let index = parentFileIndex(parent[0].files, fileParentId);
      //En la propiedad version del archivo que quiero actualizar, agrego la nueva versión
      parent[0].files[index].version.push(newVersion);
      }
    },
    updateParentFolder: (state, action) => {
      let { parentFolder } = action.payload;
      state.parentFolder = parentFolder;
    },
  },
});

export const {
  createFolder,
  changeFolderName,
  deleteFolderFile,
  uploadFile,
  updateFileVersion,
  updateParentFolder,
} = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
