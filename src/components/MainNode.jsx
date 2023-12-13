import { useEffect, useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { updateParentFolder } from "../features/fileSystem/fileSystemSlice";
import { FolderNode } from "./FolderNode";
import { useFindChildren } from "../hooks/useFindChildren";
import { getFolders } from "../api/folders";

export const MainNode = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("root.unidad");
  
  const {folders} = useFindChildren("root.unidad");

  const [folderToRender, setFolderToRender] = useState([])

  const handleUpdateParent = () => {
    dispatch(updateParentFolder({ parentFolder: "root.unidad" }));
    //When expanded, log the folders.
    //When collapsed, hide the folders.
    expanded ? setExpanded(false) : setExpanded(true);
    setSelectedFolder("root.unidad");
  };

  useEffect(() => {
    const fetchFolders = async () => {
      const resp = await getFolders()
      setFolderToRender(resp);
    }
    fetchFolders()
  },[])
  console.log(folderToRender)

  return (
    <>
      <div id="mainNode"
      className={selectedFolder === "root.unidad" ? "selected" : ""}
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
          <i className="fa-solid fa-hard-drive fa-xl" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}></i>Mi unidad
        </Card.Body>
      </div>
      {expanded &&
        folders.length > 0 &&
        folders.map((folder) => <FolderNode key={folder.id} folder={folder} setSelectedFolder={setSelectedFolder} selectedFolder={selectedFolder}/>)}
    </>
  );
};
