import React, { useEffect, useState } from 'react';
import './sidebar.css'
import { FaSmoking,FaChild,FaParking } from 'react-icons/fa';
import { MdPets,MdOutlineBalcony,MdElevator,MdFastfood,MdRestaurantMenu } from 'react-icons/md';
import { TbAirConditioning,TbToolsKitchen2 } from 'react-icons/tb';
import { AiOutlineWifi } from 'react-icons/ai';



const SidebarPanel = ({ onFilterSubmit })  => {
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

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
    
  };
  useEffect(()=>{
    onFilterSubmit(filters);
  },[filters]
  )



  return (
    <div className="sidebar-container">
    <div className='columns-container'>
      <div className="filter-column first-column">
        <label for="smoking" className="checkbox">
          <div className='icon'><FaSmoking /></div>
          <input
            type="checkbox"
            id="smoking"
            className="checkbox__input"
            checked={filters.smoking}
            onChange={() => handleFilterChange('smoking')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">Palenie</span>
        </label>
        <label for="pets" className="checkbox">
          <div className='icon'><MdPets /></div>
          <input
            type="checkbox"
            id="pets"
            className="checkbox__input"
            checked={filters.pets}
            onChange={() => handleFilterChange('pets')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">Zwierzęta</span>
        </label>
        <label for="children" className="checkbox">
          <div className='icon'><FaChild /></div>
          <input
            type="checkbox"
            id="children"
            className="checkbox__input"
            checked={filters.children}
            onChange={() => handleFilterChange('children')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">Dzieci</span>
        </label>
        <label for="airConditioning" className="checkbox">
          <div className='icon'><TbAirConditioning /></div>
          <input
            type="checkbox"
            id="airConditioning"
            className="checkbox__input"
            checked={filters.airConditioning}
            onChange={() => handleFilterChange('airConditioning')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">Klimatyzacja</span>
        </label>
        <label for="kitchen" className="checkbox">
          <div className='icon'><TbToolsKitchen2 /></div>
          <input
            type="checkbox"
            id="kitchen"
            className="checkbox__input"
            checked={filters.kitchen}
            onChange={() => handleFilterChange('kitchen')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
          <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">Kuchnia</span>
        </label>
      </div>
      <div className="filter-column">
        <label for="balcony" className="checkbox">
        <div className='icon'><MdOutlineBalcony /></div>
          <input
            type="checkbox"
            id="balcony"
            className="checkbox__input"
            checked={filters.balcony}
            onChange={() => handleFilterChange('balcony')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">Balkon</span>
        </label>
        <label for="elevator" className="checkbox">
        <div className='icon'><MdElevator /></div>

          <input
            type="checkbox"
            id="elevator"
            className="checkbox__input"
            checked={filters.elevator}
            onChange={() => handleFilterChange('elevator')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">Winda</span>
        </label>
        <label for="restaurant" className="checkbox">
        <div className='icon'><MdRestaurantMenu /></div>
          <input
            type="checkbox"
            id="restaurant"
            className="checkbox__input"
            checked={filters.restaurant}
            onChange={() => handleFilterChange('restaurant')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">Restauracja</span>
        </label>
        <label for="wifi" className="checkbox">
        <div className='icon'><AiOutlineWifi /></div>

          <input
            type="checkbox"
            id="wifi"
            className="checkbox__input"
            checked={filters.wifi}
            onChange={() => handleFilterChange('wifi')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">WiFi</span>
        </label>
        <label for="inclusiveMeals" className="checkbox">
        <div className='icon'><MdFastfood /></div>
          <input
            type="checkbox"
            id="inclusiveMeals"
            className="checkbox__input"
            checked={filters.inclusiveMeals}
            onChange={() => handleFilterChange('inclusiveMeals')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">Jedzenie w cenie</span>
        </label>
        <label for="parking" className="checkbox">
        <div className='icon'><FaParking /></div>
          <input
            type="checkbox"
            id="parking"
            className="checkbox__input"
            checked={filters.parking}
            onChange={() => handleFilterChange('parking')}
          />
          <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect className="rect"></rect>
            <path className="tick" stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
          </svg>
          <span className="checkbox__label">Parking:</span>
        </label>
      </div>
    </div>
</div>

  
  );
};

export default SidebarPanel;