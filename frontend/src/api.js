const BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export async function getDrivers() { return (await fetch(`${BASE}/api/drivers`)).json(); }
export async function requestRide(payload) {
  return (await fetch(`${BASE}/api/requestRide`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).json();
}
export async function getHistory() { return (await fetch(`${BASE}/api/history`)).json(); }
