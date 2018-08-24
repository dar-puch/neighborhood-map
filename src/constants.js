
const api = "https://airapi.airly.eu/v1"; //service providing air quality info
const swLat = "southwestLat=52.311";
const swLong = "southwestLong=20.87";
const neLat = "northeastLat=52.12";
const neLong = "northeastLong=21.14";
const fetchAPI = `${api}/sensors/current?${swLat}&${swLong}&${neLat}&${neLong}`

export {
  fetchAPI
}
