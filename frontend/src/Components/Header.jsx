import axios from 'axios';
import React from 'react';
import jwt from 'jwt-decode'
import { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';

export default function Header() {
    const { user,setUser } = useContext(ThemeContext);
   
   //added this function as an alternate to color picker due to time constraint
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    
   const ChangeColor=()=>{
    let color=getRandomColor()
      
        axios
        .put("http://localhost:3000/userapi/User", { user:user.username,color},
        {headers:{
          'Authorization': `Bearer ${localStorage.getItem("token")}` 
        }})
        .then(({ data }) =>{ 
           
            localStorage.setItem("token",data.token)
       }).catch((err)=>alert("Unable to Update Color"));
       //Context updates even if save through api fails to keep the user experience with new color
       setUser({username:user.username,color})

       
      }

  return (
    <>
    <header className='Header' style={{backgroundColor:user.color}}>
    <h2>SAPIENS</h2>
    <button onClick={()=>ChangeColor()} style={{marginRight:5}}>Change Color</button>
    


    </header>
   
    </>
  )
}
