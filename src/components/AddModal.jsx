import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { fileSystem } from '../data/testData';
import { v4 as uuidv4 } from 'uuid';

export const AddModal = () => {

  const [show, setShow] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createFolder = () => {
    localStorage.setItem('root', JSON.stringify(fileSystem))
    const folder = {
      id: uuidv4(),
      name: folderName,
      files: [],
      folders: []
    };
    //Si no se pone nombre a la carpeta
    if(folderName == "") folder.name = "Nueva carpeta"
    const myFolders = JSON.parse(localStorage.getItem('root'))
    const parentFolder = myFolders.root.unidad
    parentFolder.folders.push(folder);
    localStorage.setItem('root', JSON.stringify(myFolders));
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" style={{width: '10rem'}} onClick={handleShow}>
        Nuevo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva carpeta {JSON.stringify(fileSystem)}</Modal.Title>
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
          <Button variant="primary" onClick={createFolder}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
