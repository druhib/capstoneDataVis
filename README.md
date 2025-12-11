# capstoneDataVis
capstone data visualization 


website: 

<img width="866" height="761" alt="Screenshot 2025-12-09 at 4 35 24 PM" src="https://github.com/user-attachments/assets/e1dc4581-487f-41b6-b264-323fa6e3f3f5" />


how to run and test current code, instructions found on App.tsx
overview: run frontend, create forwarding port, then run backend 


1. open terminal, cd to frontend folder : cd frontend 
2. type: npm install
3. type: npm run dev 

note: packages installed in frontend: react-leaflet, antd 

5. create forwarding port,
   steps to enable forwarding port:
   1. Ports -> Forward a Port
   2. Type in 5173
   3. Change visibility from private to public
   4. Change url on App.tsx so fetch is from the url connected to user forwarding port, paste new url + "api/nodes/get"
      a. before running backend, the website will be present on the forwarding port
      b. after running backend, url the data is posted on forwarding port url + "api/nodes/get"

7. run backend
   1. open a second terminal: cd to backend folder: cd backend
   2. type: node server.js
   3. data is posted on new url + "api/nodes/get"
