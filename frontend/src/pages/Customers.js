
// File: src/pages/Customers.js
import { useState, useEffect } from 'react';
import { customersAPI } from '../services/api'
import { toast } from 'react-toastify';
import '../styles/Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await customersAPI.getAllCustomers();
      setCustomers(response.data);
      setLoading(false);
    } catch (err) {
      
      setError('Failed to load customers');
      setLoading(false);
      toast(err?.message || 'Server Error')
    }
  };

  const handleInputChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customersAPI.createCustomer(newCustomer)
      setNewCustomer({ name: '', email: '', phone: '' });
      toast('Customer Created Successfully.')
      fetchCustomers();
    } catch (err) {
      setError('Failed to add customer');
      toast(err?.message || 'Server Error')

    }
  };

  const deleteCustomer = async (id) => {
    try {
      await customersAPI.deleteCustomer(id)
      fetchCustomers();
      toast('Customer Deleted Successfully.')

    } catch (err) {
      setError('Failed to delete customer');
      toast(err?.message || 'Server Error')

    }
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="customers-container">
      <div className="add-customer-form">
        <h2>Add New Customer</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCustomer.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newCustomer.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={newCustomer.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Add Customer</button>
        </form>
      </div>

      <div className="customers-list">
        <h2>Customers List</h2>
        {customers.length === 0 ? (
          <p>No customers found. Add a new customer to get started!</p>
        ) : (
          <table className="customers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <button
                      onClick={() => deleteCustomer(customer._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Customers;