import Card from 'react-bootstrap/Card';

export const Hero = (children) => {
  return (
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
  )
}
