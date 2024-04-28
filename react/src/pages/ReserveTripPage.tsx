import { useState } from "react";
import { LocationSelector } from "../components/LocationSelector.tsx";
import { DateSelector } from "../components/DateSelector.tsx";
import { CheckBoxSelector } from "../components/CheckBoxSelector.tsx";
import { LayoverSelector } from "../components/LayoverSelector.tsx";
import { useFlights } from "../FlightsContext.tsx";

interface Props {
  onNavToHomePage: () => void;
  onNavToFilterTripsPage: (roundTrip: boolean) => void;
}

export function ReserveTripPage({
  onNavToHomePage,
  onNavToFilterTripsPage,
}: Props) {
  const [roundTrip, setRoundTrip] = useState(true);
  const [firstClass, setFirstClass] = useState(false);
  const [numLayovers, setnumLayovers] = useState(0);
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());

  const { fetchFlights, flights } = useFlights();

  const handleDepartureAirportChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDepartureAirport(event.target.value);
  };

  const handleArrivalAirportChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setArrivalAirport(event.target.value);
  };

  const handleDepartureDateChange = (date: Date) => {
    setDepartureDate(date);
  };

  const handleArrivalDateChange = (date: Date) => {
    setArrivalDate(date);
  };

  const handleFindFlightsClick = () => {
    fetchFlights({
      departureAirport,
      arrivalAirport,
      flightNumber: "0", //0,
      departureDate: formatDate(departureDate), // formatDate(departureDate),
      returnDate: roundTrip ? formatDate(arrivalDate) : "", //formatDate(arrivalDate),
      numberOfStopover: numLayovers.toString(), //numLayovers,
      acceptFirstClass: firstClass.toString(), // firstClass,
      acceptEconomy: (!firstClass).toString(), //!firstClass,
    });

    console.log("Flights");
    console.log(flights);
    onNavToFilterTripsPage(roundTrip);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <h1>Choose your departure airport and arrival airport!</h1>
      <CheckBoxSelector onChecked={setRoundTrip} startChecked={roundTrip}>
        Round Trip
      </CheckBoxSelector>
      <DateSelector handleDateSelection={handleDepartureDateChange}>
        Leave on
      </DateSelector>
      {roundTrip && (
        <DateSelector handleDateSelection={handleArrivalDateChange}>
          Return on
        </DateSelector>
      )}
      <LocationSelector handleAirportChange={handleDepartureAirportChange}>
        Departure Airport
      </LocationSelector>
      <LocationSelector handleAirportChange={handleArrivalAirportChange}>
        Destination Airport
      </LocationSelector>
      <CheckBoxSelector onChecked={setFirstClass} startChecked={firstClass}>
        First Class
      </CheckBoxSelector>
      <LayoverSelector onChecked={setnumLayovers}>
        Number of layovers
      </LayoverSelector>
      <button onClick={handleFindFlightsClick}>Find Flights</button>
      <button onClick={() => onNavToHomePage()}>Back</button>
    </>
  );
}
