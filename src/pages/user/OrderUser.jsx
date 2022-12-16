import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Navigation";
import NavigationUser from "./NavigationUser";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from '../../config/fb'
import { Row, Col, Container, Table, Spinner } from "react-bootstrap";
import { UserAuth } from '../../context/AuthContext';
import Footer from "../Footer";
import UserOrderList from "../../components/User/UserOrderList";

const OrderUser = () => {

    const { user } = UserAuth();

    const [ orders, setOrders ] = useState([])

    const [ loading, isLoading ] = useState(false)

    useEffect(()=>{
        if(user !== null){
            const getCollection = async () => {
                const q = query(collection(db, "orders"), where("user", "==", user.email));
                isLoading(true)
                const querySnapshot = await getDocs(q);
                setOrders(querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  data: doc.data()
                })))
                isLoading(false)
              }
            getCollection()
        }
    },[user])

    async function cancelOrderHandler(id){
        const taskDocRef = doc(db, 'orders', id)
        try{
          await updateDoc(taskDocRef, {
            status:"canceled"
          })
        } catch (err) {
          alert(err)
        } 
        window.location.reload(false)
    }

    return (
        <div>
            {user != null ? <NavigationUser /> : <Navigation />}
            <h1 className="display-4 fw-bold text-center mt-1">Your Order</h1>
            <Container>
                <Row>
                    <Col className="mx-5">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th style={{width:"5%"}}>#</th>
                                    <th className="w-25">Booking Id</th>
                                    <th className="w-25">Product Name</th>
                                    <th className="w-25">date</th>
                                    <th style={{width:"10%"}}>Qty</th>
                                    <th className="w-25">Status</th>
                                    <th className="w-25">Action</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                            {
                                loading 
                                ? <Spinner/>
                                :
                                orders.map((order, i)=>(
                                    <UserOrderList
                                        key={order.id}
                                        id={order.id}
                                        index={i}
                                        bookingId={order.data.bookingId}
                                        dateOrder={order.data.dateOrder}
                                        title={order.data.title}
                                        status={order.data.status}
                                        amount={order.data.amount}
                                        onCancelHandler={cancelOrderHandler}
                                    />
                                ))
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
};

export default OrderUser;
