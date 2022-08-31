import { useState } from "react";
import { DatePicker } from "./components/DatePicker";

import styles from "./App.module.scss";

export const App = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Wähle ein Datum</h2>
      <DatePicker
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
        max={30}
      />
    </div>
  );
};
