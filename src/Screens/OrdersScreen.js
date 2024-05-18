import React, { useEffect } from 'react'
import { add_orders } from '../Redux/actions/orderaction'
import { useSelector } from 'react-redux';
import Ordercards from '../Components/Ordercards';
function OrdersScreen() {
    const orders = useSelector(state => state.ordersReduser);
    useEffect(() => {
        add_orders();
    }, [])
    return (
        <>
            <div className='container-sm shadow-lg rounded p-2 d-flex flex-column justify-content-center align-items-center my-4'>
                <div className='container boder my-3 '>
                    <h4 className='text-center'>Your Orders</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order Id</th>
                                <th>Payment Status</th>
                                <th>Order Status</th>
                                <th>Total Items</th>
                                <th>Payment Mode</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) =>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <th className='text-primary'>{item.order_id}</th>
                                    <td>{item.payment_status}</td>
                                    <th className='text-success'>{item.order_status}</th>
                                    <td>{item.Quantity}</td>
                                    <td>{item.payment_mode}</td>
                                    <td>
                                        <button type="button" 
                                        className="btn btn-primary rounded-pill mx-1">View</button>
                                        <button type="button" 
                                        className="btn btn-warning rounded-pill mx-1">Cancle</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='container-sm  d-flex justify-content-center'>
                    {orders.length === 0 &&
                        <img src='https://i.pinimg.com/originals/ae/bc/8c/aebc8c60e30c83f3ab34c978733dab26.png'
                            alt='no order' width={"55.8%"} />}
                </div>
            </div>
        </>
    )
}

export default OrdersScreen
