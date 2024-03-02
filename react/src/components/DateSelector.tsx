import DatePicker from "react-datepicker";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  children: string;
}

export function DateSelector({ children }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label htmlFor="validationServer03" className="form-label">
          {children}
        </label>
        <DatePicker
          selected={currentDate}
          onChange={(date: Date) => setCurrentDate(date)}
          placeholderText={"Departure Date"}
        />
      </div>
    </form>
  );
}
