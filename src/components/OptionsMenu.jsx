import { NavDropdown } from "react-bootstrap";
import { FolderModal } from "./FolderModal";
import { ShareModal } from "./ShareModal";
import { DeleteModal } from "./DeleteModal";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import { FileModal } from "./FileModal";

export const OptionsMenu = ({ type, name, id, fileParentId }) => {
  return (
    <>
      <NavDropdown
        id="optionsMenu"
        className="custom-dropdown"
        title={
          <div
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        }
      >
        {type === "carpeta" ? (
          <NavDropdown.Item as="div">
            <FolderModal
              action="update"
              title="Cambiar nombre"
              label="Nuevo nombre"
              buttonText="Actualizar"
              id={id}
            />
          </NavDropdown.Item>
        ) : (
          <NavDropdown.Item as="div">
            <FileModal
              action="update"
              title="Actualizar archivo"
              label="Seleccionar nueva versión"
              id={id}
              fileParentId={fileParentId}
            />
          </NavDropdown.Item>
        )}

        <NavDropdown.Item as="div">
          <ShareModal type={type} name={name} id={id} fileParentId={fileParentId}/>
        </NavDropdown.Item>
        <Dropdown.Divider style={{ width: "90%", margin: "0 auto" }} />
        <NavDropdown.Item as="div">
          <DeleteModal type={type} name={name} id={id} fileParentId={fileParentId}/>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

OptionsMenu.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  fileParentId: PropTypes.string,
};
