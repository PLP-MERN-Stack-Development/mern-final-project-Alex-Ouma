import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskAPI, userAPI } from '../services/api';
import { toast } from 'react-toastify';
import './TaskForm.css';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    assignedTo: '',
    tags: ''
  });

  useEffect(() => {
    loadUsers();
    if (id) {
      loadTask();
    }
  }, [id]);

  const loadUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data.data);
    } catch (error) {
      console.error('Failed to load users');
    }
  };

  const loadTask = async () => {
    try {
      const response = await taskAPI.getById(id);
      const task = response.data.data;
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        assignedTo: task.assignedTo?._id || '',
        tags: task.tags?.join(', ') || ''
      });
    } catch (error) {
      toast.error('Failed to load task');
      navigate('/tasks');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        assignedTo: formData.assignedTo || undefined
      };

      if (id) {
        await taskAPI.update(id, taskData);
        toast.success('Task updated successfully');
      } else {
        await taskAPI.create(taskData);
        toast.success('Task created successfully');
      }
      navigate('/tasks');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-page">
      <div className="container">
        <div className="form-header">
          <h1>{id ? 'Edit Task' : 'Create New Task'}</h1>
          <button onClick={() => navigate('/tasks')} className="btn btn-secondary">
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                name="dueDate"
                className="form-input"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assign To</label>
              <select
                name="assignedTo"
                className="form-select"
                value={formData.assignedTo}
                onChange={handleChange}
              >
                <option value="">Unassigned</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              className="form-input"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., urgent, frontend, bug"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : id ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

