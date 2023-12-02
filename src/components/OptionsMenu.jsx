import { NavDropdown } from "react-bootstrap";
import { FolderModal } from "./FolderModal";
import { ShareModal } from "./ShareModal";
import { DeleteModal } from "./DeleteModal";
import Dropdown from "react-bootstrap/Dropdown";

export const OptionsMenu = ({ type, name }) => {
  const options = [
    {
      name: "Actualizar",
      icon: "fa-solid fa-sync",
    },
    {
      name: "Eliminar",
      icon: "fa-solid fa-trash",
    },
  ];

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
        <NavDropdown.Item>
          {type === "carpeta" ? (
            <FolderModal
              action="update"
              title="Cambiar nombre"
              label="Nuevo nombre"
              buttonText="Actualizar"
            />
          ) : (
            <NavDropdown.Item>Actualizar {type}</NavDropdown.Item>
          )}
        </NavDropdown.Item>
        <NavDropdown.Item>
          <ShareModal type={type} name={name} />
        </NavDropdown.Item>
        <Dropdown.Divider />
        <NavDropdown.Item>
          <DeleteModal type={type} name={name} />
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
