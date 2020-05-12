import React, {
  Component
} from 'react';
import './App.css';
import NoData from './NoData';


class Station extends Component {
  state = {
    current: {}
  };

  container = React.createRef();

  componentDidMount() {
    this.props.getStationData(this.props.oneStation.id)
      .then(data => this.setState({
        current: data.current
      }));
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.oneStation && prevProps.oneStation !== this.props.oneStation) {
      this.props.getStationData(this.props.oneStation.id)
        .then(data => this.setState({
          current: data.current
        }));
    }
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  scrollToContainer() {
    window.scrollTo(0, this.container);
  }


  render() {
    this.scrollToContainer();
    const { oneStation, clearStation } = this.props;
    const { current } = this.state;
    if (Object.keys(current).length === 0) {
      return <NoData clearStation={clearStation}/>
    }
      return (
      <div ref = {this.container} className = "one-station-box">
        <h3> Station no: {oneStation.id} </h3>
        <p> {oneStation.sponsor.name}</p>
        <p> {oneStation.address.street} {' '}
        {this.props.oneStation.address.number}
        </p>
        <h3>
        Latest measurements:
        </h3>
        <p className ="index-description">
        AIR POLLUTION LEVEL:
        <span className="index" style={{color: `${this.state.current.indexes[0].color}`}}> {Math.floor(this.state.current.indexes[0].value)} ({this.state.current.indexes[0].level}) </span>
      </p>
      <p> PM 2.5: {this.state.current.values[1] ? this.state.current.values[1].value : 'not available'} </p>
      <p> PM 10: {this.state.current.values[2] ? this.state.current.values[2].value : 'not available'} </p>
      <p> Pressure: {this.state.current.values[3] ? this.state.current.values[3].value : 'not available'} </p>
      <p> Temperature: {this.state.current.values[5] ? this.state.current.values[5].value : 'not available'} {'\u2103'}</p>
      <button
        id = "close-details"
        className = "button"
        onClick = {clearStation}
        >
        Close
      </button>
    </div>
      )
    }
}
export default Station
