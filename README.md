# capstoneDataVis
capstone data visualization 


how to run and test current code, found on App.tsx
overview: run frontend, create forwarding port, then run backend 


1. open terminal, cd to frontend folder : cd frontend 
2. type: npm install
3. type: npm build 
4. type: npm run dev 

note: packages installed in frontend: react-leaflet, antd 

5. create forwarding port 
      steps to enable forwarding port: 
      a. Ports -> Forward a Port
      b. Type in 5173 
      c. Change visibility from private to public 
      change url below so fetch is from the url connected to user forwarding port 
            new url + "api/nodes/get"
      before running back end, the website will be present on the forwarding port 
      after running url the data is posted on new url + "api/nodes/get"

6. run backend 
   open a second terminal: cd to backend folder: cd backend 
   type: node server.js 
   data is posted on new url + "api/nodes/get"
