
import React from "react";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mapStyle = {
        height: '40rem',
        width: '70rem',
        margin: '0 auto',
    }

const Map = () => { 
    
    return ( 
        <MapContainer
            style={mapStyle}
            center ={[32, -99]}
            zoom={5.7} scrollWheelZoom={true} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>

    
    
    ); 
};

export default Map;