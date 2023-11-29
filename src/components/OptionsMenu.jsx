import { NavDropdown } from "react-bootstrap";
import { AddModal } from "./FolderModal";

export const OptionsMenu = () => {
  const options = [
    {
      name: "Cambiar nombre",
      icon: "fa-solid fa-pencil",
    },
    {
      name: "Compartir",
      icon: "fa-solid fa-share",
    },
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
        {options.map((option) => (
          <NavDropdown.Item key={option.name}>
            <AddModal action="update" title="Cambiar nombre" label="Nuevo nombre" buttonText="Actualizar"/>
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </>
  );
};
