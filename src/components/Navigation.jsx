import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const { auth } = useAuth();

  return (
    <Navbar id="navbar" expand="lg" style={{ height: "10vh" }}>
      <Container fluid>
        <Navbar.Brand className="logo">
          <h1>ARCA</h1>
          <p>Gestión de archivos y carpetas</p>
        </Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form className="d-flex" style={{ width: "80%" }}>
            <Form.Control
              size="lg"
              type="search"
              placeholder="Buscar archivo o carpeta"
              className="search-input"
              aria-label="Search"
            />
          </Form>
        </div>
        <NavDropdown
          title={`Hola: ${auth}`}
          id="navbarScrollingDropdown"
          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
        >
          <Link to='/logout' className="dropdown-item">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar
            sesión
          </Link>          
        </NavDropdown>
        <i className="fa-solid fa-circle-user fa-2xl"></i>
      </Container>
    </Navbar>
  );
};
