import "./App.css";
import { useState } from "react";
import { HomePage } from "./pages/HomePage.tsx";
import { ReserveTripPage } from "./pages/ReserveTripPage.tsx";
import { FilterTripsPage } from "./pages/FilterTripsPage.tsx";
import { BookTripPage } from "./pages/BookTripPage.tsx";
import { FlightsProvider } from "./FlightsContext.tsx";
import FilterReturnTripsPage from "./pages/FilterReturnTripsPage.tsx";

//additional import to enable official reservation mechanism to backend call
import { Flight } from "./FlightsContext.tsx"
import { ReserveSuccessPage } from "./pages/ReserveSuccessPage.tsx";

const enum EPage {
  Homepage = 1,
  ReserveTripPage,
  FilterTripsPage,
  FilterReturnTripsPage,
  BookTripPage,
  ReserveSuccessPage,
}

function App() {
  const [currentPage, setCurrentPage] = useState<EPage>(EPage.Homepage);
  const [roundTrip, setRoundTrip] = useState(true);
  const [selectedOutboundTrip, setSelectedOutboundTrip] = useState<Flight | null>(null);
  const [selectedInboundTrip, setSelectedInboundTrip] = useState<Flight | null>(null);

  return (
    <>
      <FlightsProvider>
        <div className="card">
          {currentPage === EPage.Homepage && (
            <HomePage
              onNavToReserveTripPage={() =>
                setCurrentPage(EPage.ReserveTripPage)
              }
            />
          )}
          {currentPage === EPage.ReserveTripPage && (
            <ReserveTripPage
              onNavToHomePage={() => setCurrentPage(EPage.Homepage)}
              onNavToFilterTripsPage={(roundTripValue) => {
                setRoundTrip(roundTripValue);
                setCurrentPage(EPage.FilterTripsPage)
              }}
            />
          )}
          {currentPage === EPage.FilterTripsPage && (
            <FilterTripsPage
              onNavToBookTripPage={(selectedTrip) => {
                setSelectedOutboundTrip(selectedTrip);
                setCurrentPage(EPage.BookTripPage);
              }}
              onNavToReserveTripPage={() => setCurrentPage(EPage.ReserveTripPage)}
              onNavToFilterReturnTripsPage={
                (selectedTrip) => {
                  setSelectedOutboundTrip(selectedTrip);
                  setCurrentPage(EPage.BookTripPage);
                  setCurrentPage(EPage.FilterReturnTripsPage);
                }}

              roundTrip={roundTrip} // passing as prop
            />
          )}
          {currentPage === EPage.FilterReturnTripsPage && (
            <FilterReturnTripsPage
              onNavToBookTripPage={(selectedTrip) => {
                setSelectedInboundTrip(selectedTrip);
                setCurrentPage(EPage.BookTripPage);
              }}
              onNavToFilterTripsPage={() =>
                setCurrentPage(EPage.FilterTripsPage)}
            />
          )}
          {currentPage === EPage.BookTripPage && (
            <BookTripPage
              onNavToHomePage={() => setCurrentPage(EPage.ReserveSuccessPage)}
              onNavToFilterTripsPage={() => setCurrentPage(EPage.FilterTripsPage)}
              selectedTrip={[selectedInboundTrip, selectedOutboundTrip]}
            />
          )}
          {currentPage === EPage.ReserveSuccessPage && (
            <ReserveSuccessPage
              onNavToHomePage={() => setCurrentPage(EPage.Homepage)}
            />
          )}
        </div>
      </FlightsProvider>
    </>
  );
}

export default App;
