import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { admin_add_orders } from '../Redux/actions/orderaction';
import AdminOrdercards from '../Components/AdminOrdercards';
function AdminOrders() {
    const orders = useSelector(state => state.ordersReduser);
    useEffect(() => {
        admin_add_orders();
    }, [])
    return (
        <>
            <div className='container-sm shadow-lg rounded p-2 d-flex flex-column justify-content-center align-items-center my-4'>
                <div className='container boder my-3 '>
                    <h4 className='text-center'>Your Orders</h4>
                    {orders.map((item, index) => <AdminOrdercards product={item} key={index} />)}
                </div>
                <div className='container-sm  d-flex justify-content-center'>
                    {orders.length === 0 &&
                        <img src='https://i.pinimg.com/originals/ae/bc/8c/aebc8c60e30c83f3ab34c978733dab26.png'
                            alt='no order' width={"55.8%"} />
                     } 
                </div>
            </div>
        </>
    )
}

export default AdminOrders
