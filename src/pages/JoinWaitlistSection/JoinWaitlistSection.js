import React from "react";
import cx from "classnames";
import { useContext } from "react";
import { AppContext } from "../../context";
import styles from "./index.module.scss";
import ButtonRade from "../../components/RadeButtons";
import { SEND_ENUM } from "../../enums/sendEnum";
import joinWaitlistButtonArrow from "../../assets/joinWaitlistButtonArrowNew.svg";
const JoinWaitlistSection = () => {
  const { isMobile } = useContext(AppContext);
  const handleClickJoinWaitlistButton = () => {
    // Redirect to the app.payezy.io homepage or specific URL
    window.open("https://app.payezy.io", "_blank");
  };
  return (
    <div className={styles.joinWaitlistContainer}>
      {" "}
      {!isMobile && (
        <div
          className={cx(styles.withZeroFee, {
            [styles.withZeroFeeMob]: isMobile,
          })}
        >
          With <span className={styles.zeroText}>zero</span>
          fees <br />
          <span>Payezy</span> is the cheapest money transfer platform in USA.
        </div>
      )}
      {isMobile && (
        <div
          className={cx(styles.withZeroFee, {
            [styles.withZeroFeeMob]: isMobile,
          })}
        >
          With <span className={styles.zeroText}>zero</span>
          fees <br />
          <span>Payezy</span> is the cheapest money transfer
          <br />
          platform in USA.
        </div>
      )}
      <div className={styles.buttonContainer}>
        <ButtonRade
          customStyling={styles.joinWaitlistButton}
          onClick={handleClickJoinWaitlistButton}
        >
          {SEND_ENUM.sendNow}
          <div className={styles.joinWaitlistButtonArrowContainer}>
            <img
              src={joinWaitlistButtonArrow}
              alt="joinWaitlistButtonArrow"
              className={styles.joinWaitlistButtonArrow}
            />
          </div>
        </ButtonRade>
      </div>
    </div>
  );
};

export default JoinWaitlistSection;
