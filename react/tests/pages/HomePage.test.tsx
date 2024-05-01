import { HomePage } from "../../src/pages/HomePage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("HomePage", () => {
  it("should render Book Trip button", () => {
    render(<HomePage onNavToReserveTripPage={() => {}} />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Book Trip");
  });

  it("should call onNavToReserveTripPage when button is clicked", async () => {
    let buttonPressed = false;
    render(
      <HomePage
        onNavToReserveTripPage={() => {
          buttonPressed = true;
        }}
      />,
    );

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);

    expect(buttonPressed);
  });
});
