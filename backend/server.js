const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());

let store = { drivers: [], rides: [] };
if (fs.existsSync(DATA_FILE)) {
  try { store = fs.readJsonSync(DATA_FILE); } catch (e) { console.error('Failed load data.json', e); }
} else {
  store.drivers = [
    { id: 1, name: 'Amit', car: 'Toyota Innova', rating: 4.8, eta: 3 },
    { id: 2, name: 'Priya', car: 'Honda City', rating: 4.7, eta: 5 },
    { id: 3, name: 'Ravi', car: 'Maruti Swift', rating: 4.5, eta: 2 }
  ];
  fs.writeJsonSync(DATA_FILE, store, { spaces: 2 });
}

function persist() { fs.writeJsonSync(DATA_FILE, store, { spaces: 2 }); }

app.get('/api/drivers', (req, res) => res.json(store.drivers));

app.post('/api/requestRide', (req, res) => {
  const { pickup, dropoff, riderName } = req.body || {};
  if (!pickup || !dropoff || !riderName) return res.status(400).json({ error: 'pickup, dropoff and riderName are required' });
  const driver = store.drivers.reduce((a, b) => (a.eta <= b.eta ? a : b));
  const fare = 50 + Math.floor(Math.random()*100);
  const ride = { id: Date.now(), riderName, pickup, dropoff, driver, fare, status: 'confirmed', requestedAt: new Date().toISOString() };
  store.rides.unshift(ride);
  persist();
  res.json(ride);
});

app.get('/api/history', (req, res) => res.json(store.rides));

const buildPath = path.join(__dirname, '..', 'frontend', 'build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

app.listen(PORT, () => console.log(`Uber clone backend running on ${PORT}`));
