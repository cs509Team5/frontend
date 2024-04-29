// FlightContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";

interface FlightCriteria {
  departureAirport: string;
  arrivalAirport: string;
  flightNumber: string; // number;
  departureDate: string;
  returnDate: string;
  numOfFlexibleDate?: string;
  numberOfStopover: string; //number;
  acceptFirstClass: string; //boolean;
  acceptEconomy: string; //boolean;
}

// creating new tsType for booking a trip
interface ReserveRequest {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  flightNumber: string;
  seatType: string;
}

export type Flight = {
  departDatetime: string;
  arriveDatetime: string;
  departAirport: string;
  arriveAirport: string;
  flightNumber: string;
  seatClass: string;
  flightType: string;
  isLayover: string;
  //cost?: number;
};

export type SearchResponse = {
  isSuccess: boolean;
  departureFlights: Flight[];
  returnFlights: Flight[];
};

interface FlightsContextType {
  flights: SearchResponse;
  fetchFlights: (criteria: FlightCriteria) => void;
}

const FlightsContext = createContext<FlightsContextType | null>(null);

export const useFlights = () =>
  useContext(FlightsContext) as FlightsContextType;

interface FlightsProviderProps {
  children: ReactNode;
}

export const FlightsProvider: FunctionComponent<FlightsProviderProps> = ({
  children,
}) => {
  const [flights, setFlights] = useState<SearchResponse>({
    isSuccess: false,
    departureFlights: [],
    returnFlights: [],
  });

  const fetchFlights = async (criteria: FlightCriteria) => {
    console.log(criteria);
    await fetch("http://localhost:8080/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(criteria),
    })
      .then((response) => {
        console.log("Response:");
        console.log(response);

        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Data:");
        console.log(data);
        setFlights(data);
      })
      .catch((error) => console.error("Error fetching flights:", error));
  };


  return (
    <FlightsContext.Provider value={{ flights, fetchFlights }}>
      {children}
    </FlightsContext.Provider>
  );
};

  // New method for updating seatCount
  export const reserveFlight = async(reservation: ReserveRequest) => {
    try{
      const response = await fetch("http://localhost:8080/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });
      if(!response.ok) {
        throw new Error("Network response was NOT ok.");
      }
      console.log("Flight reserved successfully");

    } catch(error) {
      console.error("Error reserving flight:", error)
    }

  };
