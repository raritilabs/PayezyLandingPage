import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios"; // Import axios
import styles from "./index.module.scss";
import { SEND_ENUM } from "../../enums/sendEnum";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { AppContext } from "../../context";
import PayezyIcon from "../../assets/PayezyIcon.svg";
import RemitlyIcon from "../../assets/RemitlyIcon.svg";
import WiselyIcon from "../../assets/WiseIcon.svg";
import ToolttipIcon from "../../assets/ToolTipIcon.svg";
import WesternUnionIcon from "../../assets/westernUnionImage.svg";
import AOS from "aos";
import downArrow from "../../assets/downArrow.svg";
import ofxIcon from "../../assets/ofxIcon.svg";
import Spinner from "../../components/Spinner/Spinner";

const BestInMarket = ({
  usdToInrExRate,
  exchangeRateData,
  setExchangeRateData,
  transferFeeData,
  setTransferFeeData,
}) => {
  const { isMobile } = useContext(AppContext);

  const featuresContainerRef = useRef(null);
  useEffect(() => {
    AOS.init({});
  }, []);

  const THOUSAND = 1000;
  const TWO_FIXED_TWO = 2;
  const PAYEZY_TRANSFER_FEE = 0.0;

  const renderTooltipPayezy = (props) => (
    <Tooltip {...props} className={styles.toolTipStyle}>
      Mid-market Rate
    </Tooltip>
  );
  const renderTooltipWesternUnion = (props) => (
    <Tooltip {...props} className={styles.toolTipStyle}>
      Less than Mid-Market Rate
    </Tooltip>
  );
  const renderTooltipWise = (props) => (
    <Tooltip {...props} className={styles.toolTipStyle}>
      Mid-Market Rate
    </Tooltip>
  );
  const renderTooltipRemitely = (props) => (
    <Tooltip {...props} className={styles.toolTipStyle}>
      Less than Mid-Market Rate
    </Tooltip>
  );
  const renderTooltipOfx = (props) => (
    <Tooltip {...props} className={styles.toolTipStyle}>
      Less than Mid-Market Rate
    </Tooltip>
  );
  const renderTooltipTrueRate = (props) => (
    <Tooltip {...props} className={styles.toolTipStyleTrueValue}>
      True Rate is the net exchange rate at which the beneficiary receives the
      value of a currency transfer (e.g., USD to INR), taking into account any
      fees, charges, or deductions. It reflects the true cost of the transaction
      for the recipient after all applied fees.
    </Tooltip>
  );
  //Function to calculate recipient gets
  function calculateRecipientGetsValue(exchangeRateData) {
    const fixedExchangeRateData =
      Number(exchangeRateData).toFixed(TWO_FIXED_TWO);
    const result = (fixedExchangeRateData * THOUSAND).toFixed(TWO_FIXED_TWO);
    return result;
  }
  //Function to calculate trur value
  function calculateTrueValue(exchangeRateData, totalCost) {
    const result = ((THOUSAND * exchangeRateData) / totalCost).toFixed(
      TWO_FIXED_TWO
    );
    return result;
  }

  //Function to calculate total cost
  function calculateTotalCost(transferFeeData) {
    const result = THOUSAND + transferFeeData;
    return result;
  }

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const copperxResponse = await axios.get(
          "https://proxy.cors.sh/https://copperx.io/api/comparisons",
          {
            params: {
              sendAmount: THOUSAND,
              sourceCurrency: "USD",
              targetCurrency: "INR",
            },
            headers: {
              "x-cors-api-key": process.env.REACT_APP_CORS_API_KEY,
            },
          }
        );
        const copperxData = copperxResponse.data.providers;
        // Fetch Wise exchange rate from Wise API
        const wiseResponse = await axios.get(
          "https://proxy.cors.sh/https://api.wise.com/v1/rates/live?source=USD&target=INR",
          {
            headers: {
              "x-cors-api-key": process.env.REACT_APP_CORS_API_KEY,
            },
          }
        );
        const wiseData = wiseResponse.data;
        // Fetch Remitly exchange rate from Remitly API
        const remitlyResponse = await axios.get(
          "https://proxy.cors.sh/https://api.remitly.io/v3/calculator/estimate?conduit=USA%3AUSD-IND%3AINR&anchor=SEND&amount=5000&purpose=OTHER&customer_segment=UNRECOGNIZED&strict_promo=false",
          {
            headers: {
              "x-cors-api-key": process.env.REACT_APP_CORS_API_KEY,
            },
          }
        );
        const remitlyData = remitlyResponse.data;
        // Fetch ofx exchange rate from ofx API
        const ofxResponse = await axios.get(
          "https://proxy.cors.sh/https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/USD/INR/1000",
          {
            headers: {
              "x-cors-api-key": process.env.REACT_APP_CORS_API_KEY,
            },
          }
        );
        const ofxData = ofxResponse.data;
        const westernUnion = copperxData.find(
          (provider) => provider.alias === "western-union"
        );
        const wise = copperxData.find((provider) => provider.alias === "wise");
        // Not using right now
        // const instarem = copperxData.find(
        //   (provider) => provider.alias === "instarem"
        // );
        setExchangeRateData({
          westernUnion: westernUnion?.quotes[0]?.rate,
          wise: wiseData.value,
          remitly: remitlyData.estimate.exchange_rate.base_rate,
          ofx: ofxData.CustomerRate,
          // instarem: instarem?.quotes[0]?.rate, // removed for now
        });
        setTransferFeeData({
          westernUnion: westernUnion?.quotes[0]?.fee,
          wise: wise?.quotes[0]?.fee,
          remitly: Number(remitlyData.estimate.fee.total_fee_amount),
          ofx: ofxData.Fee,
          // instarem: instarem?.quotes[0]?.fee, // removed for now
        });
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [THOUSAND]);

  if (!exchangeRateData || !transferFeeData) return <Spinner />;
  return (
    <>
      {!isMobile && (
        <>
          <div className={styles.whyPayezyContainer}>
            <div className={styles.whyPayezy}>{SEND_ENUM.bestInMarket}</div>
            <div className={styles.lineContainer}></div>
            <div className={styles.features}>{SEND_ENUM.comparison}</div>
          </div>
          <div className={styles.liveGoogleRate}>
            Live google rate: {usdToInrExRate} INR/USD
          </div>
        </>
      )}

      {!isMobile && (
        <div ref={featuresContainerRef} className={styles.featuresContainer}>
          {/* <AnimatedOnScroll animationIn="bounce" delay={1000}> */}

          <div className={styles.headerContainer}>
            <div className={styles.providerHeading}>{SEND_ENUM.provider}</div>
            <div className={styles.exchangeRateHeading}>
              {SEND_ENUM.exchangeRate}
              <br />
              <span className={styles.USDToINR}>{SEND_ENUM.USDToINR}</span>
            </div>
            <div className={styles.transferFeeHeading}>
              {SEND_ENUM.transferFee}
            </div>
            <div className={styles.transferFeeHeading}>
              {SEND_ENUM.totalCost}
            </div>
            <div className={styles.recipientGetsHeading}>
              {SEND_ENUM.recipientGets}
              <br />
              <span className={styles.USDToINR}>
                {SEND_ENUM.sendingThousand}
              </span>
            </div>
            <div className={styles.trueRateHeading}>
              {SEND_ENUM.trueRate}
              <OverlayTrigger placement="right" overlay={renderTooltipTrueRate}>
                <img
                  src={ToolttipIcon}
                  className={styles.toolTipIcon}
                  alt="Tooltip"
                />
              </OverlayTrigger>
              <br />
              <span className={styles.USDToINR}>Effective Mid-Market Rate</span>
            </div>
          </div>
          <div className={styles.payezyDetailsContainer}>
            <div className={styles.payezyIcon}>
              <img src={PayezyIcon} className={styles.payezyImages} />
            </div>
            <div className={styles.exchangeRateValuePayezy}>
              <div className={styles.valueAndTooltipPayezy}>
                ₹{" "}
                {usdToInrExRate
                  ? usdToInrExRate.toFixed(TWO_FIXED_TWO)
                  : "0.00"}
                <OverlayTrigger placement="right" overlay={renderTooltipPayezy}>
                  <img src={ToolttipIcon} className={styles.toolTipIcon} />
                </OverlayTrigger>
              </div>
            </div>
            <div className={styles.transferFeesPayezy}>
              <div className={styles.valueAndTooltipPayezy}>
                {" "}
                $ {PAYEZY_TRANSFER_FEE.toFixed(TWO_FIXED_TWO)}
              </div>
            </div>
            <div className={styles.transferFeesPayezy}>
              <div className={styles.valueAndTooltipPayezy}>
                {" "}
                ${" "}
                {calculateTotalCost(PAYEZY_TRANSFER_FEE).toFixed(TWO_FIXED_TWO)}
              </div>
            </div>
            <div className={styles.recipientGetsValuePayezy}>
              <div className={styles.valueAndTooltipPayezy}>
                ₹{" "}
                {usdToInrExRate
                  ? (usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE).toFixed(
                      TWO_FIXED_TWO
                    )
                  : "0.00"}
              </div>
            </div>
            <div className={styles.trueRateValuePayezy}>
              <div className={styles.valueAndTooltipPayezy}>
                ${" "}
                {usdToInrExRate
                  ? (
                      (usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE) /
                      THOUSAND
                    ).toFixed(TWO_FIXED_TWO)
                  : "0.00"}
              </div>
            </div>
          </div>
          <div className={styles.providerDetailsContainer}>
            <div className={styles.providerIcon}>
              <img
                src={WesternUnionIcon}
                className={styles.westernUnionImage}
              />
            </div>
            <div className={styles.providerExchangeRateValues}>
              ₹{" "}
              {exchangeRateData.westernUnion
                ? exchangeRateData.westernUnion.toFixed(TWO_FIXED_TWO)
                : "0.00"}
              <OverlayTrigger
                placement="right"
                overlay={renderTooltipWesternUnion}
              >
                <img src={ToolttipIcon} className={styles.toolTipIcon} />
              </OverlayTrigger>
            </div>
            <div className={styles.providerTransferFees}>
              ${" "}
              {transferFeeData.westernUnion
                ? transferFeeData.westernUnion.toFixed(TWO_FIXED_TWO)
                : "0.00"}
            </div>
            <div className={styles.providerTransferFees}>
              ${" "}
              {transferFeeData.westernUnion
                ? calculateTotalCost(transferFeeData.westernUnion)
                : "0.00"}
            </div>
            <div className={styles.providerRecipientGetsValues}>
              <div className={styles.recipientGets}>
                ₹{" "}
                {exchangeRateData.westernUnion
                  ? calculateRecipientGetsValue(exchangeRateData.westernUnion)
                  : "0.00"}
              </div>
              <div>
                <span className={styles.priceDifference}>
                  <img src={downArrow} className={styles.downArrow} alt="" />
                  {exchangeRateData.westernUnion && usdToInrExRate
                    ? (
                        calculateRecipientGetsValue(
                          exchangeRateData.westernUnion
                        ) -
                        (usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE)
                      ).toFixed(TWO_FIXED_TWO)
                    : "0.00"}
                </span>
              </div>
            </div>
            <div className={styles.providerTrueRateValues}>
              ${" "}
              {exchangeRateData.westernUnion && transferFeeData.westernUnion
                ? calculateTrueValue(
                    exchangeRateData.westernUnion,
                    calculateTotalCost(transferFeeData.westernUnion)
                  )
                : "0.00"}
            </div>
          </div>
          <div className={styles.providerDetailsContainer}>
            <div className={styles.providerIcon}>
              <img src={WiselyIcon} className={styles.wiseImage} />
            </div>
            <div className={styles.providerExchangeRateValues}>
              ₹{" "}
              {exchangeRateData.wise
                ? exchangeRateData.wise.toFixed(TWO_FIXED_TWO)
                : "0.00"}{" "}
              <OverlayTrigger placement="right" overlay={renderTooltipWise}>
                <img src={ToolttipIcon} className={styles.toolTipIcon} />
              </OverlayTrigger>
            </div>
            <div className={styles.providerTransferFees}>
              ${" "}
              {transferFeeData.wise
                ? transferFeeData.wise.toFixed(TWO_FIXED_TWO)
                : "0.00"}
            </div>
            <div className={styles.providerTransferFees}>
              ${" "}
              {transferFeeData.wise
                ? calculateTotalCost(transferFeeData.wise)
                : "0.00"}
            </div>
            <div className={styles.providerRecipientGetsValues}>
              <div className={styles.recipientGets}>
                ₹{" "}
                {exchangeRateData.wise
                  ? calculateRecipientGetsValue(exchangeRateData.wise)
                  : "0.00"}
              </div>
              <div>
                <span className={styles.priceDifference}>
                  <img src={downArrow} className={styles.downArrow} alt="" />
                  {exchangeRateData.wise && usdToInrExRate
                    ? (
                        calculateRecipientGetsValue(exchangeRateData.wise) -
                        (usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE)
                      ).toFixed(TWO_FIXED_TWO)
                    : "0.00"}
                </span>
              </div>
            </div>
            <div className={styles.providerTrueRateValues}>
              ${" "}
              {exchangeRateData.wise && transferFeeData.wise
                ? calculateTrueValue(
                    exchangeRateData.wise,
                    calculateTotalCost(transferFeeData.wise)
                  )
                : "0.00"}
            </div>
          </div>
          <div className={styles.providerDetailsContainer}>
            <div className={styles.providerIcon}>
              <img src={RemitlyIcon} className={styles.remitlyImage} />
            </div>
            <div className={styles.providerExchangeRateValues}>
              ₹ {exchangeRateData.remitly ? exchangeRateData.remitly : "0.00"}{" "}
              <OverlayTrigger placement="right" overlay={renderTooltipRemitely}>
                <img src={ToolttipIcon} className={styles.toolTipIcon} />
              </OverlayTrigger>
            </div>
            <div className={styles.providerTransferFees}>
              $ {transferFeeData.remitly ? transferFeeData.remitly : "0.00"}
            </div>
            <div className={styles.providerTransferFees}>
              ${" "}
              {calculateTotalCost(transferFeeData.remitly).toFixed(
                TWO_FIXED_TWO
              )}
            </div>
            <div className={styles.providerRecipientGetsValues}>
              <div className={styles.recipientGets}>
                ₹{" "}
                {exchangeRateData.remitly
                  ? calculateRecipientGetsValue(exchangeRateData.remitly)
                  : "0.00"}
              </div>
              <div>
                <span className={styles.priceDifference}>
                  <img src={downArrow} className={styles.downArrow} alt="" />
                  {exchangeRateData.remitly && usdToInrExRate
                    ? (
                        calculateRecipientGetsValue(exchangeRateData.remitly) -
                        (usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE)
                      ).toFixed(TWO_FIXED_TWO)
                    : "0.00"}
                </span>
              </div>
            </div>
            <div className={styles.providerTrueRateValues}>
              ${" "}
              {exchangeRateData.remitly
                ? calculateTrueValue(
                    exchangeRateData.remitly,
                    calculateTotalCost(transferFeeData.remitly)
                  )
                : "0.00"}
            </div>
          </div>
          <div className={styles.providerDetailsContainer}>
            <div className={styles.providerIcon}>
              <img src={ofxIcon} className={styles.ofxIcon} />
            </div>
            <div className={styles.providerExchangeRateValues}>
              ₹{" "}
              {exchangeRateData.ofx
                ? exchangeRateData.ofx.toFixed(TWO_FIXED_TWO)
                : "0.00"}{" "}
              <OverlayTrigger placement="right" overlay={renderTooltipRemitely}>
                <img src={ToolttipIcon} className={styles.toolTipIcon} />
              </OverlayTrigger>
            </div>
            <div className={styles.providerTransferFees}>
              ${" "}
              {transferFeeData.ofx
                ? transferFeeData.ofx.toFixed(TWO_FIXED_TWO)
                : "0.00"}
            </div>
            <div className={styles.providerTransferFees}>
              $ {calculateTotalCost(transferFeeData.ofx).toFixed(TWO_FIXED_TWO)}
            </div>
            <div className={styles.providerRecipientGetsValues}>
              <div className={styles.recipientGets}>
                ₹{" "}
                {exchangeRateData.ofx
                  ? calculateRecipientGetsValue(exchangeRateData.ofx)
                  : "0.00"}
              </div>
              <div>
                <span className={styles.priceDifference}>
                  <img src={downArrow} className={styles.downArrow} alt="" />
                  {exchangeRateData.ofx && usdToInrExRate
                    ? (
                        calculateRecipientGetsValue(exchangeRateData.ofx) -
                        (usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE)
                      ).toFixed(TWO_FIXED_TWO)
                    : "0.00"}
                </span>
              </div>
            </div>
            <div className={styles.providerTrueRateValues}>
              ${" "}
              {exchangeRateData.ofx
                ? calculateTrueValue(
                    exchangeRateData.ofx,
                    calculateTotalCost(transferFeeData.ofx)
                  )
                : "0.00"}
            </div>
          </div>
          {/* TODO: to be implemented later */}
          {/* <div className={styles.providerDetailsContainer}>
            <div className={styles.providerIcon}>
              <img src={InstaremIcon} className={styles.images} />
            </div>
            <div className={styles.providerExchangeRateValues}>
              ₹ {exchangeRateData.instarem.toFixed(TWO_FIXED_TWO)}{" "}
              <OverlayTrigger placement="right" overlay={renderTooltipInstarem}>
                <img src={ToolttipIcon} className={styles.toolTipIcon} />
              </OverlayTrigger>
            </div>
            <div className={styles.providerTransferFees}>
              ${" "}
              {transferFeeData.instarem
                ? transferFeeData.instarem.toFixed(TWO_FIXED_TWO)
                : "0.00"}
            </div>
            <div className={styles.providerRecipientGetsValues}>
              <div className={styles.recipientGets}>
                ₹{" "}
                {calculateRecipientGetsValue(
                  exchangeRateData.instarem,
                  transferFeeData.instarem
                )}
              </div>
              <div>
                <span className={styles.priceDifference}>
                  <img src={downArrow} className={styles.downArrow} alt="" /> -
                  {(
                    usdToInrExRate * THOUSAND -
                    PAYEZY_TRANSFER_FEE -
                    calculateRecipientGetsValue(
                      exchangeRateData.instarem,
                      transferFeeData.instarem
                    )
                  ).toFixed(TWO_FIXED_TWO)}
                </span>
              </div>
            </div>
            <div className={styles.providerTrueRateValues}>
              ${" "}
              {calculateTrueValue(
                exchangeRateData.instarem,
                transferFeeData.instarem
              )}
            </div>
          </div> */}
        </div>
      )}
      {isMobile && (
        <>
          <div className={styles.whyPayezyContainer}>
            <div className={styles.whyPayezyMob}>{SEND_ENUM.bestInMarket}</div>

            <div className={styles.comparisonMob}>{SEND_ENUM.comparison}</div>
            <div className={styles.liveGoogleRateMob}>
              Live google rate: 
              {usdToInrExRate
                ? usdToInrExRate.toFixed(TWO_FIXED_TWO)
                : "0.00"}{" "}
              INR/USD
            </div>
          </div>
          <div className={styles.priceComaprisonContainer}>
            {" "}
            <div className={styles.priceComparisonMainContainer}>
              <div className={styles.payezyImageMobContainer}>
                <img src={PayezyIcon} className={styles.payezyImageMob} />
              </div>
              <div className={styles.priceComparisonSubContainer}>
                <div>
                  <div>
                    <div>
                      <div className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </div>
                      <div className={styles.exchangeRateInMob}>
                        ₹{" "}
                        {usdToInrExRate
                          ? usdToInrExRate.toFixed(TWO_FIXED_TWO)
                          : "0.00"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipPayezy}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.totalCost}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateInMob}>
                        ${" "}
                        {calculateTotalCost(PAYEZY_TRANSFER_FEE).toFixed(
                          TWO_FIXED_TWO
                        )}
                      </div>
                      <div className={styles.trueRateInMob}>
                        True Rate{" "}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipTrueRate}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIcon}
                          />
                        </OverlayTrigger>
                      </div>
                      <div className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </div>
                      <div className={styles.exchangeRateInMob}>
                        ${" "}
                        {usdToInrExRate
                          ? usdToInrExRate.toFixed(TWO_FIXED_TWO)
                          : "0.00"}{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <div className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </div>
                      <div className={styles.exchangeRateInMob}>
                        $ {PAYEZY_TRANSFER_FEE.toFixed(TWO_FIXED_TWO)}
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateInMob}>
                        ₹{" "}
                        {usdToInrExRate
                          ? (
                              usdToInrExRate * THOUSAND -
                              PAYEZY_TRANSFER_FEE
                            ).toFixed(TWO_FIXED_TWO)
                          : "0.00"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceComparisonMainContainer}>
              <div className={styles.payezyImageMobContainer}>
                <img
                  src={WesternUnionIcon}
                  className={styles.westernUnionImageMob}
                />
              </div>
              <div className={styles.priceComparisonSubContainer}>
                <div>
                  <div>
                    <div>
                      <div className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.westernUnion
                          ? exchangeRateData.westernUnion.toFixed(TWO_FIXED_TWO)
                          : "0.00"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipWesternUnion}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.totalCost}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTotalCost(
                          transferFeeData.westernUnion
                        ).toFixed(TWO_FIXED_TWO)}
                      </div>
                      <div className={styles.trueRateInMob}>True Rate</div>
                      <div className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {exchangeRateData.westernUnion &&
                        transferFeeData.westernUnion
                          ? calculateTrueValue(
                              exchangeRateData.westernUnion,
                              calculateTotalCost(transferFeeData.westernUnion)
                            )
                          : "0.00"}{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <div className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </div>

                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {transferFeeData.westernUnion
                          ? transferFeeData.westernUnion.toFixed(TWO_FIXED_TWO)
                          : "0.00"}
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.westernUnion
                          ? calculateRecipientGetsValue(
                              exchangeRateData.westernUnion
                            )
                          : "0.00"}
                      </div>
                    </div>
                    <span className={styles.priceDifferenceInMob}>
                      <img
                        src={downArrow}
                        className={styles.downArrow}
                        alt=""
                      />{" "}
                      {exchangeRateData.westernUnion
                        ? (
                            calculateRecipientGetsValue(
                              exchangeRateData.westernUnion
                            ) -
                            (usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE)
                          ).toFixed(TWO_FIXED_TWO)
                        : "0.00"}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceComparisonMainContainer}>
              <div className={styles.payezyImageMobContainer}>
                <img src={WiselyIcon} className={styles.wiseLyImageMob} />
              </div>
              <div className={styles.priceComparisonSubContainer}>
                <div>
                  <div>
                    <div>
                      <div className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.wise
                          ? exchangeRateData.wise.toFixed(TWO_FIXED_TWO)
                          : "0.00"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipWise}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.totalCost}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTotalCost(transferFeeData.wise).toFixed(
                          TWO_FIXED_TWO
                        )}
                      </div>
                      <div className={styles.trueRateInMob}>True Rate</div>
                      <div className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {exchangeRateData.wise && transferFeeData.wise
                          ? calculateTrueValue(
                              exchangeRateData.wise,
                              calculateTotalCost(transferFeeData.wise)
                            )
                          : "0.00"}{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <div className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </div>

                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {transferFeeData.wise
                          ? transferFeeData.wise.toFixed(TWO_FIXED_TWO)
                          : "0.00"}
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.wise
                          ? calculateRecipientGetsValue(exchangeRateData.wise)
                          : "0.00"}
                      </div>
                    </div>
                    <span className={styles.priceDifferenceInMob}>
                      <img
                        src={downArrow}
                        className={styles.downArrow}
                        alt=""
                      />{" "}
                      {exchangeRateData.wise
                        ? (
                            calculateRecipientGetsValue(exchangeRateData.wise) -
                            (usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE)
                          ).toFixed(TWO_FIXED_TWO)
                        : "0.00"}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceComparisonMainContainer}>
              <div className={styles.payezyImageMobContainer}>
                <img src={RemitlyIcon} className={styles.remitlyIconMob} />
              </div>
              <div className={styles.priceComparisonSubContainer}>
                <div>
                  <div>
                    <div>
                      <div className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.remitly
                          ? exchangeRateData.remitly
                          : "0.00"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipRemitely}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.totalCost}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTotalCost(transferFeeData.remitly).toFixed(
                          TWO_FIXED_TWO
                        )}
                      </div>
                      <div className={styles.trueRateInMob}>True Rate</div>
                      <div className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {exchangeRateData.remitly
                          ? calculateTrueValue(
                              exchangeRateData.remitly,
                              calculateTotalCost(transferFeeData.remitly)
                            )
                          : "0.00"}{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <div className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </div>

                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {transferFeeData.remitly
                          ? transferFeeData.remitly.toFixed(TWO_FIXED_TWO)
                          : "0.00"}
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.remitly
                          ? calculateRecipientGetsValue(exchangeRateData.wise)
                          : "0.00"}
                      </div>
                    </div>
                    <span className={styles.priceDifferenceInMob}>
                      <img
                        src={downArrow}
                        className={styles.downArrow}
                        alt=""
                      />{" "}
                      {exchangeRateData.remitly
                        ? (
                            calculateRecipientGetsValue(
                              exchangeRateData.remitly
                            ) -
                            (usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE)
                          ).toFixed(TWO_FIXED_TWO)
                        : "0.00"}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceComparisonMainContainer}>
              <div className={styles.payezyImageMobContainer}>
                <img src={ofxIcon} className={styles.ofxIconMob} />
              </div>
              <div className={styles.priceComparisonSubContainerInstarem}>
                <div>
                  <div>
                    <div>
                      <div className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.ofx
                          ? exchangeRateData.ofx.toFixed(TWO_FIXED_TWO)
                          : "0.00"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipOfx}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.totalCost}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTotalCost(transferFeeData.ofx).toFixed(
                          TWO_FIXED_TWO
                        )}
                      </div>
                      <div className={styles.trueRateInMob}>True Rate</div>
                      <div className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {exchangeRateData.ofx
                          ? calculateTrueValue(
                              exchangeRateData.ofx,
                              calculateTotalCost(transferFeeData.ofx)
                            )
                          : "0.00"}{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <div className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </div>

                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {transferFeeData.ofx
                          ? transferFeeData.ofx.toFixed(TWO_FIXED_TWO)
                          : "0.00"}
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.ofx
                          ? calculateRecipientGetsValue(exchangeRateData.ofx)
                          : "0.00"}
                      </div>
                    </div>
                    <span className={styles.priceDifferenceInMob}>
                      <img
                        src={downArrow}
                        className={styles.downArrow}
                        alt=""
                      />{" "}
                      {exchangeRateData.ofx
                        ? (
                            calculateRecipientGetsValue(exchangeRateData.ofx) -
                            (usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE)
                          ).toFixed(TWO_FIXED_TWO)
                        : "0.00"}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* TODO: to be implemented later */}
            {/* <div className={styles.priceComparisonMainContainer}>
              <div className={styles.payezyImageMobContainer}>
                <img src={InstaremIcon} className={styles.wiseLyImageMob} />
              </div>
              <div className={styles.priceComparisonSubContainerInstarem}>
                <div>
                  <div>
                    <div>
                      <div className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.instarem
                          ? exchangeRateData.instarem.toFixed(TWO_FIXED_TWO)
                          : "-"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipInstarem}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {calculateRecipientGetsValue(
                          exchangeRateData.instarem,
                          transferFeeData.instarem
                        )}
                        <span className={styles.priceDifferenceInMob}>
                          <img
                            src={downArrow}
                            className={styles.downArrow}
                            alt=""
                          />{" "}
                          -
                          {(
                            usdToInrExRate * THOUSAND -
                            PAYEZY_TRANSFER_FEE -
                            calculateRecipientGetsValue(
                              exchangeRateData.instarem,
                              transferFeeData.instarem
                            )
                          ).toFixed(TWO_FIXED_TWO)}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <div className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </div>

                      <div className={styles.exchangeRateNotPayezyInMob}>
                        $ {transferFeeData.instarem.toFixed(TWO_FIXED_TWO)}
                      </div>
                      <div className={styles.trueRateInMob}>
                        True Rate{" "}
                        <OverlayTrigger
                          placement="left"
                          overlay={renderTooltipTruRate}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIcon}
                          />
                        </OverlayTrigger>
                      </div>
                      <div className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTrueValue(
                          exchangeRateData.instarem,
                          transferFeeData.instarem
                        )}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default BestInMarket;
