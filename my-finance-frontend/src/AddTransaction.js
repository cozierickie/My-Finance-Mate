// AddTransaction.js

import React, { useState } from 'react';

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    amount: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add transaction to backend API
    fetch('http://localhost:3000/transactions', {  // Update the URL to match the backend server address
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to add transaction');
      }
      return res.json();
    })
    .then((data) => {
      console.log('Transaction added:', data);
      // Clear form fields after successful submission
      setFormData({ type: '', description: '', amount: 0 });
    })
    .catch((error) => console.error('Error adding transaction:', error));
  };  

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>Type:</label>
        <input type="text" name="type" value={formData.type} onChange={handleChange} required />
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        <label>Amount:</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;