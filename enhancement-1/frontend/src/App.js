// Import React and hooks needed for managing component state
import React, { useState } from 'react';
// Import authentication component (login/register)
import Auth from './components/Auth';
// Import form component to create new appointments
import AppointmentForm from './components/AppointmentForm';
// Import list component to display existing appointments
import AppointmentList from './components/AppointmentList';

// Main App component: handles layout and authentication state
function App() {
// State hook to store JWT token retrieved after login
  const [token, setToken] = useState(localStorage.getItem('token') || '');

// Render the components: login, form, and list if authenticated
  return (
    <div>
      <h1>Appointment Manager</h1>
      <Auth setToken={setToken} />
      <hr />
      {token && (
        <>
          <AppointmentForm token={token} />
          <AppointmentList />
        </>
      )}
    </div>
  );
}

// Export the App component as default for use in index.js
export default App;