import {
    expect
} from 'chai';
import Trips from '../src/classes/trips';
import tripsData from '../test/trips-test-data';

describe('Travelers', () => {
    let trips;
    beforeEach(() => {
      trips = new Trips(tripsData);
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

    it('should return a trip by status', () => {
     expect(trips.getTravelerTripByStatus(38, "pending")).to.deep.equal([{
        "id": 71,
        "userID": 38,
        "destinationID": 28,
        "travelers": 1,
        "date": "2020/05/26",
        "duration": 11,
        "status": "pending",
        "suggestedActivities": []
        }]) 
     expect(trips.getTravelerTripByStatus(44, "approved")).to.deep.equal([{
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
        "suggestedActivities": []
        }]) 
    })
});