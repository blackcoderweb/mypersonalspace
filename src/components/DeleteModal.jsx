import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const DeleteModal = ({type, name}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <i className="fa-solid fa-trash"></i> Eliminar {type}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>Eliminar {type}</h5>
        </Modal.Header>
        <Modal.Body>¿Está seguro que desea eliminar {name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

