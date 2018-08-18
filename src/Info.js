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

        <input type = "text" placeholder = "Search"
               value = {this.props.query}
               onChange = {(event) => this.props.updateQuery(event.target.value)}/>


      <h2> Stations </h2>
      <ul className="stations-list"> {
        this.props.stationsFound.length > 0 ?
      this.props.stationsFound.map((station) => (
          <li key = {station.id} > {station.name}, {station.address.route} {station.address.streetNumber} </li>
      )) : this.props.allStations.map((station) => (
          <li key = {station.id} > {station.name}, {station.address.route} {station.address.streetNumber} </li>))
        }

      </ul>
      </div>
    </section>
    </div>
  )
}
}
export default Info
