import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const App = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
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
          zoom: 14,
        });

        setMap(map);
      });
    });
  }, []);

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(userLocation);
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
