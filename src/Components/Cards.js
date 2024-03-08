import React, { useState } from 'react'
import style from './cssstyle/effects.module.css'
import { Link } from 'react-router-dom'
import { add_to_cart } from '../Redux/actions/cartaction'
function Cards({ item }) {
  const[remove,setremove]=useState(false);
  const add_item_cart = (item) => {
    setremove(true);
    add_to_cart(item);
  }
  return (
    <div className={`card shadow p-3 mb-5 bg-white rounded  ${style.image}`} style={{ width: "18rem", margin: "3vh 0 3vh 0" }}>
      <Link to="/productdetails" state={item}><img src={item.images[0]} className={`card-img-top ${style.imagesize}`} alt="eyewear" /></Link>
      <hr />
      <div className="card-body">
        <h3 className="card-title">{item.brand}</h3>
        <p className="card-text">{item.model}</p>
        <p className="card-text">₹ {item.price}</p>
        {!remove?<button className="btn btn-success float-right" onClick={() => add_item_cart(item)}>Add To Cart</button>
        :<button className="btn btn-danger float-right" >remove To Cart</button>}
      </div>
    </div>
  )
}

export default Cards