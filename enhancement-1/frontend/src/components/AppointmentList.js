// Import React hooks for managing and displaying appointment data
import React, { useEffect, useState } from 'react';
// Import Axios to fetch appointment data from backend
import axios from 'axios';

// Utility to format the status badge
// StatusBadge component for styling confirmed/pending labels
const StatusBadge = ({ confirmed }) => {
  const style = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    color: 'white',
    backgroundColor: confirmed ? 'green' : 'red',
    marginLeft: '10px',
    fontSize: '0.8rem'
  };
  return <span style={style}>{confirmed ? 'Confirmed' : 'Pending'}</span>;
};

// Enhanced Appointment List with filtering, sorting, and status badge
// AppointmentList component to fetch and render all appointments
function AppointmentList() {
// Store original appointments list from API
  const [appointments, setAppointments] = useState([]);
// Store the filtered and sorted appointment list
  const [filtered, setFiltered] = useState([]);
// Track search input for description-based filtering
  const [search, setSearch] = useState('');
// Track status filter (all, confirmed, pending)
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch all appointments
// Fetch appointment data on initial component load and sort by date
  useEffect(() => {
    axios.get('http://localhost:5001/api/appointments')
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAppointments(sorted);
        setFiltered(sorted);
      });
  }, []);

  // Apply search and filter
// Fetch appointment data on initial component load and sort by date
  useEffect(() => {
    let result = appointments;

    if (search) {
      result = result.filter(a =>
        a.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      result = result.filter(a => a.confirmed === (filterStatus === 'confirmed'));
    }

    setFiltered(result);
  }, [search, filterStatus, appointments]);

// Render search input, filter dropdown, and appointment list
  return (
    <div>
      <h2>All Appointments</h2>
      <div style={{ marginBottom: '1em' }}>
        <input
          placeholder="Search description..."
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: '10px', padding: '4px' }}
        />
        <select onChange={e => setFilterStatus(e.target.value)} style={{ padding: '4px' }}>
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <ul>
        {filtered.map((a, i) => (
          <li key={i}>
            <strong>{a.date}</strong> @ {a.time} - {a.description}
// StatusBadge component for styling confirmed/pending labels
            <StatusBadge confirmed={a.confirmed} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export component for use in App.js
export default AppointmentList;