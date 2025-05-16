
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col md={6}>
          <h1 className="display-1">404</h1>
          <p className="lead mb-4">Oops! Page not found</p>
          <a href="/" className="btn btn-primary">
            Return to Home
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
