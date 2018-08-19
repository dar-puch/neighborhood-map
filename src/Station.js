import React, { Component } from 'react';
import './App.css';
import * as AirAPI from './AirAPI';

class Station extends Component {
state = {
  current: {}
};
componentDidMount(){
  AirAPI.getStationData(this.props.id)
  .then(details => this.setState({current: details.currentMeasurements}))
}


render() {
  return(
    <div>
    <h3>Station no: {this.props.id} </h3>
    <h3>Latest measurements:</h3>
    <p>Pollution level: {this.state.current.pollutionLevel}</p>
    <p>Air Quality Index: {this.state.current.airQualityIndex}</p>
    <p>PM 2.5: {this.state.current.pm25}</p>
    <p>PM 10: {this.state.current.pm10}</p>
    <p>Pressure: {this.state.current.pressure}</p>
    <p>Temperature: {this.state.current.temperature}</p>
    <button id="closeDetails" onClick={this.props.clearStation}>Show All</button>
    </div>
  )
}
}
export default Station
