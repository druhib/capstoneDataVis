import { useState, useEffect } from 'react'
import Map from './components/MapComponent'
import MapPage from './components/MapPage'
import './App.css'
import ReloadTable from './components/ReloadTable';
import {NodeData} from './components/types'
import { Dropdown } from 'antd';
import { Button, Select } from 'antd';


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




const App = () =>{




const [nodeData, setNodeData] = useState<NodeData[]>([]);
const [loading, setLoading] = useState(true); // changed from true 
const [error, setError] = useState<string | null>(null);
const [reloadButton, setReloadButton] = useState(false);

//AI generated 
const [selectedNode, setSelectedNode] = useState<string | null>(null);


const start = () => {
    setReloadButton(!reloadButton);
  };

  
  useEffect(() => {
      setLoading(true);
      fetch('https://6fxwjs58-5173.use.devtunnels.ms/api/nodes/get')
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
  }, [reloadButton]);

  //AI generated 
  // Filter data based on selected node
    const filteredData = selectedNode 
        ? nodeData.filter(node => node.advertisingName === selectedNode)
        : nodeData;

    // Create dropdown options from node names
    const dropdownOptions = [
        { value: null, label: 'Select Node' },
        ...nodeData.map(node => ({
            value: node.advertisingName,
            label: node.advertisingName
        }))
    ];



  return (
    <>
     <div style={ { display: 'flex', flexDirection: 'column', gap: "1rem" }}>
        {/* <div> 

        <Select
            style={{ width: 200, position: 'absolute',  right: '150px', bottom: '-400px', margin: "1rem"}}
            placeholder="Select a node"
            value={selectedNode}
            onChange={setSelectedNode}
            options={dropdownOptions}
        />
        <Button type="primary"  onClick={start} loading={loading} style = {{position: 'absolute',  right: '50px', bottom: '-385px'}}> 
                Reload Data
        </Button>

        </div>    */}
        <MapPage nodeData ={nodeData}/>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', marginTop: '2rem', alignContent:"left", justifyContent: "left" }}>
            <Select
                style={{ width: 200}}
                placeholder="Select a node"
                value={selectedNode}
                onChange={setSelectedNode}
                options={dropdownOptions}
            />
            <Button type="primary"  onClick={start} loading={loading} > 
                    Reload Data
            </Button> 
        </div>
     
     
        
        <div style ={{ display: 'flex', flexDirection: 'row', alignItems:"left", justifyContent:"left", gap: '2rem', marginTop: '2rem' }}> 
            
            <div>
                <h2 style ={{textAlign:"left"}}> Sensor Data Table: {selectedNode} </h2>
                
                <ReloadTable nodeData ={filteredData}  /> 
            </div>
       

        </div>
       
          
      </div>
    </>
    
      
  
  )
};

export default App

