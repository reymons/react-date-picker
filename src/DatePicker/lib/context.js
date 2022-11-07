import { createContext, useContext } from "react";

export const DatePickerContext = createContext({});

export const useDatePicker = () => useContext(DatePickerContext);
