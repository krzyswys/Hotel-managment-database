import React, {useState, useEffect} from 'react';
import './singleHotelComponent.css'

import {
  FaSmoking,
  FaChild,
  FaParking,
} from 'react-icons/fa';
import {
  MdPets,
  MdOutlineBalcony,
  MdElevator,
  MdFastfood,
} from 'react-icons/md';
import {
  TbAirConditioning,
  TbToolsKitchen2,
} from 'react-icons/tb';
import { AiOutlineWifi } from 'react-icons/ai';

const SingleHotelComponent = ({ hotel,image, onClick }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  };
  const [filters, setFilters] = useState({
    smoking: true,
    pets: true,
    children: true,
    airConditioning: true,
    kitchen: true,
    balcony: true,
    elevator: true,
    restaurant: true,
    wifi: true,
    parking: true,
    inclusiveMeals: true,
  });
    
  useEffect(() => {
    if (hotel.conveniences) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...hotel.conveniences,
      }));
    }
  }, [hotel.conveniences]);

  const getFilteredIcons = () => {
    const icons = [];

    if (filters.smoking) icons.push(<div className="icons"><FaSmoking key="smoking" /></div>);
    if (filters.pets) icons.push(<div className="icons"><MdPets key="pets" /></div>);
    if (filters.children) icons.push(<div className="icons"><FaChild key="children" /></div>);
    if (filters.airConditioning) icons.push(<div className="icons"><TbAirConditioning key="airConditioning" /></div>);
    if (filters.kitchen) icons.push(<div className="icons"><TbToolsKitchen2 key="kitchen" /></div>);
    if (filters.balcony) icons.push(<div className="icons"><MdOutlineBalcony key="balcony" /></div>);
    if (filters.elevator) icons.push(<div className="icons"><MdElevator key="elevator" /></div>);
    if (filters.restaurant) icons.push(<div className="icons"><MdFastfood key="restaurant" /></div>);
    if (filters.wifi) icons.push(<div className="icons"><AiOutlineWifi key="wifi" /></div>);
    if (filters.parking) icons.push(<div className="icons"><FaParking key="parking" /></div>);

    return icons;
  };

  const handleClick = () => {
    onClick(); 
  };

  return (
    <div className='body-container' onClick={handleClick}>
      <div className='image-container' style={{
              backgroundImage: `url("${image}")`,
            }}></div>
      <div className='description'>
        <div className='header'>
          <h2>{hotel?.name}</h2>
          {hotel?.avgrating !== 0 && (
          <div className='review-mark'>{hotel?.avgrating}</div>)}
        </div>
        <div className='header-content-container'>
          <p>Dodano: {formatDate(hotel?.createdAt)}</p>
          <p>| {hotel?.address?.city}</p>
        </div>
        <p className='dsc'>{hotel?.description}. . . </p>
        <div className='footer'>
          <div className='icons-container'>{getFilteredIcons()}</div>
          <button className='btn'>Zamów nocleg</button>
        </div>
      </div>
    </div>
  );
};

export default SingleHotelComponent;

