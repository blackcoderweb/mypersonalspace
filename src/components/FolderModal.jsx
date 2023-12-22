import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createFolder,
  setSelectedFolder,
} from "../features/fileSystem/fileSystemSlice";
import propTypes from "prop-types";

export const FolderModal = ({ action, title, label, buttonText, id }) => {
  const dispatch = useDispatch();
  const selectedFolder = useSelector((state) => state.fileSystem.selectedFolder);
  const [show, setShow] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitCreateFolder = (e) => {
    e.preventDefault();
    dispatch(createFolder({ folderName, parentFolderId: selectedFolder }));
    setShow(false);
  };
  const handleCreateFolder = () => {
    dispatch(createFolder({ folderName, parentFolderId: selectedFolder }));
    dispatch(setSelectedFolder(selectedFolder));
    setShow(false);
  };

  const handleUpdateFolder = () => {
    dispatch(changeFolderName({folderId:id, newFolderName: folderName, ext: false}));
    setShow(false);
  };

  const handleSubmitUpdateFolder = (e) => {
    e.preventDefault();
    dispatch(changeFolderName({folderId:id, newFolderName: folderName, ext: false}));
    setShow(false);
  };

  return (
    <>
      {action === "create" ? (
        <Button
          id="createFolderButton"
          style={{ width: "10rem" }}
          onClick={handleShow}
        >
          <i className="fa-solid fa-folder-plus"></i> Nueva carpeta
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
            id="modalButton"
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

FolderModal.propTypes = {
  action: propTypes.string,
  title: propTypes.string,
  label: propTypes.string,
  buttonText: propTypes.string,
  id: propTypes.string,
};
