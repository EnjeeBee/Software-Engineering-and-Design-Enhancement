// Import React and useState to manage form inputs
import React, { useState } from 'react';
// Import Axios to send data to the backend
import axios from 'axios';

// Form component to create a new appointment
function AppointmentForm({ token }) {
// Track form fields: date, time, description, confirmed status
  const [form, setForm] = useState({ date: '', time: '', description: '', confirmed: false });

// Submit form data with a POST request, including JWT in headers
  const submit = async () => {
    await axios.post('http://localhost:5001/api/appointments', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Appointment submitted!');
  };

// Render form fields and checkbox, and handle changes
  return (
    <div>
      <h2>Create Appointment</h2>
      <input placeholder="Date" onChange={e => setForm({ ...form, date: e.target.value })} />
      <input placeholder="Time" onChange={e => setForm({ ...form, time: e.target.value })} />
      <input placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <label>
        Confirmed:
        <input type="checkbox" onChange={e => setForm({ ...form, confirmed: e.target.checked })} />
      </label>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

// Export the component for use in App.js
export default AppointmentForm;