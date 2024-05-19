import React, { useEffect, useState } from 'react'
import { add_orders } from '../Redux/actions/orderaction'
import { useSelector } from 'react-redux';
import Ordercards from '../Components/Ordercards';
import { alert } from '../Redux/actions/alertaction';
import { geturl } from '../config/url';
import axios from 'axios';
import { update_order } from '../Redux/actions/orderaction'
function OrdersScreen() {
    const orders = useSelector(state => state.ordersReduser);
    const [items, setItems] = useState([]);
    const[total,setTotal]=useState(0);
    const [cancleReason, setcancleReason] = useState(null);
    const handlechange = (e) => {
        setcancleReason(() => e.target.value);
    }
    useEffect(() => {
        add_orders();
    }, [])
    const getitems = async (order_id) => {
        try {
            const config = { headers: { authToken: localStorage.getItem('token') } }
            const url = geturl("/orders/getbuyproducts");
            await axios.post(url, { order_id }, config).then((response) => {
                setItems(response.data);
                let totalsum=0;
                const getsum = (total, sum) => {
                        totalsum = total + parseInt(sum.Price) * parseInt(sum.Quantity);
                    return totalsum;
                }
                setTotal( response.data.reduce(getsum, 0));
            })
        } catch (error) {
            console.log("there is error to feching the data from server");
            alert("Server Error ", "danger");
        }
    }
    return (
        <>
            <div className='container shadow-lg rounded p-2 my-4'>
                <div className='container boder my-3 '>
                    <h4 className='text-center'>Your Orders</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order Id</th>
                                <th>Payment Id</th>
                                <th>Payment Status</th>
                                <th>Order Status</th>
                                <th>Total Items</th>
                                <th>Payment Mode</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) =>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <th className='text-primary'>{item?.order_id}</th>
                                    <th className='text-primary'>{!item?.payment_id ? "None" : item?.payment_id}</th>
                                    <td>{item?.payment_status}</td>
                                    <th className={`text-${item?.order_status === "Cancled" ? "danger" : "success"}`}>{item?.order_status}</th>
                                    <td>{item?.Quantity}</td>
                                    <td>{item?.payment_mode}</td>
                                    <td>{item?.address}</td>
                                    <td>
                                        <button type="button"
                                            className="btn btn-primary rounded-pill w-100 "
                                            onClick={() => getitems(item.order_id)}
                                            data-toggle="modal" data-target={`#exampleModal${index}`}
                                        >View</button>
                                        <button type="button"
                                            className="btn btn-warning w-100 rounded-pill m-1"
                                            data-toggle="modal" data-target={`#exampleModal${item.order_id}`}
                                            disabled={item.order_status === "Cancled" ? true : false}
                                        >Cancle</button>
                                    </td>
                                    <td>
                                        {/* <!-- view Modal --> */}
                                        <div className="modal fade"
                                            id={`exampleModal${index}`}
                                            tabIndex="-1"
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true">
                                            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                                                <div className="modal-content ">
                                                    <div className="modal-header border-0">
                                                        <h5 className="modal-title" id="exampleModalLabel">
                                                            Buy Products</h5>
                                                        <button type="button"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {items?.map((item,index) =>
                                                            <Ordercards product={item} key={index} />)}
                                                        <hr />
                                                        <div className='container-sm  p-2 my-2 rounded '>
                                                            <h6>Shipping Cost : <span className='float-right'>₹50</span></h6>
                                                            <h6>Discount : <span className='float-right'>₹0</span></h6>
                                                            <h5 className='align-self-center'>Total Amount Paid: <span className='float-right'
                                                                style={{ color: "#f56042" }}>₹{total+50}</span></h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {/* <!-- cancle Modal --> */}
                                        <div
                                            className="modal fade"
                                            id={`exampleModal${item.order_id}`}
                                            tabIndex="-1"
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header border-0">
                                                        <h5 className="modal-title"
                                                            id="exampleModalLabel">Please Select Reason</h5>
                                                        <button type="button"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <input type="radio" name="cancle"
                                                            value={"Change Of Mind"} onChange={handlechange} />
                                                        <label className='mx-2'>Change Of Mind</label> <br />
                                                        <input type="radio" name="cancle"
                                                            value={"No Longer Needed"} onChange={handlechange} />
                                                        <label className='mx-2'>No Longer Needed</label><br />
                                                        <input type="radio" name="cancle"
                                                            value={"Duplicate Order"} onChange={handlechange} />
                                                        <label className='mx-2'>Duplicate order</label><br />
                                                        <input type="radio" name="cancle"
                                                            value={"Decided For Alternative Product"} onChange={handlechange} />
                                                        <label className='mx-2'>Decided For Alternative Product</label><br />
                                                        <input type="radio" name="cancle"
                                                            value={"Orthers"} onChange={handlechange} />
                                                        <label className='mx-2'>Orthers</label><br />
                                                    </div>
                                                    <div className="modal-footer border-0">
                                                        {cancleReason && <button type="button" className="btn btn-primary"
                                                            onClick={() => update_order(item, cancleReason)}
                                                            data-dismiss="modal">Cancle Now</button>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
            </div >
        </>
    )
}

export default OrdersScreen
