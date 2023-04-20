class Trips {
    constructor(tripData, destinationData) {
        this.data = tripData
        this.destinationData = destinationData
    }
    
   getTripByTraveler(travelerID) {
    const trip = this.data.filter(trip => {
    return trip.userID === travelerID
  })
   return trip
  }

  getUserTripByStatus(travelerID, status){
    const userTrips = this.getTripByTraveler(travelerID)
    const status= userTrips.filter(trip => {
      return trip.status === status
    })
  return tripByStatus
  }

  getTripByDate(travelerID, status, date) {
    const userTrips = this.getTripByTraveler(travelerID)
    const tripByDate = userTrips.filter(trip => {
      return trip.date === date && trip.status === status
    })
    return tripByDate
  }
}


