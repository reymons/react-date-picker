import { WEEKDAYS } from "../lib/constants";

export const THead = () => {
  return (
    <thead>
      <tr>
        {WEEKDAYS.map((day, i) => (
          <th key={i}>{day[0]}</th>
        ))}
      </tr>
    </thead>
  );
};
