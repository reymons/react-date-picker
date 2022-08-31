import { useEffect } from "react";

export const useOutsideClick = (close, ref, isOpen) => {
  useEffect(() => {
    if (!ref.current || !isOpen) {
      return;
    }

    const element = ref.current;

    const click = (e) => {
      if (!element.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("click", click, { capture: true });

    return () => {
      document.removeEventListener("click", click, { capture: true });
    };
  }, [ref, close, isOpen]);
};
