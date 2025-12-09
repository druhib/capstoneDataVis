import { useState, useEffect } from 'react'
import Map from './components/MapComponent'
import MapPage from './components/MapPage'
import './App.css'
import ReloadTable from './components/ReloadTable';
import {NodeData} from './components/types'
import { Dropdown } from 'antd';
import { Button, Select } from 'antd';


// how to run and test current code 
// overview: run frontend, create forwarding port, then run backend 


// 1. open terminal, cd to frontend folder : cd frontend 
// 2. type: npm install
// 3. type: npm build 
// 4. type: npm run dev 

// note: packages installed in frontend: react-leaflet, antd 

// 5. create forwarding port 
      // steps to enable forwarding port: 
      // a. Ports -> Forward a Port
      // b. Type in 5173 
      // c. Change Visibility from Private to public 
      // change url below so fetch is from the url connected to user forwarding port 
      // before running back end, the webiste will be present on the url 

// 6. run backend 
    // open a second terminal: cd to backend folder: cd backend 
    // type: node server.js 




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
      // for testing puposes we use a public forwarding port and github server. this url is subject to change based on user url 
      // steps to enable forwarding port: 
      // 1. Ports -> Forward a Port
      // 2. Type in 5173 
      // 3. Change Visibility from Private to public 
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
// end of AI use here ^^ // node that advertising node is used to filter not UUID, ideally the changing origin ID would be used 


  return (
    <>
     <div style={ { display: 'flex', flexDirection: 'column', gap: "1rem" }}>
        
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
                    Refresh Data
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

