import { React, useEffect, useState } from 'react'
import Showcartitems from '../Components/Showcartitems'
import { useSelector } from 'react-redux';
import { setUserAddress } from '../Redux/actions/useraction';
import axios from 'axios';
import { geturl } from '../config/url';
import { useNavigate } from 'react-router-dom';
import { alert } from '../Redux/actions/alertaction';
import { remove_to_cart } from '../Redux/actions/cartaction';
function CartScreen() {
    const Products = useSelector((state) => state.cartreducer);
    const user = useSelector((state) => state.userdetails)
    const navigate = useNavigate();
    const [address, setAddress] = useState({ address: null, pincode: null });
    const [paymentType, setPaymenttype] = useState(null);
    let totalsum = 0;
    const getsum = (total, sum) => {
        if (sum.isSlected === "true")
            totalsum = total + parseInt(sum.price) * parseInt(sum.Quantity);
        return totalsum;
    }
    let sum = Products.reduce(getsum, 0);
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?", "danger");
            return;
        }
        // creating a new order
        const url1 = geturl("/payment/orders")
        const result = await axios.post(url1, { amount: sum + 50 });
        if (!result) {
            alert("Server error. Are you online?", "danger");
            return;
        }
        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;
        const options = {
            key: "rzp_test_IPlBJJm3ECVvDc", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Vision Craft",
            description: "Test Transaction",
            image: {},
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                const selectedProducts = Products.filter((item) => item?.isSlected === "true");
                const url2 = geturl('/payment/success')
                const result = await axios.post(url2,
                    {
                        data,
                        products: selectedProducts,
                        userid: user.userid,
                        admin_id: selectedProducts[0].admin_id,
                        address: `${address.address} Pincode:${address.pincode}`
                    });
                result.data.msg === "success" && selectedProducts.map(item => remove_to_cart(item))
                result.data.msg ? navigate("/thankyou", { state: result.data }) : alert('Something went wrong!', 'warning');
            },
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: `${user.email}`,
                contact: "8427403032",
            },
            notes: {
                address: `${user.address}`,
            },
            theme: {
                color: "#61dafb",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    const getdata = async () => {
        setAddress({ address: user?.address, pincode: user?.pincode })
    }
    useEffect(() => {
        getdata();
        // eslint-disable-next-line
    })
    // console.log("CartScreen",address); //
    const selectedItems = (total, sum) => {
        if (sum.isSlected === "true")
            totalsum = total + 1;
        return totalsum;
    }
    let selected = Products.reduce(selectedItems, 0);
    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: [e.target.value] })
    }
    const paymentOption = (e) => {
        setPaymenttype(e.currentTarget.value);
    }
    const cod = async () => {
        try {
            const newurl = geturl("/payment/cod");
            const selectedProducts = Products.filter((item) => item?.isSlected === "true");
            const result = await axios.post(newurl,
                {
                    products: selectedProducts,
                    userid: user.userid,
                    admin_id: selectedProducts[0].admin_id,
                    address:`${address.address} Pincode:${address.pincode}`
                });
            result.data.msg === "success" && selectedProducts.map(item => remove_to_cart(item));
            result.data.msg ? navigate("/thankyou", { state: result.data }) : alert('Something went wrong!', 'warning');
        } catch (error) {
            alert("Server error", "danger");
        }
    }
    const payment = () => {
        paymentType === "COD" ? cod() : displayRazorpay();
    }
    return (
        <>
            <div className='container-sm bg-body shadow-lg p-3 my-4'>
                <div className='d-flex justify-content-center'>
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-shopping-bag-1970453-1669843.png"
                        alt="cartIcon"
                        width={"40px"} />
                    <h3>My Cart</h3>
                </div>
                {Products.length > 0 ?
                    <div className='container d-flex'>
                        <div className='container-sm bg-body p-3 my-3 mx-1 d-flex'>
                            <div className="d-flex flex-column w-75 border-top">
                                {Products.map((item) => <Showcartitems Products={item} key={item.item_id} />)}
                                <div className='border-top my-1 px-4'>
                                    <h5 className='float-left'>{selected} items</h5>
                                    <h5 className='float-right'>All Total ₹{sum}</h5>
                                </div>
                            </div>
                            <div>
                                {Products.length > 0 && <div className='container-sm shadow-sm mx-2'>
                                    <div className='container-sm  p-2 my-2 rounded '>
                                        <h6>Shipping Cost : <span className='float-right'>₹50</span></h6>
                                        <h6>Discount : <span className='float-right'>₹0</span></h6>
                                        <h5 className='align-self-center'>Estimated Total: <span className='float-right'
                                            style={{ color: "#f56042" }}>₹{sum === 0 ? sum : sum + 50}</span></h5>
                                        <button className="btn btn-outline-success w-100 my-4 "
                                            // onClick={displayRazorpay}
                                            data-toggle="modal" data-target="#exampleModal2"
                                            disabled={(sum === 0 || !address.address || !address.pincode) ? true : false}>Checkout</button>
                                    </div>
                                    <button type="button" className="btn btn-info float-right p-1 " data-toggle="modal" data-target="#exampleModal1">
                                        {user?.address ? "Change address" : "Add Address"}</button>
                                    {user?.address && <div className='p-2' style={{ width: "17vw" }}>
                                        <h5>Your Address</h5>
                                        <span style={{ wordWrap: "break-word" }}>{user?.address}</span>
                                        <h5>Pincode: {user?.pincode}</h5>
                                    </div>}
                                </div>
                                }
                            </div>
                        </div>
                    </div> :
                    <div className='d-flex justify-content-center '>
                        <img src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png'
                            alt="pic" />
                    </div>
                }
            </div>
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Your Address</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control mb-1"
                                placeholder="Pin Code" onChange={handleChange}
                                name='pincode'
                                value={address?.pincode}
                            />
                            <textarea className='w-100 border form-control mb-1'
                                placeholder='Address' rows={10} name="address"
                                value={address?.address}
                                onChange={handleChange}></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => setUserAddress(address)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="exampleModalLabel">Total Pay : ₹{sum + 50}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="radio" className='m-2' aria-label="Cash on delivery" name='payment'
                                value={"COD"} onChange={(e) => paymentOption(e)} />
                            <span>Cash on Delivery</span><br />
                            <input type="radio" className='mx-2' aria-label="Razorpay" name='payment'
                                value={"Online"} onChange={(e) => paymentOption(e)} />
                            <span>Razorpay</span>
                        </div>
                        <div className="modal-footer border-0">
                            {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                            {paymentType && <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={payment}>
                                Place Order</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartScreen