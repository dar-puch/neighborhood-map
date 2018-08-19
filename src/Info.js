import React, { Component } from 'react';
import * as AirAPI from './AirAPI';
import App from './App';
import Station from './Station';

class Info extends Component {


  renderStations() {
     if (this.props.stationsFound.length > 0) {
    return (this.props.stationsFound.map((station) => (
       <li key = {station.id} > <button className="showDetails" id={station.id} onClick = {event => this.props.setStation(event.target)}>{station.name}, {station.address.route} {station.address.streetNumber} </button>
 </li>
     )))
     }

   else {
     return(
     this.props.allStations.map((station) => (
       <li key = {station.id} ><button className="showDetails" id={station.id} onClick = {event => this.props.setStation(event.target)}> {station.name}, {station.address.route} {station.address.streetNumber} </button> </li>
     )));
   };
  }

renderDescription() {
  if (Object.keys(this.props.oneStation).length > 0) {
  return (<Station id = {this.props.oneStation.id} clearStation = {this.props.clearStation}/>

  )
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
      {this.renderDescription()}
      <h2> Stations </h2>
      {this.renderStations()};
      </ul>


  </section>
  </div>

) //end return
} //end render
} //end component
export default Info
