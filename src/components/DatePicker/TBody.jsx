import { useState, useMemo } from "react";
import cn from "classnames";
import { ROW_COUNT, WEEKDAYS, LOCALE } from "./lib/constants";
import { areDatesEqual, changeDate } from "./lib/utils";
import { useDatePicker } from ".";

import styles from "./TBody.module.scss";

function map(length, callback) {
  return Array.from({ length }, (_, i) => callback(i));
}

export const TBody = ({ date }) => {
  const { selectedDate, max, selectDate } = useDatePicker();
  const [today] = useState(() => new Date());

  const { prevMonth, nextMonth, daysUntilToday, totalDays, maxDate } =
    useMemo(() => {
      return {
        prevMonth: new Date(date.getFullYear(), date.getMonth(), 0),
        nextMonth: new Date(date.getFullYear(), date.getMonth() + 1, 1),
        daysUntilToday:
          new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 2,
        totalDays: new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate(),
        maxDate: max
          ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + max)
          : null,
      };
    }, [date, max]);

  let currentDay = -daysUntilToday;

  return (
    <tbody>
      {map(ROW_COUNT, (i) => (
        <tr key={i}>
          {map(WEEKDAYS.length, (j) => {
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
                className={cn(styles.cell, {
                  [styles.selected]: isSelected,
                  [styles.inactive]: isInactive,
                  [styles.todays]: isTodays,
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
