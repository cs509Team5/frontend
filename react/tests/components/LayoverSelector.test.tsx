import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LayoverSelector } from "../../src/components/LayoverSelector";
//import "@testing-library/jest-dom/vitest";

describe("LayoverSelector", () => {
  it("should render check box", async () => {
    let radioValue = 0;

    render(
      <LayoverSelector
        onChecked={(pressed) => {
          radioValue = pressed;
        }}
        startChecked={true}
        children={"Hello"}
      />,
    );

    const inlineRadio0 = screen.getAllByRole("radio")[0];
    const inlineRadio1 = screen.getAllByRole("radio")[1];
    const inlineRadio2 = screen.getAllByRole("radio")[2];

    expect(inlineRadio0).toBeInTheDocument();
    expect(inlineRadio0).toBeChecked();

    expect(inlineRadio1).toBeInTheDocument();
    expect(inlineRadio1).not.toBeChecked();

    expect(inlineRadio2).toBeInTheDocument();
    expect(inlineRadio2).not.toBeChecked();

    const user = userEvent.setup();

    await user.click(inlineRadio1);

    expect(radioValue).toBe(1);

    await user.click(inlineRadio2);

    expect(radioValue).toBe(2);
  });
});
