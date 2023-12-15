import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { OptionsMenu } from "./OptionsMenu";

export const FolderFileItem = ({ type, item, imageSrc }) => {

  return (
    <Card
  id="folderFileItem"
  border="light"
  style={{ width: "10rem", height:"8rem", margin: "0.5rem" }}
>
  <div className="d-flex justify-content-between align-items-center"
  style={{
    whiteSpace: "nowrap",
    width: "100%",
  }}>
    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize:"15px" }}>
      {type === "carpeta" ? item.name : item.fileName}
    </div>
    <div>
      <OptionsMenu type={type} name={type === "carpeta" ? item.name : item.fileName} id={type === "carpeta" ? item.id : item.id} fileParentId={item.id}/>
    </div>
  </div>
  <Card.Img
        style={{ width: "5rem" }}
        variant="top"
        src={imageSrc}
      />
</Card>
  );
};

FolderFileItem.propTypes = {
  item: PropTypes.object,
  imageSrc: PropTypes.string,
  type: PropTypes.string,
};
