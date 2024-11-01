import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faMapLocationDot,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header>
      <nav className="container">
        <div>
          <ul>
            <li>
              <Link to="/">
                <img src="marker_small.png" alt="" />
                <h1>Furmap</h1>
              </Link>
            </li>
            <li>
              <Link
                to="/map"
                className={location.pathname == "/map" ? "active" : ""}
              >
                <FontAwesomeIcon className="icon" icon={faMapLocationDot} /> Map
              </Link>
            </li>
            <li>
              <Link
                to="/info"
                className={location.pathname == "/info" ? "active" : ""}
              >
                <FontAwesomeIcon className="icon" icon={faCircleInfo} />
                Info
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            {token ? (
              <li>
                <Link to="#" onClick={handleLogout} className="btn">
                  Cerrar sesión
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/register" className={location.pathname == '/register' ? "active" : "" + "btn"}>
                    <FontAwesomeIcon icon={faUserPlus} className="icon" />
                    Add your location!
                  </Link>
                </li>
                <li>
                  <Link to="/login" className={location.pathname == '/login' ? "active" : "" + "btn"}>
                    <FontAwesomeIcon
                      className="icon"
                      icon={faRightFromBracket}
                    />
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
