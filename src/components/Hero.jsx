import Card from "react-bootstrap/Card";
import { FolderModal } from "./FolderModal";
import { FileModal } from "./FileModal";
import { Row, Col } from "react-bootstrap";
import { FolderFileItem } from "./FolderFileItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFiles } from "../api/files";
import { setRootFiles } from "../features/fileSystem/fileSystemSlice";

export const Hero = () => {

  const dispatch = useDispatch();
  const rootFolders = useSelector((state) => state.fileSystem.rootFolders);
  const rootFiles = useSelector((state) => state.fileSystem.rootFiles);

  useEffect(() => {
    const fetchFiles = async () => {
      const resp = await getFiles();
      dispatch(setRootFiles(resp));
    };
    fetchFiles();
  }, [dispatch]);

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
        {rootFolders.length > 0 && (
          <>
            <h5>Carpetas</h5>
            <hr />
            <Row xs={2} md={6} className="g-2">
              {rootFolders.map((folder) => (
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
        {rootFiles.length > 0 && (
          <>
            <h5 className="pt-5">Archivos</h5>
            <hr />
            <Row xs={2} md={6} className="g-2 pb-5">
              {rootFiles &&
                rootFiles.map((file) => (
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
