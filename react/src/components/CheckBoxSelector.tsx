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
        onChange={(event) => {
          onChecked(event.target.checked);
        }}
      />
    </div>
  );
}
