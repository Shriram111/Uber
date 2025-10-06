import React, { useState } from 'react';
import { requestRide } from '../api';
export default function RideForm({ onBooked }){
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [riderName, setRiderName] = useState('');
  const [message, setMessage] = useState(null);
  async function submit(e){
    e.preventDefault();
    const res = await requestRide({ pickup, dropoff, riderName });
    if(res.error) setMessage(res.error); else { setMessage(`Ride with ${res.driver.name}, Fare ₹${res.fare}`); onBooked(); }
    setPickup(''); setDropoff(''); setRiderName('');
  }
  return (<div className="card"><h2>Request a Ride</h2><form onSubmit={submit}>
    <input placeholder="Name" value={riderName} onChange={e=>setRiderName(e.target.value)} />
    <input placeholder="Pickup" value={pickup} onChange={e=>setPickup(e.target.value)} />
    <input placeholder="Dropoff" value={dropoff} onChange={e=>setDropoff(e.target.value)} />
    <button type="submit">Book Ride</button></form>{message && <div className="message">{message}</div>}</div>);
}