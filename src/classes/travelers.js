class Travelers {
  constructor(travelers) {
    this.travelers = travelers;
  }

  getTraveler(id) {
    return this.travelers.find(traveler => traveler.id === id);
  }
}

export default Travelers;