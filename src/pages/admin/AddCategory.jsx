import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import AdmNav from './AdmNav';
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { db } from '../../config/fb.js'
import {collection, addDoc, Timestamp, query, where, getDocs} from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';

const AddCategory = () => {

    const [category, setCategory] = useState({
        title: '',
        description:'',
        link:''
    });
    
    const [ loading, isLoading ] = useState()

    const submitHandler = async (e) => {
        e.preventDefault()
        isLoading(true)
        const q = query(collection(db, "categories"), where("title", "==",category.title.toLowerCase()));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length == 0){
            try {
                await addDoc(collection(db, 'categories'), {
                    title: category.title.toLowerCase(),
                    description: category.description,
                    link: category.link,
                    created: Timestamp.now()
                })
            } catch (err) {
                isLoading(false)
                alert(err)
            }
        }else{
            alert("category nya udah ada")
            isLoading(false)
        }
        isLoading(false)
        e.target.reset();
    }

    return (
        <div>
            <AdmNav/>
            <Container>
                <Row className='mt-5'>
                    <Col md={{span: 6, offset: 3}}>
                        <h2 className='text-center'>Add Category</h2>
                        <Form onSubmit={submitHandler} >
                            <Form.Group className="mb-3" controlId="categoryName">
                                <Form.Label>Category Name </Form.Label>
                                <Form.Control 
                                    disabled={loading}
                                    required
                                    onChange={(e)=>
                                        setCategory({
                                            ...category,
                                            title: e.target.value
                                        })
                                    } 
                                    type="text" 
                                    placeholder="Enter Category Name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="categoryLink">
                                <Form.Label>thumbnail link</Form.Label>
                                <Form.Control
                                    disabled={loading}
                                    required
                                    onChange={(e)=>
                                        setCategory({
                                            ...category,
                                            link: e.target.value
                                        })
                                    } 
                                    type="text" 
                                    placeholder="Enter Category Thumbnail"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="categoryDesc">
                                <Form.Label>Category Description </Form.Label>
                                <Form.Control
                                    disabled={loading}
                                    required
                                    onChange={(e)=>
                                        setCategory({
                                            ...category,
                                            description: e.target.value
                                        })
                                    } 
                                    as="textarea" 
                                    rows={2} 
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {loading && (
                                    <Spinner animation="border" variant="light" size="sm" />
                                )}
                                {loading ? 'Loading' : 'Add Category'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddCategory