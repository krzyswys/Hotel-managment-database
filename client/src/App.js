import React from 'react'
import './App.css';
import Header from './pages/Header/Header';
import { Outlet } from 'react-router-dom';
const App = () => {
    return (
      <div className="App">
        <Header />
        <div className='homepage'>
        <Outlet />

        </div>
      </div>
    );
  }

export default App;
