
// File: routes/customers.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Customer = require('../models/Customer');

// @route   GET api/customers
// @desc    Get all customers for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user.user.id }).sort({ date: -1 });
    res.json(customers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/customers
// @desc    Create a customer
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const newCustomer = new Customer({
      user: req.user.user.id,
      name,
      email,
      phone
    });

    const customer = await newCustomer.save();
    res.json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/customers/:id
// @desc    Update a customer
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);

    // Check if customer exists
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check user owns customer
    if (customer.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update customer
    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/customers/:id
// @desc    Delete a customer
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    // Check if customer exists
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check user owns customer
    if (customer.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Customer.deleteOne({ _id: req.params.id });
    res.json({ message: 'Customer removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
