import React from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';
import appState from '../../State';

const Header = () => {
  const navigation = useNavigate();
  // var count = 0

  const handleRegistrationClick = () => {
    navigation("registration");
  };

  const handleLoginClick = () => {
    navigation("login");
  };

  const handleLogoutClick = () => {
    appState.isLoggedIn = false
    appState.login = ""
    handleHomeClick()
  };

  const handleProfileClick = () => {
    navigation("history");
  };

  const handleHomeClick = () => {
    navigation("/");
  };

  var loginContent;
  if (appState.isLoggedIn)
    loginContent = <div className='nav-buttons'>
        <button>Menadżer | Pracownik</button> 
        <button onClick={handleProfileClick}>Profil - {appState.login}</button> 
        <button onClick={handleLogoutClick}>Wyloguj się </button>
      </div>
  else
    loginContent = <div className='nav-buttons'>
        <button onClick={handleLoginClick}>Zaloguj się </button>
        <button onClick={handleRegistrationClick}>Zarejestruj się</button>
      </div>

  return (
    <nav>
    <div className='nav-logo' onClick={handleHomeClick}>Logo | Nazwa</div>
    { loginContent }
  </nav>
  );
};

export default Header;