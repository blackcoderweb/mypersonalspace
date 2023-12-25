import Card from "react-bootstrap/Card";
import { FolderModal } from "./FolderModal";
import { FileModal } from "./FileModal";
import { Row, Col } from "react-bootstrap";
import { FolderFileItem } from "./FolderFileItem";
import { useFindChildren } from "../hooks/useFindChildren";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

export const Hero = () => {
  const { auth } = useAuth();
  const { selectedFolder, filesByFolderId } = useSelector(
    (state) => state.fileSystem
  );

  const { files, folders } = useFindChildren(selectedFolder);

  return (
    <Card
      id="hero"
      className="bg-light"
      border="light"
      style={{
        width: "calc(100% - 20rem)",
        height: "90vh",
        alignItems: "center",
        paddingTop: "1rem",
      }}
    >
      <Row className="d-flex gap-1 pb-2">
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
      <section
        id="folders-section"
        style={{
          width: "95%",
          height: "40vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {folders.length > 0 && (
          <>
            <div
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f8f9fa",
                zIndex: "1",
              }}
            >
              <h5>Carpetas</h5>
              <hr />
            </div>

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
      </section>
      <section
        id="files-section"
        style={{
          width: "95%",
          height: "40vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {selectedFolder === auth ? (
                  files.length > 0 && (
                    <>
                      <div
                        style={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "#f8f9fa",
                          zIndex: "1",
                        }}
                      >
                        <h5>Archivos</h5>
                        <hr />
                      </div>
          
                      <Row xs={2} md={6} className="g-2">
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
                  )
        ) : (
          filesByFolderId.length > 0 && (
            <>
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f8f9fa",
                  zIndex: "1",
                }}
              >
                <h5>Archivos</h5>
                <hr />
              </div>
  
              <Row xs={2} md={6} className="g-2">
                {filesByFolderId &&
                  filesByFolderId.map((file) => (
                    <FolderFileItem
                      key={file.id}
                      type="archivo"
                      item={file}
                      imageSrc="/images/file.png"
                    />
                  ))}
              </Row>
            </>
          )
        )}
      </section>
    </Card>
  );
};
