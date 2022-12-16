import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import AdmNav from './AdmNav';
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import {doc, updateDoc} from 'firebase/firestore';
import { db } from '../../config/fb.js'
import Spinner from 'react-bootstrap/Spinner';


const AddProd = () => {

    const {state} = useLocation();
    const 
        {   id,
            title,
            category,
            stock,
            price,
            link,
            description,
            categories
        } = state;

    const [products, setProducts] = useState({
        title,
        category,
        stock,
        price,
        description,
        link
    });

    const [ loading, isLoading ] = useState()

    const submitHandler = async (e) => {
        e.preventDefault()
        isLoading(true)
        const taskDocRef = doc(db, 'products', id)
        try{
          await updateDoc(taskDocRef, {
            title: products.title,
            category: products.category,
            stock: products.stock,
            price: products.price,
            description: products.description,
            link: products.link
          })
          isLoading(false)
        } catch (err) {
          alert(err)
          isLoading(false)
        }  
        // console.log(products)

    } 

    return (
        <div>
            <AdmNav/>
            <Container>
                <Row className='mt-5'>
                    <Col md={{span: 6, offset: 3}}>
                        <h2 className='text-center'>Edit Product</h2>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="productName">
                                <Form.Label>Product Name </Form.Label>
                                <Form.Control
                                    disabled={loading}
                                    required
                                    type="text" 
                                    placeholder="Enter Product Name"
                                    onChange={(e)=>
                                        setProducts({
                                            ...products,
                                            title: e.target.value
                                        })
                                    }
                                    defaultValue={products.title}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    disabled={loading}
                                    required
                                    onChange={(e)=>
                                        setProducts({
                                            ...products,
                                            category: e.target.value
                                        })
                                    }
                                    defaultValue={products.category}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="productPrice">
                                        <Form.Label>Price</Form.Label>          
                                        <Form.Control
                                            disabled={loading}
                                            required
                                            type="number" 
                                            placeholder="Enter Price"
                                            onChange={(e)=>
                                                setProducts({
                                                    ...products,
                                                    price: e.target.value
                                                })
                                            }
                                            defaultValue={products.price}
                                        />
                                    </Form.Group> 
                                    </Col>
                                
                                    <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Stock</Form.Label>
                                        <Form.Select
                                            disabled={loading}
                                            required
                                            defaultValue={products.stock}
                                            onChange={(e)=>
                                                setProducts({
                                                    ...products,
                                                    stock: e.target.value.toLowerCase()
                                                })
                                            }
                                        >
                                            <option>Available</option>
                                            <option>Not Available</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="categoryDesc">
                                <Form.Label>Product Description </Form.Label>
                                <Form.Control
                                    disabled={loading}
                                    required
                                    onChange={(e)=>
                                        setProducts({
                                            ...products,
                                            description: e.target.value
                                        })
                                    } 
                                    as="textarea" 
                                    rows={3}
                                    defaultValue={products.description}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productImage">
                                <Form.Label>Product image link </Form.Label>
                                <Form.Control
                                    disabled={loading}
                                    required
                                    type="text" 
                                    placeholder="Enter Thumbnail Link"
                                    onChange={(e)=>
                                        setProducts({
                                            ...products,
                                            link: e.target.value
                                        })
                                    }
                                    defaultValue={products.link}
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

export default AddProd