// File: src/pages/Dashboard.js
import { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';
import '../styles/Dashboard.css';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    totalCustomers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardAPI.getDashboardData();
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
        toast(err?.message || "Server Error")
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{stats.totalTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p>{stats.completedTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p>{stats.totalCustomers}</p>
        </div>
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <p>Dashboard data will be displayed here...</p>
      </div>
    </div>
  );
};

export default Dashboard;