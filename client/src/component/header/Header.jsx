import React from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constant";
import axios from "axios";

const Header = ({ isLoggedIn, updateLoginStatus }) => {
  const navigate = useNavigate("");
  const handleLogout = async () => {
    try {
      await updateLoginStatus();
      await axios.post(`${API_URL}/auth/logout`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header">
      <h1 className="title">Movie Directory</h1>
      {isLoggedIn && (
        <ul className="menu-items">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/add">Add Movie</NavLink>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              LogOut
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
