import { React } from 'react'
import Showcartitems from '../Components/Showcartitems'
import { useSelector } from 'react-redux';
function CartScreen() {
    const Products = useSelector((state) => state.cartreducer);
    let totalsum = 0;
    const getsum = (total, sum) => {
        if (sum.isSlected === "true")
            totalsum = total + parseInt(sum.price) * parseInt(sum.Quantity);
        return totalsum;
    }
    const selectedItems=(total,sum)=>{
        if (sum.isSlected === "true")
        totalsum = total + 1;
    return totalsum;
    }
    let selected=Products.reduce(selectedItems,0);
    let sum = Products.reduce(getsum, 0);
    return (
        <div className='container-sm bg-body shadow-lg p-3 my-4'>
            <h3 className='text-center'>
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-shopping-bag-1970453-1669843.png"
                    alt="cartIcon"
                    width={"40px"} /> My Cart</h3>
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
                                    <h6>Shipping Cost : <h6 className='float-right'>₹50</h6></h6>
                                    <h6>Discount : <h6 className='float-right'>₹0</h6></h6>
                                    <h5 className='align-self-center'>Estimated Total: <h5 className='float-right'
                                     style={{color:"#f56042"}}>₹{sum===0?sum:sum+50}</h5></h5>
                                    <button className="btn btn-outline-success w-100 my-4 " 
                                    disabled={sum===0?true:false}>Checkout</button>
                                </div>
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
    )
}

export default CartScreen