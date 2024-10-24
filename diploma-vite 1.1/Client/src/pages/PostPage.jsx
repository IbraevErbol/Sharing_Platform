import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import { useParams } from 'react-router-dom';

export const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPost = async() => {
      try {
        const response = await api.get(`http://localhost:3000/posts/${id}`)
        setPost(response.data)
      } catch (error) {
        console.error('Ошибка при получении поста:', error);
        setErrorMessage('Не удалось загрузить пост.')
      }
    }

    fetchPost()
  }, [id])

  if (errorMessage) {
    return <div style={{ color: 'red' }}>{errorMessage}</div>;
  }

  if (!post) {
    return <div>Загрузка...</div>;
  }

  return (
    <div style={{margin: '20px'}}>
      <h1>{post.title}</h1>
      <img 
        src={`http://localhost:3000/${post.image}`}
        alt={post.title}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <p>{post.content}</p>
    </div>
  )
}
