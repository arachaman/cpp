import React, { useContext, useState } from "react";
import NavigationUser from "./NavigationUser";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button, Table } from "react-bootstrap";
import { UserAuth } from '../../context/AuthContext';
import CartContext from "../../context/cart/cart-context";
import {db} from '../../config/fb.js'
import {collection, addDoc, Timestamp, query, where, getDocs, updateDoc, doc} from 'firebase/firestore'
import { v4 as uuid } from 'uuid';
import FormattedPrice from "../../helper/FormattedPrice";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import ThankYouModal from "../../components/ThankYouModal";

const Payment = () => {

  const { user } = UserAuth();

  const unique_id = uuid();
  const navigate = useNavigate();

  const cartCtx = useContext(CartContext);

  const [loading, isLoading] = useState()
  const [modalShow, setModalShow] = useState(false);

  async function submitHandler(e){
    e.preventDefault()
    if(cartCtx.items !== undefined){
      isLoading(true)
      for (let i = 0; i < cartCtx.items.length; i++){
        try {
          await addDoc(collection(db, 'orders'), {
            title: cartCtx.items[i].title.toLowerCase(),
            user: user.email,
            amount: cartCtx.items[i].amount,
            bookingId: unique_id,
            status:"pending",
            dateOrder: Timestamp.now()
          })
        } catch (err) {
          alert(err)
        }
      }

      let cartId;
      const q = query(collection(db, "carts"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          cartId = doc.id
      });
  
      const taskDocRef = doc(db, 'carts', cartId)
      try{
          await updateDoc(taskDocRef, {
              carts:[{
                  items: [],
                  totalAmount: 0
              }]
          })
      } catch (err) {
        alert(err)
      }
      isLoading(false)
      setModalShow(true)
    } 
    isLoading(false)
  }

  function hideHandler(){
    setModalShow(false)
    navigate('/')
  }

  return (
    <div>
      <NavigationUser/>
      <ThankYouModal
        show={modalShow}
        onHide={hideHandler}
      />
      <Container>
        <Form onSubmit={submitHandler}>
          <Row className="mt-5 ">
            <Col md={{ span: 6 }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Card Number</Form.Label>
                <Form.Control disabled={loading} required type="text" placeholder="Enter Card Number" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAdress">
                <Form.Label>Address</Form.Label>
                <Form.Control disabled={loading} required as="textarea" placeholder="Address" rows={2}  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicZipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control disabled={loading} required type="text" placeholder="Zip Code" />
              </Form.Group>
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
                    <td>{unique_id}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>{FormattedPrice(cartCtx.totalAmount)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="mx-auto">
              <Button 
                className="px-5" 
                variant="primary" 
                type="submit"
                disabled={cartCtx.totalAmount == 0 ? true : false}
              >
                {loading && (
                    <Spinner animation="border" variant="light" size="sm" />
                  )}
                {loading ? 'Loading' : 'Confirm'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Payment;
