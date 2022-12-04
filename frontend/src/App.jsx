import { useState,useEffect } from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import './App.css'
import { ThemeContext } from './Contexts/ThemeContext'
import Body from './Components/Body'
import Header from './Components/Header'


function App() {
  const [user, setUser] = useState({})
  const[name,setName]=useState("")

  const value = { user, setUser };
  useEffect(()=>{
    axios
    .post("http://localhost:3000/userapi/User", { user: jwt(localStorage.getItem("token")).username  })
    .then(({ data }) => {
      localStorage.setItem("token",data.token)
      setUser(jwt(data.token))});

  },[])
  const Signup=()=>{
    axios
      .post("http://localhost:3000/userapi/User", { user: name })
      .then(({ data }) => {
        localStorage.setItem("token",data.token)
        setUser(jwt(data.token))});

  }


  

  return (
    <ThemeContext.Provider value={value}>
    <div className="App" >

      <Header/>
      <Body/>
      <div style={{display:"flex",width:"100%",justifyContent:"space-evenly"}}>
    <input type="text" style={{height:50}}placeholder="Enter username" onChange={(e)=>setName(e.target.value)}/>

    <button style={{height:50}}onClick={()=>Signup()}>Login/Signup</button>
    </div>
      
    </div>
    </ThemeContext.Provider>
  )
}

export default App
