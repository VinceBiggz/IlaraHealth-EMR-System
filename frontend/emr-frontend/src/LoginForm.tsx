// src/frontend/emr-frontend/src/components/LoginForm.tsx
import React, { useState, FormEvent } from "react";
import { Button, Form, Nav } from "react-bootstrap";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <Nav>
      <Form className="d-flex" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Username"
          className="me-2"
          aria-label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Control
          type="password"
          placeholder="Password"
          className="me-2"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outline-success" type="submit">Login</Button>
      </Form>
    </Nav>
  );
}

export default LoginForm;
