import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button,} from "react-bootstrap";
import AdmNav from './AdmNav';
import { useNavigate } from 'react-router-dom';
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '../../config/fb.js'
import CardCategoryDashboard from '../../components/Dashboard/CardCategoryDashboard'

const Category = () => {

  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCollection = async() => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      setCategories(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    }
    getCollection()
  },[])

  async function onDeleteCatHandler (id) {
    const taskDocRef = doc(db, 'categories', id)

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
        <Container className='mt-5'>
          <h1>Manage Category</h1>
          <Button 
            variant="primary"
            onClick={()=>navigate('/dashboard/addcategory')}
          >
            Add Category
          </Button>{' '}
          <Row className='justify-content-start'>
            {
              categories.map((cat)=>(
                <CardCategoryDashboard
                  key={cat.id}
                  id={cat.id}
                  title={cat.data.title}
                  desc={cat.data.description}
                  link={cat.data.link}
                  onDeleteHandler = {onDeleteCatHandler}
                />
              ))
            }
          </Row>
        </Container>
    </div>
  )
}

export default Category