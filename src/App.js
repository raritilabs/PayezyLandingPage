import React, { useState, useEffect } from "react";
import cx from "classnames";
import { useMediaQuery } from "react-responsive";
import SendINR from "./pages/SendINRLandingPage/SendINRLandingPage";
import { AppContext } from "./context";
import Header from "./components/header/header";
import styles from "./styles/app.module.scss";
import mixpanel from "mixpanel-browser";
mixpanel.init(process.env.REACT_APP_MIXPANEL_API, {
  debug: true,
});
function App() {
  // Stripe Integration
  const [usdToInrExRate, setUsdToInrExRate] = useState(null); // Stripe Promise from stripe server
  const [loading, setLoading] = useState(false); // Loading state
  const [googleLoginPageNumber, setGoogleLoginPageNumber] = useState(false); //state for storing login with google button click
  const [sendFlowPageNumber, setSendFlowPageNumber] = useState(0); //state for storing USD send flow
  const [onClickLoginButton, setOnClickLoginButton] = useState(false); //state for storing the onclick even of login button
  const [profileEmail, setProfileEmail] = useState(false); // State for profile email
  const [amountInUSD, setAmountInUSD] = useState(null); // State to store amount in USD
  const [amountInINR, setAmountInINR] = useState(null); // State to store amount in INR
  const [recipientAccountID, setRecipientAccountID] = useState(false); // State to recipient account ID
  const [strId, setStrId] = useState(null); //state to store the stripe id
  const [txId, setTxId] = useState(""); //state to store the transaction id
  const [sessionId, setSessionId] = useState(null); //state to store the session id
  const [transferHistoryData, setTranferHistoryData] = useState([]); //  state for storing transfer history data
  // State for setting the kyc flow page number
  const [KYCPageNumber, setKYCPageNumber] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 992px)" }); //Variable for mobile view

  useEffect(() => {
    const startTime = Date.now();

    // Track user entrance event
    mixpanel.track("Site Visit", { time: startTime });

    // Track user exit event (could be in a cleanup function when component unmounts)
  }, []);
  //Fetch USD to INR exchange rate
  useEffect(() => {
    const getUSDINRRate = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        console.log("calling rate api");

        const response = await fetch(
          process.env.REACT_APP_PAYEZY_SERVER_URI + "/get-usdinr-rate",
          requestOptions
        );

        const { UsdToInr } = await response.json();
        setUsdToInrExRate(UsdToInr);
      } catch (error) {
        console.error("Error fetching USD to INR rate:", error);
      }
    };

    getUSDINRRate();
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          isMobile,
          sendFlowPageNumber,
          setSendFlowPageNumber,
          googleLoginPageNumber,
          setGoogleLoginPageNumber,
          setOnClickLoginButton,
          loading,
          setLoading,
          profileEmail,
          recipientAccountID,
          setRecipientAccountID,
          strId,
          setStrId,
          sessionId,
          setSessionId,
          txId,
          setTxId,
          KYCPageNumber,
          setKYCPageNumber,
          transferHistoryData,
          setTranferHistoryData,
        }}
      >
        <div
          className={cx(styles.headerContainer, {
            [styles.headerContainerMob]: isMobile,
          })}
        >
          {" "}
          <Header
            profileEmail={profileEmail}
            setProfileEmail={setProfileEmail}
            setGoogleLoginPageNumber={setGoogleLoginPageNumber}
            googleLoginPageNumber={googleLoginPageNumber}
            setOnClickLoginButton={setOnClickLoginButton}
            setAmountInINR={setAmountInINR}
            setAmountInUSD={setAmountInINR}
            setSendFlowPageNumber={setSendFlowPageNumber}
          />
        </div>

        <div
          className={cx(styles.mainContentDiv, {
            [styles.mainContentDivMob]: isMobile,
          })}
        >
          <div
            className={cx(styles.layoutDiv, {
              [styles.layoutDivMob]: isMobile,
            })}
          >
            {" "}
            <SendINR
              profileEmail={profileEmail}
              setGoogleLoginPageNumber={setGoogleLoginPageNumber}
              setAmountInUSD={setAmountInUSD}
              amountInUSD={amountInUSD}
              amountInINR={amountInINR}
              setAmountInINR={setAmountInINR}
              usdToInrExRate={usdToInrExRate}
            />
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
