import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { updateParentFolder } from "../features/fileSystem/fileSystemSlice";
import { FolderNode } from "./FolderNode";

export const MainNode = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const folders = useSelector((state) => state.fileSystem.fileSystemItems.root.unidad.folders);

  const handleUpdateParent = () => {
    dispatch(updateParentFolder({parentFolder: "root.unidad"}));
  };

  const handleExpand = () => {
    
      //When expanded, log the folders.
      //When collapsed, hide the folders.
      expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "1rem",
      }}
    >
      <i
        className={
          expanded
            ? "fa-solid fa-chevron-down fa-xs"
            : "fa-solid fa-chevron-right fa-xs"
        }
        onClick={handleExpand}
      ></i>
      <Card.Body style={{ userSelect: "none" }} onClick={handleUpdateParent}>
        <i className="fa-solid fa-hard-drive fa-xl"></i> Mi unidad
      </Card.Body>
    </div>
    {expanded && folders.length > 0 && folders.map((folder) => <FolderNode key={folder.id} folder={folder} />)}
    </>
  );
};
