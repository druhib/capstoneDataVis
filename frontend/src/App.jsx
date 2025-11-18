
import Map from './components/Map'
import './App.css'



const App = () =>{

  return (
    <>
     <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
     
          <Map> 
            
          </Map>

          {/* get / post request from iphone, 
          get request  */}
       
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