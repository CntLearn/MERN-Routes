// File: server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./src/routes');
const morgan = require('morgan')

const { mongoDB } = require('./src/config')

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(morgan('tiny'))
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));
app.use(express.json());

// Connect to MongoDB
// console.log(process.env.MONGO_URI)
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-auth-app')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err?.message));


mongoose.connect(
  `mongodb://${mongoDB.hostname}:${mongoDB.port}/${mongoDB.database}`,{})
  .then(res => {
    console.log('Mongo DB is connected.')
  })
  .catch(error => {
    console.log('Cannot Connect To Mongo Database!', error);
  });


// Centralized route mounting
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
