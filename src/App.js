import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Info from './Info';
import * as AirAPI from './AirAPI';

class App extends Component {

  state = {
    allStations: [
  {
    "id": 0,
    "name": "Fake",
    "vendor": "Airly",
    "location": {
      "latitude": 52.219113,
      "longitude": 21.017232999999997
    },
    "pollutionLevel": 0,
    "address": {
      "streetNumber": "0",
      "route": "Fake",
      "locality": "Warszawa",
      "country": "Poland"
    }
  }
],
dataLoaded: false
  }


  componentDidMount() {
    AirAPI.getAllStations()
    .then(allStations => this.setState({allStations: allStations}, () => {
        this.setState({dataLoaded: true}) }))
    .catch(() => console.log('getAllStations failed'));
  }

  render() {

    return (
      <div className="App">
        <header className="header">
          <h1 className="title">Air quality in Warsaw</h1>
        </header>
        <main>
        {this.state.dataLoaded ? <Map allStations = {this.state.allStations}/> : 'Waiting for external data '
}
      <Info allStations = {this.state.allStations}/>

    </main>

      <footer>
      <p>Copyright (c) 2018 <strong>Puchweb Air</strong> All Rights Reserved.</p>
    </footer>
      </div>//end App
    );
  }
}

export default App;
