import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
function Login() {
  const [loginInfo ,setLoginInfo]=useState({
    email:'',
    password:''
  })
 const navigate = useNavigate()
  const handleChange =(e)=>{
    const {name, value} = e.target
    console.log(name,value)
    const copyLoginInfo = {...loginInfo}
    copyLoginInfo[name] = value
    setLoginInfo(copyLoginInfo)
  }
  console.log("logininfo ke andar ->",loginInfo)

   const handleLogin = async (e)=>{
    e.preventDefault()
    const { email, password} = loginInfo
    if ( !email || !password){
      return handleError("fill all the necessary fields")
    }
    try {
      const url = "https://login-using-mern.vercel.app/auth/login"
      const response = await fetch(url,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(loginInfo)
      })
      const result = await response.json()
      const {success , message , error , jwtToken , name } = result
      if(success){
        handleSuccess(message)
        localStorage.setItem('token',jwtToken)
        localStorage.setItem('loggedinuser', name)
        localStorage.removeItem('logged in user')
        setTimeout(()=>{
          navigate('/home')
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
        <form onSubmit={handleLogin}>
            <div>
            <label htmlFor="email">Email</label>
            <input 
            onChange={handleChange}
              type ="email"
              name ="email" 
              placeholder="enter your email"
              value={loginInfo.email}
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
              value={loginInfo.password}
              autoComplete="password"
            />
          </div>
          <button  type="submit">Login</button>
          <span>dont  have a account
            <Link to ="/signup">SignUp</Link>
          </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Login