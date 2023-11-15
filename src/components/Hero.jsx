import Card from 'react-bootstrap/Card';
import { AddModal } from './AddModal';
import { UploadModal } from './UploadModal';
import { Row, Col } from 'react-bootstrap';
import { Folder } from './Folder';


export const Hero = () => {
  return (
    <Card style={{ width: "80%", height: '90vh', alignItems: 'center' }}>
  <Row className="justify-content-center pt-4" style={{ width: '40%' }}>
    <Col lg={5} className="mb-1 mb-lg-0">
      <AddModal />
    </Col>
    <Col lg={5}>
      <UploadModal />
    </Col>
  </Row>
  <h4>Folders</h4>
  <Folder/>
</Card>
  
  )
}
