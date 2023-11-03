import Accordion from "react-bootstrap/Accordion";

export const AccordionItem = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
