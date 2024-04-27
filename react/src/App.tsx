import "./App.css";
import { useState } from "react";
import { HomePage } from "./pages/HomePage.tsx";
import { ReserveTripPage } from "./pages/ReserveTripPage.tsx";
import { FilterTripsPage } from "./pages/FilterTripsPage.tsx";
import { BookTripPage } from "./pages/BookTripPage.tsx";
import { mockTripResults } from "./pages/FilterTripsPage.tsx";
import { FlightsProvider } from "./FlightsContext.tsx";
import FilterReturnTripsPage from "./pages/FilterReturnTripsPage.tsx";

const enum EPage {
  Homepage = 1,
  ReserveTripPage,
  FilterTripsPage,
  FilterReturnTripsPage,
  BookTripPage,
}

function App() {
  const [currentPage, setCurrentPage] = useState<EPage>(EPage.Homepage);
  const [roundTrip, setRoundTrip] = useState(true);

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
                setCurrentPage(EPage.FilterTripsPage)}}
            />
          )}
          {currentPage === EPage.FilterTripsPage && (
            <FilterTripsPage
              onNavToBookTripPage={() => setCurrentPage(EPage.BookTripPage)}
              onNavToReserveTripPage={() => setCurrentPage(EPage.ReserveTripPage)}
              onNavToFilterReturnTripsPage={() => setCurrentPage(EPage.FilterReturnTripsPage)}
              roundTrip = {roundTrip} // passing as prop
            />
          )}
          {currentPage === EPage.FilterReturnTripsPage && (
            <FilterReturnTripsPage />
          )}
          {currentPage === EPage.BookTripPage && (
            <BookTripPage
              onNavToHomePage={() => setCurrentPage(EPage.Homepage)}
              onNavToFilterTripsPage={() =>
                setCurrentPage(EPage.FilterTripsPage)
              }
            />
          )}
        </div>
      </FlightsProvider>
    </>
  );
}

export default App;
