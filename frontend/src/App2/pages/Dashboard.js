
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container>
      <h1 className="mb-4">Dashboard</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Active Tasks</Card.Title>
              <h2 className="text-primary">24</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Customers</Card.Title>
              <h2 className="text-success">85</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Completed Tasks</Card.Title>
              <h2 className="text-info">156</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card>
        <Card.Header>
          <h5 className="mb-0">Recent Activity</h5>
        </Card.Header>
        <Card.Body>
          <div className="list-group">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-1">Task #{item} Updated</h6>
                  <small className="text-muted">3 hours ago</small>
                </div>
                <p className="mb-1">Status changed to "In Progress"</p>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
