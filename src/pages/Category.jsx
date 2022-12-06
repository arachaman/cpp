import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import NavigationUser from './user/NavigationUser';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { UserAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import CapitalizeLetter from '../helper/CapitalizeLetter';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../config/fb'
import ListProductLanding from "../components/LandingPage/ListProductLanding";

const Category = () => {

  const { user } = UserAuth();

  const {state} = useLocation();

  const [ products, setProducts ] = useState([])

  const {
    id,
    title,
    description,
    link
  } = state

  useEffect(() => {
    const getCollection = async() => {
      const q = query(collection(db, "products"), where("category", "==", title));

      const querySnapshot = await getDocs(q);
      setProducts(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))

    }
    getCollection()
  },[])

  return (
    <div>
      { user != null ? <NavigationUser/> : <Navigation/> }
      
      <div className="px-4 pt-5 my-5 text-center">
        <h1 className="display-4 fw-bold">{CapitalizeLetter(title)}</h1>
        <div className="col-lg-6 mx-auto">
          <p className='lead mb-4'>{description}</p>
        </div>
        <div>
          <div className="container px-5" style={{height: "420px"}}>
            <img 
              src={link}
              style={{
                width: "80%",
                objectFit: "cover",
                height: "100%",
              }}
              className="img-fluid border rounded-3 shadow-lg mb-4" 
              alt="Example image" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <Container className= "mb-2">
        <Row id="collection" className="justify-content-md-center">
          {
            products.map((prod,i)=>(
              <ListProductLanding
                key={prod.id}
                id={prod.id}
                title={prod.data.title}
                price={prod.data.price}
                link={prod.data.link}
                stock={prod.data.stock}
                description={prod.data.description}
                category={prod.data.category}
              />
            ))
          }
        </Row>
      </Container>
    </div>
  )
}

export default Category