import React, { useState } from 'react'
import api from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

export const AddPostPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const token = localStorage.getItem('token')

    if(!isAuthenticated){
      navigate('/login')
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('authorId', userId);

    try {
      await api.post('http://localhost:3000/posts', formData, {
        headers: {
          'Content-Type' : 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (error) {
      setErrorMessage('Ошибка при создании поста.')
    }
  }

  return (
    <div style={{margin: '50px auto', maxWidth: '600px'}}>
      <h2>Создать новый пост</h2>
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
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
        <label>Изображение:</label>
          <input 
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type='submit'>Создать пост</button>
      </form>
    </div>
  )
}
