import React from 'react'
import cx from "classnames"
import { useContext } from "react";
import { AppContext } from "../../context";
import styles from "./index.module.scss"
import { SEND_ENUM } from "../../enums/sendEnum";

const PayezyMarketing = () => {
  const { isMobile } = useContext(AppContext);
  return (
    <div className={styles.payezyMarketingContainer}>
      <div
        className={cx(styles.makingYourPayments, {
          [styles.makingYourPaymentsMob]: isMobile,
        })}
      >
        {SEND_ENUM.makingYourPayments}
      </div>

      <div
        className={cx(styles.sendMoneyToIndia, {
          [styles.sendMoneyToIndiaMob]: isMobile,
        })}
      >
        {SEND_ENUM.sendMoneyToIndia}
      </div>
    </div>
  );
};

export default PayezyMarketing