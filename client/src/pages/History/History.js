import React from 'react';
import './history.css'
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigation = useNavigate();

  return (
    <h2>Historia uzytkownika</h2>
  );
};

export default History;