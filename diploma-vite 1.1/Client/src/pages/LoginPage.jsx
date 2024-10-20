import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import api from "../api/axiosInstance";
import axios from "axios";

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  backgroundColor: "#ffffff",
  color: "#007BFF",
  padding: "10px 20px",
  margin: "10px 0",
  border: "1px solid #007BFF",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.3s, color 0.3s",
  width: "100%",
};

const buttonHoverStyle = {
  backgroundColor: "#007BFF",
  color: "#ffffff",
};
const btnContainer = {
  display: "flex",
  alignItems: "center",
  gap: "40px",
};
const formStyle = {
  width: "300px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
};

const wrapperStyle = {
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  backgroundColor: '#f5f5f5', 
};
export const LoginPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Создаем navigate
  const { setIsAuthenticated, setUserId } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await api.post('http://localhost:3000/login', { email, password }, {withCredentials: true});
      const { accessToken, user } = response.data;
      // console.log('Токен доступа:', accessToken);
      // Сохраняем токен в localStorage
      localStorage.setItem('token', accessToken);

      // Устанавливаем значение в контекст
      setIsAuthenticated(true);
      setUserId(user._id);
      
      // Перенаправление на страницу профиля
      navigate(`/profile/${user._id}`); 
    } catch (error) {
      setErrorMessage('Ошибка входа: ' + error)
    }
  }
  return (
    <div className="sign-in-form" style={formStyle}>
      <div style={wrapperStyle}>
        <h3>Авторизация</h3>
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          style={inputStyle} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={btnContainer}>
          <button
            type="submit"
            style={
              isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Sign In
          </button>
          <Link
            to="/register"
            style={{ color: "#007BFF", textDecoration: "none" }}
          >
            Не авторизованы?
          </Link>
        </div>
      </form>
    </div>
  );
};
