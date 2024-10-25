import React from "react";
import { useContext, useState } from "react";
import { AppContext } from "../../context";
import styles from "./index.module.scss";
import PayezyMarketing from "../PayezyMarketing/PayezyMarketing";
import ExchangeRateDisplay from "../ExchangeRateDisplay/ExchangeRateDisplay";
import JoinWaitlistSection from "../JoinWaitlistSection/JoinWaitlistSection";
import WhyPayezy from "../WhyPayezy/WhyPayezy";
import SimpleWayToSendMoney from "../SimpleWayToSendMoney/SimpleWayToSendMoney";
import FAQSection from "../FAQSection/FAQSection";
import Footer from "../Footer/Footer";
import backgroundLeftImage from "../../assets/backGroundSectionOneLeft.svg";
import backgroundRightSectionOneMob from "../../assets/backgroundRightSectionOneMob.svg";
import BestInMarket from "../BestInMarket/BestInMarket";
const SendINRLandingPage = ({
  setAmountInUSD,
  amountInUSD,
  amountInINR,
  setAmountInINR,
  usdToInrExRate,
}) => {
  const [errorForLogin, setErrorForLogin] = useState(false); //state for storing login error
  const [fetchingPrice, setFetchingPrice] = useState(null); //state for fetching USD price
  const [exchangeRateData, setExchangeRateData] = useState(null);
  const [transferFeeData, setTransferFeeData] = useState(null);

  const { isMobile } = useContext(AppContext);

  // Handles the change in the amount of USD input field
  const handleChageAmountInUSD = (e) => {
    setAmountInUSD(e.target.value);
    setErrorForLogin(false);
  };

  return (
    <div>
      <div className={styles.sendINRLandingPageContainer}>
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
        <ExchangeRateDisplay
          handleChageAmountInUSD={handleChageAmountInUSD}
          fetchingPrice={fetchingPrice}
          errorForLogin={errorForLogin}
          setErrorForLogin={setErrorForLogin}
          amountInINR={amountInINR}
          usdToInrExRate={usdToInrExRate}
          amountInUSD={amountInUSD}
          setFetchingPrice={setFetchingPrice}
          setAmountInINR={setAmountInINR}
        />
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
      {/* {isMobile && (
        <img
          src={backgroundRightSectionOneMob}
          className={styles.backgroundLeftImageSimpleStyleSectionInMobile}
          alt="backgroundLeftImage"
        />
      )} */}
      <WhyPayezy
        exchangeRateData={exchangeRateData}
        transferFeeData={transferFeeData}
      />
      <BestInMarket
        usdToInrExRate={usdToInrExRate}
        exchangeRateData={exchangeRateData}
        setExchangeRateData={setExchangeRateData}
        transferFeeData={transferFeeData}
        setTransferFeeData={setTransferFeeData}
      />
      {!isMobile && (
        <img
          src={backgroundLeftImage}
          className={styles.backgroundLeftImageSimpleStyleSection}
          alt="backgroundLeftImage"
        />
      )}

      <SimpleWayToSendMoney />
      {/* {!isMobile && (
        <img
          src={backgroundLeftImage}
          className={styles.backgroundLeftImageSimpleStyleSectionInMobile}
          alt="backgroundLeftImage"
        />
      )} */}
      <FAQSection />
      <Footer />
    </div>
  );
};

export default SendINRLandingPage;
