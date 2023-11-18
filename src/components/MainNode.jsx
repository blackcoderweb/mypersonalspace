import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { updateParentFolder } from "../features/fileSystem/fileSystemSlice";
import { Navigate, useNavigate } from "react-router-dom";

export const MainNode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState();

  const handleUpdateParent = () => {
    dispatch(updateParentFolder({parentFolder: "root.unidad"}));
    navigate("/dashboard/elements")
  };

  const handleExpand = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
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
  );
};
