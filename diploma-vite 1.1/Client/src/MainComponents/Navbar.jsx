import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import "./Header.css";

export const Navbar = () => {
  return (
    <header>
      <div className="left-side">
          <NavLink
            to= '/'
            className={({isActive}) => isActive ? 'nav_btn active' : 'nav_btn'}
          >
            Публикации
          </NavLink>

          <NavLink
            to= '/users'
            className={({isActive}) => isActive ? 'nav_btn active' : 'nav_btn'}
          >
            Пользователи
          </NavLink>
        </div>
    </header>
  )
}
