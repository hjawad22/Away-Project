class Trips {
    constructor(tripsData, destinationData) {
        this.data = tripsData
        this.destinationData = destinationData
    }
    
   getTripByTraveler(travelerID) {
    const trips = this.data.filter(trip => {
    return trip.userID === travelerID
  })
    return trips
  }
  

  getTravelerTripByStatus(travelerID, status){
    const userTrips = this.getTripByTraveler(travelerID)
    const tripByStatus = userTrips.filter(trip => {
      return trip.status === status
    })
  return tripByStatus
  }

  getTripByDate(travelerID, pastOrUpcoming, date) {
    let approvedTrips = this.getTravelerTripByStatus(travelerID, 'approved');
    if (pastOrUpcoming === 'past') {
      return approvedTrips.filter(trip => trip.date < date);
    } else if (pastOrUpcoming === 'upcoming') {
      return approvedTrips.filter(trip => trip.date > date);
    }
  }

  getTotalCostOfTrips(travelerId) {
    const userTrip = this.getTripByTraveler(travelerId)
    const total = userTrip((acc, trip) => {
    const destination = this.destinationData.find(destination => destination.id === trip.destinationID);
    return acc + (destination.estimatedLodgingCostPerDay * trip.duration + destination.estimatedFlightCostPerPerson * trip.travelers);
      }, 0);
  
  return total
  }

}
export default Trips;

