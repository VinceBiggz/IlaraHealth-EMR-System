import React, { useState } from 'react';
import { Button, Form, Nav } from 'react-bootstrap';
import api from '../services/api';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role); // Store user role
      onLogin(username, password); // Call the onLogin prop to update parent state
    } catch (error: any) {
      // Log the error for debugging
      console.error('Login error:', error);

      // Check for expected error response format
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors[0].msg);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Nav>
      <Form className="d-flex" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
        <Form.Control
          type="text"
          placeholder="Username"
          className="me-2"
          aria-label="Username"
          value={username} // Bind input value to state
          onChange={(e) => setUsername(e.target.value)}
          required // Make the field required
        />
        <Form.Control
          type="password"
          placeholder="Password"
          className="me-2"
          aria-label="Password"
          value={password} // Bind input value to state
          onChange={(e) => setPassword(e.target.value)}
          required // Make the field required
        />
        <Button variant="outline-success" type="submit">Login</Button>
      </Form>
    </Nav>
  );
}

export default LoginForm;
