// import axios from "axios";
import api from "../api/axiosInstance";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const UsersPage = () => {
  const { userId, isAuthenticated } = useAuth(); 
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!isAuthenticated) {
        setCurrentUser(null);
        return;
      }          
      const currentUserId = userId;

      try {
        const response = await api.get(`http://localhost:3000/profile/${currentUserId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        const response = await api.get(`http://localhost:3000/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Ошибка загрузки списка пользователей.");
      }
    };

    fetchUsers();
    if(isAuthenticated){
      fetchCurrentUser();
    }
  }, [isAuthenticated, userId]);

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
