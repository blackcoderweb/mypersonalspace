import Card from "react-bootstrap/Card";
import { FolderModal } from "./FolderModal";
import { FileModal } from "./FileModal";
import { Row, Col } from "react-bootstrap";
import { FolderFileItem } from "./FolderFileItem";
import { useFindChildren } from "../hooks/useFindChildren";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { getFullPath } from "../helpers/getFullPath";

export const Hero = () => {
  const { auth } = useAuth();
  const { selectedFolder, filesByFolderId, mainUnit, loaderFoldersFiles } = useSelector(
    (state) => state.fileSystem
  );

  const { files, folders } = useFindChildren(selectedFolder);

  //const path = getFullPath(selectedFolder, auth, mainUnit);

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
        <Col>
          <FolderModal
            action="create"
            title="Nueva carpeta"
            label="Nombre"
            buttonText="Crear"
          />
        </Col>
        <Col>
          <FileModal
            action="upload"
            title="Subir archivo"
            label="Seleccionar archivo"
          />
        </Col>
      </Row>
      <div>{/*path*/}</div>
      <section
        id="folders-section"
        style={{
          width: "95%",
          height: "40vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
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
        {loaderFoldersFiles ? (
          <div className="d-flex justify-content-center">Cargando...</div>
        ) : folders.length > 0 ? (
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
        ) : (
          <div className="d-flex justify-content-center">No hay carpetas</div>
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
            {loaderFoldersFiles ? (
              <div className="d-flex justify-content-center">Cargando...</div>
            ) : files.length > 0 ? (
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
            ) : (
              <div className="d-flex justify-content-center">
                No hay archivos
              </div>
            )}
          </>
        ) : (
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
            {loaderFoldersFiles ? (<div className="d-flex justify-content-center">Cargando...</div>) : filesByFolderId.length > 0 ? (
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
            ) : (
              <div className="d-flex justify-content-center">
                No hay archivos
              </div>
            )}
          </>
        )}
      </section>
    </Card>
  );
};
