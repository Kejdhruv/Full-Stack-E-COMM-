import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import Page6 from './page6';
import Page7 from './page7';
import Page8 from './page8';
import Page9 from './page9';
import Page10 from './page10';
import Page11 from './page11';
import Page12 from './page12'; // Import Page12
import { getLoggedInUser } from './authUtils';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    console.log('Logged-in user:', loggedInUser);
    setIsLoggedIn(!!loggedInUser);
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Page1 />} />
      <Route path='/Male' element={<Page2 />} />
      <Route path='/Female' element={<Page2 />} />
      <Route path='/Male/:name' element={<Page3 />} />
      <Route path='/Female/:name' element={<Page3 />} />
      <Route path='/Admin-Login' element={<Page4 />} />
      <Route path='/AdminPannel' element={<Page5 />} />
      <Route path='/Products' element={<Page6 />} />
      <Route path='/ProductAddition' element={<Page7 />} />
      <Route path='/Auth' element={isLoggedIn ? <Page12 /> : <Page9 />} />
      <Route path='/Login' element={<Page8 />} />
      <Route path='/Orders' element={<Page10 />} />
      <Route path='/Bag' element={<Page11 />} />
    </Routes>
  );
}

export default App;







