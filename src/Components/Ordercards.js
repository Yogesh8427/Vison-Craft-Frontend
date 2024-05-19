import React from 'react'
function Ordercards({ product }) {
    return (
        <div>
            <div className="container-sm border rounded-pill p-3 d-flex justify-content-around my-1">
                <div className='d-flex  flex-column justify-content-center align-items-center rounded' style={{ width: "30%" }}>
                    <img src={product.image} alt="" width={'150px'} />
                </div>
                <div className='px-3 d-flex justify-content-around py-1' style={{ width: "70%" }}>
                    <div className='p-1' style={{ width: "30%" }}>
                        <p><b>Brand: </b>{product.brand}</p>
                        <p><b>Modal: </b>{product.model}</p>
                        <p><b>Size:  </b>{product.size}mm</p>
                    </div>
                    <div className='p-1' style={{ width: "30%" }}>
                        <p><b>Category:  </b>{product.category}</p>
                        <p><b>Quantity:  </b>{product.Quantity}</p>
                        <p><b>Price: </b><b className='text-success'>₹{product.Price}</b></p>
                    </div>
                    <div className='p-1' style={{ width: "50%" }}>
                        <p><b>Total Amount: {product.Price}  X {product.Quantity} =
                        </b><b className='text-success'>₹{product.Price * product.Quantity}</b></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ordercards
