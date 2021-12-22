import React from 'react'
import { gsap } from 'gsap'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const ResturentMapOpenDates = (props) => {
    //Close Map model
    const tl = gsap.globalTimeline
    const store_longitude = props.store_longitude
    const store_latitude = props.store_latitude


    const closemapmodel = () => {
        var full_map_box = document.querySelector('.map_box_open_full');
        var map_box = document.querySelector('.map_open_date');

        tl.to(full_map_box, .3, {visibility: 'hidden', opacity: 0})
          .to(map_box, .2, {visibility: 'hidden', opacity: 0})
    } 


    return (
        <>
          <div className="map_box_open_full" onClick={closemapmodel}></div>

          <div className="map_open_date">
              <div id="res_location_map">
                  <div className="map-container">
                    <MapContainer 
                        center={[store_longitude, store_latitude]} 
                        zoom={18} 
                        scrollWheelZoom={true}                  
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright"></a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[store_longitude, store_latitude]}>
                            <Popup>{props.returent_name}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
              </div>
          </div>
        </>
    )
}

export default ResturentMapOpenDates
