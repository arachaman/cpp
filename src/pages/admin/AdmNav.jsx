import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, } from "react-bootstrap";
import logo from '../../images/logo.png'
import { Link } from "react-router-dom";

const AdmNav = () => {
  return (
    <div>
        <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">
          <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            C-Ware Admin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="fw-bold">
              <Nav.Link href="/dashboard/category">| Manage Category  |</Nav.Link>
              <Nav.Link href="/#about">Manage Order |</Nav.Link>
            </Nav>
            <Nav className="fw-semibold">
              <Nav.Link as={Link} to="/register">Sgin Out</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
      <Container></Container>
    </div>
  )
}

export default AdmNav