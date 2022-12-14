import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LoginAndRegister from "./loginAndRegister";
import { useContext } from "react";
import { SessionContext } from "../../context/sessionContext";

const Navigator = () => {
  const session = useContext(SessionContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Stock Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/stocks">Home</Nav.Link>
            {session && (
              <>
                <Nav.Link href="/products">Productos</Nav.Link>
                <Nav.Link href="/stores">Stores</Nav.Link>
                <Nav.Link href="/customers">Customers</Nav.Link>
                <Nav.Link href="/history">Historial</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <LoginAndRegister />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigator;
