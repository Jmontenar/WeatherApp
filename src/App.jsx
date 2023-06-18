import { useEffect, useState } from 'react'
import './App.css'
import Weather from './components/Weather'

function App() {
  const [coords, setCoords] = useState()
  

  useEffect (() =>  {
    const sucess = pos => {
        const latlon = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }
        setCoords(latlon)
    }
    navigator.geolocation.getCurrentPosition (sucess)
  }, [])
  return (
    <div className="App">
      <Weather lon={coords?.lon} lat={coords?.lat} />
    </div>
  )
}

export default App
