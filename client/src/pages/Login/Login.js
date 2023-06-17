import React, { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import {
  FcGoogle
} from 'react-icons/fc';

import {
  FaFacebook
} from 'react-icons/fa';
import appState from '../../State';
const Login = () => {
  const navigation = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    appState.isLoggedIn = true
    appState.login = "Steve"
    navigation("../history");
  //   event.preventDefault();

  //   fetch('/api/login', {
  //     method: 'POST',
  //     body: JSON.stringify({ username, password }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error('Błąd:', error);
  //     });

  //   setUsername('');
  //   setPassword('');
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Logowanie</h2>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Hasło</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Zaloguj się</button>
        <div className='login-icons'>
          <div className='i-icon'>
          <FcGoogle/>

          </div>
          <div className='i-icon'>
        <FaFacebook/>
            
          </div>
        </div>
        

      </form>
    </div>
  );
};

export default Login;