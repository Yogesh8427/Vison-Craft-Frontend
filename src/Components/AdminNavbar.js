import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import { alert } from '../Redux/actions/alertaction';
function AdminNavbar() {
    const navigate=useNavigate();
    const logout = () => {
        alert("logout succesfully", "success");
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow bg-white rounded">
                <Link className="navbar-brand" to="/admin">Vision Craft</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="nav-item">
                            <Link className={`nav-link ${effect.image}`} to="/mens">Men's</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${effect.image}`} to="/womens">Women's</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${effect.image}`} to="/kids">Kid's</Link>
                        </li> */}
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        {(!localStorage.getItem('token'))
                            ? <Link to={'/login'} className="btn btn-outline-dark my-2 my-sm-0">Login</Link>
                            : <div className="dropdown show">
                            <Link className="btn  dropdown-toggle"
                                to="/admin" role="button"
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
                            </div>
                        </div>

                        }
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

export default AdminNavbar