

class Trips {
    constructor(tripsData, destinationData) {
        this.data = tripsData;
        this.destinationData = destinationData;
    }
    
   getTripByTraveler(travelerID) {
    const trips = this.data.filter(trip => {
    return trip.userID === travelerID
  })
    return trips
  }
  
  getTotalCostOfTrips(travelerId) {
    const userTrips = this.getTripByTraveler(travelerId)
    if (!userTrips) {
      return 'Trips not found';
    }
    const totalCost = userTrips.reduce((acc, trip) => {
    const destination = this.destinationData.find(destination => destination.id === trip.destinationID);
    return acc + (destination.estimatedLodgingCostPerDay * trip.duration + destination.estimatedFlightCostPerPerson * trip.travelers);
      }, 0);
  
   const final = Math.round(totalCost * 1.1 * 100) / 100
   return `$${final.toFixed()}`
  }


  getCostOfTrip(destinationId, duration, numOfTravelers) {
    const destination = this.destinationData.find(destination => destination.id === destinationId);
    if (!destination) {
        throw new Error(`Destination with id ${destinationId} not found`);
    }
    const totalCost = destination.estimatedLodgingCostPerDay * duration + destination.estimatedFlightCostPerPerson * numOfTravelers;
    const final = Math.round(totalCost * 1.1 * 100) / 100;
    if(!final) {
      return `Please Fill Out Form`
    }
    return `$${final.toFixed()}`;
}

  getDestinations() {
    return this.destinationData
  }

  getDestination(desID) { //trip.destinationID 28
    const destination = this.destinationData.find(location => {
      return location.id === desID
    })
    return destination;
  }
  
  
}
 export default Trips;

