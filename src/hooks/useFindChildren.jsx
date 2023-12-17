import { useSelector } from "react-redux";
import { JSONPath } from "jsonpath-plus";
import useAuth from "./useAuth";
import { getFilesByFolder } from "../api/files";
import { useEffect, useState } from "react";

export const useFindChildren = (selectedFolder) => {
  const { auth } = useAuth();
  const rootFolders = useSelector((state) => state.fileSystem.rootFolders);
  const rootFiles = useSelector((state) => state.fileSystem.rootFiles);

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (selectedFolder === auth) {
      setFiles(rootFiles);
      setFolders(rootFolders);
    } else {
      const parent = JSONPath({ path: `$.folder[?(@.id==${selectedFolder})]`, json: rootFolders });
      setFolders(parent[0].children);

      getFilesByFolder(selectedFolder)
        .then((result) => {
          setFiles(result);
        })
        .catch((error) => {
          console.error('Hubo un error al obtener los archivos:', error);
        });
    }
  }, [auth, rootFiles, rootFolders, selectedFolder]);

  return { files, folders };
};
