import { useSelector } from "react-redux";
import { JSONPath } from "jsonpath-plus";

export const useFindChildren = (parentFolder) => {
  const fileSystemItems = useSelector((state) => state.fileSystem.fileSystemItems);

  let files = [];
  let folders = [];

  //Cuando quiero listar los hijos de la unidad principal
  if (parentFolder === "root.unidad") {
    files = fileSystemItems.root.unidad.files;
    folders = fileSystemItems.root.unidad.folders;
  } else {
    //Cuando quiero listar los hijos de una carpeta que no es la unidad principal, busco su padre por el id usando jsonpath-plus
    let parent = JSONPath({
      path: `$..folders[?(@.id=='${parentFolder}')]`,
      json: fileSystemItems,
    });

    //Si el padre existe, devuelvo sus hijos
    if (parent.length > 0) {
      files = parent[0].files;
      folders = parent[0].folders;
    } else {
      alert("No se pudo listar los hijos");
    }
  }

  return { files, folders };
};



