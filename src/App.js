import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Info from './Info';
import * as AirAPI from './AirAPI';

class App extends Component {

  state = {
    allStations: []
  }



  componentDidMount() {
    AirAPI.getAllStations()
    .then(allStations => this.setState({allStations: allStations}) )
    .catch(() => console.log('getAllStations failed'));
  }

  render() {

    return (
      <div className="App">
        <header className="header">
          <h1 className="title">Air quality in Warsaw</h1>
        </header>
        <main>
      <Map allStations = {this.state.allStations}/>
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
