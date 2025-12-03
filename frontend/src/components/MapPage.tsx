import { useState, useEffect, use } from "react";
import MapComponent from "./MapComponent.tsx";
import ReLoadTable from "./ReloadTable.tsx";
// import {NodeData} from './types.tsx'

interface NodeData {
    id: string;
    latitude: number; 
    longitude: number; 
    UUID: string;
    advertisingName: string;
    data: {
        temp: number[],
        humidity: number[],
        gas: number[],
        accelX: number[],
        accelY: number[],
        accelZ: number[],
        
    };

}

// legend numbers
const generateLegendData = (colordata: string[]) => {

const mineralRanges = [

      "+1mil", 
      "500k - 1mil", 
      "500k - 20k ",
      "20k - 1k", 
      "1k - 1 ",
      "0",
      "no data"
      
    ];

   
        

    // mapping to data 
    return colordata.slice(0, mineralRanges.length).map((color, index) => ({
      color: color,
      range: mineralRanges[index]
    }));
  };

interface MapPageProps {
    nodeData: NodeData[];
}

const MapPage: React.FC<MapPageProps> = ({ nodeData }) => {
    // component logic using sensorData
//     return (
//         // JSX
//     );
// };
// const MapPage = ( sensorData:NodeData[]) => {

    const colordata = ["#002f61", "#005f85", "#008b98", "#00b599", "#18dc82", "#97f554", "#6a6f6bff"];
return (
    <div>
      <div> 
         <h1>InductiSense</h1>
         <div style = {{display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center"}}>
            <img src="clamp.png" alt="InductiSense Logo" style={{ height: "20rem" }} /> 
            <img src="voltagereadings.png" alt="InductiSense Logo" style={{ height: "20rem" }} /> 
            <img src="rak.png" alt="InductiSense Logo" style={{ height: "20rem" }} />
          </div> 

         
      </div>
     


        <h1>Power Outage Map - Texas Data from 2015</h1>

    <div style ={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '2rem' }}>
         <MapComponent nodeData ={nodeData}/> 

   

        <div id="legend" style ={{ font: 'Inter',}}>
                <h3><span style = {{ fontSize:"small"}}> Map Legend (Number of People)</span></h3>
                <ul style={{ listStyleType: 'none', paddingLeft: 10, font: 'Inter', fontSize: "15px"}}>
                {generateLegendData(colordata).map((item, index) => (

                    <li key={index}>
                        <span 
                        style={{
                            display: 'inline-block',
                            width: '15px',
                            height: '15px',
                            backgroundColor: item.color,
                            marginRight: '1rem',
                            verticalAlign: 'middle'
                        }}
                        ></span>
                        {item.range}
                    </li>
                ))}
                </ul>
            </div>
          </div>
          
        </div>

);

}; 
export default MapPage;