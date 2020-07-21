import React, { useState } from "react";
import './slider.css';
import ft1 from '../../assets/images/link/ft1.png';
import ft2 from '../../assets/images/link/ft2.png';
import ft3 from '../../assets/images/link/ft3.png';
import ft4 from '../../assets/images/link/ft4.png';
import ft5 from '../../assets/images/link/ft5.png';

function Slider(){
   
    
    
    
    
return(
    <div className="slider"    >
       <div styleName="slider">
        
            
                
                     <div   className="slide" styleName="slide"  >
                         <ul>
                         <img  src={ft1}styleName="slideimage"></img>
                         <img src={ft2}styleName="slideimage"></img>
                         <img src={ft3}styleName="slideimage"></img>
                         <img src={ft4}styleName="slideimage"></img>
                         <img src={ft5}styleName="slideimage"></img>
                         </ul>
                     </div>

                )

            
        
        <button styleName="goleft" >o-</button>
        <button styleName="goright">-o</button>
        </div>
    </div>
)
}
export default Slider;