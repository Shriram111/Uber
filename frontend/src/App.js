import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import RideForm from './components/RideForm';
import DriverList from './components/DriverList';
import History from './components/History';
import { getDrivers, getHistory } from './api';

export default function App(){
  const [drivers, setDrivers] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => { load(); }, []);

  async function load(){
    setDrivers(await getDrivers());
    setHistory(await getHistory());
  }

  return (
    <div className="app">
      <Header />
      <main className="container">
        <div className="left">
          <RideForm onBooked={async () => setHistory(await getHistory())} />
          <DriverList drivers={drivers} />
        </div>
        <div className="right">
          <History items={history} />
        </div>
      </main>
      <footer className="footer">Demo Uber Clone • For learning & demo only</footer>
    </div>
  );
}