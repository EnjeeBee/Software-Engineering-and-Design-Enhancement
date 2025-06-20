// Import React and useState hook for managing form state
import React, { useState } from 'react';
// Import Axios to handle HTTP requests
import axios from 'axios';

// Auth component handles user login and registration
function Auth({ setToken }) {
// Track the username input value
  const [username, setUsername] = useState('');
// Track the password input value
  const [password, setPassword] = useState('');

// Function to log in user and store the JWT in localStorage
  const login = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

// Function to register a new user with the backend
  const register = async () => {
    await axios.post('http://localhost:5000/api/auth/register', { username, password });
    alert('User registered. Now log in.');
  };

// Render the input fields and buttons for login and registration
  return (
    <div>
      <h2>Login/Register</h2>
      <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

// Export the Auth component so it can be used in App.js
export default Auth;