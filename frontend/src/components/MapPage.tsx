import { useState, useEffect, use } from "react";
import MapComponent from "./MapComponent.tsx";
import ReLoadTable from "./ReloadTable.tsx";
import {NodeData} from './types'


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

    const colordata = ["#002f61", "#005f85", "#008b98", "#00b599", "#18dc82", "#97f554", "#6a6f6bff"];

    return (
    <div>
      <div> 

         <div style = {{display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center"}}>
          <h1>InductiSense</h1>
            <img src="clamp.png" alt="InductiSense Logo" style={{ height: "15rem" }} /> 
            <img src="rak2.png" alt="InductiSense Logo" style={{ height: "15rem" }} /> 
           
          </div> 

         
      </div>
     


    <h2 style ={{display: 'flex', flexDirection: 'row',justifyContent: 'left', marginLeft: "4rem" }}>Texas LoRa Map</h2>

    <div style ={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '2rem' }}>
          
         <MapComponent nodeData ={nodeData}/> 

         <div> 
          <p style={{ maxWidth: '300px', textAlign:"left"}}>
            Using <span> 
            <a href="https://smc-datachallenge.ornl.gov/eagle/" target="https://smc-datachallenge.ornl.gov/eagle/"  rel="" > EAGLE-I Outage Data 2014-2022 </a>

           </span>
            from to visualize power outages across Texas counties. The map displays the number of people experiencing power outages in each county in 2015. 
          </p>



   

        <div id="legend" style ={{ font: 'Inter', marginTop: '13.5rem' }}>
                <h3><span style = {{ fontSize:"small"}}> Map Legend <br/> Number of people experiencing power outages</span></h3>
                <ul style={{ listStyleType: 'none', paddingLeft: 10, font: 'Inter', fontSize: "15px" }}>
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
          
        </div>

);

}; 
export default MapPage;