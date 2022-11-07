import { forwardRef } from "react";
import sl from "./Titles.scss";

const TitlesInner = ({ titles }, ref) => {
  return (
    <div className={sl.wrapper}>
      <ul className={sl.titles} ref={ref}>
        {titles.map(title => (
          <li className={sl.title} key={title}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Titles = forwardRef(TitlesInner);
