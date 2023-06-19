import React, {useEffect, useState} from 'react';
import SidebarPanel from '../SidebarPanel/SidebarPanel';
import './homePage.css'
import SingleHotelComponent from '../SingleHotelComponent/SingleHotelComponent';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const [hotels, setHotels] = useState([]); // Stan przechowujący dane hoteli
  const navigation = useNavigate();
  const [images, setImages] = useState([]);


  const handleHotelClick = (hotelId) => {
    navigation(`/singleHotel/${hotelId}`);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:4000/hotels');
        const data = await response.json();
        const imagesS = await extractFirstImageLinks(data.hotels);
        setHotels(data.hotels);
        setImages(imagesS);
        console.log(data.hotels);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    

    fetchHotels();
    console.log(hotels)
  }, []);

  async function extractFirstImageLinks(hotels) {
    const firstImageLinks = await Promise.all(hotels.map(async (hotel) => {
      const imageArray = hotel.photos;
      if (imageArray.length > 0) {
        return imageArray[0];
      } else {
        return null;
      }
    }));
    return firstImageLinks;
  }
  

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
          {hotels?.map((hotel, index) => (
            <SingleHotelComponent key={hotel._id} hotel={hotel} image={images[index]} onClick={()=>handleHotelClick(hotel._id)} />
          ))}
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
