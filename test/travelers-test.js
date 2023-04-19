import {
    expect
} from 'chai';
import Travelers from '../src/classes/travelers'
import travelersTestData from './travelers-test-data';

describe('User Repository', () => {
    var test;
    beforeEach(() => {
      test = new Travelers(travelersTestData);
    });

    it('should be a function', () => {
        expect(Travelers).to.be.a('function');
      });

    it('should be an instance of Travelers', () => {
        expect(test).to.be.an.instanceOf(Travelers);
      });

    it('should store travelers', () => {
        expect(test.travelers).to.deep.equal(travelersTestData);
    });
    
    it("should not be able to return an invalid traveler", () => {
        expect(test.getTraveler(52)).to.deep.equal(undefined);
      });

    it("should be able to return a user by id", () => {
        test.getTraveler(2);
        expect(test.getTraveler(2)).to.deep.equal({
            "id": 2,
            "name": "Rachael Vaughten",
            "travelerType": "thrill-seeker"
        });

        test.getTraveler(5);
        expect(test.getTraveler(5)).to.deep.equal({
            "id": 5,
            "name": "Tiffy Grout",
            "travelerType": "thrill-seeker"
       }); 
    }); 
});

