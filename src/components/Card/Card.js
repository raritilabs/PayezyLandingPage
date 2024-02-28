import React, { useContext } from "react";
import styles from "./Card.module.scss";
import { AppContext } from "../../context";
import cx from "classnames";
const Card = ({ titleComponent, children }) => {
  const { isMobile } = useContext(AppContext);
  return (
    <div
      className={cx(styles.rudMainDiv, {
        [styles.rudMainDivMob]: isMobile,
      })}
    >
      <div className={styles.titleContainer}>{titleComponent}</div>
      <div className={styles.bodyContainer}>{children}</div>
    </div>
  );
};

export default Card;
