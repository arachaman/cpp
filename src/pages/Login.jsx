import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../config/fb';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const auth = getAuth(firebaseApp);
// const errorDict = {
//   'auth/wrong-password': ; 'wrong password',
//   etc
// }

const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (user !== undefined) navigate('/dashboard', { replace: true });
  }, [user]);

  return (
    <div>
      <Row>
        <Col
          xs={12}
          md={{ span: 4, offset: 4 }}
          className="border p-4 mt-5 rounded shadow"
        >
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              disabled={loading}
              variant="primary"
              type="button"
              onClick={() =>
                signInWithEmailAndPassword(
                  credentials.email,
                  credentials.password
                )
              }
            >
              {loading && (
                <Spinner animation="border" variant="light" size="sm" />
              )}
              {loading ? 'Loading' : 'login'}
            </Button>
          </Form>
        </Col>
        <Row>
          <Col md={{ span: 8, offset: 2 }}  className='mt-3' >
            {error && <Alert variant="danger">{error.code}</Alert>}
            {/* {error && errorDict[error.code]} */}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Register;
