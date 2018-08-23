import React, {
  Component
} from 'react';
import './App.css';
import Map from './Map';
import Info from './Info';

class App extends Component {

  state = {
    allStations: [],
    dataLoaded: false,
    stationsFound: [],
    query: '',
    oneStation: {},
    error: ''
  }

  componentDidMount() {
    this.getAllStations() //get array of all stations in Warsaw
      .then(allStations => this.setState({
        allStations: allStations
      }, () => {
        this.setState({
          dataLoaded: true
        })
      })) // prevent passing empty array of stations to map component
      .catch(() => console.log('getAllStations failed'));
  }

  updateQuery = (query) => {
    if (this.state.allStations.length > 0) {
      query = query.toLowerCase(); //our search is not case sensitive
      let stationsFound = this.state.allStations.filter(station => station.name.toLowerCase().search(query) > -1 || station.address.route.toLowerCase().search(query) > -1); //filter array of all stations to match query
      this.setState({
        stationsFound: stationsFound, //save results as state
        query: query
      });
    }
  }

  setStation(station) { //this function is called when user clicks particular station on the map
    this.setState({
      oneStation: station
    })
  }

  clearStation() {
    this.setState({
      oneStation: {}
    })
  }

  setStation = this.setStation.bind(this);
  clearStation = this.clearStation.bind(this);

  //service providing air quality info
  api = "https://airapi.airly.eu/v1";

  getAllStations = () =>
    fetch(`${this.api}/sensors/current?southwestLat=52.311&southwestLong=20.87&northeastLat=52.12&northeastLong=21.14`, {
      method: "GET",
      headers: {
        "apikey": "h0b3J4laim1FiCVlW7dtnje1srYEOPK9",
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(this.handleErrors)
    .catch(error => this.setState({
      error: 'unable to get stations list (' + error.message + ')'
    }))
    .then(response => response.json())
    .then(allstations => allstations);

  getStationData = (station) =>
    fetch(`${this.api}sensor/measurements?sensorId=${station}`, {
      method: "GET",
      headers: {
        "apikey": "h0b3J4laim1FiCVlW7dtnje1srYEOPK9",
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(response => response.json())
    .then(details => details)
    .catch(err => console.log('getting details failed'));

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }


  render() {

    return ( <
      div className = "App" >
      <
      header className = "header" >
      <
      h1 className = "title" > Air quality in Warsaw < /h1> <
      /header> <
      main > {
        this.state.dataLoaded ? < Map allStations = {
          this.state.allStations
        }
        setStation = {
          this.setStation
        }
        stationsFound = {
          this.state.stationsFound
        }
        oneStation = {
          this.state.oneStation
        }
        query = {
          this.state.query
        }
        /> : <p className="errors map-container">Map cannot be loaded</p >
      } <
      Info allStations = {
        this.state.allStations
      }
      setStation = {
        this.setStation
      }
      stationsFound = {
        this.state.stationsFound
      }
      query = {
        this.state.query
      }
      updateQuery = {
        this.updateQuery
      }
      clearStation = {
        this.clearStation
      }
      oneStation = {
        this.state.oneStation
      }
      getStationData = {
        this.getStationData
      }
      error = {
        this.state.error
      }
      />

      <
      /main>

      <
      footer >
      <
      p > Copyright(c) 2018 < strong > Puchweb Air < /strong> All Rights Reserved.</p >
      <
      /footer> <
      /div>/ / end App
    );
  }
}

export default App;
