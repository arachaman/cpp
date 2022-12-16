import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table } from "react-bootstrap";
import AdmNav from './AdmNav';
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../../config/fb.js'
import OrderList from '../../components/Dashboard/OrderList';

const ManageOrder = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getCollection = async() => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      setOrders(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    }
    getCollection()
  },[])

  async function completeOrderHandler(id){
    const taskDocRef = doc(db, 'orders', id)
    try{
      await updateDoc(taskDocRef, {
        status:"completed"
      })
    } catch (err) {
      alert(err)
    }
    window.location.reload(false)
  }

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
        <AdmNav/>
        <Container>
        <div className="mt-5 ">
        <h1>Manage Order</h1>
          <Table className="table table-striped text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking id</th>
                <th>Customer Email</th>
                <th>Product Name</th>
                <th>Date Order</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order, i)=>(
                  <OrderList
                    key={order.id}
                    id={order.id}
                    index={i}
                    bookingId={order.data.bookingId}
                    user={order.data.user}
                    dateOrder={order.data.dateOrder}
                    title={order.data.title}
                    status={order.data.status}
                    amount={order.data.amount}
                    onCompleteHandler={completeOrderHandler}
                    onCancelHandler={cancelOrderHandler}
                  />
                ))
              }
            </tbody>
          </Table>
        </div>
        </Container>
    </div>
  )
}

export default ManageOrder