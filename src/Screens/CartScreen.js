import React from 'react'
import Showcartitems from '../Components/Showcartitems'
import { useSelector } from 'react-redux'

function CartScreen() {
    const Products = useSelector((state) => state.cartreducer)
    return (
        <div className='container-sm bg-body shadow-lg p-3 my-3 '>
            <h3 className='text-center'>Your Cart</h3>
            {Products.map((item) => <Showcartitems Products={item} key={item.id}/>)}
            {Products.length > 0 ? <div>
                <div className='container-sm d-flex justify-content-between p-2 my-2 bg-light rounded '>
                    <h3 className='align-self-center'>Grand Total:</h3>
                    <button className="btn btn-outline-success btn-lg">Procced to Checkout</button>
                </div>
            </div> :
                <div className='d-flex justify-content-center '>
                    <img src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png' />
                </div>
            }
        </div>
    )
}

export default CartScreen