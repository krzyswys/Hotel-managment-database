import React from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';
import appState from '../../State';
import { useCookies } from 'react-cookie';
import { BsCartFill } from 'react-icons/bs';


const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'username', 'validation']);

  const navigation = useNavigate();

  const handleRegistrationClick = () => {
    navigation("registration");
  };

  const handleLoginClick = () => {
    navigation("login");
  };

  const handleLogoutClick = () => {
    removeCookie('user');
    removeCookie('username');
    removeCookie('validation');
    appState.isLoggedIn = false;
    appState.login = "";
    handleHomeClick()
  };

  const handleProfileClick = () => {
    navigation("history");
  };

  const handleHomeClick = () => {
    navigation("/");
  };

  const handleCartClick = () => {
    navigation("cart");
  };

  const handleManagerClick = () => {
    navigation("manager")
  }

  const getNumberOfCartElements = () => {
    return appState.cart.reduce((n, element) => n + element.rooms.length, 0)
  }

  var loginContent;
  if (appState.isLoggedIn)
    loginContent = <div className='nav-buttons'>
        <button onClick={handleManagerClick}>Menadżer | Pracownik</button> 
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
    <div class="cart-box" onClick={handleCartClick}>
      <div class="cart-icon">
        <BsCartFill key="cart"/>
      </div>
      {getNumberOfCartElements() > 0 &&
      <p class="elements-in-cart">{ getNumberOfCartElements() }</p>}
    </div>
  </nav>
  );
};

export default Header;