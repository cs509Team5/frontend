interface Props {
  onNavToHomePage: () => void;
}

export function ReserveSuccessPage({
  onNavToHomePage,
}: Props) {

  return (
    <>
      <p>Reservation Successful</p>
      <button onClick={onNavToHomePage}>Back to Homepage</button>
    </>
  );
}
