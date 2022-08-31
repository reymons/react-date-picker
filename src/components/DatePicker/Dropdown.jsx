import { useEffect, useRef, useState, useMemo, useLayoutEffect } from "react";
import ArrowIcon from "icons/arrow.svg";
import { THead } from "./THead";
import { TBody } from "./TBody";
import { LOCALE } from "./lib/constants";

import styles from "./Dropdown.module.scss";

const Table = ({ date }) => {
  return (
    <table className={styles.table}>
      <THead />
      <TBody date={date} />
    </table>
  );
};

export const Dropdown = () => {
  const wrapper = useRef();
  const [date, setDate] = useState(() => new Date());
  const tables = useRef();
  const titles = useRef();

  useEffect(() => {
    const wrapperElem = wrapper.current;
    if (!wrapperElem) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrapperElem.classList.add(styles.visible);
      });
    });
  }, []);

  const { dates, titleTexts } = useMemo(() => {
    const prevDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    return {
      dates: [prevDate, date, nextDate],
      titleTexts: [
        nextDate.toLocaleString(LOCALE, { month: "long", year: "numeric" }),
        date.toLocaleString(LOCALE, { month: "long", year: "numeric" }),
        prevDate.toLocaleString(LOCALE, { month: "long", year: "numeric" }),
      ],
    };
  }, [date]);

  const changeDate = (type) => () => {
    if (tables.current && titles.current) {
      tables.current.style.transform = `translateX(${
        type === "prev" ? 0 : -200
      }%)`;

      titles.current.style.transform = `translateX(${
        type === "prev" ? -200 : 0
      }%)`;

      tables.current.classList.add(styles.transition);
      titles.current.classList.add(styles.transition);

      tables.current.addEventListener(
        "transitionend",
        () => {
          setDate(type === "prev" ? dates[0] : dates[2]);
          tables.current.classList.remove(styles.transition);
          titles.current.classList.remove(styles.transition);
        },
        { once: true }
      );
    }
  };

  useLayoutEffect(() => {
    if (tables.current && titles.current) {
      tables.current.style.transform = "translateX(-100%)";
      titles.current.style.transform = "translateX(-100%)";
    }
  }, [dates]);

  return (
    <div className={styles.wrapper} ref={wrapper}>
      <header className={styles.header}>
        <div className={styles.arrow} onClick={changeDate("prev")}>
          <ArrowIcon />
        </div>
        <div className={styles.titlesWrapper}>
          <ul className={styles.titles} ref={titles}>
            {titleTexts.map((title) => (
              <li className={styles.title} key={title}>
                {title}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.arrow} onClick={changeDate("next")}>
          <ArrowIcon />
        </div>
      </header>
      <div className={styles.tablesWrapper}>
        <div className={styles.tables} ref={tables}>
          {dates.map((date) => (
            <div className={styles.tableWrapper} key={date}>
              <Table date={date} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
