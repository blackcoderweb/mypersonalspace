import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export const ShareModal = ({ type, name }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div onClick={handleShow}>
        <i className="fa-solid fa-share"></i> Compartir {type}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>Compartir {name}</h5>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Buscar usuario</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="mb-3">
                Permisos
                <Form.Check type="checkBox" label="Lectura" defaultChecked/>
                <Form.Check type="checkBox" label="Escritura" />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button id="modalButton" onClick={handleClose}>
            Compartir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ShareModal.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
}
