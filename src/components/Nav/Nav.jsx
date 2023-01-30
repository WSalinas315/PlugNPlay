import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./Nav.css";

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch(); 

  return (
    <div className="nav">
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <h2 className="nav-title">Prime Solo Project</h2>
            </Link>
          </li>
          <div>
            <li>
              {!user.id && (
                <Link className="navLink" to="/login">
                  Login / Register
                </Link>
              )}
            </li>

            {user.id && (
              <>
                <li>
                  <Link className="navLink" to="/user">
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    className="navLink"
                    onClick={() => dispatch({ type: "LOGOUT" })}
                  >
                    Log Out
                  </button>
                </li>
              </>
            )}
            <li>
              <Link className="navLink" to="/about">
                About
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
