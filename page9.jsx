import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style9.css"
import image7 from "./assets/image7.webp"
function Page9() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5600/Users");
        const responseData = await response.json();
     
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Check if email and password match any entry in the data array
    const user = data.find(
      (user) => user.email === email && user.password === password
    );

    console.log(user); 
    if (user) {
      // Store the user data in local storage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      // Navigate to another page or handle successful login
      navigate("/"); // Example path; adjust as needed
    } else {
      // Handle failed login attempt
      alert("Invalid email or password.");
    }
  }

  return (
    <><div className="Overall"><div id="ad">Credentials</div>
    <div id="title6">ZXW</div>
      <div className="Login-Info">
        <form onSubmit={handleSubmit}>
          <div className="loginbox">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              className ="custom-email"
              onChange={handleEmail}
            />
            <label htmlFor="email" className="custom-label">Email</label>
          </div>
          <div className="loginbox">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
                 className ="custom-password"
              onChange={handlePassword}
            />
            <label htmlFor="password" className="custom-label">Password</label>
          </div>
          <div className="loginbox">
            <button type="submit" className="btxxnnnnn">Login</button>
          </div>
        </form>
      </div> </div>
    </>
  );
}

export default Page9;
