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
      <Navbar expand="lg" className="bg-body-tertiary justify-content-left">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control size="lg"
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Buscar</Button>
            </Form>
            <Navbar.Text>Hola: 
            <NavDropdown title={auth} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/dashboard/logout">Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};
