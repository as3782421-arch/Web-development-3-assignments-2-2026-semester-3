const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse incoming JSON requests
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Modular routes for students
app.use('/students', studentRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('Student Management REST API is running');
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
