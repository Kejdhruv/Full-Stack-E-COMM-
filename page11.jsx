import React, { useState, useEffect } from "react";
import "./style11.css";
import { getLoggedInUser } from "./authUtils";

function Page11() {
  const [data, setData] = useState([]);
  const [error, setErr] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  const [name , setName] = useState('')
  const [Phone , setPhone] = useState('')
  const [address , setAdd] = useState('')
  const [Pin , setpin] = useState('') ; 
  // Fetch the logged-in user
  useEffect(() => {
    const fetchUser = () => {
      const loggedInUser = getLoggedInUser();
      setUser(loggedInUser);
      console.log('Logged-in user:', loggedInUser);
    };

    fetchUser();
  }, []);
  
  // Fetch data whenever the user changes
  useEffect(() => {
    if (!user) return; // Exit if no user
  
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5600/Cart/${user.name}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const responseData = await response.json();
        setData(responseData);
        calculateTotalPrice(responseData);
      } catch (error) {
        setErr('Error fetching data: ' + error.message);
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [user]); // Depend on user
  
  // Calculate the total price
  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.Price, 0);
    setTotalPrice(total);
  };

  // Handle remove item from cart
  const handleRemove = async (name) => {
    const encodedName = encodeURIComponent(name);

    try {
      const response = await fetch(`http://localhost:5600/Cart/${encodedName}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.statusText}`);
      }

      setData(prevData => {
        const updatedData = prevData.filter(item => item.name !== name);
        calculateTotalPrice(updatedData);
        return updatedData;
      });
    } catch (error) {
      setErr('Error deleting item: ' + error.message);
      console.error("Error deleting item:", error);
    }
  };
  const handlename = (event) => setName(event.target.value);
  const handleAdd = (event) => setAdd(event.target.value);
  const handlePhone = (event) => setPhone(event.target.value);
  const handlePin = (event) => setpin(event.target.value);
  // Handle checkout process
 
  const handleCheckout = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const newData = {
        name: name,
        Price: totalPrice.toFixed(2), // Convert price to a number
        address: address,
        pincode: Pin,
        Phone: Phone,
        Order: data 
    };

    // Log the data
    const dataToSend = [newData];
    console.log(dataToSend);

    try {
        // Send order data to server
        const response = await fetch(`http://localhost:5600/Orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend) // Send as an array
        });

        if (!response.ok) {
            throw new Error(`Failed to add item: ${response.statusText}`);
        }
    } catch (error) {
        setErr(error.message);
        console.error("Error during checkout:", error);
    }
     // Clear form fields
     setName('');
     setData(''); // Clear the cart data
     setPhone('');
     setAdd('');
     setpin('');
};


  return (
    <>
      <div className="CartHead">Cart</div>
      <div className="ItemsinCart">
        {data.length === 0 ? (
          <div>No items in the cart</div>
        ) : (
          data.map((item) => (
            <div className="CartItem" key={item.id}>
              <img src={item.img1} alt={item.name} className="CartItemImage" />
              <div className="CartItemDetails">
                <div className="CartItemName">{item.name}</div>
                <div className="CartItemPrice">${item.Price}</div>
                <div className="CartItemSize">Size: {item.Size}</div>
              </div>
              <button
                className="RemoveButton"
                onClick={() => handleRemove(item.name)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      <div className="CartFooter">
        <div className="TotalPrice">Total Price: ${totalPrice.toFixed(2)}</div>
        <button className="CheckoutButton" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
      <div className="CheckForm">
        <form onSubmit={handleCheckout}>
          <div className="checkbox">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={handlename}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="checkbox">
            <input
              type="text"
              id="Address"
              name="Address"
              required
              value={address}
              onChange={handleAdd}
            />
            <label htmlFor="address">Address</label>
          </div>
          <div className="checkbox">
          <input
              type="Number"
              id="Number"
              name="Number"
              required
              value={Phone}
              onChange={handlePhone}
            />
            <label htmlFor="Phone">Phone</label>
          </div>
          <div className="checkbox">
          <input
              type="Number"
              id="Pincode"
              name="Pincode"
              required
              value={Pin}
              onChange={handlePin}
            />
            <label htmlFor="Pincode">Pincode</label>
          </div>
        </form>
      </div>
      {error && <div className="Error">{error}</div>}
    </>
  );
}

export default Page11;




