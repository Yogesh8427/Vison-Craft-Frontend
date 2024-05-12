import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { geturl } from '../config/url';
import { alert } from '../Redux/actions/alertaction';
function Admin() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const emptyImage = "https://cdn.icon-icons.com/icons2/1875/PNG/512/additem_120286.png";
  const [image, setImage] = useState(data ? data.image : emptyImage);
  const [file, setFile] = useState(null);
  const [item, setItem] = useState({
    brand: data?.brand,
    model: data?.model,
    price: data?.Price,
    Quantity: data?.Quantity,
    size: data?.size,
    category: data?.category,
    image:data?.image,
    item_id:data?.item_id,
    admin_id:data?.admin_id,
    availability:data?.availability
  });
  useEffect(() => {
    if (localStorage.getItem('role') === "user") {
      navigate('/');
    }
    // eslint-disable-next-line 
  }, [])
  const productImage = (e) => {
    setFile(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    }
  }
  const onChangeHandel = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  }
  const setData = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append('file', file);
      formdata.append("data", JSON.stringify(item));
      const config = { headers: { authToken: localStorage.getItem('token') } }
      const url = geturl('/admin/additem');
      const responce = await axios.post(url, formdata, config);
      alert(responce.data.message, "success");
      setImage(emptyImage);
      setItem({ brand: "", model: "", price: 0, Quantity: 0, size: 0, category: "" })
    } catch (error) {
      console.log("There is an error to send a data to a server");
    }
  }
  const updateData=async(e)=>{
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append('file', file);
      formdata.append("data", JSON.stringify(item));
      const config = { headers: { authToken: localStorage.getItem('token') } }
      const url = geturl('/admin/updatedetails');
      const responce = await axios.post(url, formdata, config);
      alert(responce.data.message, "success");
      navigate('/admin')
    } catch (error) {
      console.log("There is an error to send a data to a server");
    }
  }
  return (
    <>
      <div className='container-sm  shadow-lg my-4 p-1 rounded'>
        <h4 className='text-center p-1'
          style={{ color: "#3da8f5" }}>
          {data ? "Edit Product" : "Add Product"}</h4>
        <div className='container-sm  shadow-sm p-1 rounded'>
          <form className='d-flex'>
            <div className='w-50 border p-3 mx-2'>
              <img src={image}
                className="img-fluid mx-auto d-block my-2" alt="add image" width={200} />
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="custom-file-input rounded"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={productImage} required />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                </div>
              </div>
              <label htmlFor='brandname' className='my-1' >Brand Name : </label>
              <input type="text" className="form-control " placeholder="Brand Name" id="brandname" name='brand'
                value={item.brand}
                onChange={onChangeHandel} />
              <label htmlFor='Modal' className='my-1' >Model : </label>
              <input type="text" className="form-control" placeholder="Modal" id="Modal" name='model'
                value={item.model}
                onChange={onChangeHandel} />
            </div>
            <div className='w-50 border p-3 rounded'>
              <label htmlFor='Price' className='my-1' >Price : </label>
              <input type="number" className="form-control" placeholder="Prices" id="Price" name='price'
                onChange={onChangeHandel} value={item.price} />
              <label htmlFor='quantity' className='my-1' >Quantity : </label>
              <input type="number" className="form-control " placeholder="Quantity" id="Price" name='Quantity'
                onChange={onChangeHandel} value={item.Quantity} />
              <label htmlFor='Sizes' className='my-1' >Size : </label>
              <input type="number" className="form-control " placeholder="Size" id="Sizes" name='size'
                onChange={onChangeHandel} value={item.size} />
              <label htmlFor='Sizes' className='my-1' >Category : </label>
              <select className='w-100 mb-4 p-2 border rounded' name='category' value={item.category} onChange={onChangeHandel}>
                <option >---Select---</option>
                <option value={"men"}>men</option>
                <option value={"women"}>women</option>
                <option value={"kids"}>kids</option>
              </select>
              {data
                ? <button type="submit" className="btn btn-success float-right" onClick={e => updateData(e)}>Edit</button>
                : <button type="submit" className="btn btn-success float-right" onClick={e => setData(e)}>Add</button>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Admin