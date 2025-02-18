import { useEffect, useState } from 'react';
import './Header.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Header(){

  const getTimeOfDay = (hour:any) => {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'evening';
  };

  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [timeOfDay, setTimeOfDay] = useState('');


  useEffect(() => {

    const getTime = () => {
      const currentHour = new Date().getHours();
      setTimeOfDay(getTimeOfDay(currentHour));
    };
    
    const getLocation = () =>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation(position.coords);
        });
      }
      else{
        console.log('Geolocation is not supported by this browser.');
      }
    }

    getTime();
    getLocation();
  }, [])

    return (
        <div className='headerContainer'>      
          <p>
            {timeOfDay === 'morning' ? 'Good Morning!' :
             timeOfDay === 'afternoon' ? 'Good Afternoon!' : 'Good Evening!'}
          </p>
          {location && (
            <div>
              <p>Mi stai guardando da qui :</p>
              <MapContainer className='mapStyle'center={[location.latitude,location.longitude]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.latitude,location.longitude]}>
                  <Popup>
                    Si esatto proprio da qui!
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
          <p>Current Time: {new Date().toLocaleTimeString()}</p>
      </div>
    )
}



export default Header;