import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import AdmNav from './AdmNav';
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { db } from '../../config/fb.js'
import { useLocation } from 'react-router-dom';
import {doc, updateDoc} from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';

const EditCategory = () => {

    const {state} = useLocation();
    const { id, title, desc, link } = state;

    const [category, setCategory] = useState({
        title: title,
        description: desc,
        link: link
    });

    const [ loading, isLoading ] = useState()


    const submitHandler = async (e) => {
        e.preventDefault()
        isLoading(true)
        const taskDocRef = doc(db, 'categories', id)

        try{
          await updateDoc(taskDocRef, {
            title: category.title,
            description: category.description,
            link: category.link
          })
          isLoading(false)
        } catch (err) {
            isLoading(false)
          alert(err)
        } 

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
                                    defaultValue={title}
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
                                    defaultValue={link}
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
                                    defaultValue={desc}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {loading && (
                                    <Spinner animation="border" variant="light" size="sm" />
                                )}
                                {loading ? 'Loading' : 'Update'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EditCategory