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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='email'
            value={credentials.email}
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name='password'
            value={credentials.password}
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link to="/createuser" className="m-3 btn btn-danger">I'm a new User</Link>
      </form>
    </div>
    <Footer/>
    </>
    
  )
}

export default Login