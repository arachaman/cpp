import React, { useContext, useEffect } from 'react'
import Navigation from './Navigation'
import NavigationUser from './user/NavigationUser'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { UserAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import CartContext from '../context/cart/cart-context';
import { doc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import { db } from '../config/fb.js'
import CapitalizeLetter from '../helper/CapitalizeLetter';
import FormattedPrice from '../helper/FormattedPrice';
import Footer from "./Footer";


const Product = () => {

    const { user } = UserAuth();

    const navigate = useNavigate();

    const cartCtx = useContext(CartContext)

    useEffect(() => {
        let cartId;
        if (cartCtx.items.length > 0) {
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
            }

            updateCart()
        }

    }, [cartCtx.items])



    const { state } = useLocation();
    const {
        id,
        title,
        price,
        link,
        stock,
        category,
        description
    } = state

    const addToCartHandler = async () => {
        cartCtx.addItem({
            id: id,
            title: title,
            amount: 1,
            price: parseInt(price)
        })

    };

    const buyNowHandler = () => {
        navigate(
            `/user/paymentnow/${id}`,
            {
                state:
                {
                    id,
                    title,
                    amount: 1,
                    price
                }
            }
        )
    }


    return (
        <div>
            {user != null ? <NavigationUser /> : <Navigation />}
            <Container className='mt-5' md={{ span: 6, offset: 2 }}>
                <Row>
                    <Col md={{ span: 2, offset: 2 }} className="me-4">
                        <img src={link} className="img-fluid" alt="product" />
                    </Col>
                    <Col md={{ span: 5 }} >
                        <h2>{CapitalizeLetter(title)}</h2>
                        <h3>{CapitalizeLetter(category)}</h3>
                        <h5>Stock: {stock} </h5>
                        <h3>{FormattedPrice(price)}</h3>
                        <h5>Description:</h5>
                        <p>{description}</p>
                        <br />
                        <Button
                            disabled={stock === 'available'? false: true}
                            variant="warning"
                            className='me-2'
                            onClick={
                                user != null
                                    ? addToCartHandler
                                    : () => { navigate('/login') }
                            }
                        >
                            Add to Cart
                        </Button>
                        <Button
                            disabled={stock === 'available'? false: true}
                            variant="danger"
                            onClick={buyNowHandler}
                        >
                            Buy Now
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Product