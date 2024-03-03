// import { useId, useState } from "react";

import { useEffect, useState } from "react";

interface Props {
  children: string;
}

export function LocationSelector({ children }: Props) {
  const [airportList, setAirportList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/airports")
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
        <input type="text" list={"cities"} />
        <datalist id="cities">
          {airportList.map((a) => (
            <option value={a} />
          ))}
        </datalist>
      </div>
    </form>
  );
}
