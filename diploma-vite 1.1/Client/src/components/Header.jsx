import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Header.css";

import Publications from "../Publications";
import Users from "../Users";
import Community from "../Community/Community";
import UserProfile from "./UserProfile";


export default function Header({ setModalActive  }) {
  const [active, setActive] = useState("publications");

  const handleClick = (btnName) => {
    setActive(btnName);
  };
  return (
    <>
      <header>
        <div className="left-side">
          <Link
            className={`nav_btn ${active === "publications" ? "active" : ""}`}
            onClick={() => handleClick("publications")}
            to="/publications"
          >
            Публикации
          </Link>

          <Link
            className={`nav_btn ${active === "users" ? "active" : ""}`}
            onClick={() => handleClick("users")}
            to="/users"
          >
            Пользователи
          </Link>
          <Link
            className={`nav_btn ${active === "community" ? "active" : ""}`}
            onClick={() => handleClick("community")}
            to="/community"
          >
            Сообщество
          </Link>
        </div>

        <div className="right-side">
          <div className="nav_btn" onClick={() => setModalActive(true)}>
            Пока что войти
          </div>
          <Link
            className={`nav_btn ${active === "profile" ? "active" : ""}`}
            onClick={() => handleClick("profile")}
            to={`/profile/?`} // Замени 1 на реальный ID пользователя, если он доступен
          >
            Профиль
          </Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Publications />} />
        <Route path="publications" element={<Publications />} />
        <Route path="users" element={<Users />} />
        <Route path="community" element={<Community />} />
        <Route path="/profile/:id" element={<UserProfile />} />
      </Routes>
    </>
  );
}
