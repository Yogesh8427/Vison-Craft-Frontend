import React from 'react'
import effect from './cssstyle/effects.module.css'
import cartnumber from './cssstyle/cartnumber.module.css'
import { Link } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from 'react-redux';
function Navbar() {
    const cartdata=useSelector((state)=>state.cartreducer);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow bg-white rounded">
                <Link className="navbar-brand" to="/">Vision Craft</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${effect.image}`} to="/mens">Men's</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${effect.image}`} to="#">Women's</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${effect.image}`} to="#">Kid's</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                     <Link to={"/cartScreen"} className={`nav-link ${effect.image} ${cartnumber.cartparent}`}>
                    <i className="bi bi-cart2" style={{fontSize:"xx-large"}}></i>
                    <span className={`bg-danger text-white rounded-circle ${cartnumber.cart}`}>{cartdata.length}</span>
                    </Link>   
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default Navbar
