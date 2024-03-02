// import { useId, useState } from "react";

interface Props {
  children: string;
}

export function LocationSelector({ children }: Props) {
  // const id = useId();
  // const [input, setInput] = useState(props?.value ?? "");

  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label htmlFor="validationServer03" className="form-label">
          {children}
        </label>
        <input
          type="text"
          // id={id}
          // value={input}
          // onInput={(e) => setInput(e.target.value)}
          list={"cities"}
        />
        <datalist id="cities">
          <option value="Boston" />
          <option value="Somerville" />
          <option value="Cambridge" />
          <option value="Worcester" />
          <option value="San Francisco" />
          <option value="New York" />
          <option value="Seattle" />
          <option value="Los Angeles" />
          <option value="Chicago" />
        </datalist>
      </div>
    </form>
  );
}
