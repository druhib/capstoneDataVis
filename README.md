# capstoneDataVis
capstone data visualization 


how to run and test current code, found on App.tsx
overview: run frontend, create forwarding port, then run backend 


1. open terminal, cd to frontend folder : cd frontend 
2. type: npm install
3. type: npm build 
4. type: npm run dev 

note: packages installed in frontend: react-leaflet, antd 

5. create forwarding port,
   steps to enable forwarding port:
   1. Ports -> Forward a Port
   2. Type in 5173
   3. Change visibility from private to public
   4. Change url below so fetch is from the url connected to user forwarding port new url + "api/nodes/get"
      a. before running back end, the website will be present on the forwarding port
      b. after running url the data is posted on new url + "api/nodes/get"

7. run backend 
   open a second terminal: cd to backend folder: cd backend 
   type: node server.js 
   data is posted on new url + "api/nodes/get"
