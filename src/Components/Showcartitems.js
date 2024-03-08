import React, { useState } from 'react'
import { remove_to_cart } from '../Redux/actions/cartaction';

function Showcartitems({ Products }) {
    const [count, setcount] = useState(1);
    const onincrease=()=>{
        setcount(count+1);
    }
    const  ondecrease=() =>{
        if(count>1){
            setcount(count-1);
        }
    }
    return (
        <div className='container d-flex my-5 shadow-sm bg-body'>
            <div className='d-flex align-self-center justify-content-center' style={{ 'width': '33%' }}>
                <img className='card-img-top'
                    src={Products.images[0]}
                    style={{ width: "100px" }}
                >
                </img>
            </div>
            <div className='align-self-center' style={{ 'width': '33%' }}>
                <h4>{Products.brand}</h4>
                <div className='d-flex'>
                    <p className='w-50'>{Products.model}</p>
                    <div>
                        <p>Quantity</p>
                        <button type="button" class="btn btn-primary mx-2 my-2" onClick={ondecrease}>-</button>
                        <input type='text' style={{ width: "30px", textAlign: "center" }}
                            min={1} value={count} readOnly />
                        <button type="button" class="btn btn-primary mx-2" onClick={onincrease}>+</button>
                    </div>
                </div>
            </div>
            <div className='d-flex align-self-center flex-column justify-content-center' style={{ 'width': '33%' }}>
                <p>Each Price: ₹{Products.price} X {count}</p>
                <h3>Total: ₹{Products.price * count}</h3>
                <button className="btn btn-danger w-50 my-3" onClick={()=>remove_to_cart(Products)}>Remove From Cart</button>
            </div>
        </div>
    )
}

export default Showcartitems