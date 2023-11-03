
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Card className="text-center px-5 py-3" border="dark">
      <Card.Body>
        <Card.Title as="h1">Error 404</Card.Title>
        <Card.Text as="h5">
          La página que solicitaste no existe
        </Card.Text>
        <Link to="/">Volver al inicio</Link>
      </Card.Body>
    </Card>
  )
}
