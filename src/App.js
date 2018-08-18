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
query: ''
  }


  componentDidMount() {
    AirAPI.getAllStations()
    .then(allStations => this.setState({allStations: allStations}, () => {
        this.setState({dataLoaded: true}) })) // prevent passing empty array to map component
    .catch(() => console.log('getAllStations failed'));
  }

  updateQuery = (query) => {
    this.setState({query: ''});
    query = query.toLowerCase();
    let stationsFound = this.state.allStations.filter(station => station.name.toLowerCase().search(query) > -1);
    this.setState({
          stationsFound: stationsFound
        });
  }

  setStation(station) {
    this.updateQuery(station.name);
    this.setState({stationsFound: [station]}
)}

setStation = this.setStation.bind(this);

  render() {

    return (
      <div className="App">
        <header className="header">
          <h1 className="title">Air quality in Warsaw</h1>
        </header>
        <main>
        {this.state.dataLoaded ? <Map allStations = {this.state.allStations} setStation = {this.setStation} stationsFound = {this.state.stationsFound}/> : <p>Waiting for external data</p>
     }
      <Info allStations = {this.state.allStations} setStation = {this.setStation} stationsFound = {this.state.stationsFound} query = {this.state.query} updateQuery = {this.updateQuery}/>

    </main>

      <footer>
      <p>Copyright (c) 2018 <strong>Puchweb Air</strong> All Rights Reserved.</p>
    </footer>
      </div>//end App
    );
  }
}

export default App;
