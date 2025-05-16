// File: src/components/Layout.js
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };
  
  return (
    <div className="layout">

      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>{user && user.name}</p>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={location.pathname === '/dashboard' ? 'active' : ''}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className={location.pathname === '/tasks' ? 'active' : ''}>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li className={location.pathname === '/customers' ? 'active' : ''}>
              <Link to="/customers">Customers</Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </aside>
      
      <main className="content">
        <header className="content-header">
          <h1>{location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2)}</h1>
        </header>
        <div className="content-body">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;