import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckBoxSelector } from "../../src/components/CheckBoxSelector";

describe("CheckBoxSelector", () => {
  it("should render check box", async () => {
    let buttonPressed = false;

    render(
      <CheckBoxSelector
        onChecked={(pressed) => {
          buttonPressed = pressed;
        }}
        startChecked={true}
        children={"Hello"}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();

    const user = userEvent.setup();

    await user.click(checkbox);

    expect(buttonPressed);
  });
});
