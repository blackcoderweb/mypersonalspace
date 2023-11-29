import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import useAuth from "../hooks/useAuth";

export const Navigation = () => {
  
  const {auth} = useAuth()

  return (
      <Navbar id="navbar" expand="lg" className="bg-primary bg-gradient text-light" style={{ height: '10vh'}}>
        <Container fluid>
          <Navbar.Brand className="text-light">My personal space</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
            </Nav>
            <div style={{ width: '100%',display: 'flex', justifyContent:'center', alignItems: 'center' }}>
            <Form className="d-flex" style={{width: '80%'}}>
              <Form.Control size="lg"
                type="search"
                placeholder="Buscar archivo o carpeta"
                className="search-input"
                aria-label="Search"
              />
            </Form>
            </div>
            <NavDropdown title={`Hola: ${auth}`} id="navbarScrollingDropdown" style={{paddingLeft: '1rem', paddingRight:'1rem'}}>
                <NavDropdown.Item href="/dashboard/logout"><i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>

              <i className="fa-solid fa-circle-user fa-2xl"></i>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};
