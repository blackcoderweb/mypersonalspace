import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createFolder,
  updateParentFolder,
} from "../features/fileSystem/fileSystemSlice";

export const FolderModal = ({ action, title, label, buttonText }) => {
  const dispatch = useDispatch();
  const parentFolder = useSelector((state) => state.fileSystem.parentFolder);
  const [show, setShow] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitCreateFolder = (e) => {
    e.preventDefault();
    dispatch(createFolder({ folderName, parentFolder, ext: false }));
    dispatch(updateParentFolder({ parentFolder: parentFolder }));
    setShow(false);
  };
  const handleCreateFolder = () => {
    dispatch(createFolder({ folderName, parentFolder, ext: false }));
    dispatch(updateParentFolder({ parentFolder: parentFolder }));
    setShow(false);
  };

  const handleUpdateFolder = () => {
    alert("Voy a actualizar la carpeta");
  };

  const handleSubmitUpdateFolder = (e) => {
    e.preventDefault();
    alert("Voy a actualizar la carpeta");
  };

  return (
    <>
      {action === "create" ? (
        <Button
          className="bg-primary bg-gradient"
          style={{ width: "10rem" }}
          onClick={handleShow}
        >
          <i className="fa-solid fa-folder-plus"></i> Nuevo
        </Button>
      ) : (
        <div onClick={handleShow}>
          <i className="fa-solid fa-pencil"></i> Cambiar nombre
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>{title}</h5>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={
              action === "create"
                ? handleSubmitCreateFolder
                : handleSubmitUpdateFolder
            }
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{label}</Form.Label>
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
          <Button
            variant="primary"
            onClick={
              action === "create" ? handleCreateFolder : handleUpdateFolder
            }
          >
            {buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
