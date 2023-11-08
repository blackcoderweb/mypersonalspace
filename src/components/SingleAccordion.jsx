import Accordion from "react-bootstrap/Accordion";
import { AsideFolder } from "./AsideFolder";
import { fileSystem } from "../data/testData";


export const SingleAccordion = () => {
  const folders = fileSystem[0].root.unidad.folders;
  
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Mi unidad</Accordion.Header>
        <Accordion.Body>
        {folders.map(folder => (
            <AsideFolder folder={folder} key={folder.id} />
          ))}
          
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
