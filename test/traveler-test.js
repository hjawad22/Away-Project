import {
    expect
} from 'chai';

import Traveler from '../src/classes/traveler'
import travelersTestData from './travelers-test-data';

describe('Traveler', () => {
    let traveler1, traveler2, traveler3;
    beforeEach(() => {
      traveler1 = new Traveler(travelersTestData[0]);
      traveler2 = new Traveler(travelersTestData[1]);
      traveler3 = new Traveler(travelersTestData[2]);
    });

    it('should be a function', () => {
      expect(Traveler).to.be.a('function');
      });
    
    it('should be an instance of Traveler', () => {
      expect(traveler1).to.be.an.instanceOf(Traveler);
      });

    it('should store a users id', () => {
        expect(traveler1.id).to.deep.equal(1);
        expect(traveler2.id).to.deep.equal(2);
        expect(traveler3.id).to.deep.equal(3);
    });

    it('should store a users name', () => {
        expect(traveler1.name).to.deep.equal("Ham Leadbeater");
        expect(traveler2.name).to.deep.equal("Rachael Vaughten");
        expect(traveler3.name).to.deep.equal("Sibby Dawidowitsch");
    });

    it('should store a users travel type', () => {
        expect(traveler1.travelerType).to.deep.equal("relaxer");
        expect(traveler2.travelerType).to.deep.equal("thrill-seeker");
        expect(traveler3.travelerType).to.deep.equal("shopper");
    });

    it('should get a users first name only', () => {
        expect(traveler1.getFirstName()).to.deep.equal("Ham");
        expect(traveler2.getFirstName()).to.deep.equal("Rachael");
        expect(traveler3.getFirstName()).to.deep.equal("Sibby");
    });
});