import React, { useState, useEffect } from "react";
import { getLoggedInUser, clearLoggedInUser } from "./authUtils";
import { Navigate } from "react-router-dom";
import "./style12.css";

function Page12() {
    const [data, setData] = useState(null); // Expecting an object that contains user details and orders
    const [user, setUser] = useState(null);
    const [error, setErr] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = () => {
            const loggedInUser = getLoggedInUser();
            setUser(loggedInUser);
            setLoading(false); // Data fetching will begin after this
            console.log('Logged-in user:', loggedInUser);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (!user) return; // Exit if no user
  
        const fetchData = async () => {
            setLoading(true); // Set loading to true when starting to fetch data
            try {
                const response = await fetch(`http://localhost:5600/Orders/${user.name}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                setErr('Error fetching data: ' + error.message);
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };
    
        fetchData();
    }, [user]);

    // Function to handle logout
    const handleLogout = () => {
        clearLoggedInUser();
        // Redirect to the login page or homepage after logout
        window.location.href = "/Auth"; // Adjust the redirect path if necessary
    };

    // Redirect to login page if no user and not loading
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/Auth" />;
    }

    return (
        <div className="page-container78">
            <button onClick={handleLogout} className="logout-button34">
                Logout
            </button>
            <h2 className="welcome-message">Welcome {user.name}</h2>
            <div className="profile-and-orders23">
                <div className="profile-section234">
                    <div className="profile-details678">
                        <p><strong>ID:</strong> {user._id}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                </div>
                <div className="orders-section345">
                    {error && <div className="error-message">{error}</div>}
                    {data && data.length === 0 ? (
                        <div>No orders available</div>
                    ) : (
                        data && data.map((order) => (
                            <div className="order-container23" key={order._id}>
                                <div className="order-details123">
                                    <p><strong>Name:</strong> {order.name}</p>
                                    <p><strong>Address:</strong> {order.address}</p>
                                    <p><strong>Pincode:</strong> {order.pincode}</p>
                                    <p><strong>Phone:</strong> {order.Phone}</p>
                                    <p><strong>Total Price:</strong> ${order.Price}</p>
                                </div>
                                <h3>Items Ordered:</h3>
                                <div className="item-container345">
                                    {order.Order.length === 0 ? (
                                        <p>No items in this order.</p>
                                    ) : (
                                        order.Order.map((item) => (
                                            <div className="item345" key={item._id}>
                                                <img src={item.img1} alt={item.name} />
                                                <h4>{item.name}</h4>
                                                <p><strong>Price: $</strong>{item.Price}</p>
                                                <p><strong>Size:</strong> {item.Size}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page12;




