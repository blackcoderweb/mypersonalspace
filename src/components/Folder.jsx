import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export const Folder = () => {
  return (
    <Row xs={8} md={10} className="g-4">
          <Card  border='light' style={{width: '12rem'}}>
            <Card.Img style={{width: '8rem'}} variant="top" src="/images/folder1.png" />
            <Card.Body>
              <Card.Title as='p' className='text-center'>Card</Card.Title>
            </Card.Body>
          </Card>
    </Row>
  )
}
