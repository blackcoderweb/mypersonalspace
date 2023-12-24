import { useEffect, useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import { FolderNode } from "./FolderNode";
import { getFolders } from "../api/folders";
import { getFiles } from "../api/files";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setMainUnit, setRootFiles, setRootFolders, setSelectedFolder } from "../features/fileSystem/fileSystemSlice";

export const MainNode = () => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();

  const { auth } = useAuth();

  const { rootFolders, selectedFolder } = useSelector((state) => state.fileSystem);

  const handleExpanded = () => {
    //When expanded, log the folders.
    //When collapsed, hide the folders.
    expanded ? setExpanded(false) : setExpanded(true);
    dispatch(setSelectedFolder(auth));
  };

  useEffect(() => {
    const fetchFolders = async () => {
      const resp = await getFolders();
      dispatch(setMainUnit(resp));
      dispatch(setRootFolders(resp.folder.children));
    };
    fetchFolders();
  }, [dispatch]); 

  useEffect(() => {
    const fetchFiles = async () => {
      const resp = await getFiles();
      dispatch(setRootFiles(resp));
      console.log(resp);
    };
    fetchFiles();
  }, [dispatch]);

  return (
    <>
      <div
        id="mainNode"
        className={selectedFolder === `${auth}` ? "selected" : ""}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        onClick={handleExpanded}
      >
        <Card.Body style={{ userSelect: "none" }}>
          <i
            className={
              expanded
                ? "fa-solid fa-chevron-down fa-xs"
                : "fa-solid fa-chevron-right fa-xs"
            }
          ></i>
          <i
            className="fa-solid fa-hard-drive fa-xl"
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          ></i>
          Mi unidad
        </Card.Body>
      </div>
      {expanded &&
        rootFolders.length > 0 &&
        rootFolders.map((folder) => (
          <FolderNode
            key={folder.id}
            folder={folder}
          />
        ))}
    </>
  );
};
