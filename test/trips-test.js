import {
    expect
} from 'chai';
import Trips from '../src/classes/trips';
import tripsData from '../test/trips-test-data';
import destinationData from '../test/destination-test-data';

describe('Trips', () => {
    let trips;
    beforeEach(() => {
      trips = new Trips(tripsData, destinationData);
    });

    it('should be a function', () => {
        expect(Trips).to.be.a('function');
      });

    it('should be an instance of Trips', () => {
        expect(trips).to.be.an.instanceOf(Trips);
      });

    it('should store trips', () => {
        expect(trips.data).to.deep.equal(tripsData);
    });

    it('should return a trip by user id', () => {
        expect(trips.getTripByTraveler(44)).to.deep.equal([
            {
                "id": 1,
                "userID": 44,
                "destinationID": 49,
                "travelers": 1,
                "date": "2022/09/16",
                "duration": 8,
                "status": "approved",
                "suggestedActivities": []
             },
             {
               "id": 46,
               "userID": 44,
               "destinationID": 33,
               "travelers": 2,
               "date": "2020/08/24",
               "duration": 11,
               "status": "approved",
               "suggestedActivities": []}
        ]);
    });

    it('should return total cost of user trip', () => {
      expect(trips.getTotalCostOfTrips(35)).to.equal('$4565')
      expect(trips.getTotalCostOfTrips(3)).to.equal('$4543')
    })

    it('should return an error message if no trips exist to total', () => {
     expect(trips.getTotalCostOfTrips(999)).to.equal('No trips to total');
    })
  
    it('should return the total cost of a trip for the given destination, duration, and number of travelers', () => {
    expect(trips.getCostOfTrip(14, 1, 1)).to.equal('$990');
    expect(trips.getCostOfTrip(25, 3, 4)).to.equal('$1458');
    });

    it('should return an error message if final cost is 0', () => {
        expect(trips.getCostOfTrip(14, 0, 0)).to.equal('Please Fill Out Form');
      });

    it('should return an array of destinations', () => {
        expect(trips.getDestinations()).to.equal(destinationData);
      });

    it('should return the correct destination', () => {
        expect(trips.getDestination(14)).to.deep.equal({
          "id": 14,
          "destination": "Marrakesh, Morocco",
          "estimatedLodgingCostPerDay": 70,
          "estimatedFlightCostPerPerson": 830,
          "image": "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
          "alt": "people buying oranges and other fruit from a street vendor"
          });
      });
  
    it('should return undefined if no destination is found', () => {
        expect(trips.getDestination(10)).to.equal(undefined);
      });
  })
