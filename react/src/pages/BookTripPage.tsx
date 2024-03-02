interface Props {
  onNavToHomePage: () => void;
  onNavToFilterTripsPage: () => void;
}

export function BookTripPage({
  onNavToHomePage,
  onNavToFilterTripsPage,
}: Props) {

  return (
    <>
      <h1>Confirm ticket purchase for your trip!</h1>
      <button onClick={() => onNavToHomePage()}>Confirm Purchase</button>
      <button onClick={() => onNavToFilterTripsPage()}>Back</button>
    </>
  );
}
