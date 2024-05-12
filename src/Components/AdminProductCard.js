import React from 'react'
import { geturl } from '../config/url'
import axios from 'axios'
import { alert } from '../Redux/actions/alertaction'
import { Link } from 'react-router-dom'
function AdminProductCard({ product }) {
    const sendrequest = async (product) => {
        const url = geturl("/admin/deleteitem");
        const config = { headers: { authToken: localStorage.getItem('token') } }
        const result = await axios.post(url, { item_id: product.item_id, image: product.image }, config);
        if (result.data.status === 200) {
            alert(result.data.message, "success");
            window.location.reload();
        }
    }
    const availableNow = async (data) => {
        const url = geturl("/admin/availabeitem");
        const config = { headers: { authToken: localStorage.getItem('token') } }
        const result = await axios.post(url, { item_id: product.item_id, availability: `${data}` }, config);
        if (result.data.status === 200) {
            alert(result.data.message, "success");
            window.location.reload();
        }

    }
    return (
        <div>
            <div className="container-sm shadow p-3 d-flex my-1">
                <div className='d-flex justify-content-center align-items-center rounded' style={{ width: "33%" }}>
                    <img src={product.image} alt="" width={'200px'} />
                </div>
                <div className='px-3 d-flex justify-content-around py-3' style={{ width: "33%" }}>
                    <div className='p-2'>
                        <p><b>Brand: </b>{product.brand}</p>
                        <p><b>Modal: </b>{product.model}</p>
                        <p><b>Price: </b>₹{product.Price}</p>
                    </div>
                    <div className='p-2'>
                        <p><b>Size:  </b>{product.size}mm</p>
                        <p><b>Quantity:  </b>{product.Quantity}</p>
                        <p><b>Category:  </b>{product.category}</p>
                    </div>
                </div>
                <div className='d-flex flex-column px-5' style={{ width: "33%" }}>
                    <Link type="button" className="btn btn-primary my-1 w-75"
                    state={product} to="/adminadditem">Edit Product</Link>
                    {product.availability === "true"
                        ? <button type="button" className="btn btn-success my-1 w-75" onClick={() => availableNow(false)}>
                            Available Now</button>
                        : <button type="button" className="btn btn-warning my-1 w-75" onClick={() => availableNow(true)}>
                            Currently Not Available</button>
                    }
                    <button
                        type="button"
                        className="btn btn-danger w-75 my-1 "
                        data-toggle="modal"
                        data-target={`#staticBack${product.item_id}`} >
                        Remove Product
                    </button>
                </div>
            </div>
            <div className="modal fade "
                id={`staticBack${product.item_id}`}
                data-backdrop="static"
                data-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <h4>Do You Really Want To Remove This Item!!!</h4>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            <button type="button"
                                onClick={() => sendrequest(product)}
                                className="btn btn-primary"
                                data-dismiss="modal">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProductCard
