import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { shareFolderFile } from "../features/fileSystem/fileSystemSlice";

export const EditPermitsModal = ({ type, name, id, fileParentId }) => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [escrituraChecked, setEscrituraChecked] = useState(false);
  const [lecturaChecked, setLecturaChecked] = useState(false);
  const [revokeForAll, setRevokeForAll] = useState(false);
  const [revokeForUser, setRevokeForUser] = useState(false);

  const parentFolder = useSelector((state) => state.fileSystem.parentFolder);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeFolderPermits = () => {
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

  const handleChangeFilePermits = () => {
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
  };

  return (
    <>
      <div onClick={handleShow}>
        <i className="fa-solid fa-list-check"></i> Editar permisos de {type}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>Editar permisos de {name}</h5>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <div className="mb-4">
                <p>Dejar de compartir con todos los usuarios</p>
                <Form.Check
                  type="checkBox"
                  label="Dejar de compartir"
                  checked={revokeForAll}
                  onChange={(e) => setRevokeForAll(e.target.checked)}
                />
              </div>
            </Form.Group>
            {!revokeForAll && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Buscar usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {error && (
                    <div style={{ color: "red" }}>
                      Este campo es obligatorio
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <div className="mb-3">
                    Permisos actuales
                    <Form.Check
                      type="checkBox"
                      label="Lectura"
                      checked={lecturaChecked}
                      onChange={(e) => setLecturaChecked(e.target.checked)}
                    />
                    <Form.Check
                      type="checkBox"
                      label="Escritura"
                      checked={escrituraChecked}
                      onChange={(e) => setEscrituraChecked(e.target.checked)}
                    />
                    <Form.Check
                      type="checkBox"
                      label="Dejar de compartir"
                      checked={revokeForUser}
                      onChange={(e) => setRevokeForUser(e.target.checked)}
                    />
                  </div>
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            id="modalButton"
            onClick={
              type === "carpeta"
                ? handleChangeFolderPermits
                : handleChangeFilePermits
            }
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

EditPermitsModal.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  fileParentId: PropTypes.string,
};
