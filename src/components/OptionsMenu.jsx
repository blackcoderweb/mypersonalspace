import { NavDropdown } from 'react-bootstrap';

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
      name: "Eliminar",
      icon: "fa-solid fa-trash",
    },
  ];

  return (
    <>
  <NavDropdown
    id="optionsMenu"
    className="custom-dropdown"
    title={<i className="fa-solid fa-ellipsis-vertical"></i>}
  >
    {options.map((option) => (
      <NavDropdown.Item key={option.name} href="#">
        <i className={option.icon}></i> {option.name}
      </NavDropdown.Item>
    ))}
  </NavDropdown>
    </>
  );
};
