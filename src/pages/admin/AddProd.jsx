import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import AdmNav from './AdmNav';
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import {db} from '../../config/fb.js'
import {collection, addDoc, Timestamp, query, where, getDocs} from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';

const AddProd = () => {

    const [products, setProducts] = useState(
        {
            title: '',
            category: '',
            price: '',
            stock: '',
            link: '',
            description: ''
        }
    )
    const [categories, setCategories] = useState([])
    
    const [loading, isLoading] = useState()

    useEffect(() => {
      const getCollection = async() => {
        const querySnapshot = await getDocs(collection(db, "categories"));
        setCategories(querySnapshot.docs.map(doc => (doc.data().title)))
      }
      getCollection()
    },[])

    const submitHandler = async (e) => {
        e.preventDefault()
        isLoading(true)
        const q = query(collection(db, "products"), where("title", "==",products.title.toLowerCase()));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length === 0){
            try {
                await addDoc(collection(db, 'products'), {
                    title: products.title.toLowerCase(),
                    category: products.category,
                    price: products.price,
                    stock: products.stock,
                    link: products.link,
                    description: products.description,
                    created: Timestamp.now()
                })
            } catch (err) {
                isLoading(false)
                alert(err)
            }
        }else{
            isLoading(false)
            alert("The book has been added")
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
                        <h2 className='text-center'>Add Product</h2>
                        <Form onSubmit={submitHandler}>
                            <Form.Group hasvalidation="true" className="mb-3" controlId="productName">
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
                                    
                                >
                                    <option></option>
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
                                        />
                                    </Form.Group> 
                                    </Col>
                                
                                    <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Stock</Form.Label>
                                        <Form.Select
                                            disabled={loading}
                                            required
                                            onChange={(e)=>
                                                setProducts({
                                                    ...products,
                                                    stock: e.target.value.toLowerCase()
                                                })
                                            }
                                        >
                                            <option></option>
                                            <option>Available</option>
                                            <option>Not Available</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="productImage">
                                <Form.Label>Product image link </Form.Label>
                                <Form.Control
                                    disabled={loading}
                                    required
                                    type="text" 
                                    placeholder="Enter Product Thumbnail Link"
                                    onChange={(e)=>
                                        setProducts({
                                            ...products,
                                            link: e.target.value
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="categoryDesc">
                                <Form.Label>Products Description </Form.Label>
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
                                    rows={2} 
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                            {loading && (
                                <Spinner animation="border" variant="light" size="sm" />
                            )}
                            {loading ? 'Loading' : 'Add Product'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddProd