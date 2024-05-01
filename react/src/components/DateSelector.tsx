import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  children: string;
  handleDateSelection: (date: Date) => void;
}

export default function DateSelector({ children, handleDateSelection }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    handleDateSelection(date);
  };

  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label htmlFor="validationServer03" className="form-label">
          {children}
        </label>
        <DatePicker
          selected={currentDate}
          onChange={(date: Date) => handleDateChange(date)}
          placeholderText={"Departure Date"}
        />
      </div>
    </form>
  );
}
