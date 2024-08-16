import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Signup = () => {
    const Navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        name:"", 
        email:"",
        password:"",
        geoLocation:""
    });
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("https://food-delivery-app-du11.onrender.com/api/createuser",{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body:JSON.stringify(
                {name:credentials.name,
                password: credentials.password,
                 email: credentials.email,
                 location: credentials.geoLocation,
                }
            )
        });
        const json = await response.json()
        console.log(json)

        if(!json.success) {
            alert("EnterValid Credentials")
        } else {
          localStorage.setItem("authToken", json.authToken)
          localStorage.setItem("userEmail", credentials.email)
          Navigate("/")
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
    <div className="container col-sm-8 col-md-6 pt-3 pb-5 ps-2 pe-2">
    <h3 className='text-center mb-2 text-black'>Create a new account</h3>
    <p className='text-center text-black'>Already have an account? <Link to = '/login'>Log In</Link></p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <input
            type="text"
            placeholder="Name"
            className="form-control text-black bg-white"
            name='name'
            value={credentials.name}
            onChange={onchange}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="E-mail Address"
            className="form-control text-black bg-white"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='email'
            value={credentials.email}
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text ms-1 mb-2 text-black">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="form-control text-black bg-white"
            id="exampleInputPassword1"
            name='password'
            value={credentials.password}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Address"
            className="form-control text-black bg-white"
            id="exampleInputLocation1"
            name='geoLocation'
            value={credentials.geoLocation}
            onChange={onchange}
          />
        </div>
        
        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Signup;
