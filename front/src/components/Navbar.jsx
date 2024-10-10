import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar({ isLoggedIn }) {
  return (
    <nav>
      <ul>
        {/* Show Login and Register links only if not logged in */}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            
          </>
        )}
        {/* Always show Profile link */}
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
