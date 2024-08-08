

export function getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }
  
  export function clearLoggedInUser() {
    localStorage.removeItem('loggedInUser');
  }
  