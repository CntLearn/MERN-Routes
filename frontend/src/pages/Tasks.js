// File: src/pages/Tasks.js
import { useState, useEffect } from 'react';
import { tasksAPI } from '../services/api'
// import { toast } from '../components/Toast';
import { toast } from 'react-toastify';
import '../styles/Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getAllTasks();
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load tasks');
      toast.error(err?.message || "Server Error")
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await tasksAPI.createTask(newTask);
      toast('Task Created Successfully');
      setNewTask({ title: '', description: '', status: 'pending' });
      fetchTasks();
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    try {

      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';

      toast('Task Status Updated.')
      await tasksAPI.updateTask(id, { status: newStatus })
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
      toast.error(err?.message || "Server Error")
    }
  };

  const deleteTask = async (id) => {
    try {
      await tasksAPI.deleteTask(id);
      toast('Task Deleted Successfully.')
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
      toast.error(err?.message || "Server Error")

    }
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="tasks-container">
      <div className="add-task-form">
        <h2>Add New Task</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Add Task</button>
        </form>
      </div>

      <div className="tasks-list">
        <h2>Tasks List</h2>
        {tasks.length === 0 ? (
          <p>No tasks found. Add a new task to get started!</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task._id} className={`task-item ${task.status}`}>
                <div className="task-details">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <span className={`status-badge ${task.status}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
                <div className="task-actions">
                  <button
                    onClick={() => toggleTaskStatus(task._id, task.status)}
                    className="toggle-status-btn"
                  >
                    {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tasks;