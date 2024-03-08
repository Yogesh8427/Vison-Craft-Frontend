import React from 'react'
import Cards from './Cards'
import style from './cssstyle/showitems.module.css'
function ShowItems() {
    const eyewearProducts = [
        {
          id: 1,
          brand: 'Ray-Ban',
          model: 'Aviator',
          price: 1500.00,
          images: ['https://m.media-amazon.com/images/I/61wi1rzudSL._AC_UY1100_.jpg']
        },
        {
          id: 2,
          brand: 'Oakley',
          model: 'Holbrook',
          price: 1200.00,
          images: ['https://www.framesdirect.com/product_elarge_images/oakley-eyeglasses-ox8081-0351-plank2-soft-touch-uni-blue.jpg']
        },
        {
          id: 3,
          brand: 'Prada',
          model: 'Round',
          price: 2500.00,
          images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXkqgJRy_5hmv1htYB_m5O1kAfUcf4j6zQtw&usqp=CAU']
        },
        {
          id: 4,
          brand: 'Prada',
          model: 'Round',
          price: 2500.00,
          images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXkqgJRy_5hmv1htYB_m5O1kAfUcf4j6zQtw&usqp=CAU']
        },
        // Add more eyewear objects as needed
      ];
  return (
    <div className={style.container}>
    {eyewearProducts.map((item)=><Cards item={item} key={item.id}/>)}
    </div>
  )
}

export default ShowItems