
const api = "https://airapi.airly.eu/v2"; //service providing air quality info
const initialPos = {
  lat: 52.237049,
  lng: 21.017532
};
const fetchAPI = `${api}/installations/nearest?lat=${initialPos.lat}&lng=${initialPos.lng}&maxDistanceKM=15&maxResults=-1`

export {
  api,
  fetchAPI,
  initialPos
}
