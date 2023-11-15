import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const Folder = () => {
  return (
    <Row xs={8} md={10} className="g-4" style={{height: '100%'}}>
      {Array.from({ length: 8 }).map((_, idx) => (
        <Col key={idx}>
          <Card style={{width: '12rem'}}>
            <Card.Img style={{width: '8rem'}} variant="top" src="/public/images/folder1.png" />
            <Card.Body>
              <Card.Title as='p' className='text-center'>Card title</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
