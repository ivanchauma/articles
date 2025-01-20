import React, { useState, useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { RootState } from '../../store';
import { useNavigate } from 'react-router';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const Login: React.FC = () => {
  //const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Hook to navigate programmatically
 // const { error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { error, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  // Redirect to Home if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to the home page if authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4" style={{ maxWidth: '600px', width: '100%' }}>
        {isAuthenticated ? (
          <div className="text-center">
            <h2>Welcome back, {email}!</h2>
          </div>
        ) : (
          <Form onSubmit={handleLogin}>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mt-3">
              Login
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default Login;
