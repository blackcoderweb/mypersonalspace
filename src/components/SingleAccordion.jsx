import Accordion from "react-bootstrap/Accordion";
import { AsideFolder } from "./AsideFolder";

const folders = JSON.parse(localStorage.getItem('root'));


export const SingleAccordion = () => {
  
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Mi unidad</Accordion.Header>
        <Accordion.Body>
            {!folders ? "" : folders.root.unidad.folders.map((folder) => (<AsideFolder key={folder.id} folder={folder}/>))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
