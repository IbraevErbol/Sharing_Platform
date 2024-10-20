import { Layout } from "./components/Layout.jsx"
import { Routes, Route } from "react-router-dom"

import {MainPage} from './pages/MainPage.jsx'; 
import {UsersPage} from './pages/UsersPage.jsx';
import {RegisterPage} from './pages/RegisterPage.jsx';
import {LoginPage} from './pages/LoginPage.jsx';
import { UserProfile } from "./pages/UserProfile.jsx";
import {AddPostPage} from './pages/AddPostPage.jsx';
import {PostPage} from './pages/PostPage.jsx';
import {EditPostPage} from './pages/EditPostPage.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} /> {/* Главная страница */}
        <Route path='users' element={<UsersPage />} /> {/* Страница пользователей */}
        <Route path='register' element={<RegisterPage />} /> {/* Страница регистраций */}
        <Route path='login' element={<LoginPage />} /> {/* Страница авторизации */}
        <Route path='new' element={<AddPostPage />} /> {/* Страница добавления нового поста */}
        <Route path=':id' element={<PostPage />} /> {/* Страница для чтения конкретного поста */}
        <Route path=':id/edit' element={<EditPostPage />} /> {/* Страница для изменения конкретного поста */}
        <Route path='profile/:id' element={<UserProfile />} /> {/* Страница профиля пользователя */}
      </Routes>
    </Layout>
  )
}

export default App
