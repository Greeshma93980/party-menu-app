import { Link } from "react-router-dom";

export default function NotFound()
{
  return (
    <div className="notfound-page-wrapper">
      <div className="notfound-card">
        <span className="error-icon">🕵️‍♂️</span>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved to a different menu route.</p>
        <Link to="/" className="notfound-home-link">
          Return to Menu
        </Link>
      </div>
    </div>
  );
}