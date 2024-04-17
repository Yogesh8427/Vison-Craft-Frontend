import React, { useEffect, useState } from 'react'
import AdminProductCard from '../Components/AdminProductCard'
import { geturl } from '../config/url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function AdminProductDetails() {
    const [data, setData] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        if (localStorage.getItem('role') === "user") {
            navigate('/');
        } else {
            const getData = async () => {
                const url = geturl("/admin/yourproducts");
                const config = { headers: { authToken: localStorage.getItem('token') } }
                const result = await axios.get(url, config);
                setData(result.data.data);
            }
            getData();
        }
    }, [])
    return (
        <div className='container-sm shadow-lg my-3 p-2 rounded position-relative'>
            <h3 className='text-center my-1'>Your Product</h3>
            <div className='float-right mr-3 mb-3'>
                <button className="shadow rounded-pill px-2 btn btn-primary" 
                onClick={()=>navigate("/adminadditem")}
                >Add item</button>
            </div>
            {data.map((item) => <AdminProductCard product={item} key={item.item_id} />)}
        </div>
    )
}

export default AdminProductDetails
