import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { shareFolderFile } from "../features/fileSystem/fileSystemSlice";

export const ShareModal = ({ type, name, id, fileParentId }) => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [escrituraChecked, setEscrituraChecked] = useState(false);

  const parentFolder = useSelector((state) => state.fileSystem.parentFolder);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShareFolder = () => {
    if (userName === "") {
      setError(true);
    } else {
      dispatch(
        shareFolderFile({
          type,
          id: id,
          userName: userName,
          permission: escrituraChecked ? "escritura" : "lectura",
          parentFolder: parentFolder,
        })
      );
      setError(false);
      setShow(false);
    }
  };

  const handleShareFile = () => {
    if (userName === "") {
      setError(true);
    } else {
      dispatch(
        shareFolderFile({
          type,
          id: id,
          userName: userName,
          permission: escrituraChecked ? "escritura" : "lectura",
          parentFolder: parentFolder,
          fileParentId: fileParentId,
        })
      );
      setError(false);
      setShow(false);
    }
  };

  //Para evitar que se envíe el formulario al presionar enter
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div onClick={handleShow}>
        <i className="fa-solid fa-share-from-square"></i> Compartir {type}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>Compartir {name}</h5>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Buscar usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {error && (
                <div style={{ color: "red" }}>Este campo es obligatorio</div>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="mb-3">
                Permisos
                <Form.Check type="checkBox" label="Lectura" checked readOnly />
                <Form.Check
                  type="checkBox"
                  label="Escritura"
                  checked={escrituraChecked}
                  onChange={(e) => setEscrituraChecked(e.target.checked)}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            id="modalButton"
            onClick={type === "carpeta" ? handleShareFolder : handleShareFile}
          >
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
  id: PropTypes.string,
  fileParentId: PropTypes.string,
};
