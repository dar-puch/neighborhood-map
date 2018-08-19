import React, { Component } from 'react';
import * as AirAPI from './AirAPI';
import App from './App';
import Station from './Station';

class Info extends Component {

rememberStation(station){
let current = this.props.allStations.find(allStation => allStation.id == station.id);
//this.props.setStation(current) //not working
}

  renderStations() {
     if (this.props.stationsFound.length > 0) {
    return (this.props.stationsFound.map((station) => (
       <li key = {station.id} > {station.name}, {station.address.route} {station.address.streetNumber} {this.renderDescription()}   <button className="showDetails" id={station.id} onClick = {this.rememberStation(station)}> Measurements </button>
 </li>
     )))
     }

   else {
     return(
     this.props.allStations.map((station) => (
       <li key = {station.id} > {station.name}, {station.address.route} {station.address.streetNumber}   <button className="showDetails" id={station.id} onClick = {event => this.rememberStation(event.target)}> Measurements </button> </li>
     ))
   );


   };

  }

renderDescription() {
  if (this.props.stationsFound.length === 1) {
  return <Station id = {this.props.stationsFound[0].id} clearStation = {this.props.clearStation}/>
  }

};



render() {
  return (
   <div className="col info">
  <section className="info-container">

      <div className="filter-options" id="filter">
        <h2>Filter Results</h2>
        <p>Search stations by name or street address</p>

        <input type = "text" placeholder = "Search"
               value = {this.props.query}
               onChange = {(event) => this.props.updateQuery(event.target.value)}/>
        </div>

      <ul className="stations-list">
      <h2> Stations </h2>
      {this.renderStations()};
      </ul>


  </section>
  </div>

) //end return
} //end render
} //end component
export default Info
