import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const Navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        Navigate('/login')
    }
  return (
    <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-success">
              <div className="container-fluid">
                  <Link className="navbar-brand fs-1 fst-italic pb-2" to="/">
                      BiteBliss
                  </Link>
                  <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                      aria-controls="navbarNav"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                  >
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav me-auto mb-2">
                          <li className="nav-item">
                              <Link className="nav-link active fs-5" aria-current="page" to="/">
                                  Home
                              </Link>
                          </li>
                        {
                        (localStorage.getItem("authToken")) ? 
                        <li className="nav-item">
                        <Link className="nav-link active fs-5" aria-current="page" to="/">
                            My Orders
                        </Link>
                        </li> : ""
                        }
                      </ul>
                        {
                            (localStorage.getItem("authToken")) ? 
                            <div className='d-flex'>
                            <div className="btn bg-white text-success">
                                My Cart
                            </div>
                            <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>
                                Log-Out
                            </div>
                            </div> 
                            :
                            <div className='d-flex'>
                            <Link className="btn bg-white text-success" to="/Login">
                                Login
                            </Link>
                            <Link className="btn bg-white text-success mx-1" to="/createuser">
                                SignUp
                            </Link>
                            </div>
                        }                      
                  </div>
                </div>
          </nav>
    </div>
  );
}

export default Navbar