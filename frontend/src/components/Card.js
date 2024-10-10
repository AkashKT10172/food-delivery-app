import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer.js'
import './card.css';

const Card = (props) => {
  const options = props.options
  const priceOptions = Object.keys(options)
  const priceRef = useRef()
  let dispatch = useDispatchCart()
  let data = useCart()

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD", 
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img
    })

    console.log(data)
  }
  let finalPrice = qty * parseInt(options[size])
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  
  return (
    <div>
      <div className="card mt-3 m-3 bg-white shadow" style={{"width": "18rem", "maxHeight":"500px"}}>
        <img className="card-img-top p-2" style={{"width": "18rem", "height":"200px", objectFit: "fill"}} src={props.foodItem.img} alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title ms-2 text-black">{props.foodItem.name}</h5>
          {/* Limit description height and overflow */}
          <p className="card-text description ms-2 text-black">{props.foodItem.description}</p>
          <div className=''>
            <select className='m-2 h-100 bg-light rounded text-black' onChange={(e) => setQty(e.target.value)}>
              {
                Array.from(Array(9), (e, i) => {
                  return (
                    <option key={i+1} value={i+1}>{i+1}</option> 
                  )
                })
              }
            </select>
            <select className='m-2 h-100 bg-light rounded text-black' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {
                priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>{data}</option>
                  )
                })
              }
            </select>

            <div className='d-inline h-100 fs-5 text-black'>
                Rs. {finalPrice}
            </div>
            
            <hr className="text-black"/>
              <button className='btn bg-success justify-center ms-2 text-black' 
                  onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
