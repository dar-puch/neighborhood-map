import React, { Component } from 'react';
import * as AirAPI from './AirAPI';
import App from './App';

class Info extends Component {
state = {
stationsFound: []
}

updateQuery = (query) => {
  let newStations = this.props.allStations.filter(station => {station.id === query || station.name === query || station.address.streetName === query});
  console.log('new',newStations);
}
render() {
  return(
    <div className="col info">
    <section className="info-container">

      <div className="filter-options" id="filter">
        <h2>Filter Results</h2>


        <input type = "text" placeholder = "Search"
               value = {this.state.query}
               onChange = {(event) => this.updateQuery(event.target.value)}/>


      <h2> Stations </h2>
      <ul className="stations-list"> {
      this.props.allStations.map((station) => (
          <li key = {station.id} > {station.name}, {station.address.route} {station.address.streetNumber} </li>
      ))}

      </ul>
      </div>
    </section>
    </div>
  )
}
}
export default Info
