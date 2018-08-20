import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Info from './Info';
import * as AirAPI from './AirAPI';

class App extends Component {

state = {
allStations: [],
dataLoaded: false,
stationsFound: [],
query: '',
oneStation: {}
  }


  componentDidMount() {
    AirAPI.getAllStations() //get array of all stations in Warsaw
    .then(allStations => this.setState({allStations: allStations}, () => {
        this.setState({dataLoaded: true}) })) // prevent passing empty array to map component
    .catch(() => console.log('getAllStations failed'));
  }

  updateQuery = (query) => {
    if (this.state.allStations.length > 0) {
    query = query.toLowerCase(); //our search is not case sensitive
    let stationsFound = this.state.allStations.filter(station => station.name.toLowerCase().search(query) > -1 || station.address.route.toLowerCase().search(query) > -1); //filter array of all stations to match query
    this.setState({
          stationsFound: stationsFound, //save results as state
          query: query
        });
        }
  }

  setStation(station) { //this function is called when user clicks particular station on the map
    this.setState({oneStation: station})
}

clearStation() {
this.setState({oneStation: {}})
}



setStation = this.setStation.bind(this);
clearStation = this.clearStation.bind(this);

  render() {

    return (
      <div className="App">
        <header className="header">
          <h1 className="title">Air quality in Warsaw</h1>
        </header>
        <main>
        <div className="errors">{AirAPI.displayErrors()}</div>
        {this.state.dataLoaded ? <Map allStations = {this.state.allStations} setStation = {this.setStation} stationsFound = {this.state.stationsFound} oneStation = {this.state.oneStation}/> : <p>Waiting for external data</p>
     }
      <Info allStations = {this.state.allStations} setStation = {this.setStation} stationsFound = {this.state.stationsFound} query = {this.state.query} updateQuery = {this.updateQuery} clearStation = {this.clearStation} oneStation = {this.state.oneStation}/>

    </main>

      <footer>
      <p>Copyright (c) 2018 <strong>Puchweb Air</strong> All Rights Reserved.</p>
    </footer>
      </div>//end App
    );
  }
}

export default App;
