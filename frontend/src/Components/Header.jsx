import axios from 'axios';
import React from 'react';
import jwt from 'jwt-decode'
import { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useState } from 'react';
import {FormControl, FormControlLabel, Radio, RadioGroup} from '@mui/material';

export default function Header() {
    const { user,setUser } = useContext(ThemeContext);
    const [modal,showModal]=useState(true)
   
   //added this function as an alternate to color picker due to time constraint
   
    
   const ChangeColor=(color)=>{

      
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
    <button onClick={()=>showModal(prevState=>!prevState)} style={{marginRight:5}}>Change Color</button>
   {/*
   Event bubbling added intentionally to hide modal on user selection
   */}
    {modal&&
    <div className="overlay" onClick={()=>showModal(false)}>
    <div className='colorModal'>
    <FormControl>
        Choose Color
     <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        onChange={(e)=>ChangeColor(e.target.value)}
       
      >
      {["red","green","black","blue"].map((color,index)=>
    <FormControlLabel key={"color"+index} value={color} control={ <Radio
       checked={user.color===color}
        sx={{
          color: {color},
          '&.Mui-checked': {
            color: {color},
          },
        }}
      />} 
      label={color.toLocaleUpperCase()}
       />)}
      </RadioGroup>
    </FormControl>

      

    </div>  
    </div>
    }
    
    


    </header>
   
    </>
  )
}
