import React, { useEffect, useState } from 'react'
import { handleSuccess } from '../utils'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


function Home() {
  const [loggedinuser , setLoggedInUser] = useState('')
  const [products , setProducts] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
   setLoggedInUser(localStorage.getItem('loggedinuser')) 
  },[])

const handleLogOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('loggedinuser')
  handleSuccess("User logged out successfully")

  setTimeout(() => {
    navigate('/login')
  }, 1800)
}
const fetchProducts=async()=>{
try {
  const url = 'https://login-using-mern.vercel.app/products'
  const headers = {
    headers : {
      'Authorization':localStorage.getItem('token')
    }
  }
  const response = await fetch(url,headers)
  const result =  await response.json()
  console.log(result)
  setProducts(result)
} catch (error) {
  
}
}
useEffect(()=>{
  fetchProducts()
},[])

  return (
    <div className='logoutCss'>
      <h1>{loggedinuser}</h1>
      <button onClick={handleLogOut}>logout</button>
      <div>
        {
        products && products.map((item , index)=>(
          <ul key={index}>
            <span>{item.name}:{item.price}</span>
          </ul>
        ))
      } 
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home