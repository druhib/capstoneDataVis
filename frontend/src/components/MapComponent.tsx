
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

// interface NodeData {
//     id: string;
//     latitude: number; 
//     longitude: number; 
//     UUID: string;
//     advertisingName: string;
//     data: {
//         temp: number[],
//         humidity: number[],
//         gas: number[],
//         accelX: number[],
//         accelY: number[],
//         accelZ: number[],
        
//     };

// }



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
  // if (d === null || d === undefined) return '#6a6f6bff';
// "#001685", "#3409a2", "#5000b4", "#6900be", "#8300c0", "#9d00b8", "#b800a4", "#d40081", "#ed0050", "#ff0000"
  //"#002f61", "#005f85", "#008b98", "#00b599", "#18dc82", "#97f554", "#ffff00"
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
    // console.log("name/zipcode/number of people w/ no power: ",name ,zipcode, ":",numPeopleNoPower)

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

        // const [nodeData, setNodeData] = useState(null);

    // useEffect(() => {
    //     fetch('https://zmh0kzfk-5173.use.devtunnels.ms/')
    //         .then(response => response.json())
    //         .then(data => setNodeData(data));
    // }, []);

// console.log("dataMap: ", dataMap)

// const [nodeData, setNodeData] = useState<NodeData[]>([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {
//     setLoading(true);
//     fetch('https://zmh0kzfk-5173.use.devtunnels.ms/api/nodes/get')
//         .then(response => {
//             console.log('Response status:', response.status);
//             console.log('Response ok:', response.ok);
//             if (!response.ok) throw new Error('Failed to fetch');
//             return response.json();
//         })
//         .then(data => {
//             console.log("Nodes: ", data) 
//             setNodeData(data);
        
//             setLoading(false);
//         })
//         .catch(err => {
//             console.log(err.message)
//             setError(err.message);
//             setLoading(false);
//         });
// }, []);




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
                        Node ID: {node.id}
                        <br></br>
                        Advertiseing Name: {node.advertisingName}
                        <br></br>
                      
                        UUID: {node.UUID}
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

        

    

            {/* <Marker position={[32, -99]}>
                <Popup>
                    Node 1
                </Popup>
            </Marker>

            <Marker position={[31, -101]}>
                <Popup>
                Node 2
                </Popup>
            </Marker>

            <Marker position={[31, -94]}>
                <Popup>
                Node 3
                </Popup>
            </Marker>
            <Marker position={[31, -94]}>
                <Popup>
                Node 4
                </Popup>
            </Marker> */}
        </MapContainer>
        

        </div> 

        
        

    
    
    ); 
};

export default MapComponent;

