import React, { useEffect, useState } from 'react'
import { geturl } from "../config/url.js"
import { Link, useNavigate } from 'react-router-dom'
import { alert } from "../Redux/actions/alertaction.js"
import axios from 'axios'
import { set_data_to_cart } from '../Redux/actions/cartaction.js'
function LoginSingup() {
  const [login, setlogin] = useState({ useremail: "", userpassword: "" })
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [])
  const sendReq = async (e) => {
    e.preventDefault();
    const url = geturl("/auth/login");
    let result = await axios.post(url, login);
    const data = result.data;
    if (data.status === 200) {
      localStorage.setItem("name", `${data.result[0].firstName + " " + data.result[0].lastName}`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', `${data.result[0].role}`);
      set_data_to_cart().then(() => {
        alert(data.message, "success");
        if (data.result[0].role === 'user') {
          navigate("/");
        }
        else {
          navigate('/admin');
        }
      })
    } else if (data.status === 400) {
      alert(data.error, "danger");
    }
  }
  const onHandel = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  }

  return (
    <div className='container-sm bg-body shadow d-flex flex-row my-5 p-0 rounded'>
      <div className='w-75 ' >
        <img
          src='https://img.freepik.com/premium-vector/online-registration-sign-up-login-account-smartphone-app-user-interface-with-secure-password-mobile-application-ui-web-banner-access-cartoon-people-vector-illustration_2175-1078.jpg'
          alt="pic" />
      </div>
      <div className='w-50 px-5 bg-light'>
        <h2 className='text-center my-5'>Login/<Link to={"/singup"}>Signup</Link></h2>
        <form onSubmit={sendReq}>
          <div  className='d-flex flex-column justify-content-center px-4 '>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className='font-weight-bold '>Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                name='useremail' onChange={onHandel} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else. </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className='font-weight-bold'>Password</label>
              <input type="password" className="form-control " id="exampleInputPassword1" name='userpassword' onChange={onHandel} />
            </div>
          </div>
          <div className='d-flex justify-content-end px-4'>
            <button type="submit" className="btn btn-primary ">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginSingup
