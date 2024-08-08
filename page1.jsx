import React from "react";
import "./style1.css"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "./assets/img1.jpg"
import img2 from "./assets/img2.jpg"
import img3 from "./assets/img3.jpg"
import { Link } from "react-router-dom";
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
function Page1() {

return(
    <> <div className="Overal2"><div>  <div className="Admin">
    <Link to="/Admin-Login" style={{textDecoration:"none" , color:"white" }}>Admin</Link>
  </div>
   
    <div className="Cart"> <ul><li className="items" id="cart"><Link to="/Bag " className="items" id="cart" >Bag</Link></li>
            <li className="items" id="btn1"><button><Link to="/Login " className="items" id="btn1" >Sign in</Link></button></li>
            <li className="items" id="btn2"><button><Link to="/Auth " className="items" id="btn2">Profile</Link>
                </button></li></ul></div></div>
<div className="Container1">
<div className="Head">ZXW</div><div className="Content"><ul>
<li className="options" id="Men"><Link to="/Male " className="options">Men</Link></li>
            <li className="options" id="Women"><Link to="/Female " className="options">Women</Link></li>
            <li className="options" id="Kids">Kids</li>
            <li className="options" id="Accessories">Accessories</li>
            <li className="options" id="Trend"><Link to="/Trending " className="options">Trending</Link></li>
        </ul> </div>
        
</div> </div></>
)
}
export default Page1 ; 