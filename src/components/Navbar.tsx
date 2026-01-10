import React from 'react';
import logo from '../OpenWeather-Logo.jpg';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4">
      <div className="container-fluid">
        <div className="row w-100 align-items-center">
          <div className="col-3">
            <a className="navbar-brand" href="/">
              <span className="fs-6 fw-bold text-primary">OpenWeather App</span>
            </a>
          </div>
          
          <div className="col-6 text-center">
            <img src={logo} alt="OpenWeather Logo" className="navbar-logo-center" />
          </div>
          
          <div className="col-3">
            <button 
              className="navbar-toggler float-end" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link active text-dark" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a 
                    className="nav-link text-dark" 
                    href="https://openweathermap.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className="nav-link text-dark" 
                    href="https://github.com/andrewh1994/open_weather_react_app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
