import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Navigation";
import NavigationUser from "./NavigationUser";
import { Row, Col, Container, Table, Button } from "react-bootstrap";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/fb"
import styles from "../../css/cart.css";
import { UserAuth } from '../../context/AuthContext';
import CartItem from "../../components/User/CartItem";
import CartContext from "../../context/cart/cart-context";
import { useNavigate } from "react-router-dom";
import FormattedPrice from "../../helper/FormattedPrice";
import Footer from "../Footer";

const Cart = () => {

  const { user } = UserAuth();

  const navigate = useNavigate();

  const [deleteItem, isDeleteItem] = useState(false)
  const [decreaseItem, isDecreaseItem] = useState(false)
  const [increaseItem, isIncreaseItem] = useState(false)

  const cartCtx = useContext(CartContext);

  const qty = cartCtx.items.map((item) => {
    return item.amount
  })

  const totalQty = qty.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  useEffect(() => {
    let cartId;
    if (deleteItem === true || increaseItem === true || decreaseItem === true) {
      async function updateCart() {
        const q = query(collection(db, "carts"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          cartId = doc.id
        });
        const taskDocRef = doc(db, 'carts', cartId)
        try {
          await updateDoc(taskDocRef, {
            carts: [{
              items: cartCtx.items,
              totalAmount: cartCtx.totalAmount
            }]
          })
        } catch (err) {
          alert(err)
        }
        isDeleteItem(false)
        isIncreaseItem(false)
        isDecreaseItem(false)
      }

      updateCart()
    }
  }, [cartCtx.items, deleteItem, increaseItem, decreaseItem])

  function onDeleteItemCartHandler(id) {
    cartCtx.deleteItem(id)
    isDeleteItem(true)
  }

  function onIncreaseItemCartHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 })
    isIncreaseItem(true)
  }

  function onDecreaseItemCartHandler(id) {
    cartCtx.removeItem(id)
    isDecreaseItem(true)
  }

  return (
    <div>
      {user != null ? <NavigationUser /> : <Navigation />}
      <div className={`${styles.banner} text-white align-middle`}></div>
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
                {
                  cartCtx.items.map((item, i) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      index={i + 1}
                      title={item.title}
                      price={item.price}
                      amount={item.amount}
                      onDeleteHandler={onDeleteItemCartHandler.bind(null, item.id)}
                      onIncreamentHandler={onIncreaseItemCartHandler.bind(null, item)}
                      onDecreamentHandler={onDecreaseItemCartHandler.bind(null, item.id)}
                    />
                  ))
                }
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
                  <td>{totalQty}</td>
                  <td>{FormattedPrice(cartCtx.totalAmount)} </td>
                </tr>
              </tbody>
            </Table>
            <Button variant="warning" onClick={() => { navigate('/user/payment') }}>
              Checkout
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
};

export default Cart;
