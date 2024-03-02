interface Props {
  onNavToBookTripPage: () => void;
  onNavToReserveTripPage: () => void;
}

export function FilterTripsPage({
  onNavToBookTripPage,
  onNavToReserveTripPage,
}: Props) {
  return (
    <>
      <h1>Filter for the flights that best fit your trip!</h1>
      <button onClick={() => onNavToBookTripPage()}>
        Confirm Selected Flights
      </button>
      <button onClick={() => onNavToReserveTripPage()}>Back</button>
    </>
  );
}
