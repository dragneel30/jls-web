
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
  InfoWindow
} from '@react-google-maps/api';

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { tsThisType } from "@babel/types";

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
      
    const params = new URLSearchParams(window.location.search);
    console.log(props.history)
    this.state = {
      locations: [],
      center: {
        lat: Number(params.get('lat')) || 0,
        lng: Number(params.get('lng')) || 0
      }
    };
    
  }

  onMapLoadHandler = (map) => {

    if ( this.state.locations.length ) {
      const bounds = new window.google.maps.LatLngBounds();
      this.state.locations.forEach(location => {
        bounds.extend({ lat: location.latitude, lng: location.longitude});
      });
      console.log(this.state.locations)
      map.fitBounds(bounds);
    }

  }

  componentDidUpdate(prevPros, prevState) {
    
    let search = window.location.search;
    let params = new URLSearchParams(search);  
    let lat = params.get('lat')
    let lng = params.get('lng')

    console.log(prevState.center)
    console.log(lat,lng)
    if (prevState.center.lat !== parseFloat(lat) || prevState.center.lng !== parseFloat(lng) ) {

      if ( lat && lng )
        this.setState({center: {lat: parseFloat(lat), lng: parseFloat(lng)}})

    }
  }
  componentDidMount() {
    console.log('asdfdasfdsaf')
    
    let search = window.location.search;
    let params = new URLSearchParams(search);  
    let lat = params.get('lat')
    let lng = params.get('lng')
    if ( lat && lng )
      this.setState({center: {lat: parseFloat(lat), lng: parseFloat(lng)}})

    axios.get('http://localhost:1234/buses/location')
    .then(response => {

      let locations = response.data.data
    
      console.log(locations)

      this.setState({locations})

    })
    .catch(console.log)
    
  }
  render() {
    
    return (
      <>
        <div className="content"
            style={{ height: `100vh`, position: "relative", overflow: "hidden" }}>
        
        <GoogleMap
         zoom={12}
         center={this.state.center}

         mapContainerStyle={{width: '100%', height: '100vh'}}
    
         onLoad={this.onMapLoadHandler}
       >
       {/* <Marker position={{ lat: 12.748817, lng: 121.985428}} /> */}
       {
         
         this.state.locations.map(location => {  
           return (
             <Marker key={location.id} position={{ lat: location.latitude, lng: location.longitude }}>
             
{/*              
                <InfoWindow onCloseClick={this.props.handleCloseCall}>
                  <h1>{this.props.location.venue.name}</h1>
                </InfoWindow> */}
             </Marker>
   
           )
         })}}
       </GoogleMap>
        </div>
      </>
    );
  }
}

export default Map;
