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
    SEND_ENUM.whatTypeOfBeneficiaryAccountSupoorted,
    SEND_ENUM.howMuchTimeItTakes,
    SEND_ENUM.whyIsKYCRequired,
    SEND_ENUM.areTransactionDoneOne,
  ];

  const faqAnswers = [
    "Absolutely Zero. Yes, you read it right. Nada. Zilch. Zero!",
    "Currently we only support remittances to India from USA.",
    "Its simple. By using our app you will be able to make transfer request by giving us the details of the recipient’s bank account and process the payment via ACH or Credit Card. ",
    "No. Not at all. The amount will be credited to the recipients bank account directly.",
    "You can only send money to an NRO or Savings Account. NRE Account is not supported.",
    "In few minutes.",
    "To comply with regulatory requirements, you need to verify your identity for sending money.",
    "Account security is important to us and we've taken several steps to protect your payezy account-related information. Rariti, Inc. offers  electronic financial payment services by collaborating with partners in both USA and India, which are fully licensed and compliant with local authorities. ",
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
      {/* <div className={styles.FAQSectionBackgroundContainer}>
        <img
          src={FAQSectionBackground}
          alt="FAQSectionBackground"
          className={styles.FAQSectionBackground}
        />
      </div> */}
    </div>
  );
}

export default FAQSection;
