import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <h1>Task Management Made Simple</h1>
          <p className="hero-subtitle">
            Organize your work, boost productivity, and achieve your goals with our powerful task management system.
          </p>
          {!user && (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>
          )}
          {user && (
            <div className="hero-actions">
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>📋 Task Management</h3>
              <p>Create, organize, and track your tasks with ease. Set priorities and due dates to stay on top of your work.</p>
            </div>
            <div className="feature-card">
              <h3>👥 Team Collaboration</h3>
              <p>Assign tasks to team members and collaborate in real-time. Stay connected with instant updates.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Analytics</h3>
              <p>Track your productivity with detailed statistics and insights into your task completion patterns.</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Real-time Updates</h3>
              <p>Get instant notifications when tasks are updated, assigned, or completed by your team members.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

