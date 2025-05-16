// File: src/components/Toast.js
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Toast.css';

// Create a toast container
const createToastContainer = () => {
  const container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
};

// Toast component
const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

// Toast service
const toastContainer = createToastContainer();

let toasts = [];
let toastId = 0;
let subscribers = [];

const subscribe = (callback) => {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter(s => s !== callback);
  };
};

const notifySubscribers = () => {
  subscribers.forEach(callback => callback(toasts));
};

const addToast = (type, message) => {
  const id = toastId++;
  toasts = [...toasts, { id, type, message }];
  notifySubscribers();
  return id;
};

const removeToast = (id) => {
  toasts = toasts.filter(toast => toast.id !== id);
  notifySubscribers();
};

export const toast = {
  success: (message) => addToast('success', message),
  error: (message) => addToast('error', message),
  info: (message) => addToast('info', message),
  warning: (message) => addToast('warning', message),
};

// Toast container component
const ToastContainer = () => {
  const [currentToasts, setCurrentToasts] = useState(toasts);

  useEffect(() => {
    const unsubscribe = subscribe(setCurrentToasts);
    return unsubscribe;
  }, []);

  return ReactDOM.createPortal(
    <>
      {currentToasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>,
    toastContainer
  );
};

export default ToastContainer;