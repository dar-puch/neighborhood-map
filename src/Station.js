import React, {
  Component
} from 'react';
import './App.css';

class Station extends Component {
  state = {
    current: {}
  };

  container = React.createRef();

  componentDidMount() {
    this.props.getStationData(this.props.oneStation.id)
      .then(details => this.setState({
        current: details.currentMeasurements
      }));
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.oneStation && prevProps.oneStation !== this.props.oneStation) {
      this.props.getStationData(this.props.oneStation.id)
        .then(details => this.setState({
          current: details.currentMeasurements
        }));
    }
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  scrollToContainer() {
    window.scrollTo(0, this.container);
  }

  indexDescription() {
    let index = Math.floor(this.state.current.airQualityIndex);
    if (index <= 50) return 'good';
    else if (index > 50 && index <= 100) return 'moderate';
    else if (index > 100 && index <= 150) return 'unhealthy1';
    else if (index > 150 && index <= 200) return 'unhealthy';
    else if (index > 200 && index <= 300) return 'unhealthy3';
    else if (index > 300) return 'hazardous';
  }

  formatDescription() {
    let description = this.indexDescription();
    if (description === 'unhealthy1') return 'Unhealthy for Sensitive Groups';
    else if (description === 'unhealthy3') return 'Very Unhealthy';
    else return description
  }


  render() {
    this.scrollToContainer()
    if (Object.keys(this.state.current).length === 0) {
      return ( < div className = "one-station-box" > < h3 > Unable to get data from this station < /h3> <
        button id = "close-details"
        onClick = {
          this.props.clearStation
        } > Close < /button></div > )
    } else {
      return ( <
        div ref = {
          this.container
        }
        className = "one-station-box" >
        <
        h3 > Station no: {
          this.props.oneStation.id
        } < /h3> <
        p > {
          this.props.oneStation.name
        } < /p> <
        p > {
          this.props.oneStation.address.route
        } {
          this.props.oneStation.address.streetNumber
        } < /p> <
        h3 > Latest measurements: < /h3> <
        p className = {
          this.indexDescription() + " index-description"
        } > Air Quality Index: < span className = "index" > {
          Math.floor(this.state.current.airQualityIndex)
        }({
          this.formatDescription()
        }) < /span></p >
        <
        p > Pollution level: {
          this.state.current.pollutionLevel
        } < /p> <
        p > PM 2.5: {
          Math.floor(this.state.current.pm25)
        } < /p> <
        p > PM 10: {
          Math.floor(this.state.current.pm10)
        } < /p> <
        p > Pressure: {
          this.state.current.pressure
        } < /p> <
        p > Temperature: {
          this.state.current.temperature
        } < /p> <
        button id = "close-details"
        onClick = {
          this.props.clearStation
        } > Close < /button> <
        /div>
      )
    }
  }
}
export default Station
