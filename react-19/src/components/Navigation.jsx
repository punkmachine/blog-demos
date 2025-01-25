import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="navigation">
      <h1>React 19 Demo</h1>
      <div className="nav-buttons">
        <Link to="/use-action-state" className="nav-button">
          useActionState
        </Link>
      </div>
    </div>
  );
}

export default Navigation;