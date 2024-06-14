// frontend/src/components/LowStockAlert.tsx
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap
import api from '../services/api';

const LowStockAlert: React.FC = () => {
  const [lowStockItems, setLowStockItems] = useState<
    { item_id: number; name: string; quantity: number }[]
  >([]);

  useEffect(() => {
    const fetchLowStockItems = async () => {
      try {
        const response = await api.get('/inventory');
        const filteredItems = response.data.filter(
          (item: any) => item.quantity <= item.low_stock_threshold
        );
        setLowStockItems(filteredItems);
      } catch (error) {
        console.error('Error fetching low stock items:', error);
        // Handle the error appropriately
      }
    };

    fetchLowStockItems(); // Initial fetch
    const interval = setInterval(fetchLowStockItems, 30000); // Fetch every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="mt-3"> 
      {lowStockItems.length > 0 ? (
        <Alert variant="warning">
          Low stock alert! The following medications are running low:
          <ul>
            {lowStockItems.map((item) => (
              <li key={item.item_id}>
                {item.name}: {item.quantity} remaining
              </li>
            ))}
          </ul>
        </Alert>
      ) : (
        <p>No items are currently low on stock.</p>
      )}
    </div>
  );
};

export default LowStockAlert;
