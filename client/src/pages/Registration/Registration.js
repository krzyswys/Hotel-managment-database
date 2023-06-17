import React, { useState } from 'react';
import './registration.css';
import {
  FcGoogle
} from 'react-icons/fc';

import {
  FaFacebook
} from 'react-icons/fa';
const Registration = () => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isPasswordValid = () => {
    const hasMinimumLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasMinimumLength && hasNumber && hasUppercase && hasSpecialChar;
  };

  return (
    <div className='container'>
<div className="registration-container">
      <h2>Rejestracja</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Hasło:</label>
          <input type="password" id="password" name="password" onChange={handlePasswordChange} required />
        </div>
        <div className="password-validation">
          <ul>
            <li className={`length ${password.length >= 8 ? 'valid' : 'invalid'}`}>Co najmniej 8 znaków</li>
            <li className={`number ${/\d/.test(password) ? 'valid' : 'invalid'}`}>Co najmniej jedna cyfra</li>
            <li className={`uppercase ${/[A-Z]/.test(password) ? 'valid' : 'invalid'}`}>Co najmniej jedna wielka litera</li>
            <li className={`special-char ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'valid' : 'invalid'}`}>Co najmniej jeden znak specjalny</li>
          </ul>
        </div>
        <button type="submit" disabled={!isPasswordValid()}>Zarejestruj się</button>
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
    </div>
    
  );
};

export default Registration;
