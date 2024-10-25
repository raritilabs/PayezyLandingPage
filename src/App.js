import React, { useState, useEffect } from "react";
import cx from "classnames";
import { useMediaQuery } from "react-responsive";
import SendINRLandingPage from "./pages/SendINRLandingPage/SendINRLandingPage";
import { AppContext } from "./context";
import Header from "./components/header/header";
import styles from "./styles/app.module.scss";
import mixpanel from "mixpanel-browser";
import { Helmet } from "react-helmet";
mixpanel.init(process.env.REACT_APP_MIXPANEL_API, {
  debug: true,
});
function App() {
  // Stripe Integration
  const [usdToInrExRate, setUsdToInrExRate] = useState(null); // Stripe Promise from stripe server
  const [amountInUSD, setAmountInUSD] = useState(null); // State to store amount in USD
  const [amountInINR, setAmountInINR] = useState(null); // State to store amount in INR
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
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Payezy - The easiest, cheapest, and safest way to support your friends and family back home."
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* You can add more meta tags or change existing ones as needed */}
        <title>Payezy</title>
      </Helmet>
      <AppContext.Provider
        value={{
          isMobile,
        }}
      >
        <div
          className={cx(styles.headerContainer, {
            [styles.headerContainerMob]: isMobile,
          })}
        >
          {" "}
          <Header />
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
            <SendINRLandingPage
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
