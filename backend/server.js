const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5173;

// Enable CORS for your React app
// app.use(cors());
// app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins (for development)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());


// Your nodes data
let nodes = [
    { id: 1, name: "Node 1", position: [32, -99] },
    { id: 2, name: "Node 2", position: [31, -101] },
    { id: 3, name: "Node 3", position: [31, -94] }
];

app.get('/', (req, res) => {
    res.json({ 
        message: "Server is running!",
        endpoints: {
            getNodes: "GET /api/nodes",
            addNode: "POST /api/nodes"
        }
    });
});

// GET endpoint
app.get('/api/nodes', (req, res) => {
    res.json(nodes);
});

// POST endpoint
app.post('/api/nodes', (req, res) => {
    //add checking id, if in node, replace, else append
    const newNode = {
        id: nodes.length + 1,
        ...req.body
    };
    nodes.push(newNode);
    res.json(newNode);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});