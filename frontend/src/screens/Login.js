import React from 'react'
import {useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email:"",
    password:"",
});
const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("https://food-delivery-app-du11.onrender.com/api/loginuser",{
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body:JSON.stringify(
            {
            password: credentials.password,
             email: credentials.email,
            }
        )
    });
    const json = await response.json()

    if(!json.success) {
        alert("EnterValid Credentials")
    } else {
      localStorage.setItem("authToken", json.authToken)
      localStorage.setItem("userEmail", credentials.email)
      navigate("/")
    }
}
const onchange = (event) => {
    setCredentials({...credentials, 
        [event.target.name] : event.target.value
    })
}
console.log(credentials)
  return (
    <>
    <Navbar/>
    <div className='vh-100 d-flex jusitfy-content-center' style={{background : "#fed8b1"}}>
    <div className="container col-sm-8 col-md-6 pt-3 pb-5 ps-2 pe-2 rounded">
      <h3 className='text-center mb-2 text-black'>Login to your account</h3>
      <p className='text-center text-black'>Don't have an account yet? <Link to = '/createuser'>Sign Up</Link></p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            placeholder='E-mail Address'
            className="form-control text-black bg-white"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='email'
            value={credentials.email}
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text ms-1 text-black">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control text-black bg-white"
            id="exampleInputPassword1"
            placeholder='Password'
            name='password'
            value={credentials.password}
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-success me-2 w-100 text-black">
          Submit
        </button>
      </form>
    </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Login