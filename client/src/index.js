import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleHotel from './pages/SingleHotel/SingleHotel';
import HomePage from './pages/HomePage/HomePage';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import History from './pages/History/History';
import Cart from './pages/Cart/Cart';
import ManagerView from './pages/ManagerView/ManagerView';

const Appp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="singleHotel/:id" element={<SingleHotel />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="history" element={<History />} />
          <Route path="cart" element={<Cart />} />
          <Route path="manager" element={<ManagerView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Appp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
