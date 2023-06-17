import React from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigation = useNavigate();

  const handleRegistrationClick = () => {
    navigation("registration");
  };
  const handleLoginClick = () => {
    navigation("login");
  };
  const handleHomeClick = () => {
    navigation("/");
  };

  return (
    <nav>
    <div className='nav-logo' onClick={handleHomeClick}>Logo | Nazwa</div>
    <div className='nav-buttons'>
      <button>Menadżer | Pracownik</button> 
      <button onClick={handleRegistrationClick}>Zarejestruj się</button>
      <button onClick={handleLoginClick}>Zaloguj się </button>
    </div>
  </nav>

  
  );
};

export default Header;