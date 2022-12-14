import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '../../config/fb.js'
import AdmNav from "./AdmNav";
import ListProductDashboard from "../../components/Dashboard/ListProductDashboard";

const Dashboard = () => {

  const [products, setProducts] = useState([])

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCollection = async() => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      setCategories(querySnapshot.docs.map(doc => (doc.data().title)))
    }
    getCollection()
  },[])

  useEffect(() => {
    const getCollection = async() => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    }
    getCollection()
  },[])
  
  async function onDeleteProductHandler(id){
    const taskDocRef = doc(db, 'products', id)

    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }

    window.location.reload()
  }

  return (
    <div>
      <AdmNav/>
      <Container>
        <Row>
          <Col>
          <div className="mt-5 ">
        <h1>Dashboard</h1>
        <Button variant="primary" href="/dashboard/addproduct">Add Product</Button>
          <Table className="table table-striped text-center">
            <thead className="align-middle">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Product Price</th>
                <th>Stock</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product,i)=>(
                <ListProductDashboard
                  index={i}
                  key={product.id}
                  id={product.id}
                  title={product.data.title}
                  category={product.data.category}
                  price={product.data.price}
                  stock={product.data.stock}
                  link={product.data.link}
                  categories={categories}
                  onDeleteHandler={onDeleteProductHandler}
                  
                />
              ))}
            </tbody>
          </Table>
        </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard