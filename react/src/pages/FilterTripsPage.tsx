//import { useState } from "react";

interface Props {
  onNavToBookTripPage: () => void;
  onNavToReserveTripPage: () => void;
  searchResults: Trip[];
}

export function FilterTripsPage({
  onNavToBookTripPage,
  onNavToReserveTripPage,
  searchResults,
}: Props) {
  const handleFilterByPrice = () => {
    // TODO: Implement
  };

  const handleResetFilter = () => {
    // TODO: Implement
  };

  return (
    <>
      <h1>Filter for the flights that best fit your trip!</h1>
      <div>
        {searchResults.map((trip,index) => (
          <div key={index} className="card trip-card">
            <div className="duration">{trip.duration}</div>
            <div className="flight-info">
              <p>
                <strong>{trip.departureTime} - {trip.arrivalTime}</strong>
              </p>
              <p>{trip.departureAirport} ({trip.departureAirportAbbr}) - {trip.arrivalAirport} ({trip.arrivalAirportAbbr})</p>
            </div>
            <div className="flight-price">
              <p><strong>${trip.price}</strong></p>
            </div>
          </div>
        ))}
      </div>
      {<p>Sorted by price (lowest to highest)</p>}
      <div>
        <button onClick={handleFilterByPrice}>Filter by Price (Low to High)</button>
        <button onClick={handleResetFilter}>Reset Filter</button>
      </div>
      <button onClick={() => onNavToBookTripPage()}>
        Confirm Selected Flights
      </button>
      <button onClick={() => onNavToReserveTripPage()}>Back</button>
    </>
  );
}

interface Trip{
  departureAirport: string;
  departureAirportAbbr: string;
  arrivalAirport: string;
  arrivalAirportAbbr: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}


export const mockTripResults = [
  {
    departureAirport: 'New York',
    departureAirportAbbr: 'JFK',
    arrivalAirport: 'Los Angeles',
    arrivalAirportAbbr: 'LAX',
    duration: '5hr 15min',
    departureTime: '9:00 AM',
    arrivalTime: '2:00 PM',
    price: 400
  },
  {
    departureAirport: 'Boston',
    departureAirportAbbr: 'BOS',
    arrivalAirport: 'Los Angeles',
    arrivalAirportAbbr: 'LAX',
    duration: '7hr 15min',
    departureTime: '9:00 AM',
    arrivalTime: '4:00 PM',
    price: 550
  },
  {
    departureAirport: 'Chicago',
    departureAirportAbbr: 'ORD',
    arrivalAirport: 'Los Angeles',
    arrivalAirportAbbr: 'LAX',
    duration: '9hr 15min',
    departureTime: '9:00 AM',
    arrivalTime: '4:00 PM',
    price: 300
  }
]