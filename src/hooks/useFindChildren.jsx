import { useSelector } from "react-redux";
import { JSONPath } from "jsonpath-plus";
import useAuth from "./useAuth";
import { getFilesByFolder } from "../api/files";
import { useEffect, useState } from "react";

export const useFindChildren = (selectedFolder) => {
  const { auth } = useAuth();

  const {mainUnit, rootFolders, rootFiles} = useSelector((state) => state.fileSystem);

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (selectedFolder === auth) {
      setFiles(rootFiles);
      setFolders(rootFolders);
    } else {
      const parent = JSONPath({
        path: `$..children[?(@.id=="${selectedFolder}")]`,
        json: mainUnit,
      });

      if (parent.length > 0) {
        setFolders(parent[0].children);
      } else {
        setFolders([]);
      }

      const fetchFiles = async () => {
        const resp = await getFilesByFolder(selectedFolder);
        setFiles(resp);
      };
      fetchFiles();
    }
  }, [selectedFolder, auth, mainUnit, rootFiles, rootFolders]);

  return { files, folders };
};
