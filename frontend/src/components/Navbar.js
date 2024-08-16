import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import { TfiAlignJustify } from "react-icons/tfi";
const Navbar = () => {
    let data = useCart()
    const [cartView, setCartView] = useState(false)
    const Navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userEmail")
        Navigate('/login')
    }
    const loadCart = () => {
        setCartView(true)
    }
  return (
    <div>
          <nav className="navbar navbar-expand-lg navbar-black bg-white shadow-lg">
              <div className="container-fluid ">
                  <Link className="navbar-brand fs-1 pb-2 text-black" to="/">
                      BITEBLISS
                  </Link>
                  <button
                      className="navbar-toggler text-black"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                      aria-controls="navbarNav"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                  >
                      <span className="navbar-toggler-icon text-black"><TfiAlignJustify /></span>
                  </button>
                  <div className="collapse navbar-collapse " id="navbarNav">
                      <ul className="navbar-nav me-auto">
                      {(localStorage.getItem("authToken")) ? 
                      <li className="nav-item">
                            <p className="nav-link active fs-5 text-success">Welcome, {localStorage.getItem("userEmail")}</p>
                        </li> : "" }
                          <li className="nav-item">
                              <Link className="nav-link active fs-5 text-black" aria-current="page" to="/">
                                  Home
                              </Link>
                          </li>
                          <li>
                              <Link className="nav-link active fs-5 text-black" aria-current="page" to="/about">
                                  About Us
                              </Link>
                          </li>
                        {
                        (localStorage.getItem("authToken")) ? 
                        <>
                        <li className="nav-item">
                        <Link className="nav-link active fs-5 text-black" aria-current="page" to="/myorders">
                            My Orders
                        </Link>
                        </li>
                        </> : ""
                        }
                      </ul>
                        {
                            (localStorage.getItem("authToken")) ? 
                            <div className='d-flex'>
                            <div className="btn bg-light text-black" onClick={loadCart}>
                                My Cart&nbsp; 
                                <Badge pill bg="danger">{data.length}</Badge>
                            </div>
                            {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                            <div className="btn bg-light text-black mx-1" onClick={handleLogout}>
                                Log-Out
                            </div>
                            </div> 
                            :
                            <div className='d-flex'>
                            <Link className="btn bg-light text-black" to="/Login">
                                Login
                            </Link>
                            <Link className="btn bg-light text-black mx-1" to="/createuser">
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