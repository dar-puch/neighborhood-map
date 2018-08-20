import React, { Component } from 'react';
const api = "https://airapi.airly.eu/v1"

export const displayErrors = (error, message) => {
    return(
      <p>{message}</p>, <p>{error}</p>
    )
}

export const getAllStations = () =>
fetch(`${api}/sensors/current?southwestLat=52.311&southwestLong=20.87&northeastLat=52.12&northeastLong=21.14`, {
        method: "GET",
        headers:{
"apikey": "h0b3J4laim1FiCVlW7dtnje1srYEOPK9",
"Content-Type": "application/json; charset=utf-8"
}
        })
.then(response => response.json())
  .then(allstations => allstations)
.catch(err => displayErrors(err, 'getting data failed'));

export const getStationData = (station) =>
fetch(`${api}sensor/measurements?sensorId=${station}`,
  {
          method: "GET",
          headers:{
  "apikey": "h0b3J4laim1FiCVlW7dtnje1srYEOPK9",
  "Content-Type": "application/json; charset=utf-8"
  }
})
.then(response => response.json())
  .then(details => details)
.catch(err => displayErrors(err, 'getting details failed'));
