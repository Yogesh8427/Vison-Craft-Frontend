import React from 'react'
import style from './cssstyle/effects.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { add_to_cart, remove_to_cart } from '../Redux/actions/cartaction'
import { useSelector } from 'react-redux'
import { alert } from '../Redux/actions/alertaction'
function Cards({ item }) {
  const data = useSelector((state) => state.cartreducer);
  const navigate = useNavigate();
  const add_item_cart = (item) => {
    if (!localStorage.getItem('token')) {
      alert("Please Login First", "warning");
      navigate('/login');
    } else {
      add_to_cart(item).then(() => {
        alert("Added to Cart Successfully!", "success");
      });
    }
  }
  const remove_item_cart = (item) => {
    remove_to_cart(item);
    alert("Removed From Cart Successfully", "info");
  }
  return (
    <div className={`card shadow p-3 mb-5 bg-white rounded  ${style.image}`}
      style={{ width: "17em", margin: "3vh 0 3vh 0" }}>
      <Link to="/productdetails" state={item}><img src={item.image}
        className={`card-img-top ${style.imagesize}`} alt="eyewear" /></Link>
      <hr />
      <div className="card-body">
        <h4 className="card-title">{item.brand}</h4>
        <div className="d-flex">
          <p className="card-text mr-3"><b>Size:</b> {item.size}mm</p>
          <p className="card-text"><b>Type:</b> {item.model}</p>
        </div>
        <h5 className="card-text" style={{ color: "#f56042" }}>₹ {item.Price}</h5>
        {item.availability === "false" ?
          <button className="btn btn-warning float-right" disabled>Out of Stock</button>
          : data.some((product) => product.item_id === item.item_id) ?
            <button className="btn btn-danger float-right" onClick={() => remove_item_cart(item)}>Remove To Cart</button> :
            <button className="btn btn-success float-right" onClick={() => add_item_cart(item)}>Add To Cart</button>
        }
      </div>
    </div>
  )
}

export default Cards