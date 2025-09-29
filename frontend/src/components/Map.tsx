import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { GeoJsonObject } from 'geojson';
import "leaflet/dist/leaflet.css";

import features from '../data/counties_2010.json'
import powerOutagesData from '../data/eaglei_outages_2015_Texas.json'


const mapStyle = {
        height: '40rem',
        width: '70rem',
        margin: '0 auto',
    }

const geoJsonMapstyle ={
  
    fillColor: "blue",
    color: "white",
    fillOpacity: 0.3,
}

const onEachCounty = (county:any, layer:any ) => {
    // layer.options.fillColor = county.properties.color;
    const name = county.properties.NAME10;
    const zipcode = county.properties.GEOID10;
    layer.bindPopup(`county name: ${name} <br>  zipcode: ${zipcode}`);
  };

// function getColor(d: any, colors: string[13]) {
//   // if (d === null || d === undefined) return '#6a6f6bff';

//   //"#002f61", "#005f85", "#008b98", "#00b599", "#18dc82", "#97f554", "#ffff00"
//   const value = Number(d);
//   return value > 860000 ? colors[0] :
//          value > 400000 ? colors[1] :
//          value > 100000  ? colors[2] :
//          value > 80000  ? colors[3] :
//          value > 50000   ? colors[4] :
//          value > 30000   ? colors[5] :
//          value> 10000   ? colors[6] :
//          value > 7000   ? colors[7] :
//          value > 3000   ? colors[8] :
//          value > 500   ? colors[9] :
//          value > 200   ? colors[10] :
//          value > 100   ?  colors[11]:
//          value > 0      ? colors[12] :
//          value === 0    ? '#32a74fff' :
//                       '#6a6f6bff';
// }



// function style(feature: any, data: any, colors: string[13]) {
//     const iso3 = feature.properties.ISO_A3; 
//     const mineralValue = Number(data[iso3]);
//     //console.log("Styling feature:", feature.properties.ADMIN, "ISO3:", iso3, "Value:", mineralValue);
  


//     return {
//     fillColor: getColor(mineralValue, colors),
//     weight: 2,
//     opacity: 0.7,
//     color: 'white',
//     fillOpacity: 0.7
//   };
const Map = () => { 

    console.log(powerOutagesData)
    
    return ( 
        <MapContainer
            style={mapStyle}
            center ={[32, -99]}
            zoom={5.7} scrollWheelZoom={true} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <GeoJSON
            data={features as GeoJsonObject}
            style={geoJsonMapstyle}
            onEachFeature={onEachCounty}/> 

        </MapContainer>

    
    
    ); 
};

export default Map;