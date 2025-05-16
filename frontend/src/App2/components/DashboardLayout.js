
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/authSlice';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {  user: { user, token } } = useAppSelector(state => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Successfully logged out');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/dashboard">Intellicon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
              <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
              <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
              <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
              <Nav.Link as={Link} to="/zapier">Zapier</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                Signed in as: <span className="text-white">{user?.name || 'User'}</span>
              </Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="flex-grow-1 py-4">
        <Outlet />
      </Container>
    </div>
  );
};

export default DashboardLayout;
