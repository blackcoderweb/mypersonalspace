import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { OptionsMenu } from "./OptionsMenu";

export const FolderFileItem = ({ type, item, imageSrc }) => {

  let currentFile = item.version ? item.version[item.version.length - 1] : undefined;
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
      {type === "carpeta" ? item.name : currentFile.name}
    </div>
    <div>
      <OptionsMenu type={type} name={type === "carpeta" ? item.name : currentFile.name} id={type === "carpeta" ? item.id : currentFile.id} fileParentId={item.id}/>
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
