
import React, { useState } from 'react';
import "./style8.css"
import image from "./image.png"
function Page8() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name , setname] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name||!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const userData = {
        name: name,
        email : email ,
        password : password 
    };
    const dataToSend = [userData];
     console.log(dataToSend) ; 
    setError('');
    try {
      const response = await fetch('http://localhost:5600/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Sign-in successful!');
      } else {
        const result = await response.json();
        setError(result.message || 'Sign-in failed.');
      }
    } catch (error) {
      setError('An error occurred.');
    }
    setname('') ;
    setEmail('');
    setPassword('') ;
  
  };

  return (
    <>
    <div className='User1'>Welcome User</div>
    <div className='TitleU'><h1>ZXW</h1></div>
    <div className='Box'>
    <div className="sign-in">
     
      <form onSubmit={handleSubmit}>

      <div className="form-group7">
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>

        <div className="form-group7">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group7">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className='s1' type="submit">Sign In</button>
      </form>
    </div> <div><img src= {image}  ></img></div> </div></>
  );
}

export default Page8 ; 
