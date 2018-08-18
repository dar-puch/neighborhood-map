import React, { Component } from 'react';
import * as AirAPI from './AirAPI';
import App from './App';
import MapStyles from './MapStyles.json';

class Map extends Component {
initialPos = {lat: 52.237049 , lng: 21.017532};
markers = [];
foundMarkers = [];
bounds;
map;
  mapInit() {
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

}; //mapInit

showMarkers(stations) {
  this.bounds = new window.google.maps.LatLngBounds();
  const circle = {
      path: 'M10,20a10,10 0 1,0 20,0a10,10 0 1,0 -20,0',
      strokeColor: '#00a3ff', //blue
      fillColor: '#00a3ff',
      fillOpacity: 0.5
    };
  let set = this.props.setStation;
  stations.map(station => {
    let latLng = new window.google.maps.LatLng(station.location.latitude, station.location.longitude);
    let marker = new window.google.maps.Marker({
      position: latLng,
      title: station.name,
     animation: window.google.maps.Animation.DROP,
     icon: circle,
     stationId: station.id
    });
    marker.addListener('click', function() {
      set(station);
          });
    this.markers.push(marker);
this.map.fitBounds(this.bounds);
this.bounds.extend(marker.position);
  })
}

setMapOnAll(map, markersArr) {
  markersArr.forEach((marker) => {
    marker.setMap(map);
this.bounds.extend(marker.position);
this.map.fitBounds(this.bounds)
}
)
}


    clearMarkers(markersArr) {
        this.setMapOnAll(null, markersArr);
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
        this.mapInit();
        this.showMarkers(this.props.allStations);
        this.setMapOnAll(this.map, this.markers)
      })
  }

  componentDidUpdate() {
      if (Object.keys(this.props.chosenStation).length > 0) { //when station is clicked, zoom to marker
        let id = this.props.chosenStation.id;
        let  chosenMarker = this.markers.find(marker => marker.stationId === id)


        let chosenLatLng = new window.google.maps.LatLng(this.props.chosenStation.location.latitude, this.props.chosenStation.location.longitude);

        this.clearMarkers(this.markers);
        this.clearMarkers(this.foundMarkers);
        chosenMarker.setMap(this.map);
        this.map.panTo(chosenLatLng);
        this.bounds.extend(chosenLatLng);
        this.map.fitBounds(this.bounds)
    }
    else { //zoom back
      this.map.panTo(this.initialPos);
      this.map.setZoom(12);
      if (this.props.stationsFound.length > 0) { //when there are search results, show markers for found stations
        this.foundMarkers = this.markers.filter(marker => this.props.stationsFound.find(station => station.id === marker.stationId));
        this.clearMarkers(this.markers);
        this.setMapOnAll(this.map, this.foundMarkers);
      }
      else { //if not - show all markers
        this.clearMarkers(this.foundMarkers);
        this.setMapOnAll(this.map, this.markers);
      }
    }

  } //componentDidUpdate


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
} //end class

export default Map
