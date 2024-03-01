import React from "react";
import cx from "classnames";
import { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { getDoc, doc, collection } from "firebase/firestore";
import { AppContext } from "../../context";
import Card from "../../components/Card/Card";
import { SEND_ENUM } from "../../enums/sendEnum";
import { db, auth } from "../../firebase";
import styles from "./index.module.scss";
import SendINR from "../SendINR/SendINR";
import PayezyMarketing from "../PayezyMarketing/PayezyMarketing";
import ExchangeRateDisplay from "../ExchangeRateDisplay/ExchangeRateDisplay";
import JoinWaitlistSection from "../JoinWaitlistSection/JoinWaitlistSection";
import WhyPayezy from "../WhyPayezy/WhyPayezy";
import SimpleWayToSendMoney from "../SimpleWayToSendMoney/SimpleWayToSendMoney";
import FAQSection from "../FAQSection/FAQSection";
import Footer from "../Footer/Footer";
import backgroundLeftImage from "../../assets/backGroundSectionOneLeft.svg";
import backgroundRightSectionOneMob from "../../assets/backgroundRightSectionOneMob.svg";
const SendINRLandingPage = ({
  profileEmail,
  setAmountInUSD,
  amountInUSD,
  amountInINR,
  setAmountInINR,
  usdToInrExRate,
}) => {
  const [errorForLogin, setErrorForLogin] = useState(false); //state for storing login error
  const [fetchingPrice, setFetchingPrice] = useState(null); //state for fetching USD price
  const [treasuryBalance, setTreasuryBalance] = useState(null); //state for storing treasury balance
  const [modalIsOpen, setModalIsOpen] = useState(false); // state for opening the modal

  const [paymentType, setPaymentType] = useState(SEND_ENUM.bankTransfer); //state that stored payment type
  const MAX_ALLOWED_TRANSFER = 2000; //varibale that store maximum allowed tranfer
  const MIN_ALLOWED_TRANSFER = 10; //varibale that store minimum allowed tranfer
  const {
    isMobile,
    setSendFlowPageNumber,
    sendFlowPageNumber,
    setGoogleLoginPageNumber,
    setOnClickLoginButton,
  } = useContext(AppContext);
  //Fetch the treasury balance in INR
  useEffect(() => {
    const getTreasuryBalance = async () => {
      try {
        // Obtain ID token
        const idToken = await auth.currentUser.getIdToken(
          /* forceRefresh */ true
        );
        var requestOptions = {
          method: "GET",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`, // Include the ID token in the headers
          },
        };

        const response = await fetch(
          process.env.REACT_APP_PAYEZY_SERVER_URI + `/get-inr-treasury-balance`,
          requestOptions
        );

        const result = await response.json();
        setTreasuryBalance(result.balanceAmount / 10 ** result.balanceDecimals);
      } catch (error) {
        console.log("Error fetching treasury balance:", error);
      }
    };

    if (auth.currentUser) {
      getTreasuryBalance();
    } else {
      console.log("No authenticated user");
    }
  }, [auth.currentUser]);

  // Handles the click on the Proceed button
  const handleClickProceedButton = async () => {
    console.log("button cliked");
    // Check if required fields are filled and amount is valid
    if (!profileEmail && amountInUSD && amountInUSD >= MIN_ALLOWED_TRANSFER) {
      // Proceed to the next page in the Google login flow
      setGoogleLoginPageNumber(0);
      setOnClickLoginButton(true);
    } else if (!amountInUSD) {
      // Show an error message if the user did not enter a valid amount of USD
      setErrorForLogin("Please enter a valid amount of USD to continue");
    } else if (amountInUSD < MIN_ALLOWED_TRANSFER) {
      // Show an error message if the amount is less than the minimum required ($100)
      setErrorForLogin("Only orders with a minimum of $10 will be processed.");
    } else if (amountInINR > treasuryBalance) {
      // Show an error message if the server is under maintenance or not available
      setErrorForLogin("Error: Server in maintenance. Please try again later.");
    } else if (amountInUSD > MAX_ALLOWED_TRANSFER) {
      // Show an error message if the amount exceeds the maximum allowed transfer ($1000)
      setErrorForLogin("Maximum allowed transfer is 1000 USD");
    } else {
      // Query the document to retrieve KYCStatus
      const usersRef = collection(db, "userData");
      const userDocRef = doc(usersRef, profileEmail);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // If the user data exists, check their KYC status
        const userData = userDocSnapshot.data();
        const kYCStatus = userData.KYCStatus;
        if (kYCStatus === "Verified") {
          // If KYC status is "Verified," proceed to the send flow
          setSendFlowPageNumber(1);
        } else {
          // If KYC status is not "Verified," open a modal for further actions
          setModalIsOpen(true);
        }
      } else {
        // If user data doesn't exist, open a modal for further actions
        setModalIsOpen(true);
      }
    }
  };
  // Handles the change in the amount of USD input field
  const handleChageAmountInUSD = (e) => {
    setAmountInUSD(e.target.value);
    setErrorForLogin(false);
  };
  // Function to handle payment type options
  const handleClickPaymentMethod = (paymentType) => {
    setPaymentType(paymentType);
  };
  // Renders the components based on the sendFlowPageNumber
  const renderComponents = () => {
    return (
      <div
        className={cx(styles.routesContainer, {
          [styles.routesContainerMob]: isMobile,
        })}
      >
        {" "}
        <Card titleComponent={<CardTitle />}> {CardBody()} </Card>{" "}
      </div>
    );
  };

  const CardTitle = () => (
    <>
      <div className={styles.processPaymentVia}>Process payment via</div>
      <div
        className={cx(styles.enterAmountOfUSDWishToSend, {
          [styles.enterAmountOfUSDWishToSendMob]: isMobile,
        })}
      >
        <div
          onClick={() => handleClickPaymentMethod(SEND_ENUM.bankTransfer)}
          className={cx(styles.commonOptionBankTranfer, {
            [styles.selectedOptionBankTranfer]:
              paymentType === SEND_ENUM.bankTransfer,
          })}
        >
          {SEND_ENUM.bankTransfer}
        </div>
        <div
          onClick={() => handleClickPaymentMethod(SEND_ENUM.cardPayment)}
          className={cx(styles.commonOptionCardPayment, {
            [styles.selectedOptionCardPayment]:
              paymentType === SEND_ENUM.cardPayment,
          })}
        >
          {SEND_ENUM.cardPayment}
        </div>
      </div>
    </>
  );

  const CardBody = () => (
    <>
      {" "}
      <SendINR
        treasuryBalance={treasuryBalance}
        handleChageAmountInUSD={handleChageAmountInUSD}
        fetchingPrice={fetchingPrice}
        errorForLogin={errorForLogin}
        handleClickProceedButton={handleClickProceedButton}
        amountInINR={amountInINR}
        usdToInrExRate={usdToInrExRate}
        amountInUSD={amountInUSD}
        paymentType={paymentType}
        setFetchingPrice={setFetchingPrice}
        setAmountInINR={setAmountInINR}
      />
    </>
  );

  return (
    <div>
      <div className={styles.sendINRLandingPageContainer}>
        {sendFlowPageNumber !== 1 && sendFlowPageNumber !== 2 && (
          <div className={styles.payezyMarketingContainer}>
            {!isMobile && (
              <img
                src={backgroundLeftImage}
                className={styles.backgroundLeftImage}
                alt="backgroundLeftImage"
              />
            )}
            {isMobile && (
              <img
                src={backgroundRightSectionOneMob}
                className={styles.backgroundLeftImageInMobile}
                alt="backgroundLeftImage"
              />
            )}
            <PayezyMarketing />
          </div>
        )}
        {profileEmail ? (
          renderComponents()
        ) : (
          <>
            {" "}
            <ExchangeRateDisplay
              treasuryBalance={treasuryBalance}
              handleChageAmountInUSD={handleChageAmountInUSD}
              fetchingPrice={fetchingPrice}
              errorForLogin={errorForLogin}
              handleClickProceedButton={handleClickProceedButton}
              amountInINR={amountInINR}
              usdToInrExRate={usdToInrExRate}
              amountInUSD={amountInUSD}
              paymentType={paymentType}
              setFetchingPrice={setFetchingPrice}
              setAmountInINR={setAmountInINR}
            />
          </>
        )}
      </div>
      {/* {!isMobile && (
        // <div class={styles.RighSideBackgroundSectionOne}></div>
        <img
          src={backgroundLeftImage}
          className={styles.RighSideBackgroundSectionOne}
          alt="backgroundLeftImage"
        />
      )} */}
      {/* {isMobile && (
        // <div class={styles.RighSideBackgroundSectionOne}></div>
        <img
          src={backgroundLeftImage}
          className={styles.RighSideBackgroundSectionOneInMobile}
          alt="backgroundLeftImage"
        />
      )} */}
      <JoinWaitlistSection />
      {isMobile && (
        <img
          src={backgroundRightSectionOneMob}
          className={styles.backgroundLeftImageSimpleStyleSectionInMobile}
          alt="backgroundLeftImage"
        />
      )}
      <WhyPayezy />
      {!isMobile && (
        <img
          src={backgroundLeftImage}
          className={styles.backgroundLeftImageSimpleStyleSection}
          alt="backgroundLeftImage"
        />
      )}

      <SimpleWayToSendMoney />
      {!isMobile && (
        <img
          src={backgroundLeftImage}
          className={styles.backgroundLeftImageSimpleStyleSectionInMobile}
          alt="backgroundLeftImage"
        />
      )}
      <FAQSection />
      <Footer />
    </div>
  );
};

export default SendINRLandingPage;
