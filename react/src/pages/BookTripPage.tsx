import {useState} from "react";
import {Flight} from "../FlightsContext.tsx"
import { useFlights } from "../FlightsContext.tsx";
import { reserveFlight } from "../FlightsContext.tsx";

interface Props {
  onNavToHomePage: () => void;
  onNavToFilterTripsPage: () => void;
  selectedTrip: Flight; //adding the selcted trip as a prop
}

export function BookTripPage({
  onNavToHomePage,
  onNavToFilterTripsPage,
  selectedTrip,
}: Props) {


  if(!selectedTrip) {
    return <p> No trip was selected</p>
  }

  const handleConfirmPurchase = () => {
    reserveFlight({
      departureAirport: selectedTrip.departAirport,
      arrivalAirport: selectedTrip.arriveAirport,
      departureDate: formatDate(new Date(selectedTrip.departDatetime)),
      flightNumber: selectedTrip.flightNumber,
      seatType: selectedTrip.seatClass,
    });
    onNavToHomePage();
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <h1>Confirm ticket purchase for your trip!</h1>
      {/* Rendering details of the selectedTrip */}
      <p>Departure Airport: {selectedTrip.departAirport}</p>
      <p>Arrival Airport: {selectedTrip.arriveAirport}</p>
      <p>Departure Date: {selectedTrip.departDatetime}</p>
      <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
      <button onClick={() => onNavToFilterTripsPage()}>Back</button>
    </>
  );
}
