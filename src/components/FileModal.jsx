import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  setSelectedFolder,
  uploadFileThunk,
} from "../features/fileSystem/fileSystemSlice";
import Spinner from 'react-bootstrap/Spinner';

export const FileModal = ({ action, title, label }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const { selectedFolder, loading } = useSelector((state) => state.fileSystem);

  const handleUploadFile = async () => {
    const formData = new FormData();
    formData["formFile"] = file;

    if (file) {
      dispatch(uploadFileThunk({ formData, parentFolderId: selectedFolder }));
      dispatch(setSelectedFolder(selectedFolder));
      setShow(false);
      setFile("");
    }
  };

  const handleUpdateFileVersion = () => {
    if (file) {
      setFile("");
    }
  };

  return (
      <>
        {action === "upload" ? (
          <Button
            id="uploadFileButton"
            style={{ width: "10rem" }}
            onClick={handleShow}
          >
            <i className="fa-solid fa-file-arrow-up"></i> Subir archivo
          </Button>
        ) : (
          <div onClick={handleShow}>
            <i className="fa-solid fa-file-pen"></i> Actualizar
          </div>
        )}
    
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>{loading ? "Subiendo archivo..." : title}</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
            <>
              <Form>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </Form.Group>
              </Form>
              {file && <p>Archivo seleccionado: {file.name}</p>}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ingrese las etiquetas separadas por coma</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: factura cliente, ventas enero"
                  autoFocus
                />
              </Form.Group>
            </>
          )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              id="modalButton"
              onClick={
                action === "upload" ? handleUploadFile : handleUpdateFileVersion
              }
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

FileModal.propTypes = {
  action: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fileParentId: PropTypes.string,
};
