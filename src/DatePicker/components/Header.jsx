import { useDatePicker } from "../lib/context";
import { LOCALE } from "../lib/constants";
import CalendarIcon from "icons/calendar.svg";
import sl from "./Header.scss";

export const Header = () => {
  const { selectedDate, toggleDropdown } = useDatePicker();

  const date = selectedDate.toLocaleString(LOCALE, {
    day: "numeric",
    month: "2-digit",
    year: "numeric"
  });

  return (
    <header className={sl.wrapper} onClick={toggleDropdown}>
      <p className={sl.date}>{date}</p>
      <div className={sl.icon}>
        <CalendarIcon />
      </div>
    </header>
  );
};
