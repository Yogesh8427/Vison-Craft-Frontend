import React from 'react'
import { remove_to_cart, update_to_cart } from '../Redux/actions/cartaction';
import { alert } from '../Redux/actions/alertaction';
function Showcartitems({ Products }) {

    // console.log("Showcartitems", Products);
    const onincrease = () => {
        if (Products.Quantity < Products.actualQuantity) {
            Products = { ...Products, Quantity: Products.Quantity + 1 };
            update_to_cart(Products)
        }else{
            alert("you  have reached the maximum quantity for this product", "danger");
        }
    }
    const ondecrease = () => {
        if (Products.Quantity > 1) {
            Products = { ...Products, Quantity: Products.Quantity - 1 };
            update_to_cart(Products)
        }
    }
    const handlechange = (e) => {
        Products = { ...Products, isSlected: e.target.checked };
        update_to_cart(Products);
    }
    const removeItemFromCart = (Products) => {
        remove_to_cart(Products);
    }
    return (
        <>
            <div className='container d-flex my-5 shadow-sm bg-body'>
                <div className='d-flex align-self-center justify-content-center' style={{ 'width': '10%' }}>
                    <input
                        type="checkbox"
                        id="bootstrap"
                        style={{ "width": "3vw", "height": "3vh" }}
                        checked={Products.isSlected === "true" && Products.availability === "true" ? true : false}
                        disabled={Products.availability === "false" ? true : false}
                        onChange={handlechange}
                    />
                </div>
                <div className='d-flex flex-column align-self-center' style={{ 'width': '25%' }}>
                    <img className='card-img-top'
                        src={Products.image}
                        style={{ width: "100%" }}
                        alt='item pic'
                    >
                    </img>
                    <div className='w-100 d-flex flex-column align-items-center'>
                        <span className='font-weight-bold'>Quantity</span>
                        <div>
                            <button type="button"
                                className="btn btn-danger mx-2 my-2 font-weight-bold "
                                // style={{ width: "10px" }}
                                onClick={ondecrease}>-</button>
                            <input type='text' style={{ width: "2vw", textAlign: "center" }}
                                min={1} value={Products.Quantity} readOnly />
                            <button type="button"
                                className="btn btn-success mx-2 font-weight-bold"
                                // style={{ width: "10%", height: '30%' }}
                                onClick={onincrease}>+</button>
                        </div>
                    </div>
                </div>
                <div className='px-3' style={{ 'width': '30%' }}>
                    <h3 className='text-center'>{Products.brand}</h3>
                    <div className='d-flex '>
                        <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
                            <span className='w-100'><b>Model: </b>{Products.model}</span>
                            <span className='w-100'><b>Size: </b>{Products.size}</span>
                        </div>
                    </div>
                    {Products.availability === "false" && <div className="alert alert-warning my-1 p-1 text-center" role="alert">
                        Currently Product is Not  Available
                    </div>}
                </div>
                <div className='px-2' style={{ 'width': '30%' }}>
                    <span className='font-weight-bold'>Each Price: <span className='float-right'> ₹{Products.price} X {Products.Quantity}</span></span>
                    <h3>Total: <span className='float-right' style={{ color: "#f56042" }}>₹{Products.price * Products.Quantity}</span></h3>
                    <button
                        type="button"
                        className="btn btn-danger w-100 my-3 float-right"
                        data-toggle="modal"
                        data-target={`#staticBack${Products.item_id}`}
                    >
                        Remove Item
                    </button>
                </div>
            </div>
            <div className="modal fade "
                id={`staticBack${Products.item_id}`}
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
                            <button onClick={() => removeItemFromCart(Products)} type="button"
                                className="btn btn-primary"
                                data-dismiss="modal">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Showcartitems