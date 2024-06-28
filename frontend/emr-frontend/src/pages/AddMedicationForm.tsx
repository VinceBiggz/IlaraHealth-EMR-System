// src/frontend/emr-frontend/src/pages/AddMedicationForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface MedicationData {
  name: string;
  quantity: number;
  low_stock_threshold: number;
}

interface AddMedicationFormProps {
  fetchInventoryData: () => Promise<void>;
}

const AddMedicationForm: React.FC<AddMedicationFormProps> = ({ fetchInventoryData }) => {
  const navigate = useNavigate();
  const [medicationData, setMedicationData] = useState<MedicationData>({
    name: '',
    quantity: 0,
    low_stock_threshold: 0
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMedicationData({
      ...medicationData,
      [name]: name === 'quantity' || name === 'low_stock_threshold' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/inventory', medicationData);
      setMedicationData({ name: '', quantity: 0, low_stock_threshold: 0 });
      setError(null);
      await fetchInventoryData(); // Fetch updated inventory data
      navigate('/inventory');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to add medication');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Medication</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Medication Name</label>
          <input type="text" className="form-control" id="name" name="name" value={medicationData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" className="form-control" id="quantity" name="quantity" value={medicationData.quantity} onChange={handleChange} required min="0" />
        </div>
        <div className="mb-3">
          <label htmlFor="low_stock_threshold" className="form-label">Low Stock Threshold</label>
          <input type="number" className="form-control" id="low_stock_threshold" name="low_stock_threshold" value={medicationData.low_stock_threshold} onChange={handleChange} required min="0" />
        </div>
        <button type="submit" className="btn btn-primary">Add Medication</button>
      </form>
    </div>
  );
};

export default AddMedicationForm;
