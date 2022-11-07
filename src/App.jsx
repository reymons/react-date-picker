import { useState } from "react";
import { DatePicker } from "./DatePicker";
import sl from "./App.scss";

export const App = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  return (
    <div className={sl.wrapper}>
      <h2 className={sl.title}>Wähle ein Datum</h2>
      <DatePicker
        initialDate={selectedDate}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
        max={30}
      />
    </div>
  );
};
