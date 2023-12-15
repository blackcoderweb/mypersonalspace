import { useEffect, useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import { FolderNode } from "./FolderNode";
import { getFolders } from "../api/folders";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setRootFolders } from "../features/fileSystem/fileSystemSlice";

export const MainNode = () => {
  const [mainUnit, setMainUnit] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");

  const dispatch = useDispatch();

  const { auth } = useAuth();

  const rootFolders = useSelector((state) => state.fileSystem.rootFolders);

  const handleExpanded = () => {
    //When expanded, log the folders.
    //When collapsed, hide the folders.
    expanded ? setExpanded(false) : setExpanded(true);
    setSelectedFolder(auth);
  };

  useEffect(() => {
    const fetchFolders = async () => {
      const resp = await getFolders();
      setMainUnit(resp)
      dispatch(setRootFolders(resp.folder.children));
    };
    fetchFolders();
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
            setSelectedFolder={setSelectedFolder}
            selectedFolder={selectedFolder}
          />
        ))}
    </>
  );
};
