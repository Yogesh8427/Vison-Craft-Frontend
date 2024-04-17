import React, { useEffect } from 'react'
import Cards from './Cards'
import style from './cssstyle/showitems.module.css'
import eyewearProducts from '../utils/dummydata'
import { geturl } from '../config/url'
import axios from 'axios'
function ShowItems(){
  const[products, setProducts] = React.useState([]);
  const getData=async()=>{
    try {
      const url=geturl('/products/getitems');
      const response=await axios(url);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className={style.container}>
      {products.map((item) => <Cards item={item} key={item.item_id} />)}
    </div>
  )
}

export default ShowItems