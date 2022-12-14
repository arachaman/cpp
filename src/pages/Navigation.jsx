import React from 'react'
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../images/logo.png'

const Navigation = () => {
  return (
    <div>
        <Navbar bg="light" expand="lg" sticky="top" className=''>
        <Container>
          <Navbar.Brand href="/">
          <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top "
            />
            C-Warehouse
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="fw-bold">
              <Nav.Link href="/#collection">COLLECTION </Nav.Link>
              <Nav.Link href="/#category">CATEGORY</Nav.Link>
              <Nav.Link href="/#about">ABOUT US</Nav.Link>
            </Nav>
            <Nav className="fw-semibold">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation