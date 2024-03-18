import { useState } from "react";
import { LocationSelector } from "../components/LocationSelector.tsx";
import { DateSelector } from "../components/DateSelector.tsx";
import { CheckBoxSelector } from "../components/CheckBoxSelector.tsx";
import { LayoverSelector } from "../components/LayoverSelector.tsx";

interface Props {
  onNavToHomePage: () => void;
  onNavToFilterTripsPage: () => void;
}

export function ReserveTripPage({
  onNavToHomePage,
  onNavToFilterTripsPage,
}: Props) {
  const [roundTrip, setRoundTrip] = useState(true);
  const [firstClass, setFirstClass] = useState(false);
  const [numLayovers, setnumLayovers] = useState(0);

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
      <LayoverSelector onChecked={setnumLayovers}>
        Number of layovers
      </LayoverSelector>
      <button onClick={() => onNavToFilterTripsPage()}>Find Flights</button>
      <button onClick={() => onNavToHomePage()}>Back</button>
    </>
  );
}
