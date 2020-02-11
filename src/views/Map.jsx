
import React from "react";
// react plugin used to create google maps
// import {
//   withScriptjs,
//   withGoogleMap,
//   Marker
// } from "react-google-maps";
// reactstrap components
import {
  Marker,
  GoogleMap,
  InfoWindow,
  HeatmapLayer,
  HeatmapLayerProps
} from '@react-google-maps/api';


import FlexView from 'react-flexview';
import { Card, Label, Input, CardHeader, CardBody, Row, Col, Button } from "reactstrap";

import socketIO from 'socket.io-client/dist/socket.io';
import RoundImage from "react-rounded-image";
const axios = require('axios')
const styles = [
  {
    featureType: "water",
    stylers: [
      {
        saturation: 43
      },
      {
        lightness: -11
      },
      {
        hue: "#0088ff"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        hue: "#ff0000"
      },
      {
        saturation: -100
      },
      {
        lightness: 99
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#808080"
      },
      {
        lightness: 54
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ece2d9"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ccdca1"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#767676"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#b8cb93"
      }
    ]
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.sports_complex",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.medical",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  }
];


class Map extends React.Component {
 
  constructor(props) {
    super(props);
    console.log(process.env.REACT_APP_SOCKET_SERVER)
      
    const params = new URLSearchParams(window.location.search);
    // console.log(props.history)
    this.state = {
      locations: [],
      center: {
        lat: Number(params.get('lat')) || 12.879721,
        lng: Number(params.get('lng')) || 121.774017
      },

    };
    
    this.markers = []
  }
  markerOnHandleClick = (e, i) => {
    this.state.locations[i].visible = true;
    console.log(e)
    // this.state.locations[i].position = e.target.position;
    this.forceUpdate()
    
  }

  onMapLoadHandler = (map) => {

    if ( this.state.locations.length ) {
      const bounds = new window.google.maps.LatLngBounds();
      this.state.locations.forEach(location => {
        bounds.extend({ lat: location.latitude, lng: location.longitude});
      });
      // console.log(this.state.locations)
      map.fitBounds(bounds);
    }

    
  }
  emergencyOnHandleCLick = (e, i) => {
    this.state.locations[i].emergency = 0;
    
    this.state.locations[i].visible = true;
     
    this.socket.emit('emergency_click', { device_id: this.state.locations[i].device_id})
    this.forceUpdate()
    
  }
  backtrackOnChangeHandle = (e, i) => {

    axios.get(`${process.env.REACT_APP_HTTP_SERVER}/bus/locations`, { params: {
      bus: this.state.locations[i].plate_no
    } })
    .then(response => {

      let locations = response.data.data
    
      console.log(locations)

      this.state.locations[i].backtrack = locations;
      this.forceUpdate()

    })
    .catch(console.log)
  }
 
  infoWindowOnCloseHandle = (i) => {
    this.state.locations[i].visible = false;
    this.forceUpdate()

  }
  componentDidUpdate(prevPros, prevState) {
    
    let search = window.location.search;
    let params = new URLSearchParams(search);  
    let lat = params.get('lat')
    let lng = params.get('lng')

    if (prevState.center.lat !== parseFloat(lat) || prevState.center.lng !== parseFloat(lng) ) {

      if ( lat && lng )
        this.setState({center: {lat: parseFloat(lat), lng: parseFloat(lng)}})

    }
  }
  componentDidMount() {
    
    this.socket = socketIO(process.env.REACT_APP_SOCKET_SERVER, {      
      transports: ['websocket'], jsonp: false });   
    this.socket.connect();
    
    this.socket.on('emergency_broadcast', data => {
      
      
      
      this.state.locations.forEach(location => {
        if ( location.device_id == data.id ) {
          location.emergency = data.emergency
          this.forceUpdate()
        }
      })

      
      console.log(data)
    
    })
    this.socket.on('location_broadcast', data => {
      
      this.state.locations.forEach((location, i) => {
        if ( location.device_id == data.id ) {
          location.latitude = data.latitude
          location.longitude = data.longitude
          this.forceUpdate()

        }
      })

      // console.log(this.state.locations)
    
    })

    let search = window.location.search;
    let params = new URLSearchParams(search);  
    let lat = params.get('lat')
    let lng = params.get('lng')
    if ( lat && lng )
      this.setState({center: {lat: parseFloat(lat), lng: parseFloat(lng)}})

    axios.get(`${process.env.REACT_APP_HTTP_SERVER}/buses/location`)
    .then(response => {

      let locations = response.data.data
    

      locations.map(location => { 
        location.visible = false
       })
      console.log(locations)

      this.setState({locations})

    })
    .catch(console.log)
    
  }
  render() {
    
    // this.marker = []
    // console.log(this.state.locations)
    return (
        <div className="content"
            style={{ height: `100vh`, position: "relative", overflow: "hidden" }}>
        
        <GoogleMap
         zoom={7}
         center={this.state.center}

         mapContainerStyle={{width: '100%', height: '100vh'}}
    
         onLoad={this.onMapLoadHandler}
       >
       {
         
         this.state.locations.map((location, index) => {  
          //  console.log(location.visible)

           return location.emergency ? 
           (
            <Marker 
            key={location.id} 
            onClick ={(e) => { this.markerOnHandleClick(e, index) }}

          position={{ lat: location.latitude, lng: location.longitude }}>
           <InfoWindow 
          // anchor={ this.markers[index] }
          position={{ lat: location.latitude, lng: location.longitude }}
            onCloseClick={() => this.infoWindowOnCloseHandle(index)}>
            
<div>
          
      <Button outline color="danger"
      
      onClick ={(e) => { this.emergencyOnHandleCLick(e, index) }}>
      Emergency here!!</Button></div>
            </InfoWindow>
                                
          </Marker>
           )
           :
           (
                    <Marker 
                    key={location.id} 
                    onClick ={(e) => { this.markerOnHandleClick(e, index) }}

                  position={{ lat: location.latitude, lng: location.longitude }}>
                  
                      
                  {location.visible && <InfoWindow 
                  // anchor={ this.markers[index] }
                  position={{ lat: location.latitude, lng: location.longitude }}
                    onCloseClick={() => this.infoWindowOnCloseHandle(index)}>
                    


                    <FlexView aligncontent='left' row={"true"}>
                      <RoundImage
                roundedColor="#321124"
                imageWidth="50"
                imageHeight="50"
                roundedSize="13"/>
                
                
                <FlexView aligncontent='left' column style={{marginLeft: 10}}>
                <FlexView hAlignContent='right'  row={"true"}>
                            
              <Label check>
                <Input onChange={(e)=>this.backtrackOnChangeHandle(e, index)} type="checkbox"/>
              Backtrack
              </Label>
                </FlexView>
                <FlexView aligncontent='left' row={"true"}>
                      <div>Driver name:</div>
                      <div style={{marginLeft: 10}}>{}</div>
                </FlexView>
                <FlexView aligncontent='left' row={"true"}>
                      <div>Plate number:</div>
                      <div style={{marginLeft: 10, fontWeight: 'bold'}}>{location.plate_no}</div>
                </FlexView>
                  
                </FlexView>
                </FlexView>
                    </InfoWindow>}
                                        
                  </Marker>
            
            )
           
            })
                
        }
       </GoogleMap>
        </div>
    );
  }
}

export default Map;
