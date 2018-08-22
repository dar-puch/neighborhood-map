import React, { Component } from 'react';
import Station from './Station';

class Info extends Component {


  renderStations() {
     if (this.props.stationsFound.length > 0) {
    return (this.props.stationsFound.map((station) => (
       <li key = {station.id} > <button className="show-details" id={station.id} onClick = {() => this.props.setStation(station)}>{station.name}, {station.address.route} {station.address.streetNumber} </button>
 </li>
     )))
     }

   else if ((this.props.allStations.length > 0) && (this.props.query === '')){
     return(
     this.props.allStations.map((station) => (
       <li key = {station.id} ><button className="show-details" id={station.id} onClick = {() => this.props.setStation(station)}> {station.name}, {station.address.route} {station.address.streetNumber} </button> </li>
     )))
   }
   else {
     return(
     <p>no results</p>
   )
   }
  }

renderDescription() {
  if (Object.keys(this.props.oneStation).length > 0) {
  return (<Station oneStation = {this.props.oneStation} clearStation = {this.props.clearStation} getStationData = {this.props.getStationData}/>

  )
  }

};



render() {
  return (
   <div className="col info">
  <section className="info-container">

      <div className="filter-options" id="filter">
        <h2>Filter Results</h2>
        <p className="instructions">Search stations by name or street address</p>

        <input type = "text" placeholder = "Search" className="input-search"
               value = {this.props.query}
               onChange = {(event) => this.props.updateQuery(event.target.value)}/>
        </div>

      <ul className="stations-list">
      {this.renderDescription()}
      <h2> Stations </h2>
      <p className="instructions">Click on station to see measurements</p>
      {this.renderStations()}
      </ul>

      <div className="attribution">This application uses Google Maps API and Airly API (<a href="http://www.map.airly.eu"> www.map.airly.eu </a>)
      <div className="logo-wrapper"><img className="logo-airly" src={"/img/logo-airly.jpg"} alt="airly logo"/></div></div>
  </section>
  </div>

) //end return
} //end render
} //end component
export default Info
