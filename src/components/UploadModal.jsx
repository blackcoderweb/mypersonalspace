import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export const UploadModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" style={{ width: "10rem" }} onClick={handleShow}>
        Subir
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subir archivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Seleccione sus archivos</Form.Label>
            <Form.Control type="file" single />
          </Form.Group>
        </Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingrese las etiquetas separadas por coma</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: factura cliente, ventas enero"
                autoFocus
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};