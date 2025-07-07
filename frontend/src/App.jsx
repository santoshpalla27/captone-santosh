import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/users`).then(res => setUsers(res.data));
    axios.get(`${API_BASE_URL}/orders`).then(res => setOrders(res.data));
  }, []);

  const sendNotification = async () => {
    await axios.post(`${API_BASE_URL}/notify`, { message });
    alert('Notification sent!');
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Microservices Demo App (with API Gateway)</h1>
      <section>
        <h2>Users</h2>
        <ul>{users.map(u => <li key={u.id}>{u.name} ({u.email})</li>)}</ul>
      </section>
      <section>
        <h2>Orders</h2>
        <ul>{orders.map(o => <li key={o._id}>{o.item} x{o.quantity} for {o.user}</li>)}</ul>
      </section>
      <section>
        <h2>Notify</h2>
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" />
        <button onClick={sendNotification}>Send Notification</button>
      </section>
    </div>
  );
}