import { useState } from "react";
import PropTypes from "prop-types";

export const FolderNode = ({ folder, setSelectedFolder, selectedFolder, level = 1 }) => {
  
  const [expanded, setExpanded] = useState(false);

  const handleExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
    setSelectedFolder(folder.id);
  };

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
        onClick={handleExpanded}
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
        folder.children.length > 0 &&
        folder.children.map((folder) => (
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
  level: PropTypes.number,
};
