import Card from "react-bootstrap/Card";
import { FolderModal } from "./FolderModal";
import { FileModal } from "./FileModal";
import { Row, Col } from "react-bootstrap";
import { FolderFileItem } from "./FolderFileItem";
import { useSelector } from "react-redux";
import { useFindChildren } from "../hooks/useFindChildren";

export const Hero = () => {
  const parentFolder = useSelector((state) => state.fileSystem.parentFolder);
  const { folders, files } = useFindChildren(parentFolder);
  

  return (
    <Card
      id="hero"
      className="bg-light"
      border="light"
      style={{
        width: "calc(100% - 20rem)",
        height: "90vh",
        alignItems: "center",
        paddingTop: "3rem",
      }}
    >
      <Row className="d-flex gap-1">
        <Col xm={6}>
          <FolderModal
            action="create"
            title="Nueva carpeta"
            label="Nombre"
            buttonText="Crear"
          />
        </Col>
        <Col xm={6}>
          <FileModal
            action="upload"
            title="Subir archivo"
            label="Seleccionar archivo"
          />
        </Col>
      </Row>
      <section id="folders-files" className="pt-5" style={{ width: "95%" }}>
        {folders.length > 0 && (
          <>
            <h5>Carpetas</h5>
            <hr />
            <Row xs={2} md={6} className="g-2">
              {folders.map((folder) => (
                <FolderFileItem
                  key={folder.id}
                  type="carpeta"
                  item={folder}
                  imageSrc="/images/folder.png"
                />
              ))}
            </Row>
          </>
        )}
        {files.length > 0 && (
          <>
            <h5 className="pt-5">Archivos</h5>
            <hr />
            <Row xs={2} md={6} className="g-2 pb-5">
              {files &&
                files.map((file) => (
                  <FolderFileItem
                    key={file.id}
                    type="archivo"
                    item={file}
                    imageSrc="/images/file.png"
                  />
                ))}
            </Row>
          </>
        )}
      </section>
    </Card>
  );
};
