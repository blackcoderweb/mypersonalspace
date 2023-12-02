import Card from "react-bootstrap/Card";
import { FolderModal } from "./FolderModal";
import { UploadModal } from "./UploadModal";
import { Row, Col } from "react-bootstrap";
import { FolderFileItem } from "./FolderFileItem";
import { useSelector } from "react-redux";
import { useFindChildren } from "../hooks/useFindChildren";

export const Hero = () => {

  const parentFolder = useSelector((state) => state.fileSystem.parentFolder);
  const {folders, files} = useFindChildren(parentFolder)

  return (
    <Card
      id="hero"
      className="bg-light"
      border="light"
      style={{
        width: "calc(100% - 20rem)",
        height: "90vh",
        alignItems: "center",
      }}
    >
      <Row className="d-flex gap-1 pt-4">
        <Col xm={6}>
          <FolderModal action="create" title="Nueva carpeta" label="Nombre" buttonText="Crear"/>
        </Col>
        <Col xm={6}>
          <UploadModal />
        </Col>
      </Row>
      <section id="folders-files" className="pt-5" style={{ width: "95%" }}>
        <h5>Carpetas</h5>
        <hr />
        <Row xs={1} md={4} className="g-2 justify-content-md-center">
          {folders && folders.map((folder) => (
            <FolderFileItem key={folder.id} item={folder} imageSrc="/images/folder.png" />
          ))}
        </Row>
        <h5 className="pt-5">Archivos</h5>
        <hr />
        <Row xs={1} md={4} className="g-2 justify-content-md-center">
          {files && files.map((file) => (
            <FolderFileItem key={file.id} item={file} imageSrc="/images/file.png" />
          ))}
        </Row>
      </section>
    </Card>
  );
};
