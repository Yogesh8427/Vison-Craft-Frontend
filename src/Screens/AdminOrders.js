import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { admin_add_orders } from '../Redux/actions/orderaction';
import AdminOrdercards from '../Components/AdminOrdercards';
import { geturl } from '../config/url';
import axios from 'axios';
import { update_order,update_order_status } from '../Redux/actions/orderaction';
function AdminOrders() {
    const orders = useSelector(state => state.ordersReduser);
    const [cancleReason, setcancleReason] = useState("");
    const [items, setItems] = useState([]);
    const [orderstatus, setOrdersatus] = useState(null)
    const [total, setTotal] = useState(0);
    const handlechange = (e) => {
        setcancleReason(() => e.target.value);
    }
    const handlechangeorder = (e) => {
        setOrdersatus(() => e.target.value);
        console.log(e.target.value)
    }
    useEffect(() => {
        admin_add_orders();
    }, [])
    const setStatus=(item)=>{
        setOrdersatus(()=>item.order_status);
    }
    const getitems = async (order_id) => {
        try {
            const config = { headers: { authToken: localStorage.getItem('token') } }
            const url = geturl("/orders/getbuyproducts");
            await axios.post(url, { order_id }, config).then((response) => {
                setItems(response.data);
                let totalsum = 0;
                const getsum = (total, sum) => {
                    totalsum = total + parseInt(sum.Price) * parseInt(sum.Quantity);
                    return totalsum;
                }
                setTotal(response.data.reduce(getsum, 0));
            })
        } catch (error) {
            console.log("there is error to feching the data from server");
            alert("Server Error ", "danger");
        }
    }
    return (
        <>
            <div className='p-2 mx-4 my-4'>
                <div className='boder my-3 mx-5 '>
                    <h4 className='text-center'>Orders</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User id</th>
                                <th>Order Id</th>
                                <th>Payment Id</th>
                                <th>Payment Status</th>
                                <th>Order Status</th>
                                <th>Total Items</th>
                                <th>Payment Mode</th>
                                <th>Address</th>
                                <th className='text-center' colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) =>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.userid}</td>
                                    <th className='text-primary'>{item?.order_id}</th>
                                    <th className='text-primary'>{!item?.payment_id ? "None" : item?.payment_id}</th>
                                    <td>{item?.payment_status}</td>
                                    <th className={`text-${item?.order_status === "Cancelled" ? "danger" : "success"}`}>
                                        {item?.order_status}</th>
                                    <td>{item?.Quantity}</td>
                                    <td>{item?.payment_mode}</td>
                                    <td>{item?.address}</td>
                                    <td className='m-0'>
                                        <button type="button"
                                            className="btn btn-primary rounded-pill w-100 m-1 "
                                            onClick={() => getitems(item?.order_id)}
                                            data-toggle="modal" data-target={`#exampleModal${index}`}
                                        >View</button>
                                        </td>
                                        <td className='m-0'>
                                        {!(item?.order_status === "Cancelled") && <button type="button"
                                            className="btn btn-warning  rounded-pill w-100 m-1"
                                            data-toggle="modal" data-target={`#exampleModal${item.order_id}`}
                                            disabled={item?.order_status === "Cancelled" ? true : false}
                                        >Cancle</button>}
                                        </td>
                                        <td className='m-0'>
                                        {!(item?.order_status === "Cancelled") && <button type="button"
                                            className="btn btn-success rounded-pill m-1"
                                            onClick={()=>setStatus(item)}
                                            data-toggle="modal" data-target={`#exampleModal${index+item.order_id}`}
                                            disabled={item?.order_status === "Cancelled" ? true : false}
                                        >Edit</button>}
                                    </td>
                                    {/* cancle model */}
                                    <td>
                                        <div className="modal fade"
                                            id={`exampleModal${item.order_id}`}
                                            tabIndex="-1"
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header border-0">
                                                        <h5 className="modal-title"
                                                            id="exampleModalLabel">Please Write Reason</h5>
                                                        <button type="button" className="close"
                                                            data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <textarea className='w-100 border form-control mb-1'
                                                            placeholder='Reason' rows={10} name="address"
                                                            onChange={handlechange}
                                                        ></textarea>
                                                    </div>
                                                    <div className="modal-footer border-0">
                                                        {cancleReason !== "" &&
                                                            <button type="button" className="btn btn-primary"
                                                                onClick={() => update_order(item,cancleReason,true)}
                                                                data-dismiss="modal">Cancle Now</button>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* <!-- view Modal --> */}
                                    <td>
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
                                                        {items?.map((item, index) =>
                                                            <AdminOrdercards product={item} key={index+item.order_id} />)}
                                                        <hr />
                                                        <div className='container-sm  p-2 my-2 rounded '>
                                                            <h6>Shipping Cost : <span className='float-right'>₹50</span></h6>
                                                            <h6>Discount : <span className='float-right'>₹0</span></h6>
                                                            <h5 className='align-self-center'>Total Amount Paid: <span className='float-right'
                                                                style={{ color: "#f56042" }}>₹{total + 50}</span></h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* edit Modal */}
                                    <td>
                                        <div
                                            className="modal fade"
                                            id={`exampleModal${index+item.order_id}`}
                                            tabIndex="-1"
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header border-0">
                                                        <h5 className="modal-title"
                                                            id="exampleModalLabel">Order status</h5>
                                                        <button type="button"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <input type="radio" name={`Order${index}`}
                                                            value={"Processing"}
                                                            checked={(orderstatus === 'Processing')?true:false}
                                                            onChange={handlechangeorder}
                                                        />
                                                        <label className='mx-2'>Processing</label><br />
                                                        <input type="radio" name={`Order${index}`}
                                                            value={"Out of Delivery"}
                                                            checked={(orderstatus === 'Out of Delivery')?true:false}
                                                            onChange={handlechangeorder} />
                                                        <label className='mx-2'>Out of Delivery</label><br />
                                                        <input type="radio" name={`Order${index}`}
                                                            value={"Delivered"}
                                                            checked={(orderstatus === 'Delivered')?true:false}
                                                            onChange={handlechangeorder} />
                                                        <label className='mx-2'>Delivered</label><br />
                                                    </div>
                                                    <div className="modal-footer border-0">
                                                        {orderstatus && <button type="button" className="btn btn-primary"
                                                            onClick={() => update_order_status(item,orderstatus)}
                                                            data-dismiss="modal">Save Changes</button>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
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
