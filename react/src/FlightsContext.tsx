// FlightContext.tsx
import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';

interface FlightCriteria {
  departureAirport: string;
  arrivalAirport: string;
  flightNumber: number;
  departureDate: string;
  returnDate: string;
  numOfFlexibleDate?: number;
  numberOfStopover: number;
  acceptFirstClass: boolean;
  acceptEconomy: boolean;
}

export type SearchResponse = {
    isSuccess: boolean;
    departureFlights: {
      special: Array<{
        departdatetime: string;
        arrivedatetime: string;
        departairport: string;
        arriveairport: string;
        flightnumber: string;
        seatClass: string;
        flightType: string;
        isLayover: string;
      }>;
    };
    returnFlights: {
      special: Array<{
        departdatetime: string;
        arrivedatetime: string;
        departairport: string;
        arriveairport: string;
        flightnumber: string;
        seatClass: string;
        flightType: string;
        isLayover: string;
      }>;
    };
  };

interface FlightsContextType {
  flights: SearchResponse[];
  fetchFlights: (criteria: FlightCriteria) => void;
}

const FlightsContext = createContext<FlightsContextType | null>(null);

export const useFlights = () => useContext(FlightsContext) as FlightsContextType;

interface FlightsProviderProps {
  children: ReactNode;
}

export const FlightsProvider: FunctionComponent<FlightsProviderProps> = ({ children }) => {
  const [flights, setFlights] = useState<SearchResponse[]>([]);

  const fetchFlights = (criteria: FlightCriteria) => {
    fetch('http://localhost:8080/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(criteria)
    })
    .then(response => response.json())
    .then(data => setFlights(data))
    .catch(error => console.error('Error fetching flights:', error));
  };

  return (
    <FlightsContext.Provider value={{ flights, fetchFlights }}>
      {children}
    </FlightsContext.Provider>
  );
};
