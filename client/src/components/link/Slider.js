import React from "react";
import ft1 from '../../assets/images/link/ft1.png';
import ft2 from '../../assets/images/link/ft2.png';
import ft3 from '../../assets/images/link/ft3.png';
import ft4 from '../../assets/images/link/ft4.png';
import ft5 from '../../assets/images/link/ft5.png';
import { Carousel } from 'react-responsive-carousel';
import './Slider.css';

function Slider() {
    return (
        <Carousel 
            infiniteLoop={true} 
            autoPlay={true} 
            interval={2000}
            showStatus={false}
        >
            <div><img src={ft1} alt="ft1"></img></div>
            <div><img src={ft2} alt="ft2"></img></div>
            <div><img src={ft3}  alt="ft3"></img></div>
            <div><img src={ft4} alt="ft4"></img></div>
            <div><img src={ft5} alt="ft5"></img></div>
        </Carousel>
    )
}

export default Slider;