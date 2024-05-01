interface Props {
  onNavToReserveTripPage: () => void;
}

export function HomePage({ onNavToReserveTripPage }: Props) {
  return (
    <>
      <h1>Airline Reservation Service</h1>
      <button onClick={() => onNavToReserveTripPage()}>Book Trip</button>
      <p>Book your next vacation!</p>
    </>
  );
}
