function fetchTravelers() {
  return fetch("http://localhost:3001/api/v1/travelers")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch travelers`);
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
      throw new Error('An error occurred while fetching travelers.');
    });
}
  
function fetchTrips() {
  return fetch("http://localhost:3001/api/v1/trips")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch trips`);
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
      throw new Error('An error occurred while fetching trips.');
    });
  }
  
function fetchDestinations() {
  return fetch("http://localhost:3001/api/v1/destinations")
  .then(response => {
      if (!response.ok) {
      throw new Error(`Failed to fetch destinations`);
      }
      return response.json();
    })
  .catch(error => {
    console.error(error);
    throw new Error('An error occurred while fetching destinations.');
  });
}
  
  export {fetchTravelers, fetchTrips, fetchDestinations}