import React, {useState} from 'react';
import './singleRoomComponent.css'
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

const SingleRoomComponent = () => {
  const [filters] = useState({
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

  return (
    <div className='body-room-container' >
        <div className='room-header'>
          <p>Nr pokoju: 1</p>
          <p>Liczba łóżek: 2</p>
          <p>Liczba osób: 0</p>
        </div>
          <div className='room-icons-container'>{getFilteredIcons()}</div>
          <button className='room-btn'>+</button>
    </div>
  );
};

export default SingleRoomComponent;

