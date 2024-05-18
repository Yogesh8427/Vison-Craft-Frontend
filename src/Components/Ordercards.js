import React, { useState } from 'react'
import { update_order } from '../Redux/actions/orderaction'
function Ordercards({ product }) {
    const[cancleReason,setcancleReason]=useState(null);
    const handlechange=(e)=>{
        setcancleReason(()=>e.target.value);
    }
    return (
        <div>
            <div className="container-sm shadow p-3 d-flex justify-content-around my-1">
                <div className='d-flex  flex-column justify-content-center align-items-center rounded' style={{ width: "30%" }}>
                    <img src={product.image} alt="" width={'200px'} />
                </div>
                <div className='px-3 d-flex justify-content-around py-1' style={{ width: "70%" }}>
                    <div className='p-1' style={{ width: "20%" }}>
                        <p><b>Brand: </b>{product.brand}</p>
                        <p><b>Modal: </b>{product.model}</p>
                        <p><b>Size:  </b>{product.size}mm</p>
                        <p><b>Category:  </b>{product.category}</p>
                        <p><b>Quantity:  </b>{product.Quantity}</p>
                    </div>
                    <div className='p-1' style={{ width: "30%" }}>
                        <p><b>Address : </b>{product.address}</p>
                        <p><b>Payment Status : </b>{product.payment_status}</p>
                        <p><b>Price: </b><b className='text-success'>₹{product.price}</b></p>
                    </div>
                    <div className='p-1' style={{ width: "50%" }}>
                        {product.payment_id && <p><b>Payment_id : </b><b className='text-primary'>{product.payment_id}</b></p>}
                        <p><b>order id: </b><b className='text-primary'>{product.order_id}</b></p>
                        <p><b>Total Amount: {product.price} X {product.Quantity} =</b><b className='text-success'>₹{product.price * product.Quantity}</b></p>
                        <p><b>Payment Mode: </b><b className='text-success'>{product.payment_mode}</b></p>
                        <p><b>Order Status: </b><i className={`bg-${product.order_status === "Cancle" ? "danger" : "success"} 
                        text-white px-3  rounded-pill border`}>
                            {product.order_status}</i></p>
                        <button className="btn btn-warning rounded-pill font-weight-bold float-right" data-toggle="modal" data-target={`#exampleModal${product.order_id}`}
                            disabled={product.order_status === "Cancle" ? true : false}>Cancle Order</button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id={`exampleModal${product.order_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="exampleModalLabel">Please Select Reason</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <input type="radio" name="cancle" value={"Change Of Mind"} onChange={handlechange}/>
                        <label className='mx-2'>Change Of Mind</label> <br/>
                        <input type="radio" name="cancle" value={"No Longer Needed"} onChange={handlechange}/>
                        <label className='mx-2'>No Longer Needed</label><br/>
                        <input type="radio" name="cancle" value={"Duplicate Order"} onChange={handlechange}/>
                        <label className='mx-2'>Duplicate order</label><br/>
                        <input type="radio" name="cancle" value={"Decided For Alternative Product"} onChange={handlechange}/>
                        <label className='mx-2'>Decided For Alternative Product</label><br/>
                        <input type="radio" name="cancle" value={"Orthers"} onChange={handlechange}/>
                        <label className='mx-2'>Orthers</label><br/>
                        </div>
                        <div className="modal-footer border-0">
                            {cancleReason&&<button type="button" className="btn btn-primary" 
                             onClick={() => update_order(product,cancleReason)}
                             data-dismiss="modal">Cancle Now</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ordercards
