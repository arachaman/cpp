import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../css/landingPage.module.css";
import logo from '../images/logo.png'
import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPages = () => {
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
      <div className={`${styles.banner} text-white `}>
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h1>
            WELCOME TO <br /> C-WAREHOUSE
          </h1>
          <h3 className="fw-normal">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsa
            quaerat soluta quod! Minus hic ad maxime soluta iure magnam.
          </h3>
        </div>
      </div>
      <Container>
        <Row id="collection">
          <Col  className="text-center mt-4">
            <h1 >COLLECTION</h1>
            <Card style={{ width: "18rem", border: 0 }} className="mt-5">
              <Card.Img
                variant="top"
                src="https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg"
              />
              <Card.Body>
                <Card.Title>buku coding</Card.Title>
                <Card.Text>Rp</Card.Text>
                <Button variant="primary">details</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row id="category">
          <Col className="text-center mt-4">
            <h1 >CATEGORY</h1>
            <Card style={{ width: "18rem" }} className="mt-5">
              <Card.Img
                variant="top"
                src="https://www.dicoding.com/blog/wp-content/uploads/2020/04/Internship-rendi-programming-bahasa.png"
              />
              <Card.Body>
                <Card.Title>Programming</Card.Title>
                <Button variant="primary">details</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container id="about" className="text-center">
        <h1>About Us</h1>
        <div>
          <Row>
            <Col md={{ span: 6 }} sm={12}>
              <img src="https://eslbrains.com/wp-content/uploads/2022/01/Im-afraid-thats-outside-the-scope-of-this-meeting-473x381.png" alt=""/>
            </Col>
            <Col className="align-self-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta magnam laborum in aliquam? Minima, reprehenderit nesciunt est pariatur magnam natus deleniti ad labore dolorum distinctio nostrum vero facilis et suscipit enim vel ratione ducimus consequatur facere nam aspernatur? Maiores minus officia, animi cumque nobis fugiat modi, quam perspiciatis tempora vero quos temporibus omnis quae recusandae magnam deserunt? Eos ab corrupti labore eaque alias, consequuntur ullam quasi. Inventore aspernatur consectetur quod est alias illo, sapiente enim deserunt a. Recusandae aliquid minus tempore! Nihil a at ipsam accusantium aliquid, eaque, est expedita esse, culpa possimus excepturi placeat rerum nobis amet incidunt non!
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default LandingPages;
