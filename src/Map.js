import React, { Component } from 'react';
import * as AirAPI from './AirAPI';
import App from './App';
import MapStyles from './MapStyles.json';

class Map extends Component {
  constructor(props) {
     super(props);
     this.state = {

     }
  }

  mapScriptLoaded() {

      const map = new window.google.maps.Map(
        document.getElementById('map'),
        {
          center: {lat: 52.161486 , lng: 21.069094},
          zoom: 10,
          maptype: 'terrain',
          styles: MapStyles
        },
      );

      const circle = {
          path: 'M10,20a10,10 0 1,0 20,0a10,10 0 1,0 -20,0',
          strokeColor: '#00a3ff', //blue
          fillColor: '#00a3ff',
          fillOpacity: 0.5

        };


      let singlePos = {lat: 52.161486 , lng: 21.069094};

let stations = this.props.allStations;
console.log('stations: ' + stations);
  stations.map(station => {
    let lat = station.location.latitude;
    let lng = station.location.longitude;
    console.log('lat: ' + lat);
    let myLatlng = new window.google.maps.LatLng(lat,lng);

    let marker = new window.google.maps.Marker({
      position: myLatlng,
      title: station.name,
      map: map,
     animation: window.google.maps.Animation.DROP,
     icon: circle
    });

  })



};

    toggleBounce() {
        if (this.marker.getAnimation() !== null) {
          this.marker.setAnimation(null);
        } else {
          this.marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      }


  componentDidMount() {
    console.log('propsmount: ' + this.props);
      let script = document.createElement('script');
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyB0xEceRYGqGevmv0eg0RF6DfbAXXDFySs`;
      document.body.appendChild(script);
      script.addEventListener('load', e => {
        this.mapScriptLoaded()
      })
  }

  this.mapScriptLoaded = this.mapScriptLoaded.bind(this);
    render() {

      return(
      <div className="col map">
    <section className="map-container">
      <div id="map" role="application" aria-hidden="true">
      </div>
    </section>
    </div>
  )
}
}

export default Map
