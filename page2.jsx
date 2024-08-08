import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style2.css"

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Page2() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      let url = '';

      if (location.pathname.includes('/Male')) {
        url = "http://localhost:5600/Male";
      } else if (location.pathname.includes('/Female')) {
        url = "http://localhost:5600/Female";
      }

      if (url) {
        try {
          const response = await fetch(url);
          const responseData = await response.json();
         
          setData(responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [location.pathname]);
  const cleanedPathname = location.pathname.replace(/^\/+/, '');
  return (
    <>
      <div className="Title">{cleanedPathname}</div>
      <div className="Cards">
        {data.map((product, index) => (
          <Link to={`/${cleanedPathname}/${product.name}`} key={index} className="product-link">
            <div className="product">
              <div className="pimage">
                <img src={product.img2} alt={`Product Image ${index + 1}`} />
              </div>
              <p className="product-name">{product.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Page2;
