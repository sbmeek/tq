import React, { useState } from "react";
import './slider.css';
import ft1 from '../../assets/images/link/ft1.png';
import ft2 from '../../assets/images/link/ft2.png';
import ft3 from '../../assets/images/link/ft3.png';
import ft4 from '../../assets/images/link/ft4.png';
import ft5 from '../../assets/images/link/ft5.png';

function Slider(){
    let sliderarr= [ <img  src={ft1}styleName="slideimage"></img>,<img src={ft2}styleName="slideimage"></img>,<img src={ft3}styleName="slideimage"></img>,<img src={ft4}styleName="slideimage"></img>,<img src={ft5}styleName="slideimage"></img>]
    const [X,setx]= useState(0)
    const goleft = () =>{
       X== 0 ? setx(-100 * (sliderarr.length -1)) : setx(X + 100);
    };
    const goright = () =>{
        X=== -100 * (sliderarr.length - 1) ? setx(0) : setx(X - 100);
    };
    
return(
    <div className="slider"    >
       <div styleName="slider">
        {
            sliderarr.map((item,index)=>{
                return(
                     <div  key={index} className="slide" styleName="slide" style={{transform: `translateX(${X}%)`}} >
                         {item}
                     </div>

                )

            })
            
        }
        <button styleName="goleft" onClick={goleft}>o-</button>
        <button styleName="goright"onClick={goright}>-o</button>
        </div>
    </div>
)
}
export default Slider;