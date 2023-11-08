import Card from 'react-bootstrap/Card';
import { AddModal } from './AddModal';
import { UploadModal } from './UploadModal';

export const Hero = () => {
  return (
    <Card style={{ width: "80%", alignItems:'center'}}>
      <div style={{ width: '25rem', display: "flex", justifyContent: 'space-between', paddingTop: '1rem' }}>
      <AddModal />
      <UploadModal />
      </div>
    </Card>
  )
}
