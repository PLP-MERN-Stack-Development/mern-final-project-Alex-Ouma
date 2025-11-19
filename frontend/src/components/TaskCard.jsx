import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './TaskCard.css';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card-component">
      <Link to={`/tasks/${task._id}`}>
        <h3>{task.title}</h3>
      </Link>
      {task.description && <p>{task.description}</p>}
      <div className="task-badges">
        <span className={`badge badge-${task.status}`}>{task.status}</span>
        <span className={`badge badge-${task.priority}`}>{task.priority}</span>
      </div>
      {task.dueDate && (
        <p className="task-date">
          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
        </p>
      )}
    </div>
  );
};

export default TaskCard;

