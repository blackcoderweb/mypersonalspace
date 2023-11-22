import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateParentFolder } from "../features/fileSystem/fileSystemSlice";
import { JSONPath } from "jsonpath-plus";

export const FolderNode = ({ folder }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const folders = useSelector((state) => state.fileSystem.fileSystemItems.root.unidad);
  const [children, setChildren] = useState([]);

  const handleUpdateParent = (parentId) => {
    dispatch(updateParentFolder({ parentFolder: parentId }));
    //Buscar la carpeta con el id parentId
    let parent = JSONPath({  path: `$..folders[?(@.id=='${parentId}')]`, json: folders });
    //Guardar los hijos de la carpeta
    setChildren(parent[0].folders);
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
        paddingLeft: "0.5rem",
        paddingBottom: "0.5rem",
      }}
      onClick={() => handleUpdateParent(folder.id)}
    >
      <div
        style={{ userSelect: "none", paddingLeft: "1.5rem" }}
      >
              <i
        className={
          expanded
            ? "fa-solid fa-chevron-down fa-xs"
            : "fa-solid fa-chevron-right fa-xs"
        }
      ></i>
        <i className={
          expanded
            ? "fa-solid fa-folder-open fa-xl"
            : "fa-solid fa-folder fa-xl"
        } style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}></i>{folder.name}
      </div>
    </div>
    <div style={{paddingLeft: '1rem'}}>
      {/*Renderizo los folders hijos de esta subcarpeta*/}
    {expanded && children.length > 0 && children.map((folder) => <FolderNode key={folder.id} folder={folder} />)}
    </div>
    </>
  );
};

FolderNode.propTypes = {
  folder: PropTypes.object,
};
