// src/frontend/emr-frontend/src/pages/InventoryList.tsx
import React, { useEffect, useState } from 'react';
import { Table, Alert, Spinner, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface InventoryListProps {
  inventoryData: InventoryItem[];
}

interface InventoryItem {
  item_id: number;
  name: string;
  quantity: number;
  low_stock_threshold: number;
}

const InventoryList: React.FC<InventoryListProps> = ({ inventoryData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inventoryData.length > 0) {
      setLoading(false);
    } else {
      const fetchInventoryData = async () => {
        try {
          const response = await api.get('/inventory/items/');
          setError(null);
        } catch (err: any) {
          if (err.response && err.response.status === 401) {
            setError('Unauthorized. Please log in again.');
            navigate('/login');
          } else if (err.response && err.response.status === 404) {
            setError('Inventory data not found.');
          } else {
            setError('An unexpected error occurred while fetching inventory data.');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchInventoryData();
    }
  }, [inventoryData, navigate]);

  return (
    <Container>
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <h2 className="mb-3">Inventory</h2>
          {inventoryData.length === 0 ? (
            <p>No inventory items found.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Low Stock Threshold</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item.item_id}>
                    <td>{item.item_id}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.low_stock_threshold}</td>
                    <td>
                      <Button variant="info" size="sm" onClick={() => console.log(`Edit item ${item.item_id}`)}>
                        Edit
                      </Button>
                    </td> 
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  );
};

export default InventoryList;
