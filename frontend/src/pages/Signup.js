import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
  const [SignupInfo ,setSignupInfo]=useState({
    name:'',
    email:'',
    password:''
  })
 const navigate = useNavigate()
  const handleChange =(e)=>{
    const {name, value} = e.target
    console.log(name,value)
    const copyLoginInfo = {...SignupInfo}
    copyLoginInfo[name] = value
    setSignupInfo(copyLoginInfo)
  }
  console.log("logininfo ke andar ->",SignupInfo)

   const handleSignup = async (e)=>{
    e.preventDefault()
    const {name, email, password} = SignupInfo
    if (!name || !email || !password){
      return handleError("fill all the necessary fields")
    }
    try {
      const url = "http://localhost:8080/auth/signup"
      const response = await fetch(url,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(SignupInfo)
      })
      const result = await response.json()
      const {success , message , error} = result
      if(success){
        handleSuccess(message)
        setTimeout(()=>{
          navigate('/login')
        },1500)
      } else if(error){
        const details = error?.details[0].message
          handleError(details)
      }
      console.log(result)
    } catch (err) {
      handleError(err)
    }
   }
  
  return (
    <div className='container'>
      <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
            <input 
            onChange={handleChange}
              type ="text"
              name ="name" 
              autoFocus
              placeholder="enter your name"
              value={SignupInfo.name}
              autoComplete="name"

            />
          </div>
            <div>
            <label htmlFor="email">Email</label>
            <input 
            onChange={handleChange}
              type ="email"
              name ="email" 
              placeholder="enter your email"
              value={SignupInfo.email}
              autoComplete="email"
            />
          </div>
              <div>
            <label htmlFor="password">Password</label>
            <input 
            onChange={handleChange}
              type ="password"
              name ="password" 
              placeholder="enter your password"
              value={SignupInfo.password}
              autoComplete="password"
            />
          </div>
          <button  type="submit">Signup</button>
          <span>Already have a account
            <Link to ="/login">Login</Link>
          </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Signup