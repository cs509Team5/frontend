interface Props {
  onChecked: (checked: number) => void;
  startChecked?: boolean;
  children: string;
}

export function LayoverSelector({
  onChecked,
  children,
}: Props) {
  return (
    <div className="form-check form-check-inline">
      <label
        className="form-check-label form-check-inline"
        htmlFor={"flexCheckChecked" + children}
      >
        {children}
      </label>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio0"
          value="option0"
          defaultChecked={true}
          onChange={(event) => {
            if (event.target.checked) onChecked(0);
          }}
        />
        <label className="form-check-label" htmlFor="inlineRadio0">
          0
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="option1"
          onChange={(event) => {
            if (event.target.checked) onChecked(1);
          }}
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
          1
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="option2"
          onChange={(event) => {
            if (event.target.checked) onChecked(2);
          }}
        />
        <label className="form-check-label" htmlFor="inlineRadio2">
          2
        </label>
      </div>
    </div>
  );
}
