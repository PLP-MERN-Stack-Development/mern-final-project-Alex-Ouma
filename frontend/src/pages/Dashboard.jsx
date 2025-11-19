import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        taskAPI.getStats(),
        taskAPI.getAll({ limit: 5 })
      ]);
      setStats(statsRes.data.data);
      setRecentTasks(tasksRes.data.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const getStatusCount = (status) => {
    if (!stats?.status) return 0;
    const statusObj = stats.status.find(s => s._id === status);
    return statusObj ? statusObj.count : 0;
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <Link to="/tasks/new" className="btn btn-primary">
            Create New Task
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>To Do</h3>
            <p className="stat-number">{getStatusCount('todo')}</p>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p className="stat-number">{getStatusCount('in-progress')}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number">{getStatusCount('completed')}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Tasks</h2>
            <Link to="/tasks">View All</Link>
          </div>
          {recentTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Create your first task!</p>
              <Link to="/tasks/new" className="btn btn-primary">
                Create Task
              </Link>
            </div>
          ) : (
            <div className="tasks-list">
              {recentTasks.map(task => (
                <Link key={task._id} to={`/tasks/${task._id}`} className="task-card-link">
                  <div className="task-card">
                    <div className="task-header">
                      <h3>{task.title}</h3>
                      <span className={`badge badge-${task.status}`}>
                        {task.status}
                      </span>
                    </div>
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}
                    <div className="task-footer">
                      <span className={`badge badge-${task.priority}`}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="task-date">
                          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

