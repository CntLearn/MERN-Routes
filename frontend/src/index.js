// File: src/index.js
import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import App2 from './App2'
// import ToastContainer from './components/Toast';
import { ToastContainer } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>

      <Container fluid>
        <Row>
          <Col md={6} sm 
          className="border-right"
          >
            <App />
          </Col>
          <Col md={6} sm>
            <App2 />
          </Col>
        </Row>
      </Container>

      <ToastContainer />
    </Provider>

  </React.StrictMode>

);


reportWebVitals();
