import React, {useState, useEffect} from 'react';
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

const SingleRoomComponent = (props) => {
  const room = props.room

  const [filters, setFilters] = useState({
    smoking: false,
    pets: false,
    children: false,
    airConditioning: false,
    kitchen: false,
    balcony: false,
    elevator: false,
    restaurant: false,
    wifi: false,
    parking: false,
    inclusiveMeals: false,
  });
  useEffect(() => {
    if (room.conveniences) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...room.conveniences,
      }));
    }
  }, [room.conveniences]);
  
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

  const [isRoomTaken, setRoomTaken] = useState(false);
  const getDisplayedButton = () => {
    if (isRoomTaken)
      return <button className='room-btn remove' onClick={
        () => {
          props.funs.removeRoom(room)
          setRoomTaken((_) => false)
        }
      }>-</button>
    else
      return <button className='room-btn' onClick={
        () => {
          props.funs.addRoom(room)
          setRoomTaken((_) => true)
        }
      }>+</button>
  }

  return (
    <div className='body-room-container' >
        <div className='room-header'>
          <p>Nr pokoju: {room?.internalNumber}/{room?.floorNumber}</p>
          <p>Liczba łóżek: {room?.beds}</p>
          <p>Cena za noc: {room?.pricePerDay} zł</p>
        </div>
          <div className='room-icons-container'>{getFilteredIcons()}</div>
          { getDisplayedButton() }
    </div>
  );
};

export default SingleRoomComponent;
