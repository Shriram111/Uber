import React from 'react';
export default function History({ items }){
  return (<div className="card"><h3>History</h3><ul>{items.map(r=>(<li key={r.id}>{r.pickup}→{r.dropoff} by {r.driver.name} ₹{r.fare}</li>))}</ul></div>);
}