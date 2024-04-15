// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS module

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/MY-FINANCE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Add CORS middleware to allow requests from all origins
app.use(cors());

// Define transaction schema
const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Define routes
// Get all transactions
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new transaction
app.post('/transactions', async (req, res) => {
  const transaction = new Transaction({
    type: req.body.type,
    description: req.body.description,
    amount: req.body.amount,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing transaction
app.patch('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    if (req.body.type) {
      transaction.type = req.body.type;
    }
    if (req.body.description) {
      transaction.description = req.body.description;
    }
    if (req.body.amount) {
      transaction.amount = req.body.amount;
    }
    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a transaction
app.delete('/transactions/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndRemove(req.params.id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to MY-FINANCE API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});