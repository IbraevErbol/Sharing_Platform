import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("http://localhost:3000/posts");
        // console.log('Полученные посты: ', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Ошибка при получении постов:", error);
        setErrorMessage("Не удалось загрузить посты.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  if (errorMessage) return <p style={{ color: "red" }}>{errorMessage}</p>;

  return (
    <div style={{ margin: "20px" }}>
      <h1>Публикации</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {posts.length > 0 ? ( 
          posts.map((post) => (
            <div
              key={post._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                width: "300px",
                borderRadius: "10px",
              }}
            >
              <Link
                to={`/${post._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  src={`http://localhost:3000/${post.image}`}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h2>{post.title}</h2>
                <p>{post.content.substring(0, 50)}...</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Нет доступных публикаций.</p> // Сообщение при отсутствии постов
        )}
      </div>
    </div>
  );
};
