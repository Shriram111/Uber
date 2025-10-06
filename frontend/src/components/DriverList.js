import React from 'react';
export default function DriverList({ drivers }){
  return (<div className="card"><h3>Drivers</h3><ul>{drivers.map(d=>(<li key={d.id}><strong>{d.name}</strong> ({d.car}) ⭐{d.rating}, ETA {d.eta}min</li>))}</ul></div>);
}