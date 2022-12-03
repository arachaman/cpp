import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Navigation";
import { Row, Col, Container, Table, Button, Form } from "react-bootstrap";
import styles from "../css/cart.css";

const Cart = () => {
  return (
    <div>
      <Navigation />
      <div className={`${styles.banner} text-white `}></div>
      <Container>
        <Row>
          <Col className="mx-5">
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th className="w-25">qty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>
                    <Form.Group size="sm" controlId="qty">
                      <Form.Control type="number" placeholder="qty" />
                    </Form.Group>
                  </td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 7 }}>
            <Table striped>
              <thead>
                <tr>
                  <th>Total Item</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Rp. </td>
                </tr>
              </tbody>
            </Table>
            <Button variant="warning" href="/payment">
              Checkout
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
