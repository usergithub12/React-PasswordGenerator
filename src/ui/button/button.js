import React from "react";
import cx from "clsx";
import styles from "./button.module.css";
function Button({ type, onClick, className, children }) {
  return (
    <button
      type={type}
      className={cx(styles["button"], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { Button };
