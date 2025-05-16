
// File: routes/dashboard.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const Customer = require('../models/Customer');

// @route   GET api/dashboard
// @desc    Get dashboard stats
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Get tasks statistics
    const totalTasks = await Task.countDocuments({ user: req.user.user.id });
    const completedTasks = await Task.countDocuments({ 
      user: req.user.user.id,
      status: 'completed'
    });
    
    // Get customers count
    const totalCustomers = await Customer.countDocuments({ user: req.user.user.id });
    
    res.json({
      totalTasks,
      completedTasks,
      totalCustomers
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
