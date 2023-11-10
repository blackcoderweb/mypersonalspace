import { useState } from "react";
import Card from "react-bootstrap/Card";

export const FolderNode = ({folder}) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "2rem",
        paddingBottom: '0.5rem'
      }}
    >

      <i className={expanded ? "fa-solid fa-chevron-down fa-xs" : "fa-solid fa-chevron-right fa-xs"} style={{paddingLeft: '1rem' }}onClick={handleExpand}></i>
      <div style={{ userSelect: "none", paddingLeft: '1rem' }} onClick={() => alert("Card")}>
        <i className="fa-solid fa-folder fa-xl"></i> {folder.name}
      </div>
    </div>
  );
};