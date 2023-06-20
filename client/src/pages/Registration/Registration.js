import React, { useState, useEffect } from 'react';
import { useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import appState from '../../State';

import './registration.css';
import {
  FcGoogle
} from 'react-icons/fc';

import {
  FaFacebook
} from 'react-icons/fa';
const Registration = () => {
  const [password, setPassword] = useState('Abcdefg12#');
  const [email, setEmail] = useState('asdasd');
  const [cookies, setCookie] = useCookies(['user', 'username', 'validation']);
  const [firstname, setFirstname] = useState('John');
  const [lastname, setLastname] = useState('Doe');
  const [birthdate, setBirthdate] = useState(new Date().toISOString().substr(0, 10));
  const [phone, setPhone] = useState('123456789');
  const [address, setAddress] = useState({
    country: 'Poland',
    city: 'Warsaw',
    street: 'Main Street',
    houseNumber: '123',
    flatNumber: '4',
    postalCode: '00-000'
  });
  const [salary, setSalary] = useState(123); 
  const [position, setPosition] = useState('Employee'); 
  const [isEmployee, setIsEmployee] = useState(false);
  
  
  const navigation = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };
  
  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };
  
  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };
  
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  
  const handleAddressChange = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value
    });
  };
  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsEmployee(event.target.checked);
  };

  const isPasswordValid = () => {
    const hasMinimumLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasMinimumLength && hasNumber && hasUppercase && hasSpecialChar;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {

      const endpoint = isEmployee ? 'registerEmployee' : 'register';
      const bodyData = {
        firstname,
        lastname,
        birthdate,
        email,
        phone,
        address,
        password
      };
  
      if (isEmployee) {
        bodyData.salary = salary;
        bodyData.position = position;
      }
      const response = await fetch(`http://localhost:4000/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify({
         bodyData
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.validation === 'true') {
        setCookie('user', data.personId, { path: '/' }); 
        setCookie('username', data.name, { path: '/' }); 
        setCookie('validation', data.status, { path: '/' }); 
       
      
      }
    } catch (error) {
      console.error('Błąd:', error);
    }
  
    // setEmail('');
    // setPassword('');
  };
  useEffect(() => {
    if (cookies.validation ) {
      appState.login=cookies.username;
        appState.isLoggedIn=true;
        navigation('../');
    }
  }, [cookies, navigation]);

  <div className="form-group">
  
</div>
  return (
    <div className='container'>
<div className="registration-container">
      <h2><p>Rejestracja</p> <label htmlFor="isEmployee">Pracownik: </label>
  <input type="checkbox" id="isEmployee" checked={isEmployee} onChange={handleCheckboxChange} /></h2>
      <form onSubmit={handleSubmit}>
        <div className='formm-container'> 
        <div className="form-group">
            <label htmlFor="firstname">Imię:</label>
            <input type="text" id="firstname" name="firstname" value={firstname} onChange={handleFirstnameChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Nazwisko:</label>
            <input type="text" id="lastname" name="lastname" value={lastname} onChange={handleLastnameChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Data urodzenia:</label>
            <input type="text" id="birthdate" name="birthdate" value={birthdate} onChange={handleBirthdateChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefon:</label>
            <input type="text" id="phone" name="phone" value={phone} onChange={handlePhoneChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="country">Kraj:</label>
            <input type="text" id="country" name="country" value={address.country} onChange={handleAddressChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="city">Miasto:</label>
            <input type="text" id="city" name="city" value={address.city} onChange={handleAddressChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="street">Ulica:</label>
            <input type="text" id="street" name="street" value={address.street} onChange={handleAddressChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="houseNumber">Numer domu:</label>
            <input type="text" id="houseNumber" name="houseNumber" value={address.houseNumber} onChange={handleAddressChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="flatNumber">Numer mieszkania:</label>
            <input type="text" id="flatNumber" name="flatNumber" value={address.flatNumber} onChange={handleAddressChange} />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Kod pocztowy:</label>
            <input type="text" id="postalCode" name="postalCode" value={address.postalCode} onChange={handleAddressChange} required />
          </div>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input type="text" id="username" name="username" value={email} onChange={handleEmailChange} required />
        </div>
        {isEmployee && (
          <div>
            <div className="form-group">
              <label htmlFor="salary">Salary:</label>
              <input type="number" id="salary" value={salary} onChange={handleSalaryChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position:</label>
              <input type="text" id="position" value={position} onChange={handlePositionChange} required />
            </div>
          </div>
        )}
       
        <div className="form-group">
          <label htmlFor="password">Hasło:</label>
          <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
        </div>
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
