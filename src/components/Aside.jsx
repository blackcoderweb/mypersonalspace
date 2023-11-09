import Card from 'react-bootstrap/Card';
import { MainNode } from './MainNode';


export const Aside = () => {
  return (
    <Card style={{ width: "20%", height: '90vh'}}>
      <MainNode />
    </Card>
  );
};
