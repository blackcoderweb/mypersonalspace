import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

export const Folder = ({ folder }) => {
  return (
    <Card id="folderItem" className="text-center" border="light" style={{ width: "12rem", margin: '1rem' }}>
      <Card.Img
        style={{ width: "4rem" }}
        variant="top"
        src="/images/folder.png"
      />
      <Card.Body>
        <Card.Title as="p" className="text-center">
          {folder.name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

Folder.propTypes = {
  folder: PropTypes.object,
};