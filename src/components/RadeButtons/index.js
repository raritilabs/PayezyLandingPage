import React from "react";
import styles from "../../components/RadeButtons/index.module.scss";
const ButtonRade = ({ outline, children, customStyling, ...otherProps }) => {
  return (
    <button
      className={
        ({ [styles.outline]: outline, [styles.filled]: !outline },
        customStyling)
      }
      {...otherProps}
    >
      {children}
    </button>
  );
};
export default ButtonRade;
