import React from "react";
import cx from "classnames";
import { AppContext } from "../../context";
import { useContext } from "react";
import styles from "./index.module.scss";
import { SEND_ENUM } from "../../enums/sendEnum";

const WaitingForStoringEmail = () => {
  const { isMobile } = useContext(AppContext);
  return (
    <div
      className={cx(styles.paymentVerificationDiv, {
        [styles.paymentVerificationDivMob]: isMobile,
      })}
    >
      {/* Animated Circle Loader*/}
      <ul className={styles.loaderList}>
        <li>
          <div
            className={cx(styles.loaderCircle, {
              [styles.loaderCircleMob]: isMobile,
            })}
          >
            <span></span>
          </div>
        </li>
      </ul>
      <div
        className={cx(styles.verifyingContent, {
          [styles.verifyingContentMob]: isMobile,
        })}
      >
        {SEND_ENUM.transactionInProgress}
      </div>
    </div>
  );
};
export default WaitingForStoringEmail;
