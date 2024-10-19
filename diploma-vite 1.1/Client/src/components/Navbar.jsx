import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

import "./Header.css";

export const Navbar = () => {
  const {isAuthenticated, userId} = useAuth()

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
