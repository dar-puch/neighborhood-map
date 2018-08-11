import React, { Component } from 'react';
import * as AirAPI from './AirAPI';
import App from './App';
import MapStyles from './MapStyles.json';

class Map extends Component {

initialPos = {lat: 52.237049 , lng: 21.017532};
map;

  prepareMap() {
      this.map = new window.google.maps.Map(
        document.getElementById('map'),
        {
          center: this.initialPos,
          mapTypeControl: false,
          streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
          zoom: 12,
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

      let bounds = new window.google.maps.LatLngBounds();

let stations = this.props.allStations;
let set = this.props.setStation;
let chosen = this.props.chosenStation;

  stations.map(station => {

    let latLng = new window.google.maps.LatLng(station.location.latitude, station.location.longitude);

    let marker = new window.google.maps.Marker({
      position: latLng,
      title: station.name,
      map: this.map,
     animation: window.google.maps.Animation.DROP,
     icon: circle
    });

    marker.addListener('click', function() {
      set(station);
          });
bounds.extend(marker.position);
  })

this.map.fitBounds(bounds);

}; //end prepareMap

updateMap(chosen) {
  if (Object.keys(chosen).length > 0) {
    let chosenLatLng = new window.google.maps.LatLng(chosen.location.latitude, chosen.location.longitude);
    this.map.panTo(chosenLatLng);
    this.map.setZoom(15);
  }
  else {
    this.map.panTo(this.initialPos);
    this.map.setZoom(12);
  }
}

    toggleBounce() {
        if (this.marker.getAnimation() !== null) {
          this.marker.setAnimation(null);
        } else {
          this.marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      }


  componentDidMount() {
      let script = document.createElement('script');
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyB0xEceRYGqGevmv0eg0RF6DfbAXXDFySs`;
      document.body.appendChild(script);
      script.addEventListener('load', e => {
        this.prepareMap()
      })
  }
  componentDidUpdate() {
      this.updateMap(this.props.chosenStation)
  }


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
