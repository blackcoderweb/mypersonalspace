import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../features/fileSystem/fileSystemSlice";

export const UploadModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedFile, setSelectedFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [tags, setTags] = useState("");

  const dispatch = useDispatch();
  const parentFolder = useSelector((state) => state.fileSystem.parentFolder);

  const handleUploadFile = () => {
    if (selectedFile) {
      dispatch(uploadFile({ selectedFile, fileUrl, tags, parentFolder, ext: true }));
      setShow(false);
      setSelectedFile("");
    }
  }

  return (
    <>
      <Button
        className="bg-primary bg-gradient"
        style={{ width: "10rem" }}
        onClick={handleShow}
      >
        <i className="fa-solid fa-file-arrow-up"></i> Subir
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subir archivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Seleccione el archivo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]["name"]);
                  setFileUrl(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          {selectedFile && <p>Archivo seleccionado: {selectedFile}</p>}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Ingrese las etiquetas separadas por coma</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: factura cliente, ventas enero"
              autoFocus
              onChange={(e) => {
                setTags(e.target.value);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUploadFile}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
