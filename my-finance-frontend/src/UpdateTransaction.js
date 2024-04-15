import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateTransaction = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    amount: 0,
  });

  useEffect(() => {
    fetch(`/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error fetching transaction:', error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Transaction updated:', data);
        window.location.href = '/';
      })
      .catch((error) => console.error('Error updating transaction:', error));
  };

  return (
    <div>
      <h2>Update Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>Type:</label>
        <input type="text" name="type" value={formData.type} onChange={handleChange} />
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
        <label>Amount:</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
        <button type="submit">Update Transaction</button>
      </form>
    </div>
  );
};

export default UpdateTransaction;