import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './style4.css'; // Ensure this path is correct
import image from "./assets/image.png"
function Page4() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // Handle email input change
  function handleEmail(event) {
    setEmail(event.target.value);
  }

  // Handle password input change
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    if (email === "23122@iiitu.ac.in" && password === "12345") {
      navigate('/AdminPannel'); // Redirect to AdminPannel
    } else {
      alert('Invalid email or password');
    }
  }

  return (
    <>
      <div className='Entry'><h1>Welcome Admin</h1></div>
      <div className='TitleA'><h1>ZXW</h1></div>
      <div className="Form">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              id="email1"
              name="email"
              required
              value={email}
              onChange={handleEmail}
            />
            <label htmlFor="email1">Email</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              id="password1"
              name="password"
              required
              value={password}
              onChange={handlePassword}
            />
            <label htmlFor="password1">Password</label>
          </div>
          <div className="input-box">
            <button type="submit" className="btn1">Login</button>
          </div>
        </form>
      </div>
<div className='Adminimg'><img src={image} ></img></div>
    </>
  );
}

export default Page4;

