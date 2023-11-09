import Card from "react-bootstrap/Card";

export const AsideFolder = ({folder}) => {
  return (
    <Card
      onClick={() => {
        alert("Card clicked");
      }}
    >
      <Card.Body
        style={{ height: "2.5rem", display: "flex", alignItems: "center" }}
      >
        {folder.name}
      </Card.Body>
    </Card>
  );
};
