import { useEffect, useRef, useState, useMemo, useLayoutEffect } from "react";
import { THead } from "./THead";
import { TBody } from "./TBody";
import { Titles } from "./Titles";
import { LOCALE, TABLE_POS } from "../lib/constants";
import { formatTitle } from "../lib/utils";
import ArrowIcon from "icons/arrow.svg";
import sl from "./Dropdown.scss";

const Table = ({ date }) => {
  return (
    <table className={sl.table}>
      <THead />
      <TBody date={date} />
    </table>
  );
};

export const Dropdown = () => {
  const wrapperRef = useRef();
  const [date, setDate] = useState(() => new Date());
  const tablesRef = useRef();
  const titlesRef = useRef();

  useEffect(() => {
    const wrapperElem = wrapperRef.current;
    if (!wrapperElem) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrapperElem.classList.add(sl.visible);
      });
    });
  }, []);

  const { dates, titles } = useMemo(() => {
    const prevDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    return {
      dates: [prevDate, date, nextDate],
      titles: [
        formatTitle(nextDate, LOCALE),
        formatTitle(date, LOCALE),
        formatTitle(prevDate, LOCALE)
      ]
    };
  }, [date]);

  const changeDate = type => () => {
    if (!tablesRef.current || !titlesRef.current) return;

    const tables = tablesRef.current;
    const titles = titlesRef.current;

    tables.style.transform = `translateX(${
      type === "prev" ? TABLE_POS.NEXT : TABLE_POS.PREV
    }%)`;

    titles.style.transform = `translateX(${
      type === "prev" ? TABLE_POS.PREV : TABLE_POS.NEXT
    }%)`;

    tables.classList.add(sl.transition);
    titles.classList.add(sl.transition);

    tables.addEventListener(
      "transitionend",
      () => {
        setDate(type === "prev" ? dates[0] : dates[2]);
        tables.classList.remove(sl.transition);
        titles.classList.remove(sl.transition);
      },
      { once: true }
    );
  };

  useLayoutEffect(() => {
    if (!tablesRef.current || !titlesRef.current) return;
    tablesRef.current.style.transform = `translateX(${TABLE_POS.CURRENT}%)`;
    titlesRef.current.style.transform = `translateX(${TABLE_POS.CURRENT}%)`;
  }, [dates]);

  return (
    <div className={sl.wrapper} ref={wrapperRef}>
      <header className={sl.header}>
        <div className={sl.arrow} onClick={changeDate("prev")}>
          <ArrowIcon />
        </div>
        <Titles titles={titles} ref={titlesRef} />
        <div className={sl.arrow} onClick={changeDate("next")}>
          <ArrowIcon />
        </div>
      </header>
      <div className={sl.tablesWrapper}>
        <div className={sl.tables} ref={tablesRef}>
          {dates.map(date => (
            <div className={sl.tableWrapper} key={date}>
              <Table date={date} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
