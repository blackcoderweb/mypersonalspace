import Card from "react-bootstrap/Card";

export const FileItem = ({ file }) => {
  return (
    <Card className="text-center" border="light" style={{ width: "12rem", margin: '1rem' }}>
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