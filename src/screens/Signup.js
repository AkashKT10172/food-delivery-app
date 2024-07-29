import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
    const [credentials, setCredentials] = useState({
        name:"", 
        email:"",
        password:"",
        geoLocation:""
    });
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/createuser",{
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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name='name'
            value={credentials.name}
            onChange={onchange}
          />
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
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputLocation1"
            name='geoLocation'
            value={credentials.geoLocation}
            onChange={onchange}
          />
        </div>
        
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
      </form>
    </div>
    </>
  );
};

export default Signup;
