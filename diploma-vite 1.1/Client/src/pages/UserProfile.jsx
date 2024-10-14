import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(!token){
      navigate("/login")
    }else{
      const fetchUserData = async () => {
        try{
          const response = await axios.get(`http://localhost:3000/profile/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data); 
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
    return <div>Loading...</div>; // Показать индикатор загрузки, пока данные не загрузятся
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>Ваш уникальный ID: {user._id}</p>
      <button
        onClick={() => {
          localStorage.removeItem('token'); // Удаляем токен при выходе
          navigate("/login"); // Перенаправляем на страницу входа
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
