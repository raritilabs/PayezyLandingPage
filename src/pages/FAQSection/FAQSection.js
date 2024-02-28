import React, { useState } from "react";
import FAQArrow from "../../assets/FAQArrow.svg";
import styles from "./index.module.scss";
import { SEND_ENUM } from "../../enums/sendEnum";
import FAQSectionBackground from "../../assets/FAQSectionBackground.svg";

function FAQSection() {
  const [FAQexpanded, setFAQExpanded] = useState(Array(7).fill(false));

  const toggleFAQ = (index) => {
    setFAQExpanded((prevState) => {
      const newExpandedState = [...prevState];
      newExpandedState[index] = !newExpandedState[index];
      return newExpandedState;
    });
  };
  const faqQuestions = [
    SEND_ENUM.whatIsTransferFee,
    SEND_ENUM.whichCountriesAre,
    SEND_ENUM.howToSendMoneyToIndia,
    SEND_ENUM.doesReciepientNeedToSignup,
    SEND_ENUM.howMuchTimeItTakes,
    SEND_ENUM.whyIsKYCRequired,
    SEND_ENUM.areTransactionDoneOne,
  ];

  const faqAnswers = [
    "Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!",
    "Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!",
    "Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!",
    "Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!",
    "Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!",
    "Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!",
    "Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!",
  ];
  return (
    <div className={styles.FAQMainContainer}>
      <p className={styles.FAQText}>{SEND_ENUM.FAQ}</p>
      <div className={styles.FAQSection}>
        {faqQuestions.map((question, index) => (
          <div key={index}>
            <div onClick={() => toggleFAQ(index)} className={styles.FAQHeading}>
              {question}
              <img
                src={FAQArrow}
                alt="FAQ"
                className={styles[`FAQArrow${index}`]}
                style={{
                  transform: FAQexpanded[index] ? "rotate(90deg)" : "none",
                  transition: "transform 0.6s ease",
                }}
              />
            </div>
            {FAQexpanded[index] && (
              <span className={styles.description}>{faqAnswers[index]}</span>
            )}
          </div>
        ))}
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
