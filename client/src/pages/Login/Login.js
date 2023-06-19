import React, { useState, useContext, useEffect } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useCookies} from 'react-cookie';

import {
  FcGoogle
} from 'react-icons/fc';

import {
  FaFacebook
} from 'react-icons/fa';
import appState from '../../State';
const Login = () => {
  const [cookies, setCookie] = useCookies(['user', 'username', 'validation']);
  const navigation = useNavigate();
  const [email, setEmail] = useState('krzystof.makłowicz@gmail.com');
  const [password, setPassword] = useState('zaq1@WSXa');


  console.log(cookies.username)
  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {

        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.validation) {
          setCookie('user', data.personId, { path: '/' }); 
          setCookie('username', data.name, { path: '/' }); 
          setCookie('validation', data.name, { path: '/' }); 
          }
      } catch (error) {
        console.error('Błąd:', error);
      }
      
        setEmail('');
        setPassword('');
      };


    useEffect(() => {
      if (cookies.validation) {
        appState.login=cookies.username;
        appState.isLoggedIn=true;
        navigation('../history');
      }
    }, [cookies, navigation]);

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Logowanie</h2>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input type="text" id="username" value={email} onChange={handleUsernameChange} />
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