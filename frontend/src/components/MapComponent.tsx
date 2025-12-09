
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { GeoJsonObject } from 'geojson';
import "leaflet/dist/leaflet.css";

import features from '../data/counties_2010.json'
import powerOutagesData from '../data/eaglei_outages_2015_Texas.json'
import powerOutagesData2 from '../data/eaglei_outages_total_people_affected_per_county_2015_Texas.json'
import { useState, useEffect } from "react";
import {NodeData} from './types'


interface CountyPowerOutageData {
    fips_code: number 
    county: string 
    state: string 
    sum: number 
    

}



const mapStyle = {
        height: '36rem',
        width: '50rem',
        margin: '0 auto',
    }

// plain map style no colors -> use for set up 
const geoJsonMapstyle ={
  
    fillColor: "blue",
    color: "white",
    fillOpacity: 0.3,
}




function onEachCounty(feature: any, data: Record<string, any>, layer: any) {

    const name = feature.properties.NAME10;
    const zipcode = feature.properties.GEOID10; 
    const numPeopleNoPower = Number(data[zipcode]);
    

 
    layer.bindPopup(`County: ${name} (${zipcode}) <br> Number of People: ${numPeopleNoPower != -1 ? numPeopleNoPower : "NaN"} `);
    

    
    } 

function getColor(d: number) {
  const value = Number(d);
  return value > 1000000 ? "#002f61" :
         value > 500000 ? "#005f85" :
         value > 20000 ? "#008b98" :
         value > 1000 ? "#00b599" :
         value > 0 ? "#97f554" :
         value === 0 ? " #6a6f6bff":
                    '#6a6f6bff';
        
}

function style(feature: any, data: Record<string, number>) {
    const name = feature.properties.NAME10
    const zipcode = feature.properties.GEOID10; 

    
    const numPeopleNoPower = Number(data[zipcode]);

    return {
        fillColor: getColor(numPeopleNoPower),
        weight: 2,
        opacity: 0.7,
        color: 'white',
        fillOpacity: 0.7
    }
  };

interface MapProps {
    nodeData: NodeData[];
}

const MapComponent: React.FC<MapProps> = ({ nodeData }) => {
    
    const outageData = powerOutagesData2 as CountyPowerOutageData[]; // data becomes list of type CountyPowerOutageData
    
    const dataMap: Record<string, number> = {};
        
        outageData.forEach((item) => {
            const fipsCode = item.fips_code.toString()
            dataMap[fipsCode] = item.sum;
        });




    return ( 
        <div> 
        <MapContainer
            style={mapStyle}
            center ={[31.5, -99]}
            zoom={5.51} scrollWheelZoom={true} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
            <GeoJSON
                data={features as GeoJsonObject}
                style={(feature) => style(feature, dataMap)}
                onEachFeature={(feature, layer) => onEachCounty(feature, dataMap, layer) }>

            </GeoJSON>


            {/* // Render markers dynamically from fetched data */}
            {nodeData.map((node:NodeData) => (
                <Marker key={node.id} position={[node.latitude, node.longitude]}>
                    <Popup>
                        Node ID: {node.data.originID}
                        <br></br>
                        Advertiseing Name: {node.advertisingName}
                        <br></br>
                      
                        UUID: {node.UUID}
                        <br></br>
                        Time: {node.time }
                        <br></br>
                        {node.data.temp.length > 0 ? `Temp: ${node.data.temp[node.data.temp.length -1 ]}` : 'Temp: N/A'}
                        <br></br>
                        {node.data.humidity.length > 0 ? `Humidity: ${node.data.temp[node.data.temp.length -1 ]}` : 'Temp: N/A'}
                        <br></br>
                        {node.data.gas.length > 0 ? `Gas: ${node.data.gas[node.data.temp.length -1 ]}` : 'Temp: N/A'}
                        <br></br>
                        {node.data.accelX.length > 0 ? `x-accel: ${node.data.accelX[node.data.temp.length -1 ]}` : ': N/A'}
                        <br></br>
                        {node.data.accelY.length > 0 ? `y-accel: ${node.data.accelY[node.data.temp.length -1 ]}` : 'y: N/A'}
                        <br></br>
                        {node.data.accelZ.length > 0 ? `z-accel: ${node.data.accelZ[node.data.temp.length -1 ]}` : 'z: N/A'} 
                    
                    </Popup> 
                </Marker>
            ))} 

    
        </MapContainer>
        

        </div>
    
    
    ); 
};

export default MapComponent;

