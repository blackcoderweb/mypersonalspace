import Card from 'react-bootstrap/Card';
import { SingleAccordion } from './SingleAccordion';
import { AddButton } from './AddButton';


export const Aside = () => {
  return (
    <Card style={{ width: "20%", height: '100vh'}}>
      <AddButton />
      <SingleAccordion />
    </Card>
  );
};
