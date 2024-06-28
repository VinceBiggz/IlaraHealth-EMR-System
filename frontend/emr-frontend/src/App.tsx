import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import InventoryList from './pages/InventoryList';
import AddMedicationForm from './pages/AddMedicationForm';
import { Button, Container, Nav, Navbar, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from './services/api';
import { InventoryItem } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setIsLoggedIn(true);
      setAuthToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      localStorage.setItem("authToken", authToken);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      if (response.data.success) {
        setIsLoggedIn(true);
        setAuthToken(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        setLoginError("");
        navigate("/inventory/");
      } else {
        setLoginError(response.data.message || "Login failed.");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          setLoginError("Invalid credentials.");
        } else {
          setLoginError("Server error. Please try again later.");
        }
      } else {
        setLoginError("Network error. Please check your connection.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    localStorage.removeItem("authToken");
    navigate("emr-frontend/login"); 
  };

  const fetchInventoryData = async () => {
    try {
      const response = await api.get('/inventory/'); 
      setInventoryData(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchInventoryData();
    }
  }, [isLoggedIn]);

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <Container className="mt-4">
          <h1 className="text-center mb-4">Welcome to the EMR System</h1>
          <p className="lead text-center">Please log in to manage your inventory.</p>
        </Container>
      );
    } else {
      return (
        <Container className="mt-4">
          <h2 className="mb-3">Inventory</h2>
          <InventoryList inventoryData={inventoryData} />
          <h2 className="mt-4 mb-3">Add Medication</h2>
          <AddMedicationForm fetchInventoryData={fetchInventoryData} />
        </Container>
      );
    }
  };

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
                  <Button variant="outline-primary" onClick={handleLogout}>
                    Logout
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      {loginError && <Alert variant="danger">{loginError}</Alert>}
      {renderContent()}
    </div>
  );
}

export default App;
