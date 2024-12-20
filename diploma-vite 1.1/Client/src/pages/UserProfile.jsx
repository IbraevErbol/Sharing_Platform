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
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(!token){
      navigate("/login")
    }else{
      const fetchUserData = async () => {
        try{
          const userResponse = await api.get(`http://localhost:3000/profile/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(userResponse.data); 
          setUser(userResponse.data);
          // setPosts(response.data.posts)

          const postsResponse = await api.get(`http://localhost:3000/posts/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPosts(postsResponse.data)
          console.log(postsResponse.data);
        }catch(error){
          console.error(error); // Логируем ошибку для отладки
          setErrorMessage('Ошибка загрузки данных пользователя.')
        }
      }
      fetchUserData();
    }
  }, [id, navigate]);

  const handleDelete = async(postId) => {
    if(!window.confirm('Вы уверены, что хотите удалить этот пост?')) return;

    try {
      await api.delete(`http://localhost:3000/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
      setErrorMessage('Не удалось удалить пост.')
    }
  }

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
        Выйти
      </button>
      <h2 style={{marginTop: '30px'}}>Мои посты</h2>
      {posts.length === 0 ? (
        <p>У вас нет постов.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ marginBottom: '20px' }}>
            <h3>{post.title}</h3>
            <button onClick={() => navigate(`/${post._id}/edit`)}>Редактировать</button>
            <button onClick={() => handleDelete(post._id)}>Удалить</button>
          </div>
        ))
      )}
    </div>
  );
};
