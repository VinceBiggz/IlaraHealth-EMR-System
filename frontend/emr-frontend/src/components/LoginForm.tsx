// frontend/src/pages/LoginForm.tsx
import React, { useState } from 'react';
import { Button, Form, Nav } from 'react-bootstrap';
import api from '../services/api';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role); //Store user role
      onLogin(username, password); // Call the onLogin prop to update parent state
    } catch (error: any) {
      // Assuming the backend returns an error message in a specific format
      setError(error.response.data.errors[0].msg); 
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
        />
        <Form.Control
          type="password"
          placeholder="Password"
          className="me-2"
          aria-label="Password"
          value={password} // Bind input value to state
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outline-success" type="submit">Login</Button>
      </Form>
    </Nav>
  );
}

export default LoginForm;
