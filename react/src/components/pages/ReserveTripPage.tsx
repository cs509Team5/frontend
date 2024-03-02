import { useEffect, useState } from "react";

interface Props {
  onNavToHomePage: () => void;
  onNavToFilterTripsPage: () => void;
}

export function ReserveTripPage({
  onNavToHomePage,
  onNavToFilterTripsPage,
}: Props) {

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
      <button onClick={() => onNavToFilterTripsPage()}>Find Flights</button>
      <button onClick={() => onNavToHomePage()}>Back</button>
    </>
  );
}
