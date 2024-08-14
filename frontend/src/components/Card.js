import React from 'react'

const Card = (props) => {
  const options = props.options
  const priceOptions = Object.keys(options)
  //console.log(options)
  //console.log(priceOptions)
  return (
    <div>
    <div className="card mt-3" style={{"width": "18rem", "maxHeight":"425px"}}>
    <img className="card-img-top" style={{"width": "18rem", "height":"200px", objectFit: "fill"}} src={props.imgsrc} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">{props.foodName}</h5>
        <p className="card-text">{props.desc}</p>
        <div className='container w-100'>
            <select className='m-2 h-100 bg-success rounded'>
              {
                Array.from(Array(9), (e,i) =>{
                  return(
                    <option key={i+1} value={i+1}>{i+1}</option> 
                  )
                })
              }
            </select>
            <select className='m-2 h-100 bg-success rounded'>
              {
                priceOptions.map((data) => {
                  return (
                    <option key = {data} value = {data}> {data} </option>
                  )
                })
              }
            </select>
            <div className='d-inline h-100 fs-5'>
                Total Price
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Card