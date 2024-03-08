import React from 'react'
import { useLocation } from 'react-router-dom'
import { add_to_cart } from '../Redux/actions/cartaction';
function Product_detail() {
    const location=useLocation();
    const data=location.state;
    return (
        <>
            <div className='container-sm d-flex my-5 shadow-sm p-0 h-100' >
                <div className='w-50 align-self-center p-4'>
                    <img  className='card-img-top'
                    src={data.images[0]}
                    >
                    </img></div>
                <div className='w-50 p-5 bg-light rounded'>
                    <p>{data.model}</p>
                    <h3>{data.brand}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat similique dicta nulla praesentium deserunt.
                         Corporis repellendus deleniti dolores eligendi.</p>
                <p>Frame size</p>
                <select className='w-100 mb-4 p-2 border rounded'>
                    <option>---select---</option>
                    <option>52</option>
                    <option>48</option>
                    <option>42</option>
                </select>
                <button type="button" className="btn btn-outline-success" onClick={()=>add_to_cart(data)}>Add To Cart</button>
                </div>
            </div>
        </>
    )
}

export default Product_detail