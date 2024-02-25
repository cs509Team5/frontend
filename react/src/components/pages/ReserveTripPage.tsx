interface Props {
  onNavToHomePage: () => void;
  onNavToFilterTripsPage: () => void;
}

export function ReserveTripPage({
  onNavToHomePage,
  onNavToFilterTripsPage,
}: Props) {
  return (
    <>
      <h1>Choose your departure airport and arrival airport!</h1>
      <button onClick={() => onNavToFilterTripsPage()}>Find Flights</button>
      <button onClick={() => onNavToHomePage()}>Back</button>
    </>
  );
}
