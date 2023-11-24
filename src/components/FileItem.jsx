import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

export const FileItem = ({ file }) => {
  return (
    <Card id="fileItem" className="text-center" border="light" style={{ width: "12rem", margin: '1rem' }}>
      <Card.Img
        style={{ width: "4rem" }}
        variant="top"
        src="/images/file.png"
      />
      <Card.Body>
        <Card.Title as="p" className="text-center">
          {file.name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

//Apply poptypes to file and file.name
FileItem.propTypes = {
  file: PropTypes.object,
  name: PropTypes.string,
}
