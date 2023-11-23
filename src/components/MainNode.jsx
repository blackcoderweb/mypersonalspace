import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { updateParentFolder } from "../features/fileSystem/fileSystemSlice";
import { FolderNode } from "./FolderNode";
import { useFindChildren } from "../hooks/useFindChildren";

export const MainNode = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  
  const {folders} = useFindChildren("root.unidad");

  const handleUpdateParent = () => {
    dispatch(updateParentFolder({ parentFolder: "root.unidad" }));
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
        }}
        onClick={handleUpdateParent}
      >
        
        <Card.Body style={{ userSelect: "none" }}>
        <i
          className={
            expanded
              ? "fa-solid fa-chevron-down fa-xs"
              : "fa-solid fa-chevron-right fa-xs"
          }
        ></i>
          <i className="fa-solid fa-hard-drive fa-xl" style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}></i>Mi unidad
        </Card.Body>
      </div>
      {expanded &&
        folders.length > 0 &&
        folders.map((folder) => <FolderNode key={folder.id} folder={folder} />)}
    </>
  );
};
