import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { add_to_cart, remove_to_cart } from '../Redux/actions/cartaction';
import { useSelector } from 'react-redux';
import { alert } from '../Redux/actions/alertaction';
function ProductDetail() {
    const location = useLocation();
    let data = location.state;
    const product = useSelector(state => state.cartreducer);
    const navigate = useNavigate();
    const set_size = (e) => {
        data = { ...data, size: e.target.value };
    }
    const add_item_cart = (item) => {
        if (!localStorage.getItem('token')) {
            alert("Please Login First", "warning");
            navigate('/login');
        } else {
            alert("Added to Cart Successfully!", "success");
            add_to_cart(item);
        }
    }
    const remove_item_cart = (item) => {
        remove_to_cart(item);
        alert("Removed From Cart Successfully", "info");
    }
    return (
        <>
            <div className='container-sm d-flex my-5 shadow-sm p-0 h-100' >
                <div className='w-50 align-self-center p-4'>
                    <img className='card-img-top'
                        src={data.image}
                        alt="Card"
                    >
                    </img></div>
                <div className='w-50 p-5 bg-light rounded'>
                    <p>{data.model}</p>
                    <h3>{data.brand}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat similique dicta nulla praesentium deserunt.
                        Corporis repellendus deleniti dolores eligendi.</p>
                    <p>Frame size</p>
                    <select className='w-100 mb-4 p-2 border rounded' onChange={set_size}>
                        <option >48</option>
                        <option >42</option>
                        <option >52</option>
                    </select>
                    {data.availability === "false" ?
                        <button type="button" className="btn btn-outline-warning" disabled>Out of Stock</button> :
                        product.some((item) => item.id === data.id) ?
                            <button button type="button" className="btn btn-outline-danger"
                                onClick={() => remove_item_cart(data)}>Remove To Cart</button> :
                            <button type="button" className="btn btn-outline-success"
                                onClick={() => add_item_cart(data)}>Add To Cart</button>
                    }
                </div>
            </div >
        </>
    )
}

export default ProductDetail