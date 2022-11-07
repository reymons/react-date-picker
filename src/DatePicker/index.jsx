import { useState, useRef } from "react";
import { Dropdown } from "./components/Dropdown";
import { Header } from "./components/Header";
import { DatePickerContext } from "./lib/context";
import { useOutsideClick } from "./lib/use-outside-click";
import sl from "./index.scss";

export const DatePicker = ({
  initialDate = new Date(),
  selectedDate,
  onSelect,
  max
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef();

  useOutsideClick(() => setIsOpen(false), wrapperRef, isOpen);

  const toggleDropdown = () => setIsOpen(p => !p);
  const selectDate = date => onSelect(date);

  return (
    <div className={sl.wrapper} ref={wrapperRef}>
      <DatePickerContext.Provider
        value={{ initialDate, selectedDate, max, selectDate, toggleDropdown }}
      >
        <Header />
        {isOpen && <Dropdown />}
      </DatePickerContext.Provider>
    </div>
  );
};
