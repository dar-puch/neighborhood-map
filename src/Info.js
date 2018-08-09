import React, { Component } from 'react';
import * as AirAPI from './AirAPI';
import App from './App';

class Info extends Component {

render() {
  return(
    <div className="col info">
    <section className="info-container">
      <div className="filter-options" id="filter">
        <h2>Filter Results</h2>
        <select id="stations-select" name="Stations" >
          <option value="all">All Stations</option>
        </select>
      </div>
      <ul className="stations-list"> {
      this.props.allStations.map((station) => (
          <li key = {station.id} > {station.name}, {station.address.route} {station.address.streetNumber} </li>
      ))}

      </ul>
    </section>
    </div>
  )
}
}
export default Info
