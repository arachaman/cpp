import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../config/fb';
import { db } from '../config/fb.js'
import { useNavigate } from 'react-router-dom';
import {collection, addDoc } from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';

const auth = getAuth(firebaseApp);

const Register = () => {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [createUserWithEmailAndPassword, user, loading, error
  ] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    async function registerHandler (){
      if(user !== undefined){
        try {
            await addDoc(collection(db, 'carts'), {
                email: credentials.email,
                carts: [{
                  items: [],
                  totalAmount: 0
                }]
            })
        } catch (err) {
            alert(err)
        }
        navigate('/login', {replace: true})
      }
    }

    registerHandler()

  }, [user])
  
  return (
    <div>
      <Row>
        <Col
          xs={12}
          md={{ span: 6, offset: 3 }}
          className="border p-4 mt-5 rounded shadow"
        >
          <h2>Register</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                value={credentials.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                value={credentials.password}
              />
            </Form.Group>
            <Button
              disabled={loading}
              variant="primary" 
              type="button" 
              onClick={() => createUserWithEmailAndPassword(credentials.email, credentials.password)}>

              {loading && (
                <Spinner animation="border" variant="light" size="sm" />
              )}
              {loading ? 'Loading' : 'Register'}
            </Button>
          </Form>
        </Col>
        <Row>
          <Col md={{ span: 8, offset: 2 }}  className='mt-3' >
            {error && <Alert variant="danger">{error.message}</Alert>}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Register;
