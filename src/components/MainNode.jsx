import { useState } from "react";
import Card from "react-bootstrap/Card";

export const MainNode = () => {
  const [expanded, setExpanded] = useState();
  

  const handleExpand = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "1rem",
      }}
    >
      <i
        className={expanded ? "fa-solid fa-chevron-down fa-xs" : "fa-solid fa-chevron-right fa-xs"}
        onClick={handleExpand}
      ></i>
      <Card.Body style={{ userSelect: "none" }} onClick={() => alert("Card")}>
        <i className="fa-solid fa-hard-drive fa-xl"></i> Mi unidad
      </Card.Body>
    </Card>
  );
};
