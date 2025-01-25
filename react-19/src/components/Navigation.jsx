import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="navigation">
      <h1>React 19 Demo</h1>
      <div className="nav-buttons">
        <Link to="/use-action-state" className="nav-button">
          useActionState
        </Link>
        <Link to="/use-form-status" className="nav-button">
          useFormStatus
        </Link>
        <Link to="/use-optimistic" className="nav-button">
          useOptimistic
        </Link>
      </div>
    </div>
  );
}

export default Navigation;