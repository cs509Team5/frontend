import { useState } from "react";

interface Props {
  onChecked: (checked: boolean) => void;
  startChecked?: boolean;
  children: string;
}

export function CheckBoxSelector({
  onChecked,
  startChecked = true,
  children,
}: Props) {
  const [roundTrip, setRoundTrip] = useState(startChecked);

  return (
    <div className="form-check">
      <label
        className="form-check-label"
        htmlFor={"flexCheckChecked" + children}
      >
        {children}
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        defaultChecked={startChecked}
        id={"flexCheckChecked" + children}
        //defaultChecked={roundTrip}
        onChange={() => {
          setRoundTrip(!roundTrip);
          onChecked(roundTrip);
        }}
      />
    </div>
  );
}
