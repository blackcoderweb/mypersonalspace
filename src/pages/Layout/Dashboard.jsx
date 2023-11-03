import Card from 'react-bootstrap/Card';

export const Dashboard = ({children}) => {
  return (
    <Card>
      <Card.Body>{children}</Card.Body>
      <h1>Private User Layout</h1>
    </Card>
  )
}
