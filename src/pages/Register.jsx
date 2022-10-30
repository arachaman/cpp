import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../config/fb';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(firebaseApp);

const Register = () => {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [createUserWithEmailAndPassword,
         user
  ] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if(user !== undefined)
      navigate('/dashboard', {replace: true})
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
            <Button variant="primary" type="button" onClick={() => createUserWithEmailAndPassword(credentials.email, credentials.password)}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
