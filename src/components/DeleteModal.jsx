import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFolderFile } from '../features/fileSystem/fileSystemSlice';
import PropTypes from 'prop-types';

export const DeleteModal = ({type, name, id, fileParentId}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const parentFolder = useSelector((state) => state.fileSystem.parentFolder);

  const dispatch = useDispatch();

  const handleDeleteFolder = () => {
    dispatch(deleteFolderFile({type: "folder", id: id, parent: parentFolder}));
    setShow(false);
  }

  const handleDeleteFile = () => {
    dispatch(deleteFolderFile({type: "file", id: fileParentId, parent: parentFolder}))
    setShow(false);
  }

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
          <Button variant="danger" onClick={type === "carpeta" ? handleDeleteFolder: handleDeleteFile}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

DeleteModal.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fileParentId: PropTypes.string
}

