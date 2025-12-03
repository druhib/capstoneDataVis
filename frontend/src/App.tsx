import { useState, useEffect } from 'react'
import Map from './components/MapComponent'
import MapPage from './components/MapPage'
import './App.css'
import ReloadTable from './components/ReloadTable';
// import NodeData from './components/types'
import { Dropdown } from 'antd';

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


const App = () =>{


  const [nodeData, setNodeData] = useState<NodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
      setLoading(true);
      fetch('https://zmh0kzfk-5173.use.devtunnels.ms/api/nodes/get')
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
    <>
     <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
     
        <MapPage nodeData ={nodeData}/> 
       
        <div style = {{ width: "50%", }}>
            <ReloadTable nodeData ={nodeData}  /> 
        </div>

          
      </div>
    </>
    
      
  
  )
};

export default App

// fetch('https://mywebsite.com/endpoint/', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     firstParam: 'yourValue',
//     secondParam: 'yourOtherValue',
//   })
// })