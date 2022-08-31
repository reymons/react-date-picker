import { useState, useRef, useContext, createContext } from "react";
import { Dropdown } from "./Dropdown";
import { Header } from "./Header";
import { useOutsideClick } from "../../hooks/useOutsideClick";

import styles from "./index.module.scss";

export const Context = createContext({});

export const useDatePicker = () => useContext(Context);

export const DatePicker = ({ selectedDate, onSelect, max }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapper = useRef();

  useOutsideClick(() => setIsOpen(false), wrapper, isOpen);

  const toggleDropdown = () => setIsOpen((p) => !p);
  const selectDate = (date) => onSelect(date);

  return (
    <div className={styles.wrapper} ref={wrapper}>
      <Context.Provider
        value={{ selectedDate, max, selectDate, toggleDropdown }}
      >
        <Header />
        {isOpen && <Dropdown />}
      </Context.Provider>
    </div>
  );
};
