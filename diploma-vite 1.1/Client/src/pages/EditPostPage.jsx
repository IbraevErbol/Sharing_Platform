import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const EditPostPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useAuth();
  const { id } = useParams(); // Получаем id поста из URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`http://localhost:3000/posts/${id}`);
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
      } catch (error) {
        setErrorMessage('Ошибка при загрузке поста.');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await api.put(`http://localhost:3000/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }); 
      navigate(`/${id}`); // Перенаправляем на страницу поста после обновления
    } catch (error) {
      console.error(error);
      setErrorMessage('Ошибка при обновлении поста.');
    }
  };

  return (
    <div style={{ margin: '50px auto', maxWidth: '1000px' }}>
      <h2>Редактировать пост</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Заголовок:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Содержание:</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            theme='snow'
            placeholder='Введите содержание поста...'
          />
        </div>
        <div>
          <label>Изображение:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type='submit'>Обновить пост</button>
      </form>
    </div>
  );
};
