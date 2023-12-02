import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateParentFolder } from "../features/fileSystem/fileSystemSlice";
import { useFindChildren } from "../hooks/useFindChildren";

export const FolderNode = ({ folder, setSelectedFolder, selectedFolder, level = 1 }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleUpdateParent = (parentId) => {
    dispatch(updateParentFolder({ parentFolder: parentId }));
    setExpanded((prevExpanded) => !prevExpanded);
    setSelectedFolder(folder.id);
  };

  const { folders } = useFindChildren(folder.id);

  return (
    <>
      <div
        id="folderNode"
        className={selectedFolder === folder.id ? "selected" : ""}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: "0.5rem",
        }}
        onClick={() => handleUpdateParent(folder.id)}
      >
        <div style={{ userSelect: "none", marginLeft: `${level * 2.5}rem` }}>
          <i
            className={
              expanded
                ? "fa-solid fa-chevron-down fa-xs"
                : "fa-solid fa-chevron-right fa-xs"
            }
          ></i>
          <i
            className={
              expanded
                ? "fa-solid fa-folder-open fa-xl"
                : "fa-solid fa-folder fa-xl"
            }
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          ></i>
          {folder.name}
        </div>
      </div>
      {expanded &&
        folders.length > 0 &&
        folders.map((folder) => (
          <FolderNode
            key={folder.id}
            folder={folder}
            setSelectedFolder={setSelectedFolder}
            selectedFolder={selectedFolder}
            level={level + 0.8}
          />
        ))}
    </>
  );
};

FolderNode.propTypes = {
  folder: PropTypes.object,
  setSelectedFolder: PropTypes.func,
  selectedFolder: PropTypes.string,
};
