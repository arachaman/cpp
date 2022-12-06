import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { UserAuth } from '../context/AuthContext';

const Login = () => {

  const navigate = useNavigate();

  const [error, setError] = useState();

  const [loading, isLoading] = useState()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });


  const { signIn } = UserAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    isLoading(true)
    setError('')
    try {
      await signIn(credentials.email, credentials.password)
      navigate('/')
    } catch (e) {
      setError(e.message)
    }
    isLoading(false)
  };

  return (
    <div>
      <Row>
        <Col
          xs={12}
          md={{ span: 4, offset: 4 }}
          className="border p-4 mt-5 rounded shadow"
        >
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
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
              type="submit"
              
            >
              {loading && (
                <Spinner animation="border" variant="light" size="sm" />
              )}
              {loading ? 'Loading' : 'Login'}
            </Button>
          </Form>
        </Col>
        <Row>
          <Col md={{ span: 8, offset: 2 }}  className='mt-3' >
            {error && <Alert variant="danger">{error}</Alert>}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Login;
