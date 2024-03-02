import "./App.css";
import { useState } from "react";
import { HomePage } from "./components/pages/HomePage.tsx";
import { ReserveTripPage } from "./components/pages/ReserveTripPage.tsx";
import { FilterTripsPage } from "./components/pages/FilterTripsPage.tsx";
import { BookTripPage } from "./components/pages/BookTripPage.tsx";

const enum EPage {
  Homepage = 1,
  ReserveTripPage,
  FilterTripsPage,
  BookTripPage,
}

function App() {
  const [currentPage, setCurrentPage] = useState<EPage>(EPage.Homepage);

  return (
    <>
      <div className="card">
        {currentPage === EPage.Homepage && (
          <HomePage
            onNavToReserveTripPage={() => setCurrentPage(EPage.ReserveTripPage)}
          />
        )}
        {currentPage === EPage.ReserveTripPage && (
          <ReserveTripPage
            onNavToHomePage={() => setCurrentPage(EPage.Homepage)}
            onNavToFilterTripsPage={() => setCurrentPage(EPage.FilterTripsPage)}
          />
        )}
        {currentPage === EPage.FilterTripsPage && (
          <FilterTripsPage
            onNavToBookTripPage={() => setCurrentPage(EPage.BookTripPage)}
            onNavToReserveTripPage={() => setCurrentPage(EPage.ReserveTripPage)}
          />
        )}
        {currentPage === EPage.BookTripPage && (
          <BookTripPage
            onNavToHomePage={() => setCurrentPage(EPage.Homepage)}
            onNavToFilterTripsPage={() => setCurrentPage(EPage.FilterTripsPage)}
          />
        )}
      </div>
    </>
  );
}

export default App;
