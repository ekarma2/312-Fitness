require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middleware 
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Health check
app.get('/api/health', async (req, res) => 
{
  try 
  {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
});

// Routes
app.use('/api/meal-logs', require('./routes/mealLogs'));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));