import React from 'react'
import { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';

export default function Body() {
    const {user} = useContext(ThemeContext);
    console.log(user)
  return (
    <h1 style={{color:user.color}}>Hi, {user.username}</h1>
  )
}
