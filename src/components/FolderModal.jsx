import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createFolderThunk,
  setSelectedFolder,
} from "../features/fileSystem/fileSystemSlice";
import propTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";
import Alert from 'react-bootstrap/Alert';

export const FolderModal = ({ action, title, label, buttonText, id }) => {
  const dispatch = useDispatch();
  const { selectedFolder, loaderCreateFolder, nameExists } = useSelector(
    (state) => state.fileSystem
  );
  const [show, setShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setAlertShow(false);
  }

  useEffect(() => {
    if (!loaderCreateFolder) {
      if (nameExists) {
        setAlertShow(true);
      } else {
        setShow(false);
      }
    }
  }, [loaderCreateFolder, nameExists]);

  const handleSubmitCreateFolder = (e) => {
    e.preventDefault();
    dispatch(createFolderThunk({ folderName, parentFolderId: selectedFolder }));
    dispatch(setSelectedFolder(selectedFolder));
    setFolderName("");
  };
  const handleCreateFolder = () => {
    dispatch(createFolderThunk({ folderName, parentFolderId: selectedFolder }));
    dispatch(setSelectedFolder(selectedFolder));
    setFolderName("");
  };

  const handleUpdateFolder = () => {
    dispatch(
      changeFolderName({ folderId: id, newFolderName: folderName, ext: false })
    );
    setShow(false);
  };

  const handleSubmitUpdateFolder = (e) => {
    e.preventDefault();
    dispatch(
      changeFolderName({ folderId: id, newFolderName: folderName, ext: false })
    );
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
          <h5>{loaderCreateFolder ? "Creando carpeta..." : title}</h5>
        </Modal.Header>
        <Modal.Body>
          {loaderCreateFolder ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Form
              onSubmit={
                action === "create"
                  ? handleSubmitCreateFolder
                  : handleSubmitUpdateFolder
              }
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {alertShow ? (
                  <Alert
                    variant="danger"
                    onClose={() => setAlertShow(false)}
                    dismissible
                  >
                    <Alert.Heading as="p">
                      Ya existe una carpeta con ese nombre en esta ubicación
                    </Alert.Heading>
                  </Alert>
                ): ""}
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre de la carpeta"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
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
