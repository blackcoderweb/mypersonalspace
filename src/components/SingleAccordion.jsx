import Accordion from "react-bootstrap/Accordion";
import { AsideFolder } from "./AsideFolder";

export const SingleAccordion = () => {
  
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Mi unidad</Accordion.Header>
        <Accordion.Body>
            <AsideFolder />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
