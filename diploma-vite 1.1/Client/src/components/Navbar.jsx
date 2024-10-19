import React, { useState, useEffect } from "react";
import { json, Link, NavLink } from "react-router-dom";

import "./Header.css";

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.userId)
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <header>
      <div className="left-side">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav_btn active" : "nav_btn"
          }
        >
          Публикации
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "nav_btn active" : "nav_btn"
          }
        >
          Пользователи
        </NavLink>
      </div>
      <div className="right-side">
        {isAuthenticated ? (
          <NavLink
            to={`/profile/${userId}`}
            className={({ isActive }) =>
              isActive ? "nav_btn active" : "nav_btn"
            }
          >
            Профиль
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav_btn active" : "nav_btn"
            }
          >
            Войти
          </NavLink>
        )}
      </div>
    </header>
  );
};
