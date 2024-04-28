// import { useId, useState } from "react";

import { useEffect, useState } from "react";

interface Props {
  children: string;
  handleAirportChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LocationSelector({ children, handleAirportChange }: Props) {
  const [airportList, setAirportList] = useState([]);

  //TODO: This call should be mvoed to the ReserveTripPage and the list of airports should be passed down as a prop
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "airports")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setAirportList(data.map((airport: { name: string }) => airport.name));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label htmlFor="validationServer03" className="form-label">
          {children}
        </label>
        <input type="text" list={"cities"} onChange={handleAirportChange} />
        <datalist id="cities">
          {airportList.map((a) => (
            <option value={a} />
          ))}
        </datalist>
      </div>
    </form>
  );
}
