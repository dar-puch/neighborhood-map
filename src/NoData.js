import React from 'react';

const NoData = ({clearStation}) => (
  <div className = "one-station-box">
    <h3>Unable to get data from this station </h3>
    <button
      id = "close-details"
      onClick = {clearStation}
    >
      Close
    </button>
  </div>
)

export default NoData;
