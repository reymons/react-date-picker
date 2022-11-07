export const areDatesEqual = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const changeDate = (date, day) => {
  return new Date(date.getFullYear(), date.getMonth(), day);
};

export const map = (length, callback) => {
  return Array.from({ length }, (_, i) => callback(i));
};

export const formatTitle = (date, locale) => {
  return date.toLocaleString(locale, { month: "long", year: "numeric" });
};
