import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import UpdateTransaction from './UpdateTransaction';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/update/:id" element={<UpdateTransaction />} />
          <Route path="/" element={<TransactionList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
