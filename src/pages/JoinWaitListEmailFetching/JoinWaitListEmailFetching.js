import React, { useContext, useState, useEffect } from "react";
import ButtonRade from "../../components/RadeButtons";
import cx from "classnames";
import { AppContext } from "../../context";
import styles from "./index.module.scss";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import mixpanel from "mixpanel-browser";
mixpanel.init(process.env.REACT_APP_MIXPANEL_API, {
  debug: true,
});
const JoinWaitListEmailFetching = ({ setModalIsOpen }) => {
  const { isMobile } = useContext(AppContext);
  const [email, setEmail] = useState(null);
  const [errorForEmail, setErrorForEmail] = useState(null);
  const [emailStoredSuccesfully, setEmailStoredSuccesfully] = useState(null);
  useEffect(() => {
    AOS.init({});
  }, []);
  const handleClickCloseButton = () => {
    setModalIsOpen(false);
  };
  const handleChangeEmail = async (e) => {
    setErrorForEmail(null);
    setEmail(e.target.value);
  };
  const handleClickConfirm = async () => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      // Handle invalid email address
      setErrorForEmail("Invalid email address");
      // Optionally, show an error message to the user
      return;
    }

    try {
      // Check if email already exists in Firestore
      const waitlistRef = collection(db, "joinWaitlistPayezy");
      const emailDocRef = doc(waitlistRef, email);
      const emailDocSnapshot = await getDoc(emailDocRef);
      mixpanel.track("User clicked on Join Waitlist buttton!");
      if (emailDocSnapshot.exists()) {
        // If email already exists, set it to the email error state
        setErrorForEmail("Email already exists!");
      } else {
        mixpanel.track("User email stored in firebase!");

        // If email doesn't exist, store it in Firestore
        await setDoc(emailDocRef, {
          email: email,
        });
        // Set state indicating email stored successfully
        setEmailStoredSuccesfully(true);
      }
    } catch (error) {
      // Handle any errors that occur during Firebase operations
      console.error("Error handling email:", error);
      // Optionally, show an error message to the user
    }
  };
  return (
    <div>
      {!emailStoredSuccesfully && (
        <div>
          <div className={styles.joinWaitlistText}>
            Join the waitlist for Early Access
          </div>{" "}
          <div className={styles.emailContainer}>
            <p className={styles.emailText}>Email</p>
            <input
              onChange={handleChangeEmail}
              type="text"
              placeholder="Enter your email"
              value={email}
              //   autoComplete="off"
              className={cx(styles.inputAmount, {
                [styles.inputAmountMob]: isMobile,
              })}
            />
          </div>
        </div>
      )}
      {errorForEmail && <p className={styles.error}>{errorForEmail}</p>}
      {emailStoredSuccesfully && (
        <p className={styles.succesfullMessage}>
          Great! You will be the first ones to know when we launch the app.
        </p>
      )}
      <div className={styles.buttonContainer}>
        {/* {emailStoredSuccesfully && ( */}
        <ButtonRade
          onClick={handleClickCloseButton}
          customStyling={cx(styles.cancelButton, {
            [styles.cancelButtonMob]: isMobile,
          })}
        >
          {!emailStoredSuccesfully ? <>Cancel</> : <>Close</>}
        </ButtonRade>
        {/* )} */}
        {!emailStoredSuccesfully && (
          <ButtonRade
            onClick={handleClickConfirm}
            customStyling={cx(styles.confirmButton, {
              [styles.confirmButtonMob]: isMobile,
            })}
          >
            Submit
          </ButtonRade>
        )}
      </div>
    </div>
  );
};

export default JoinWaitListEmailFetching;
