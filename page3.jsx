import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import "./style3.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { getLoggedInUser, clearLoggedInUser } from "./authUtils";
function Page3() {
  const { name } = useParams(); // Extract product name from URL
  const [data, setData] = useState(null);
  const location = useLocation();
  const [Size , setSize]  = useState('')// Get current location
  const [ error , setErr] = useState('')
  const [user, setUser] = useState(null);
  const sliderSettings = { 
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  function handleSize(option){
  setSize(option)
  }
  useEffect(() => {
    const fetchData = async () => {
      let url = '';

      // Construct URL based on the current path
      if (location.pathname.includes('/Male')) {
        url = `http://localhost:5600/Male/${name}`;
      } else if (location.pathname.includes('/Female')) {
        url = `http://localhost:5600/Female/${name}`;
      }

      if (url) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const responseData = await response.json();
          console.log(responseData);
          setData(responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    
    fetchData();
  }, [name, location.pathname]); 
  useEffect(() => {
    const fetchUser = () => {
      const loggedInUser = getLoggedInUser();
      setUser(loggedInUser);
      console.log('Logged-in user:', loggedInUser);
    };

    fetchUser();
  }, []); // Add location.pathname to dependency array
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const newData = {
        user : user.name , 
        name: data.name , 
        Price: data.Price , // Convert price to a number
        Colour: data.Colour ,
        img1: data.img1 ,
        img2: data.img2 ,
        img3: data.img3 , 
        descrip: data.descrip ,
        Fit: data.Fit , 
        mini: data.mini ,
        Size : Size 
    };

     // Log the data

    const dataToSend = [newData];
     console.log(dataToSend) ; 
    try {
       
        const response = await fetch(`http://localhost:5600/Cart`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend) // Send as an array
        });

        if (!response.ok) {
            throw new Error(`Failed to add item: ${response.statusText}`);
        }

       

      
        console.log('Product added successfully');
    } catch (error) {
        setErr(error.message);
        console.error("Error adding item:", error);
    }
};

  if (!data) return <div>Loading...</div>;
  
  return (<>
<div className='Container6'> <div className="Admin2"> Admin </div>
    <div className="Heado">ZXW</div>
    <div className="Cart"> <ul><li className="items" id="cart">Bag</li>
           </ul></div></div>
                <div className='Container3'><div className="images1">
          <Slider {...sliderSettings}>
            <div><img src={data.img1} alt="Product Image 1" /></div>
            <div><img src={data.img2} alt="Product Image 2" /></div>
            <div><img src={data.img3} alt="Product Image 3" /></div>
          </Slider>
        </div>
                <div className='Cont'><div id="NAME">{data.name}</div> <div id="Mini">{data.mini} </div> <div id="innercontent"><div id="Fit">Fit : {data.Fit}</div>
                <div id="Fit" >Price : ${data.Price}</div><div id="Fit"  >Colour : {data.Colour}</div></div><div id="descrip">{data.descrip}</div></div></div>
 <div><button className='Cartbutton' onClick={handleSubmit}>Add to Bag</button></div>   <div className="Sizing">
          <label htmlFor="Size">Size:</label>
          <div className="SizeOptions">
            {['XS', 'S', 'M', 'L', 'XL'].map(option => (
              <button
                key={option}
                className={`SizeOption ${Size === option ? 'active' : ''}`}
                onClick={() => handleSize(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
</>
);
}

export default Page3;
