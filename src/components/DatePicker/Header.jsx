import { useDatePicker } from ".";
import { LOCALE } from "./lib/constants";
import CalendarIcon from "icons/calendar.svg";

import styles from "./Header.module.scss";

export const Header = () => {
  const { selectedDate, toggleDropdown } = useDatePicker();

  const date = selectedDate.toLocaleString(LOCALE, {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <header className={styles.wrapper} onClick={toggleDropdown}>
      <p className={styles.date}>{date}</p>
      <div className={styles.icon}>
        <CalendarIcon />
      </div>
    </header>
  );
};
