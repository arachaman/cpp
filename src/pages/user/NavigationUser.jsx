import React, { useState, useContext, useEffect }  from 'react'
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import CartIcon from '../../assets/carticon.png'
import logo from '../../images/logo.png';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../context/cart/cart-context';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../config/fb.js'

const Navigation = () => {  

  const cartCtx = useContext(CartContext)

  const navigate = useNavigate();

  const { user, logout } = UserAuth();

  const [loading, isLoading] = useState()

  useEffect(()=>{
    let carts;
    if(user.email !== undefined){
      getCollection()
    }

    async function getCollection(){
      const q = query(collection(db, "carts"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          carts = doc.data().carts
      });

      cartCtx.getItem(carts)
    }

  },[user.email])

  const numItemsCart = cartCtx.items.reduce((curNumber, item)=>{
    return curNumber + item.amount;
  }, 0)

  const logoutHandler = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e)
    }
  };
  
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
            />
            C-Warehouse
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="fw-bold">
              <Nav.Link href="/#collection">COLLECTION </Nav.Link>
              <Nav.Link href="/#category">CATEGORY</Nav.Link>
              <Nav.Link href="/#about">ABOUT US</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={`Welcome, ${user.email}!`} id="nav-dropdown">
                <NavDropdown.Item>
                  <Button
                    disabled={loading}
                    variant="outline-danger"
                    type="button"
                    onClick={logoutHandler}
                  >
                  {loading && (
                    <Spinner animation="border" variant="light" size="sm" />
                  )}
                  {loading ? 'Loading' : 'Log Out'}
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={()=>navigate('/user/cart')}>
                <img src={CartIcon} alt={"cart"}/>
                <span class="badge bg-primary rounded-pill">{numItemsCart}</span>
              </Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation