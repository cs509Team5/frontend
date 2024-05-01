import { useState } from "react";
import { Flight, useFlights } from "../FlightsContext.tsx";

interface Props {
  onNavToBookTripPage: (selectedTrip: Flight) => void;
  onNavToReserveTripPage: () => void;
  onNavToFilterReturnTripsPage: (selectedTrip: Flight) => void;
  roundTrip: boolean;
}

export function FilterTripsPage({
  onNavToBookTripPage,
  onNavToReserveTripPage,
  onNavToFilterReturnTripsPage,
  roundTrip,
}: Props) {
  const { flights } = useFlights();
  const [sortedResults, setSortedResults] = useState<Flight[]>(
    flights.departureFlights
  );

  const [selectedTrip, setSelectedTrip] = useState<Flight | null>(null);

  // use state variable to hold our selected trip
  // this use state var will later ultimately hold the trip we will confirm
  // via the confirm button
  console.log("Selected Trip: ", selectedTrip);

  const handleTripSelect = (trip: Flight) => {
    setSelectedTrip(trip);
  };


  if (sortedResults.length != flights.departureFlights.length) {
    setSortedResults(flights.departureFlights);
  }

  console.log("Flights");
  console.log(flights);
  console.log(flights.departureFlights);

  console.log("Sorted Results");
  console.log(sortedResults);

  const handleFilterByPrice = () => {
    // TODO: Implement
    const sortedTrips = [...sortedResults].sort(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_a, _b) => 500 - 500, // a.flight.cost - b.flight.cost,
    );
    setSortedResults(sortedTrips);
  };

  const handleResetFilter = () => {
    setSortedResults(flights.departureFlights);
  };

  const handleFilterByDuration = () => {
    const sortedTrips = [...sortedResults].sort((a, b) => {
      const durationA = calculateDurationHours(
        a.departDatetime,
        a.arriveDatetime,
      );
      const durationB = calculateDurationHours(
        b.departDatetime,
        b.arriveDatetime,
      );
      return durationA - durationB;
    });
    setSortedResults(sortedTrips);
  };

  const calculateDurationHours = (
    departDatetime: string,
    arriveDatetime: string,
  ) => {
    return (
      (new Date(arriveDatetime).valueOf() -
        new Date(departDatetime).valueOf()) /
      (60 * 60 * 1000)
    );
  };

  return (
    <>
      <h1>Filter for the flights that best fit your trip!</h1>
      <div>
        {sortedResults.map((trip, index) => (
          <div
            key={index}
            className={`card trip-card ${trip === selectedTrip ? "selected" : ""}`}
            onClick={() => handleTripSelect(trip)}
          >
            <div className="duration">
              {calculateDurationHours(
                trip.departDatetime,
                trip.arriveDatetime,
              ).toPrecision(3)}{" "}
              Hours
            </div>
            <div className="flight-info">
              <p>
                <strong>
                  {trip.departDatetime.substring(0, 16)} -{" "}
                  {trip.arriveDatetime.substring(0, 16)}
                </strong>
              </p>
              <p>
                {trip.departAirport} - {trip.arriveAirport}
              </p>
            </div>
            <div className="flight-price">
              <p>
                <strong>${500}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleFilterByPrice}>
          Filter by Price (Low to High)
        </button>
        <button onClick={handleResetFilter}>Reset Filter</button>
        <button onClick={handleFilterByDuration}>Filter by Duration</button>
      </div>
      <button
        onClick={() => {
          if (roundTrip) {
            if (selectedTrip) {
              // Navigate to FilterReturnTripsPage
              onNavToFilterReturnTripsPage(selectedTrip);
            }
          } else {
            if (selectedTrip) {
              // Naviaget to booking page
              //debug statement
              console.log("Selected Trip(s): ", selectedTrip)
              onNavToBookTripPage(selectedTrip);
            }
          }
        }}
        disabled={!selectedTrip} //disable the button if there is no trip selected(tripSelected is null)
      >
        Confirm Selected Flights
      </button>
      <button onClick={() => onNavToReserveTripPage()}>Back</button>
    </>
  );
}

export const mockTripResults = [
  {
    departureAirport: "New York",
    departureAirportAbbr: "JFK",
    arrivalAirport: "Los Angeles",
    arrivalAirportAbbr: "LAX",
    duration: "5hr 15min",
    departureTime: "9:00 AM",
    arrivalTime: "2:00 PM",
    price: 400,
  },
  {
    departureAirport: "Boston",
    departureAirportAbbr: "BOS",
    arrivalAirport: "Los Angeles",
    arrivalAirportAbbr: "LAX",
    duration: "7hr 15min",
    departureTime: "9:00 AM",
    arrivalTime: "4:00 PM",
    price: 550,
  },
  {
    departureAirport: "Chicago",
    departureAirportAbbr: "ORD",
    arrivalAirport: "Los Angeles",
    arrivalAirportAbbr: "LAX",
    duration: "9hr 15min",
    departureTime: "9:00 AM",
    arrivalTime: "4:00 PM",
    price: 300,
  },
];
