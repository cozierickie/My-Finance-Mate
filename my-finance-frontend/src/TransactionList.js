import React, { useState, useEffect } from 'react';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transactions from backend API
    fetch('/transactions')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch transactions');
        }
        return res.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) => {
        console.error('Error fetching transactions:', error);
        setError('Failed to fetch transactions. Please try again later.');
      });
  }, []);

  const handleDelete = (id) => {
    // Delete transaction from backend API
    fetch(`/transactions/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete transaction');
        }
        console.log('Transaction deleted');
        // Refresh transaction list after deletion
        window.location.reload();
      })
      .catch((error) => console.error('Error deleting transaction:', error));
  };

  return (
    <div>
      <h2>Transactions</h2>
      {error && <p>{error}</p>}
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.type}: {transaction.description} - ${transaction.amount}
            <button onClick={() => handleDelete(transaction._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;