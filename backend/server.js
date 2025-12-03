const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5173;

// Enable CORS for your React app
// app.use(cors());
// app.use(express.json());
app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins (for development)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Your nodes data
let nodes = [
    // { id: 1, name: "Node 1", position: [32, -99] },
    // { id: 2, name: "Node 2", position: [31, -101] },
    // { id: 3, name: "Node 3", position: [31, -94] }
];

app.get('/', (req, res) => {
    res.json({ 
        message: "Server is running!",
        endpoints: {
            getNodes: "GET /api/nodes/get",
            addNode: "POST /api/nodes/post"
        }
    });
});

// GET endpoint
app.get('/api/nodes/get', (req, res) => {
    res.json(nodes);
});

// POST endpoint
app.post('/api/nodes/post', (req, res) => {
  const { UUID, advertisingName, latitude, longitude, data = {} } = req.body || {};

  console.log(req.body);

  if (!UUID || !advertisingName) {
    return res.status(400).json({ error: 'UUID and advertisingName are required' });
  }

   // Find existing node by UUID
  const existingNode = nodes.find(n => n.UUID.trim() === UUID.trim());
  
  if (existingNode) {
    console.log("Existing node detected. Updating data...");
    
    // Append new data to existing arrays
    // this omits errros if data fields are missing
    existingNode.data.temp.push(Number(data.temp));
    existingNode.data.humidity.push(Number(data.humidity));
    existingNode.data.gas.push(Number(data.gas));
    existingNode.data.accelX.push(Number(data.accelX));
    existingNode.data.accelY.push(Number(data.accelY));
    existingNode.data.accelZ.push(Number(data.accelZ));
    
    res.status(200).json(existingNode);
  } else { 
    // Create new node
    const readings = {
      temp: Array.isArray(data.temp) ? data.temp : [Number(data.temp ?? 0)],
      humidity: Array.isArray(data.humidity) ? data.humidity : [Number(data.humidity ?? 0)],
      gas: Array.isArray(data.gas) ? data.gas : [Number(data.gas ?? 0)],
      accelX: Array.isArray(data.accelX) ? data.accelX : [Number(data.accelX ?? 0)],
      accelY: Array.isArray(data.accelY) ? data.accelY : [Number(data.accelY ?? 0)],
      accelZ: Array.isArray(data.accelZ) ? data.accelZ : [Number(data.accelZ ?? 0)]
    };

    const newNode = {
      id: nodes.length + 1,
      UUID: UUID.trim(),
      advertisingName: advertisingName.trim(),
      latitude: latitude,
      longitude: longitude,
      data: readings
    };

    nodes.push(newNode);
    res.status(201).json(newNode);
  } 
});
  
//   if (UUID in nodes.map(n => n.UUID.trim())) {
//      console.log("Existing node detected. Updating data...");
//     readings.accelX.append(data.accelX); 
//   }  
//   else{ 

//     const readings = {
//         temp: Array.isArray(data.temp) ? data.temp : [Number(data.temp ?? 0)],
//         humidity: Array.isArray(data.humidity) ? data.humidity : [Number(data.humidity ?? 0)],
//         gas: Array.isArray(data.gas) ? data.gas : [Number(data.gas ?? 0)],
//         accelX: Array.isArray(data.accelX) ? data.accelX : [Number(data.accelX ?? 0)],
//         accelY: Array.isArray(data.accelY) ? data.accelY : [Number(data.accelY ?? 0)],
//         accelZ: Array.isArray(data.accelZ) ? data.accelZ : [Number(data.accelZ ?? 0)]
//     };

//     const newNode = {
//         id: nodes.length + 1,
//         UUID: UUID.trim(),
//         advertisingName: advertisingName.trim(),
//         latitude: latitude,
//         longitude: longitude,
//         data: readings
//     };

//     nodes.push(newNode);
//     res.status(201).json(newNode);
//         } 
// });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});