import React from 'react'
import style from  './cssstyle/poster.module.css';
function Postershow() {
    return (
        <>
            <div style={{ overflow: "hidden",position:"relative" }}>
            <div className={style.text}>
                <h1> “Get Ready to See the World”</h1>
                </div>
                <img src="https://media.vogue-eyewear.com/2023/03_VDAY/HP/HeroZ1bis_dektop.jpg" className="img-fluid"
                    alt="..." style={{ width: "100%", height: "300px", }}></img>
            </div>
        </>
    )
}
export default Postershow
