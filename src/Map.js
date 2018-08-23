import React, {
  Component
} from 'react';
import MapStyles from './MapStyles.json';

class Map extends Component {
  initialPos = {
    lat: 52.237049,
    lng: 21.017532
  };
  markers = [];
  foundMarkers = [];
  map;
  mapInit() {
    this.map = new window.google.maps.Map(
      document.getElementById('map'), {
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

    const circle = {
      path: 'M10,20a10,10 0 1,0 20,0a10,10 0 1,0 -20,0',
      strokeColor: '#5E667D',
      fillColor: '#252831',
      fillOpacity: 1
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

    })
  }

  fitBounds(markers) {
    let bounds = new window.google.maps.LatLngBounds();
    markers.forEach(marker => bounds.extend(marker.getPosition()));
    this.map.fitBounds(bounds);
    if (this.map.getZoom() > 17) {
      this.map.setZoom(17);
    }
  }

  setMapOnAll(map, markersArr) {
    markersArr.forEach((marker) => {
      marker.setMap(map);
      this.fitBounds(markersArr);
    })
  }

  setMapOnOne(map, marker) {
    marker.setMap(map);
    this.fitBounds([marker]);
    this.toggleBounce(marker);
  }


  clearMarkers(markersArr) {
    this.setMapOnAll(null, markersArr);
  }

  toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 1500);
    }
  }


  componentDidMount() {
    let script = document.createElement('script');
    script.src = `https://maps.google.com/maps/api/js?key=AIzaSyB0xEceRYGqGevmv0eg0RF6DfbAXXDFySs`;
    document.body.appendChild(script);
    script.addEventListener('load', e => {
      this.mapInit();
      if (this.props.allStations.length > 0) {
        this.showMarkers(this.props.allStations);
        this.setMapOnAll(this.map, this.markers)
      }

    })
  }

  componentDidUpdate() {

    if (this.props.stationsFound.length > 0) { //when there are search results, show markers for found stations
      this.foundMarkers = this.markers.filter(marker => this.props.stationsFound.find(station => station.id === marker.stationId));
      this.clearMarkers(this.markers);
      this.setMapOnAll(this.map, this.foundMarkers);
    } else if ((this.props.allStations.length > 0) && (this.props.query === '')) { //if not - show all markers
      this.clearMarkers(this.foundMarkers);
      this.setMapOnAll(this.map, this.markers);
    } else {
      this.clearMarkers(this.foundMarkers);
      this.clearMarkers(this.markers);
    }

    if (Object.keys(this.props.oneStation).length > 0) { //when station is clicked, zoom to marker
      let id = this.props.oneStation.id;
      let chosenMarker = this.markers.find(marker => marker.stationId == id);
      this.clearMarkers(this.foundMarkers);
      this.clearMarkers(this.markers);
      this.setMapOnOne(this.map, chosenMarker);
    }

  } //componentDidUpdate


  render() {
    return ( <
      div className = "col map" >
      <
      section className = "map-container" >
      <
      div id = "map"
      role = "application"
      aria - hidden = "true" >
      <
      /div> <
      /section> <
      /div>
    )
  }
} //end class

export default Map
