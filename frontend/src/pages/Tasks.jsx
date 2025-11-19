import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const loadTasks = async () => {
    try {
      const response = await taskAPI.getAll(filters);
      setTasks(response.data.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.delete(id);
      toast.success('Task deleted successfully');
      loadTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="tasks-page">
      <div className="container">
        <div className="tasks-header">
          <h1>My Tasks</h1>
          <Link to="/tasks/new" className="btn btn-primary">
            Create New Task
          </Link>
        </div>

        <div className="filters">
          <input
            type="text"
            name="search"
            placeholder="Search tasks..."
            className="form-input"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <select
            name="status"
            className="form-select"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            name="priority"
            className="form-select"
            value={filters.priority}
            onChange={handleFilterChange}
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found. Create your first task!</p>
            <Link to="/tasks/new" className="btn btn-primary">
              Create Task
            </Link>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map(task => (
              <div key={task._id} className="task-card">
                <div className="task-header">
                  <Link to={`/tasks/${task._id}`}>
                    <h3>{task.title}</h3>
                  </Link>
                  <span className={`badge badge-${task.status}`}>
                    {task.status}
                  </span>
                </div>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                <div className="task-meta">
                  <span className={`badge badge-${task.priority}`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="task-date">
                      Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </span>
                  )}
                </div>
                <div className="task-actions">
                  <Link to={`/tasks/${task._id}/edit`} className="btn btn-secondary">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;

