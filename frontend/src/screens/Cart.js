import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='mt-5 w-100 d-flex justify-content-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail")
    let response = await fetch("http://localhost:5000/api/orderData", {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify ({
        order_data : data,
        email : userEmail,
        order_date : new Date().toDateString()
      })
    })
    if (response.status === 200) {
      dispatch({type: "DROP"})
    } 

  }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      <div className="container justify-content-center"><h2 className='mt-2'>My Cart</h2></div>
      {console.log(data)}
      <div className='container m-auto table-responsive table-responsive-sm table-responsive-md' >
        <div className="row">
          {data.map((food, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{food.name}</h5>
                  <img
                    src={food.img}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "120px", objectFit: "fill" }}
                  />
                  <p className="card-text">Quantity: {food.qty}</p>
                  <p className="card-text">Option: {food.size}</p>
                  <p className="card-text">Amount: ₹{food.price}/-</p>
                  <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><FaTrashAlt /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div><h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-danger mt-5 mb-2' onClick={handleCheckOut}> Proceed to Payment </button>
        </div>
      </div>
    </div>
  )
}