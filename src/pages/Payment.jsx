import React from "react";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button, Table } from "react-bootstrap";

const Payment = () => {
  return (
    <div>
      <Navigation />
      <Container>
        <Row className="mt-5 ">
          <Col md={{ span: 6 }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Address</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
          </Col>
          <Col md={{ span: 4 }}>
            <Table className="ms-5" striped>
              <thead variant="dark">
                <tr>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                <tr>
                  <td>Booking Id</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>Rp. </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="mx-auto">
            <Button className="px-5" variant="primary" type="submit">
              Confirm
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Payment;
