import React,{useEffect} from 'react'
import Cards from '../Components/Cards'
import style from '../Components/cssstyle/showitems.module.css'
import axios from 'axios'
import { geturl } from '../config/url'
function Kids() {
       const[products, setProducts] = React.useState([]);
       const getData=async()=>{
         try {
           const url=geturl(`/products/get?category=${"kids"}`);
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
        <div className='container-sm my-5 p-2'>
            <h1 className='text-center'>Kid's Section</h1>
            <div className={style.container}>
                {products.map((item) => <Cards item={item} key={item.item_id} />)}
                {products.length===0 && 
                <img src='https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png?f=webp'
                alt="pic"/>}
            </div>
        </div>
    )
}

export default Kids
