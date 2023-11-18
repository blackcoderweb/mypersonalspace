import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { existingName } from "../../helpers/existingName";

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
      let { folderName, parentFolder } = action.payload;
      if (folderName == "") {
        folderName = "Nueva carpeta"
      }
      const folder = {
        "id": uuidv4(),
        "name": folderName,
        "files": [],
        "folders": [],
      };
      //Cuando quiero crear una carpeta en la unidad principal
      if (parentFolder == "root.unidad") {
        let folders = state.fileSystemItems.root.unidad.folders
        if (folders.length == 0) {
          state.fileSystemItems.root.unidad.folders.push(folder);
        }else{
          if(existingName(folders, folderName)){
            alert("Ya existe una carpeta con este nombre en esta ubicación");
          }else{
            state.fileSystemItems.root.unidad.folders.push(folder);
          }
        }
      }else{
        //Si la carpeta que voy a crear tiene padre
        //Buscar el padre de la carpeta en el JSON(Usar jsonpath-plus)
        //Si no hay ninguna carpeta creada insertar la primera carpeta
        //Si ya hay carpetas, evitar que la nueva carpeta no tenga el nombre de alguna carpeta existente
        console.log("La carpeta raíz no es su padre");
      }
      
    },
    updateParentFolder: (state, action) => {
      const { parentFolder } = action.payload;
      state.parentFolder = parentFolder;
    },
  },
});

export const { createFolder, updateParentFolder } = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
