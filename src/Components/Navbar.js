import { React, useEffect } from 'react'
import effect from './cssstyle/effects.module.css'
import cartnumber from './cssstyle/cartnumber.module.css'
import { Link, useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from 'react-redux';
import { alert } from '../Redux/actions/alertaction';
import { empty_cart } from '../Redux/actions/cartaction';
import { set_data_to_cart } from '../Redux/actions/cartaction';
import { empty_order } from '../Redux/actions/orderaction';
import { getUserAddress,emptyuser} from '../Redux/actions/useraction';
function Navbar() {
    const cartdata = useSelector((state) => state.cartreducer);
    const navigate=useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')){
            set_data_to_cart();
            getUserAddress();
        }
    }, [])
    const logout = () => {
        alert("logout succesfully", "success");
        empty_cart();
        empty_order();
        emptyuser();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate("/");
    }

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
                            <Link className={`nav-link ${effect.image}`} to="/womens">Women's</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${effect.image}`} to="/kids">Kid's</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        {(!localStorage.getItem('token'))
                            ? <Link to={'/login'} className="btn btn-outline-dark my-2 my-sm-0">Login</Link>
                            : <div className="dropdown show">
                                <Link className="btn  dropdown-toggle"
                                    to="#" role="button"
                                    id="dropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                        <img src='https://static.vecteezy.com/system/resources/previews/019/879/198/non_2x/user-icon-on-transparent-background-free-png.png' 
                                        alt='user'
                                        width={"50px"}/>
                                    {localStorage.getItem("name")}
                                </Link>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <button type="button" className="btn my-2 my-sm-0 w-100" data-toggle="modal" data-target="#staticBackdrop">
                                        logout
                                    </button>
                                    <Link to="/orders" className="btn my-2 my-sm-0 w-100">Your Orders</Link>
                                </div>
                            </div>

                        }
                        <Link to={"/cartScreen"} className={`nav-link ${effect.image} ${cartnumber.cartparent}`}>
                            <i className="bi bi-cart2" style={{ fontSize: "xx-large" }}></i>
                            {cartdata.length>0 &&
                            <span className={`bg-danger text-white rounded-circle ${cartnumber.cart}`}>{cartdata.length}</span>}
                        </Link>
                    </form>
                </div>

            </nav>
            <div className="modal fade "
                id="staticBackdrop"
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
                            <h2>Do you Want to logout!</h2>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            <button onClick={logout} type="button" className="btn btn-primary" data-dismiss="modal">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
