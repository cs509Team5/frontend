import { useState } from "react";
import { LocationSelector } from "../LocationSelector.tsx";

//import ReactDatePicker from "react-datepicker";

interface Props {
  onNavToHomePage: () => void;
  onNavToFilterTripsPage: () => void;
}

export function ReserveTripPage({
  onNavToHomePage,
  onNavToFilterTripsPage,
}: Props) {
  //const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [roundTrip, setRoundTrip] = useState(true);

  return (
    <>
      <h1>Choose your departure airport and arrival airport!</h1>
      <LocationSelector>Departure Airport</LocationSelector>
      <LocationSelector>Destination Airport</LocationSelector>
      {/*<ReactDatePicker*/}
      {/*  selected={departureDate}*/}
      {/*  onChange={(date: Date) => setDepartureDate(date)}*/}
      {/*  placeholderText={"Departure Date"}*/}
      {/*/>*/}
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          onChange={() => {
            setRoundTrip(!roundTrip);
          }}
          checked
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Checked checkbox
        </label>
      </div>
      {/*{roundTrip && (*/}
      {/*  <ReactDatePicker*/}
      {/*    selected={returnDate}*/}
      {/*    onChange={(date: Date) => setReturnDate(date)}*/}
      {/*    placeholderText={"Return Date"}*/}
      {/*  />*/}
      {/*)}*/}
      <button onClick={() => onNavToFilterTripsPage()}>Find Flights</button>
      <button onClick={() => onNavToHomePage()}>Back</button>
    </>
  );
}
