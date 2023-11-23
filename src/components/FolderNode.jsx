import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateParentFolder } from "../features/fileSystem/fileSystemSlice";
import { useFindChildren } from "../hooks/useFindChildren";

export const FolderNode = ({ folder }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleUpdateParent = (parentId) => {
    dispatch(updateParentFolder({ parentFolder: parentId }));
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const { folders } = useFindChildren(folder.id);

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
        <div style={{ userSelect: "none", paddingLeft: "1.5rem" }}>
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
            style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
          ></i>
          {folder.name}
        </div>
      </div>
      <div style={{ paddingLeft: "1rem" }}>
        {expanded &&
          folders.length > 0 &&
          folders.map((folder) => (
            <FolderNode key={folder.id} folder={folder} />
          ))}
      </div>
    </>
  );
};

FolderNode.propTypes = {
  folder: PropTypes.object,
};
