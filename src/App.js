import React, { Component } from 'react';
import './App.css';

class App extends Component {

  loaded() {
      const map = new window.google.maps.Map(
        document.getElementById('map'),
        {center: {lat: 52.161486 , lng: 21.069094}, zoom: 13});

    }

  componentDidMount() {
  /*  if (!window.google) {*/
      let script = document.createElement('script');
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyB0xEceRYGqGevmv0eg0RF6DfbAXXDFySs`;
      document.body.appendChild(script);
      script.addEventListener('load', e => {
        this.loaded()
      })
    /*}
    else {
      this.loaded()
    }*/
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="title">Air quality in Warsaw</h1>
        </header>

        <main>
        <div className="col map">
      <section className="map-container">
        <div id="map" role="application" aria-hidden="true">

        </div>
      </section>
      </div>
      <div className="col info">
      <section className="info-container">
        <div className="filter-options" id="filter">
          <h2>Filter Results</h2>
          <select id="stations-select" name="Stations" >
            <option value="all">All Stations</option>
          </select>
        </div>
        <ul className="stations-list">
        <li> station1 </li>
        </ul>
      </section>
      </div>
    </main>

      <footer>
      <p>Copyright (c) 2018 <strong>Puchweb Air</strong> All Rights Reserved.</p>
    </footer>
      </div>//end App
    );
  }
}

export default App;
