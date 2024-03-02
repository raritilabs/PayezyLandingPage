import React, { useContext, useState, useEffect } from "react";
import ButtonRade from "../../components/RadeButtons";
import { SEND_ENUM } from "../../enums/sendEnum";
import cx from "classnames";
import { AppContext } from "../../context";
import styles from "./index.module.scss";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import thumbsUp from "../../assets/thumbsUp.png";
import AOS from "aos";
import "aos/dist/aos.css";
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

      if (emailDocSnapshot.exists()) {
        // If email already exists, set it to the email error state
        setErrorForEmail("Email already exists");
      } else {
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
      {emailStoredSuccesfully && (
        <div className={styles.imageConatiner}>
          {" "}
          <img
            src={thumbsUp}
            className={styles.thumbsUpIcon}
            alt="thums up"
            data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-duration="400"
            data-aos-easing="ease-in"
            data-aos-delay="200"
          />
        </div>
      )}
      {!emailStoredSuccesfully && (
        <div>
          <div className={styles.joinWaitlistText}>Join Waitlist</div>{" "}
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
      )}
      {errorForEmail && <p className={styles.error}>{errorForEmail}</p>}
      {emailStoredSuccesfully && (
        <p className={styles.succesfullMessage}>
          We have added you to our waiting list! We will let you know when it is
          ready.
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
