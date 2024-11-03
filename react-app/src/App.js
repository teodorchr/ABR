import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import dotenv from 'dotenv';

dotenv.config();

const App = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: userLocation,
          zoom: 6, // Zoom out even more
          disableDefaultUI: true, // Disable map controls
          restriction: {
            latLngBounds: {
              north: userLocation.lat + 0.05,
              south: userLocation.lat - 0.05,
              east: userLocation.lng + 0.05,
              west: userLocation.lng - 0.05,
            },
            strictBounds: true,
          },
        });

        const marker = new window.google.maps.Marker({
          position: userLocation,
          map: map,
        });

        setMap(map);
        setMarker(marker);
        animateCircles(userLocation, map);
      });
    });
  }, []);

  const animateCircles = (center, map) => {
    const numCircles = 20;
    const interval = 1000; // 1 second for each circle
    for (let i = 0; i < numCircles; i++) {
      setTimeout(() => {
        const circle = new window.google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.05, // Adjust transparency
          map: map,
          center: center,
          radius: (1000 / numCircles) * (numCircles - i), // Starting large and getting smaller
        });
        setCircles((prevCircles) => [...prevCircles, circle]);
      }, i * interval);
    }
  };

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(userLocation);
      marker.setPosition(userLocation);
      circles.forEach((circle) => circle.setMap(null)); // Remove old circles
      animateCircles(userLocation, map); // Create new circles at new location
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Overlay Animation App</h1>
        <button onClick={handleLocate}>Locate Me</button>
      </header>
      <div id="map" style={{ height: '90vh', width: '100%' }}></div>
    </div>
  );
};

export default App;