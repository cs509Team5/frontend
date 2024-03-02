import { useEffect, useState } from "react";
import { LocationSelector } from "../components/LocationSelector.tsx";
import { DateSelector } from "../components/DateSelector.tsx";
import { CheckBoxSelector } from "../components/CheckBoxSelector.tsx";

interface Props {
  onNavToHomePage: () => void;
  onNavToFilterTripsPage: () => void;
}

export function ReserveTripPage({
  onNavToHomePage,
  onNavToFilterTripsPage,
}: Props) {
  // const [departureDate, setDepartureDate] = useState(new Date());
  // const [returnDate, setReturnDate] = useState(new Date());
  const [roundTrip, setRoundTrip] = useState(true);
  const [firstClass, setFirstClass] = useState(false);

  const [airportList, setAirportList] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8080/airports")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        setAirportList(data.map((airport: { name: string; }) => airport.name));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <>
      <h1>Choose your departure airport and arrival airport!</h1>
      <CheckBoxSelector onChecked={setRoundTrip} startChecked={roundTrip}>
        Round Trip
      </CheckBoxSelector>
      <DateSelector>Leave on</DateSelector>
      {roundTrip && <DateSelector>Return on</DateSelector>}
      <LocationSelector>Departure Airport</LocationSelector>
      <LocationSelector>Destination Airport</LocationSelector>
      <CheckBoxSelector onChecked={setFirstClass} startChecked={firstClass}>
        First Class
      </CheckBoxSelector>
      <button onClick={() => onNavToFilterTripsPage()}>Find Flights</button>
      <button onClick={() => onNavToHomePage()}>Back</button>
    </>
  );
}
