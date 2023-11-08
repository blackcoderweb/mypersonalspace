import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import useAuth from "../hooks/useAuth";

export const Navigation = () => {
  
  const {auth} = useAuth()

  return (
      <Navbar expand="lg" className="bg-body-tertiary" style={{ height: '10vh'}}>
        <Container fluid>
          <Navbar.Brand>My personal space</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
            </Nav>
            <div style={{ width: '100%',display: 'flex', justifyContent:'center' }}>
            <Form className="d-flex">
              <Form.Control size="lg"
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Buscar</Button>
            </Form>
            </div>
            <NavDropdown title={`Hola: ${auth}`} id="navbarScrollingDropdown" style={{paddingLeft: '4rem'}}>
                <NavDropdown.Item href="/dashboard/logout">Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};
