import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import './TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, socket } = useAuth();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTask();

    // Listen for real-time updates
    if (socket) {
      socket.on('task-changed', (updatedTask) => {
        if (updatedTask._id === id) {
          setTask(updatedTask);
          toast.info('Task was updated');
        }
      });

      socket.on('new-task', (newTask) => {
        if (newTask._id === id) {
          setTask(newTask);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('task-changed');
        socket.off('new-task');
      }
    };
  }, [id, socket]);

  const loadTask = async () => {
    try {
      const response = await taskAPI.getById(id);
      setTask(response.data.data);
    } catch (error) {
      toast.error('Failed to load task');
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.delete(id);
      toast.success('Task deleted successfully');
      navigate('/tasks');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const canEdit = task && (user?.role === 'admin' || task.createdBy._id === user?.id);

  if (loading) {
    return <div className="loading">Loading task...</div>;
  }

  if (!task) {
    return null;
  }

  return (
    <div className="task-detail-page">
      <div className="container">
        <div className="task-detail-header">
          <button onClick={() => navigate('/tasks')} className="btn btn-secondary">
            ← Back
          </button>
          {canEdit && (
            <div className="task-actions">
              <Link to={`/tasks/${id}/edit`} className="btn btn-primary">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="task-detail-card">
          <div className="task-detail-header-content">
            <h1>{task.title}</h1>
            <div className="task-badges">
              <span className={`badge badge-${task.status}`}>
                {task.status}
              </span>
              <span className={`badge badge-${task.priority}`}>
                {task.priority}
              </span>
            </div>
          </div>

          {task.description && (
            <div className="task-section">
              <h3>Description</h3>
              <p>{task.description}</p>
            </div>
          )}

          <div className="task-meta-grid">
            <div className="task-meta-item">
              <strong>Created By:</strong>
              <span>{task.createdBy?.name || 'Unknown'}</span>
            </div>
            {task.assignedTo && (
              <div className="task-meta-item">
                <strong>Assigned To:</strong>
                <span>{task.assignedTo.name}</span>
              </div>
            )}
            {task.dueDate && (
              <div className="task-meta-item">
                <strong>Due Date:</strong>
                <span>{format(new Date(task.dueDate), 'MMMM dd, yyyy')}</span>
              </div>
            )}
            <div className="task-meta-item">
              <strong>Created:</strong>
              <span>{format(new Date(task.createdAt), 'MMMM dd, yyyy')}</span>
            </div>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="task-section">
              <h3>Tags</h3>
              <div className="task-tags">
                {task.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

