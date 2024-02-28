import React, { useState } from "react";
import FAQArrow from "../../assets/FAQArrow.svg";
import styles from "./index.module.scss";
import { SEND_ENUM } from "../../enums/sendEnum";
import FAQSectionBackground from "../../assets/FAQSectionBackground.svg";
function FAQSection() {
  const [FAQexpanded, setFAQExpanded] = useState(Array(7).fill(false));

  const toggleFAQ = (index) => {
    const newExpandedState = [...FAQexpanded];
    newExpandedState[index] = !newExpandedState[index];
    setFAQExpanded(newExpandedState);
  };

  return (
    <div className={styles.FAQMainContainer}>
      <p className={styles.FAQText}>{SEND_ENUM.FAQ}</p>
      <div className={styles.FAQSection}>
        <div onClick={() => toggleFAQ(0)} className={styles.FAQHeading}>
          {SEND_ENUM.whatIsTransferFee}{" "}
          <img
            src={FAQArrow}
            alt="FAQ"
            className={styles.FAQArrowSix}
            style={{
              transform: FAQexpanded[0] ? "rotate(90deg)" : "none",
              transition: "transform 1s ease",
            }}
          />
          {FAQexpanded[0] && (
            <span className={styles.description}>
              {" "}
              Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!
            </span>
          )}
        </div>
        <div onClick={() => toggleFAQ(1)} className={styles.FAQHeading}>
          {SEND_ENUM.whichCountriesAre}{" "}
          <img
            src={FAQArrow}
            alt="FAQ"
            className={styles.FAQArrowSeven}
            style={{
              transform: FAQexpanded[1] ? "rotate(90deg)" : "none",
              transition: "transform 1s ease",
            }}
          />
          {FAQexpanded[1] && (
            <span className={styles.description}>
              {" "}
              Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!
            </span>
          )}
        </div>
        <div onClick={() => toggleFAQ(2)} className={styles.FAQHeading}>
          {SEND_ENUM.howToSendMoneyToIndia}{" "}
          <img
            src={FAQArrow}
            alt="FAQ"
            className={styles.FAQArrowOne}
            style={{
              transform: FAQexpanded[2] ? "rotate(90deg)" : "none",
              transition: "transform 1s ease",
            }}
          />
          {FAQexpanded[2] && (
            <span className={styles.description}>
              {" "}
              Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!
            </span>
          )}
        </div>

        <div onClick={() => toggleFAQ(3)} className={styles.FAQHeading}>
          {SEND_ENUM.doesReciepientNeedToSignup}{" "}
          <img
            src={FAQArrow}
            alt="FAQ"
            className={styles.FAQArrowTwo}
            style={{
              transform: FAQexpanded[3] ? "rotate(90deg)" : "none",
              transition: "transform 1s ease",
            }}
          />
          {FAQexpanded[3] && (
            <span className={styles.description}>
              {" "}
              Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!
            </span>
          )}
        </div>

        <div onClick={() => toggleFAQ(5)} className={styles.FAQHeading}>
          {SEND_ENUM.whyIsKYCRequired}{" "}
          <img
            src={FAQArrow}
            alt="FAQ"
            className={styles.FAQArrowFour}
            style={{
              transform: FAQexpanded[5] ? "rotate(90deg)" : "none",
              transition: "transform 1s ease",
            }}
          />
          {FAQexpanded[5] && (
            <span className={styles.description}>
              {" "}
              Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!
            </span>
          )}
        </div>

        <div onClick={() => toggleFAQ(6)} className={styles.FAQHeading}>
          {SEND_ENUM.areTransactionDoneOne}{" "}
          <img
            src={FAQArrow}
            alt="FAQ"
            className={styles.FAQArrowFive}
            style={{
              transform: FAQexpanded[6] ? "rotate(90deg)" : "none",
              transition: "transform 1s ease",
            }}
          />
          {FAQexpanded[6] && (
            <span className={styles.description}>
              {" "}
              Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!
            </span>
          )}
        </div>
      </div>
      <div className={styles.FAQSectionBackgroundContainer}>
        <img
          src={FAQSectionBackground}
          alt="FAQSectionBackground"
          className={styles.FAQSectionBackground}
        />
      </div>
    </div>
  );
}

export default FAQSection;
