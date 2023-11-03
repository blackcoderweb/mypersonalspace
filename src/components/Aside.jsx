import Card from 'react-bootstrap/Card';

export const Aside = (children) => {
  return (
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};
