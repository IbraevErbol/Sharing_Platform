// import axios from 'axios';
import api from '../api/axiosInstance';
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';

export const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth()
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(!token){
      navigate("/login")
    }else{
      const fetchUserData = async () => {
        try{
          const response = await api.get(`http://localhost:3000/profile/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(response.data); 
          setUser(response.data);
        }catch(error){
          console.error(error); // Логируем ошибку для отладки
          setErrorMessage('Ошибка загрузки данных пользователя.')
        }
      }
      fetchUserData();
    }
  }, [id, navigate]);

  if(errorMessage){
    return <div style={{color: 'red'}}>{errorMessage}</div>
  }

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>Ваш уникальный ID: {user._id}</p>

      <button
        onClick={() => navigate('/new')}
        style={{
          backgroundColor: '#28a745', // Зелёный цвет для создания поста
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          marginTop: '20px',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
        >
          Создать новый пост
      </button>

      <button
        onClick={() => {
          localStorage.removeItem('token'); 
          setIsAuthenticated(false);
          navigate("/login"); 
        }}
        style={{
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Logout
      </button>
    </div>
  );
};
