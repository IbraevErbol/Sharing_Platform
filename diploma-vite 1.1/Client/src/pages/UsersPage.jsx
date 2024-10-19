import axios from "axios";
// import { decode as jwt_decode } from 'jwt-decode';
// import jwt_decode from 'jwt-decode';


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchCurrentUser = async () => {
      if (!token) {
        setCurrentUser(null);
        return;
      }
      const decodedToken = jwt_decode(token);
      const currentUserId = decodedToken.id;

      try {
        const response = await axios.get(`http://localhost:3000/profile/${currentUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser(response.data); //Сохраняем данные о текущем пользователе
      } catch (error) {
        console.error(error);
        setErrorMessage("Ошибка загрузки данных пользователя.");
      }
    };

    // Получаем всех пользователей
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Ошибка загрузки списка пользователей.");
      }
    };
    fetchUsers();
    fetchCurrentUser();
  }, []);

  if (errorMessage) {
    return <div style={{ color: "red" }}>{errorMessage}</div>;
  }
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Список пользователей</h1>
      {currentUser ? (
        <h2>
          Вы авторизованы как: {currentUser.username} (ID: {currentUser._id})
        </h2>
      ) : (
        <h2>Вы вошли как Гость</h2>
      )}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} (ID: {user._id})
          </li>
        ))}
      </ul>
    </div>
  );
};
