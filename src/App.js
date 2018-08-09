import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Info from './Info';
import * as AirAPI from './AirAPI';

class App extends Component {

  state = {
    allStations: [],
dataLoaded: false,
mapZoom: false,
chosenStation: {}
  }


  componentDidMount() {
    AirAPI.getAllStations()
    .then(allStations => this.setState({allStations: allStations}, () => {
        this.setState({dataLoaded: true}) })) // prevent passing empty array to map component
    .catch(() => console.log('getAllStations failed'));
  }


  setStation(station) {
    this.setState({chosenStation: station}, () => {
        this.setState({mapZoom: true}); console.log('station: ', this.chosenStation)}

)}

setStation = this.setStation.bind(this);

  render() {

    return (
      <div className="App">
        <header className="header">
          <h1 className="title">Air quality in Warsaw</h1>
        </header>
        <main>
        {this.state.dataLoaded ? <Map allStations = {this.state.allStations} chosenStation = {this.state.chosenStation} setStation = {this.setStation} mapZoom = {this.mapZoom}/> : <p>Waiting for external data</p>
     }
      <Info allStations = {this.state.allStations} chosenStation = {this.state.chosenStation} setStation = {this.setStation} mapZoom = {this.mapZoom}/>

    </main>

      <footer>
      <p>Copyright (c) 2018 <strong>Puchweb Air</strong> All Rights Reserved.</p>
    </footer>
      </div>//end App
    );
  }
}

export default App;
