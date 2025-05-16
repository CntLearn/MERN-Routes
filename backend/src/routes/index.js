// src/routes/index.js

const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const taskRoutes = require('./tasks');
const customerRoutes = require('./customers');
const dashboardRoutes = require('./dashboard');
const user2Routes = require('./user2');

// Mount each route
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/customers', customerRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', user2Routes);

module.exports = router;
