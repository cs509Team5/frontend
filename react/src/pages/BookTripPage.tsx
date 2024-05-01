import { Flight } from "../FlightsContext.tsx";
import { reserveFlight } from "../FlightsContext.tsx";

interface Props {
  onNavToHomePage: () => void;
  onNavToFilterTripsPage: () => void;
  selectedTrip: (Flight | null)[] | null; //adding the selcted trip as a prop
}

export function BookTripPage({
  onNavToHomePage,
  onNavToFilterTripsPage,
  selectedTrip,
}: Props) {


  if (!selectedTrip) {
    return <p> No trip was selected</p>
  }

  const handleConfirmPurchase = () => {
    selectedTrip.forEach((trip) => {
      if (trip) {
        reserveFlight({
          departureAirport: trip.departAirport,
          arrivalAirport: trip.arriveAirport,
          departureDate: trip.departDatetime,
          flightNumber: trip.flightNumber,
          seatType: trip.seatClass,
        });
      }

    })

    // the navigate back to the homepage
    onNavToHomePage();
  }

  return (
    <>
      <h1>Confirm ticket purchase for your trip!</h1>
      {/* Rendering details of the selectedTrip array */}
      {selectedTrip.map((trip, index) => (
        <div key={index}>
          {trip !== null && <p>Departure Airport: {trip.departAirport}</p>}
          {trip !== null && <p>Arrival Airport: {trip.arriveAirport}</p>}
          {trip !== null && <p>Departure Date: {trip.departDatetime}</p>}
          <hr />
        </div>
      ))}
      <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
      <button onClick={() => onNavToFilterTripsPage()}>Back</button>
    </>
  );
}
