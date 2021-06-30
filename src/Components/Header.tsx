import React from "react";
import { Button } from "react-bootstrap";

import { Nav, Navbar, Container } from "react-bootstrap";
import { useAuth } from "../contexts/auth";

const Header: React.FC = () => {
  const { singOut, user } = useAuth();
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <div className="d-flex">
          <Navbar.Brand href="/catalog">Celfocus</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/catalog" className="active">
              Catalog
            </Nav.Link>
          </Nav>
        </div>
        <div className="d-flex align-items-center">
          <div className="text-white mx-4">Olá, {user.name}!</div>
          <Button onClick={() => singOut()} variant="light">
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
