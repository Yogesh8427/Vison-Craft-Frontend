import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { geturl } from '../config/url';
import { alert } from '../Redux/actions/alertaction';
function Signup() {
    const[user,setuser]=useState({firstName:"",lastName:"",email:"",password:""});
    const navigate=useNavigate();
    const sendReq= async(e)=>{
        e.preventDefault();
        const url=geturl("/auth/createUser");
        const result=await axios.post(url,user);
         if (result.data.status===200){
            alert(result.data.message,'success');
            navigate( "/login");
         }else{
            alert(result.data.message,'danger');
         }
        
    }
    const changeHandler=(e)=>{
        setuser({...user,[e.target.name]:e.target.value});
    }
    return (
        <div className='container-sm bg-body shadow d-flex flex-row my-5 p-0 rounded'>
            <div className='w-50 '>
                <img
                    src='https://img.freepik.com/premium-vector/online-registration-sign-up-login-account-smartphone-app-user-interface-with-secure-password-mobile-application-ui-web-banner-access-cartoon-people-vector-illustration_2175-1078.jpg' 
                    alt="pic"/>
            </div>
            <div className='w-50 px-5 bg-light'>
                <h2 className='text-center my-3 '><Link to={"/login"}>Login</Link>/Signup</h2>
                <form onSubmit={sendReq} >
                    <div className="form-group d-flex justify-content-between">
                        <div>
                            <label htmlFor="exampleInputEmail1" className='font-weight-bold'>First Name</label>
                            <input type="text" className="form-control" id="exampleInputusername" name='firstName'
                            onChange={changeHandler}/>
                        </div>
                        <div>
                            <label htmlFor="exampleInputEmail1" className='font-weight-bold'>Last Name</label>
                            <input type="text" className="form-control" id="exampleInputusername" name="lastName"
                             onChange={changeHandler}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className='font-weight-bold'>Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                            name="email"  onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className='font-weight-bold'>Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" 
                        name="password"  onChange={changeHandler}
                       />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className='font-weight-bold'>Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button type="submit" className="btn btn-primary float-right my-3">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
