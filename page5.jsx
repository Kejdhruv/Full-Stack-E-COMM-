import React from 'react';
import { Link } from 'react-router-dom';
import './style5.css'; // Ensure this path is correct

function Page5() {
    return (
        <>
            <div className="AdminH">Admin Pannel</div>
            <Link to="/ProductAddition" className="Card">
                Add Product
            </Link>
            <Link to="/Products" className="Card">
                Products
            </Link>
            <Link to="/Orders" className="Card">
                Received Orders
            </Link>
        </>
    );
}

export default Page5;
