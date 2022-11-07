import { useState, useMemo } from "react";
import cn from "classnames";
import { ROW_COUNT, WEEKDAYS } from "../lib/constants";
import { areDatesEqual, changeDate, map } from "../lib/utils";
import { useDatePicker } from "../lib/context";
import sl from "./TBody.scss";

export const TBody = ({ date }) => {
  const { selectedDate, max, initialDate, selectDate } = useDatePicker();
  const [today] = useState(() => new Date());

  const { prevMonth, nextMonth, daysUntilToday, totalDays, maxDate } = useMemo(
    () => ({
      prevMonth: new Date(date.getFullYear(), date.getMonth(), 0),
      nextMonth: new Date(date.getFullYear(), date.getMonth() + 1, 1),
      daysUntilToday:
        new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 2,
      totalDays: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      maxDate:
        typeof max === "number"
          ? new Date(
              initialDate.getFullYear(),
              initialDate.getMonth(),
              initialDate.getDate() + max
            )
          : null
    }),
    [date, initialDate, max]
  );

  let currentDay = -daysUntilToday;

  return (
    <tbody>
      {map(ROW_COUNT, i => (
        <tr key={i}>
          {map(WEEKDAYS.length, j => {
            let day;
            let thisDate;
            let isInactive = false;

            if (currentDay <= 0) {
              day = prevMonth.getDate() + currentDay;
              isInactive = true;
              thisDate = changeDate(prevMonth, day);
            } else if (currentDay > 0 && currentDay <= totalDays) {
              day = currentDay;
              thisDate = changeDate(date, day);
            } else {
              day = currentDay - totalDays;
              isInactive = true;
              thisDate = changeDate(nextMonth, day);
            }

            const isSelected = areDatesEqual(selectedDate, thisDate);
            const isTodays = areDatesEqual(today, thisDate);

            currentDay++;

            return (
              <td
                className={cn(sl.cell, {
                  [sl.selected]: isSelected,
                  [sl.inactive]: isInactive,
                  [sl.todays]: isTodays
                })}
                key={i + j}
                onClick={() => {
                  if (!maxDate || thisDate <= maxDate) {
                    selectDate(thisDate);
                  }
                }}
              >
                {day}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
