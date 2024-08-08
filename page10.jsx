import React, { useState, useEffect } from 'react';
import './style10.css'; // Import the CSS file

function Page10() {
  const [data, setData] = useState([]);
  const [error, setErr] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5600/Orders");
        if (!response.ok) {
          throw new Error(`Failed to fetch Orders data: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setErr(error.message);
        console.error("Error fetching Orders data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="page-container">
      <h1>Received Orders</h1>
      {error && <div className="error-message">{error}</div>}
      {data.length === 0 ? (
        <div>No orders available</div>
      ) : (
        data.map((order) => (
          <div className="order-container" key={order._id}>
            <div className="order-details">
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Pincode:</strong> {order.pincode}</p>
              <p><strong>Phone:</strong> {order.Phone}</p>
              <p><strong>Total Price:</strong> ${order.Price}</p>
            </div>
            <h3>Items Ordered:</h3>
            <div className="item-container">
              {order.Order.length === 0 ? (
                <p>No items in this order.</p>
              ) : (
                order.Order.map((item) => (
                  <div className="item" key={item._id}>
                    <img src={item.img1} alt={item.name} />
                    <h4>{item.name}</h4>
                    <p><strong>User Id:</strong> {item.user}</p>
                    <p><strong>Size:</strong> {item.Size}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Page10;


