import React, {useEffect, useState} from 'react';
import SidebarPanel from '../SidebarPanel/SidebarPanel';
import './homePage.css'
import SingleHotelComponent from '../SingleHotelComponent/SingleHotelComponent';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
const HomePage = () => {
  const [hotels, setHotels] = useState([]); // Stan przechowujący dane hoteli
  const navigation = useNavigate();
  const [images, setImages] = useState([]);

  const [searchPhrase, setSearchPhrase] = useState(undefined)
  const [startDate, setStartDate] = useState(undefined)
  const [dueDate, setDueDate] = useState(undefined)
  const [capacity, setCapacity] = useState(undefined)
  const [conveniences, setConveniences] = useState({})

  const [urlParams, setUrlParams] = useState("")

  const handleFilterChange = data => {
    setConveniences(data)
  }

  const handleSearch = data => {
    setSearchPhrase(data.searchPhrase || undefined)
    setCapacity(data.capacity || undefined)
    setStartDate(data.startDate || undefined)
    setDueDate(data.dueDate || undefined)
  }


  const removeUndefined = obj => {
    Object.keys(obj).forEach(key => !obj[key] && delete obj[key])
    return obj
  }

  const handleHotelClick = (hotelId) => {
    navigation(`/singleHotel/${hotelId}?${new URLSearchParams(removeUndefined({
      search: searchPhrase,
      capacity,
      startDate,
      dueDate,
      ...conveniences
    }))}`);
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch(
        'http://localhost:4000/hotels?' + new URLSearchParams(removeUndefined({
          search: searchPhrase,
          capacity,
          startDate,
          dueDate,
          ...conveniences
        }))
      );
      const data = await response.json();
      const imagesS = await extractFirstImageLinks(data.hotels);
      setHotels(data.hotels);
      setImages(imagesS);
      console.log(data.hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  useEffect(() => {
    fetchHotels();
    console.log(hotels)
  }, [searchPhrase, startDate, dueDate, capacity, conveniences]);

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
  
/* <div className="hotel-query-container">
  {hotels.length !== 0 && hotels.map((hotel, index) => (
    <SingleHotelComponent key={hotel._id} hotel={hotel} image={images[index]} onClick={() => handleHotelClick(hotel._id)} />
  ))}
</div> */
  return (
    <div className="home-page">
      <div className="title-container">
        <h1 className="title">
          Hotele: Przejrzyj naszą ofertę i odkryj niezapomniane miejsca na nocleg!
        </h1>
      </div>
      <SearchBar onSubmit={handleSearch}/>
      <div className="hotel-query-container">
          {hotels?.map((hotel, index) => (
            <SingleHotelComponent key={hotel._id} hotel={hotel} image={images[index]} onClick={()=>handleHotelClick(hotel._id)} />
          ))}
      </div>
      <h3 className="filter-call">Filtry</h3>

      <div className="sidebar">
        <div className="sidebar-panel">
          <SidebarPanel onChange={handleFilterChange}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

//jak wyszuwkiwarka jest psuta albo nie ma tam hoteli to by mogly wyswietlac na poczatku te najlepsze hotele 
