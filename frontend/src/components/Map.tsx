
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { GeoJsonObject } from 'geojson';
import "leaflet/dist/leaflet.css";

import features from '../data/counties_2010.json'
import powerOutagesData from '../data/eaglei_outages_2015_Texas.json'
import powerOutagesData2 from '../data/eaglei_outages_total_people_affected_per_county_2015_Texas.json'
import { useState, useEffect } from "react";

interface CountyPowerOutageData {
    fips_code: number 
    county: string 
    state: string 
    sum: number 
    

}


interface NodeData {
    id: string;
    position: [number, number];
    name: string;
    status?: string;
    // add other fields from your backend
}

const mapStyle = {
        height: '40rem',
        width: '70rem',
        margin: '0 auto',
    }

// plain map style no colors -> use for set up 
const geoJsonMapstyle ={
  
    fillColor: "blue",
    color: "white",
    fillOpacity: 0.3,
}

const onEachCounty = (county:any, layer:any ) => {
    const name = county.properties.NAME10;
    const zipcode = county.properties.GEOID10;
    layer.bindPopup(`county name: ${name} <br>  zipcode: ${zipcode} <br>`);
  };

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
         value === 0 ? "#ffff00":
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

  

const Map = () => { 

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



const [nodeData, setNodeData] = useState<NodeData[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    setLoading(true);
    fetch('https://zmh0kzfk-5173.use.devtunnels.ms/api/nodes')
        .then(response => {
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            if (!response.ok) throw new Error('Failed to fetch');
            return response.json();
        })
        .then(data => {
            console.log("Nodes: ", data)
            setNodeData(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err.message)
            setError(err.message);
            setLoading(false);
        });
}, []);




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
                style={(feature) => style(feature, dataMap)}
                onEachFeature={onEachCounty}/> 


            {/* Render markers dynamically from fetched data */}
            {nodeData.map((node) => (
                <Marker key={node.id} position={node.position}>
                    <Popup>
                        {node.name}
                        <br></br>
                        {node.position[0]}
                        {node.position[1]}
                        {/* {node.status && <br />}
                        {node.status && `Status: ${node.status}`} */}
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

    
    
    ); 
};

export default Map;

