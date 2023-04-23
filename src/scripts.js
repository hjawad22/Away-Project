// CSS Import 
import './css/styles.css';

// Image Imports
import './images/hero.jpg'
import './images/sign-in.jpg'

// Classes Imports
import Travelers from './classes/travelers';
import Traveler from  './classes/traveler';
import Trips from './classes/trips';

// Third party imports
import dayjs from 'dayjs';

// Import API Calls
import './apiCalls';
import {
  fetchTravelers,
  fetchTrips,
  fetchDestinations
} from "./apiCalls";

// Global variables
let traveler;
let travelers;
let trips;
let userName;
let password = 'travel';

// Query Selectors

const bookButton = document.querySelector(".book-button")
const quoteButton = document.querySelector(".quote-button")

// Event Listener

bookButton.addEventListener('click' , function (e) {
    e.preventDefault();
    createNewTrip();
})

quoteButton.addEventListener('click', function(e){
   e.preventDefault();
   displayTripEstimatedCost();
})


// Fetch Requests 

  Promise.all([fetchTravelers(), fetchTrips(), fetchDestinations()])
  .then(([travelersData, tripsData, destinationData]) => {
  travelers = new Travelers(travelersData.travelers)
  traveler = new Traveler(travelers.getTraveler(1))
  userName = `travel${traveler.id}`
  displayGreeting(traveler)


  trips = new Trips(tripsData.trips, destinationData.destinations)
  createDestinationsDropDown()
  displayTripTotal(traveler)
  displayTrips(traveler)
})
.catch(error => {
  console.error('There was a problem with the fetch', error);
})


// Functions 

function displayGreeting(traveler) {
  const greetingMessage = document.querySelector(".greeting-header")
  greetingMessage.innerText = `
  Wonderful to see you again, ${traveler.getFirstName()}!
 `
}

function displayTripTotal(traveler) {
  const totalMessage = document.querySelector(".total-spent-message") 
  totalMessage.innerText = `Total Spent On Your Trips: ${trips.getTotalCostOfTrips(traveler.id)}`
}

function displayTripEstimatedCost() {
  const desInput = parseInt(document.querySelector(".destinations-picker").value)
  const numOfPeople = parseInt(document.getElementById("numOfTravelers").value)
  const startDate = document.getElementById("start").value
  const formatedStartDate = dayjs(startDate).format("YYYY/MM/DD")
  const endDate = document.getElementById("end").value
  const formatedEndDate = dayjs(endDate).format("YYYY/MM/DD")
  const duration = dayjs(formatedEndDate)
  const durationTotal= parseInt(duration.diff(formatedStartDate, "day"))
  const estimateMessage =  document.querySelector(".estimated-total")
  estimateMessage.innerText = `Trip Estimation: ${trips.getCostOfTrip(desInput, durationTotal, numOfPeople)}`
}


function displayTrips(traveler) {
  const allTrips = document.querySelector(".trips")
  allTrips.innerHTML = " "
  trips.getTripByTraveler(traveler.id).forEach(trip => {
  const tripCard = document.createElement("article")
  tripCard.classList.add("all-trips")
  allTrips.appendChild(tripCard)
  tripCard.innerHTML += `
    <p class="card">Location:</p> <p class="card">${trips.getDestination(trip.destinationID).destination} </p>
    <p class="card">Date:</p> <p class="card">${trip.date} </p>
    <p class="card">Duration:</p> <p class="card">${trip.duration} days</p>
    <p class="card">Status:</p> <p class="card pending-message">${trip.status} </p>
   `
  })
  }

function createDestinationsDropDown() {
  const destinationSelector = document.querySelector(".destinations-picker");
  trips.getDestinations().forEach(destination => {
  destinationSelector.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`
  })
}
  
function createNewTrip() {
   const destinationInput = document.querySelector(".destinations-picker").value
   const numOfTravelers = document.getElementById("numOfTravelers").value
   const tripID = trips.data.length += 1
   const startDate = document.getElementById("start").value
   const formatedStartDate = dayjs(startDate).format("YYYY/MM/DD")
   const endDate = document.getElementById("end").value
   const formatedEndDate = dayjs(endDate).format("YYYY/MM/DD")
   const duration = dayjs(formatedEndDate)
   const totalDuration= duration.diff(formatedStartDate, "day")

   const object = {
    id: tripID ,
    userID: traveler.id ,
    destinationID: +destinationInput ,
    date: formatedStartDate ,
    travelers: +numOfTravelers,
    duration: totalDuration,
    status: "pending", 
    suggestedActivities: []
   }

  
  fetch("http://localhost:3001/api/v1/trips", {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    response.json()
  })
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error('There was a problem with the fetch', error)
  })
 return Promise.all([fetchTravelers(), fetchTrips(), fetchDestinations()])
 .then( ([travelersData, tripsData, destinationData]) => {
  travelers = new Travelers(travelersData.travelers)
  console.log(travelers)
  traveler = new Traveler(travelers.getTraveler(1))
  trips = new Trips(tripsData.trips, destinationData.destinations)
  console.log(trips)
  displayTrips(traveler)
  displayTripTotal(traveler)
})
}


