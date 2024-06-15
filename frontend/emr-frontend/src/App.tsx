import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Alert, Button } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import InventoryList from './pages/InventoryList';
import api from './services/api';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [authToken, setAuthToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response.data.success) {
        setIsLoggedIn(true);
        setAuthToken(response.data.token);
        localStorage.setItem('authToken', response.data.token);
        setLoginError('');
        navigate('/inventory'); // Redirect to inventory page on success
      } else {
        setLoginError(response.data.message || 'Login failed.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid credentials.');
      } else {
        setLoginError(error.message || 'Login failed.');
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthToken(null); 
    localStorage.removeItem('authToken');
    navigate('emr-frontend/login'); // Redirect to login after logout
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsLoggedIn(true);
      setAuthToken(storedToken);
    }
  }, []); 

  useEffect(() => {
    if (authToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      localStorage.setItem('authToken', authToken);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
    }
  }, [authToken]);

  return (
    <div className="App">
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#">Ilara Health EMR System</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                {!isLoggedIn ? (
                  <LoginForm onLogin={handleLogin} />
                ) : (
                  <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      {loginError && <Alert variant="danger">{loginError}</Alert>}
      <Container className="mt-4 text-center">
        {isLoggedIn ? (
          <InventoryList /> 
        ) : (
          <h2>Please Log In to Manage Stocks</h2>
        )}
      </Container>
    </div>
  );
}

export default App;
