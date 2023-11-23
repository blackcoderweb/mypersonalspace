import Card from "react-bootstrap/Card";
import { AddModal } from "./AddModal";
import { UploadModal } from "./UploadModal";
import { Row, Col } from "react-bootstrap";
import { Folder } from "./Folder";
import { useSelector } from "react-redux";
import { FileItem } from "./FileItem";
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
          <AddModal />
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
            <Folder key={folder.id} folder={folder} />
          ))}
        </Row>
        <h5 className="pt-5">Archivos</h5>
        <hr />
        <Row xs={1} md={4} className="g-2 justify-content-md-center">
          {files && files.map((file) => (
            <FileItem key={file.id} file={file} />
          ))}
        </Row>
      </section>
    </Card>
  );
};
