const express = require('express');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');
const { requestLogger, uuidTraceMiddleware } = require('./middleware/logger'); // Combined logger
const authMiddleware = require('./middleware/auth'); // Auth middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Body parser for JSON
app.use(uuidTraceMiddleware); // Add UUID trace header 
app.use(requestLogger); // Log request latency 

// Routes
app.use('/api', reportRoutes); // Prefix all report routes with /api

// Simple root route for testing
app.get('/', (req, res) => {
  res.send('Perceive Now Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});