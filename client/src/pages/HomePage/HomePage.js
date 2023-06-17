import React from 'react';
import SidebarPanel from '../SidebarPanel/SidebarPanel';
import './homePage.css'
import SingleHotelComponent from '../SingleHotelComponent/SingleHotelComponent';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigation = useNavigate();

  const handleHotelClick = () => {
    navigation("singleHotel");
  };



  return (
    <div className="home-page">
      <div className="title-container">
        <h1 className="title">
          Hotele: Przejrzyj naszą ofertę i odkryj niezapomniane miejsca na nocleg!
        </h1>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Lokalizacja" />
        <input type="date" placeholder="Data" />
        <input type="date" placeholder="Data" />
        <input type="number" placeholder="Ilość osób" />
        <button>Szukaj</button>
      </div>
      <div className="hotel-query-container">
        <SingleHotelComponent onClick={handleHotelClick} />
        <SingleHotelComponent onClick={handleHotelClick} />
        <SingleHotelComponent onClick={handleHotelClick} />
        <SingleHotelComponent onClick={handleHotelClick} />
        <SingleHotelComponent onClick={handleHotelClick} />
      </div>
      <h3 className="filter-call">Filtry</h3>

      <div className="sidebar">
        <div className="sidebar-panel">
          <SidebarPanel />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

//jak wyszuwkiwarka jest psuta albo nie ma tam hoteli to by mogly wyswietlac na poczatku te najlepsze hotele 
