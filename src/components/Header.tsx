import React from 'react';
import logo from '../OpenWeather-Logo.jpg';

export const Header: React.FC = () => (
  <header className="row justify-content-center">
    <img src={logo} alt="logo" width="200" />
  </header>
);