import React from 'react'
import { useLocation } from 'react-router-dom';

function ThankyouScreen() {
    const location = useLocation();
    let data = location.state;
    console.log(data);
    return (
        <div className='container-sm shadow-lg w-50  rounded p-5 d-flex flex-column justify-content-center  my-5 align-items-center'>
            <div className='rounded-circle overflow-hidden'>
                <img src="https://i.pinimg.com/originals/4a/10/e3/4a10e39ee8325a06daf00881ac321b2f.gif"
                    alt='success' width={"200px"} />
            </div>
            <h2 className='text-success'>Order Placed Successfully</h2>
            <i className='font-weight-bold'>"Thank You For Buying From Us"</i>
            <span>Order id : <b>{data?.orderId}</b></span>
            <span>Payment id : <b>{data?.paymentId}</b></span>

        </div>
    )
}

export default ThankyouScreen
