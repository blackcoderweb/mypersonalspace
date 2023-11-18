import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "../features/fileSystem/fileSystemSlice"; 

export const AddModal = () => {
  
  const dispatch = useDispatch();
  const parentFolder = useSelector((state) => state.fileSystem.parentFolder);
  const [show, setShow] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateFolder = () => {
    dispatch(createFolder({ folderName, parentFolder }));
    setShow(false);
  };

  return (
    <>
      <Button className="bg-primary bg-gradient" style={{ width: "10rem" }} onClick={handleShow}>
        Nuevo
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva carpeta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Nombre de la carpeta"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateFolder}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
