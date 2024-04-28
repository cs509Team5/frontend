import React, { useState } from "react";
import { Flight, useFlights } from "../FlightsContext";


interface Props {
    onNavToBookTripPage: () => void;
    onNavToFilterTripsPage: () => void;
}

export function FilterReturnTripsPage({
    onNavToBookTripPage,
    onNavToFilterTripsPage,
}: Props) {
    const { flights } = useFlights();
    const [sortedResults, setSortedResults] = useState<Flight[]>(
        flights.returnFlights // accessing return flights
    );

    const [selectedTrip, setSelectedTrip] = useState<Flight | null>(null);

    const handleTripSelect = (trip: Flight) => {
        setSelectedTrip(trip);
    };

    if(sortedResults.length !== flights.returnFlights.length)
    {
        setSortedResults(flights.returnFlights);
    }

    const handleFilterByPrice = () => {
        const sortedTrips = [...sortedResults].sort(
            (a, b) => 500 - 500
        );
        setSortedResults(sortedTrips)
    };

    const handleResetFilter = () => {
        setSortedResults(flights.returnFlights);
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
          <h1>Filter for the return flights that best fit your trip!</h1>
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
                // Naviaget to booking page
                onNavToBookTripPage();
            }}
            disabled={!selectedTrip} //disable the button if there is no trip selected(tripSelected is null)
          >
            Confirm Selected Flights
          </button>
          <button onClick={() => onNavToFilterTripsPage()}>Back</button>
        </>
      );
}

export default FilterReturnTripsPage;