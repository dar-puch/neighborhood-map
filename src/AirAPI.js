const api = "https://airapi.airly.eu/v1"


export const getAllStations = () =>
fetch(`${api}/sensors/current?southwestLat=52.103168&southwestLong=20.8514&northeastLat=52.3672&northeastLong=21.2702`, {
        method: "GET",
        headers:{
"apikey": "h0b3J4laim1FiCVlW7dtnje1srYEOPK9",
"Content-Type": "application/json; charset=utf-8"
}
        })
.then(response => response.json())
  .then(allstations => allstations)
.catch(err => console.log('fetch failed, error: ' + err));
