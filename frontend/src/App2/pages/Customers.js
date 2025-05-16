
import React from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';

const Customers = () => {
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Customers</h1>
        <Button variant="primary">Add Customer</Button>
      </div>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, name: 'Jane Cooper', email: 'jane@example.com', company: 'ABC Corp', status: 'Active' },
            { id: 2, name: 'John Doe', email: 'john@example.com', company: 'XYZ Inc', status: 'Active' },
            { id: 3, name: 'Robert Johnson', email: 'robert@example.com', company: '123 Ltd', status: 'Inactive' },
            { id: 4, name: 'Emily Davis', email: 'emily@example.com', company: 'Tech Solutions', status: 'Active' },
            { id: 5, name: 'Michael Smith', email: 'michael@example.com', company: 'Global Systems', status: 'Inactive' },
          ].map((customer) => (
            <tr key={customer.id}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                       style={{width: '30px', height: '30px'}}>
                    {customer.name.charAt(0)}
                  </div>
                  {customer.name}
                </div>
              </td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td>
                <Badge bg={customer.status === 'Active' ? 'success' : 'danger'}>
                  {customer.status}
                </Badge>
              </td>
              <td>
                <Button variant="outline-primary" size="sm">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Customers;
