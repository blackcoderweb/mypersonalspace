import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { OptionsMenu } from "./OptionsMenu";

export const FolderFileItem = ({ type, item, imageSrc }) => {
  return (
    <Card
  id="folderFileItem"
  border="light"
  style={{ width: "12rem", height:"12rem", margin: "1rem" }}
>
  <div className="d-flex justify-content-between align-items-center"
  style={{
    whiteSpace: "nowrap",
    width: "100%",
  }}>
    <Card.Img
        style={{ width: "1.5rem" }}
        variant="top"
        src={imageSrc}
      />
    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {item.name}
    </div>
    <div>
      <OptionsMenu type={type} name={item.name}/>
    </div>
  </div>
  <Card.Img
        style={{ width: "10rem" }}
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
