import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios"; // Import axios
import styles from "./index.module.scss";
import { SEND_ENUM } from "../../enums/sendEnum";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { AppContext } from "../../context";
import PayezyIcon from "../../assets/PayezyIcon.svg";
import InstaramIcon from "../../assets/InstaramIcon.svg";
import RemitlyIcon from "../../assets/RemitlyIcon.svg";
import WiselyIcon from "../../assets/WiseIcon.svg";
import XoomIcon from "../../assets/XoomIcon.svg";
import ToolttipIcon from "../../assets/ToolTipIcon.svg";
import WesternUnionIcon from "../../assets/westernUnionImage.svg";
import AOS from "aos";
import downArrow from "../../assets/downArrow.svg";
const BestInMarket = ({ usdToInrExRate }) => {
  const { isMobile } = useContext(AppContext);

  const featuresContainerRef = useRef(null);
  useEffect(() => {
    AOS.init({});
  }, []);

  const [exchangeRateData, setExchangeRateData] = useState(null);
  const [transferFeeData, setTransferFeeData] = useState(null);
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
  const renderTooltipXoom = (props) => (
    <Tooltip {...props} className={styles.toolTipStyle}>
      Very Less than Mid-Market Rate
    </Tooltip>
  );
  const renderTooltipInstarem = (props) => (
    <Tooltip {...props} className={styles.toolTipStyle}>
      Less than Mid-Market Rate
    </Tooltip>
  );
  const renderTooltipTruRate = (props) => (
    <Tooltip {...props} className={styles.toolTipStyleTrueValue}>
      True Rate is the net exchange rate at which the beneficiary receives the
      value of a currency transfer (e.g., USD to INR), taking into account any
      fees, charges, or deductions. It reflects the true cost of the transaction
      for the recipient after all applied fees.
    </Tooltip>
  );
  //Function to calculate recipient gets
  function calculateRecipientGetsValue(exchangeRateData, transferFeeData) {
    const result = exchangeRateData * (THOUSAND - transferFeeData);
    return result.toFixed(TWO_FIXED_TWO);
  }
  //Function to calculate trur value
  function calculateTrueValue(exchangeRateData, transferFeeData) {
    const result = (
      (exchangeRateData * (THOUSAND - transferFeeData)) /
      THOUSAND
    ).toFixed(TWO_FIXED_TWO);
    return result;
  }
  const providers = ["westernUnion", "wise", "remitly", "xoom", "instaram"];

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
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

        const data = response.data;
        setExchangeRateData({
          westernUnion: data.providers[0].quotes[0].rate,
          wise: data.providers[12].quotes[0].rate,
          remitly: data.providers[2].quotes[0].rate,
          xoom: data.providers[10].quotes[0].rate,
          instaram: data.providers[13].quotes[0].rate,
        });
        setTransferFeeData({
          westernUnion: data.providers[0].quotes[0].fee,
          wise: data.providers[12].quotes[0].fee,
          remitly: data.providers[2].quotes[0].fee,
          xoom: data.providers[10].quotes[0].fee,
          instaram: data.providers[13].quotes[0].fee,
        });
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [THOUSAND]);

  if (!exchangeRateData && !transferFeeData) return <div>Loading...</div>;
  return (
    <>
      {!isMobile && (
        <div className={styles.whyPayezyContainer}>
          <div className={styles.whyPayezy}>{SEND_ENUM.bestInMarket}</div>
          <div className={styles.lineContainer}></div>
          <div className={styles.features}>{SEND_ENUM.comparison}</div>
        </div>
      )}

      {!isMobile && (
        <div ref={featuresContainerRef} className={styles.feauturesContainer}>
          {/* <AnimatedOnScroll animationIn="bounce" delay={1000}> */}
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer1}`}
          >
            <div className={styles.providerContainer}>
              <div className={styles.heading}>{SEND_ENUM.provider}</div>

              <div>
                <img src={PayezyIcon} className={styles.payezyImages} />
              </div>
              <div>
                <img src={WesternUnionIcon} className={styles.wiseImage} />
              </div>
              <div>
                <img src={WiselyIcon} className={styles.wiseImage} />
              </div>
              <div>
                <img src={RemitlyIcon} className={styles.remitlyImage} />
              </div>
              <div>
                <img src={XoomIcon} className={styles.xoomIcon} />
              </div>
              <div>
                <img src={InstaramIcon} className={styles.images} />
              </div>
            </div>
          </div>
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer1}`}
          >
            <div className={styles.exchangeRateContainer}>
              <div className={styles.heading}>
                {SEND_ENUM.exchangeRate}
                <br />
                <span className={styles.USDToINR}>{SEND_ENUM.USDToINR}</span>
              </div>

              <div className={styles.exchangeRateValuesPayezy}>
                <p>
                  ₹{" "}
                  {usdToInrExRate ? usdToInrExRate.toFixed(TWO_FIXED_TWO) : "0"}
                  <OverlayTrigger
                    placement="right"
                    overlay={renderTooltipPayezy}
                  >
                    <img src={ToolttipIcon} className={styles.toolTipIcon} />
                  </OverlayTrigger>
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  ₹{" "}
                  {exchangeRateData.westernUnion
                    ? exchangeRateData.westernUnion.toFixed(TWO_FIXED_TWO)
                    : "0"}
                  <OverlayTrigger
                    placement="right"
                    overlay={renderTooltipWesternUnion}
                  >
                    <img src={ToolttipIcon} className={styles.toolTipIcon} />
                  </OverlayTrigger>
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  ₹ {exchangeRateData.wise.toFixed(TWO_FIXED_TWO)}{" "}
                  <OverlayTrigger placement="right" overlay={renderTooltipWise}>
                    <img src={ToolttipIcon} className={styles.toolTipIcon} />
                  </OverlayTrigger>
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  {" "}
                  ₹ {exchangeRateData.remitly.toFixed(TWO_FIXED_TWO)}{" "}
                  <OverlayTrigger
                    placement="right"
                    overlay={renderTooltipRemitely}
                  >
                    <img src={ToolttipIcon} className={styles.toolTipIcon} />
                  </OverlayTrigger>
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  ₹ {exchangeRateData.xoom.toFixed(TWO_FIXED_TWO)}{" "}
                  <OverlayTrigger placement="right" overlay={renderTooltipXoom}>
                    <img src={ToolttipIcon} className={styles.toolTipIcon} />
                  </OverlayTrigger>
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  ₹ {exchangeRateData.instaram.toFixed(TWO_FIXED_TWO)}{" "}
                  <OverlayTrigger
                    placement="right"
                    overlay={renderTooltipInstarem}
                  >
                    <img src={ToolttipIcon} className={styles.toolTipIcon} />
                  </OverlayTrigger>
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer1}`}
          >
            <div className={styles.transferFeeContainer}>
              <div className={styles.transferFeeheading}>Transfer Fee</div>
              <div className={styles.exchangeRateValuesPayezy}>
                <p> $ {PAYEZY_TRANSFER_FEE.toFixed(TWO_FIXED_TWO)}</p>
              </div>
              {providers.map((provider) => (
                <div key={provider} className={styles.exchangeRateValues}>
                  <p>$ {transferFeeData[provider].toFixed(TWO_FIXED_TWO)}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer1}`}
          >
            <div className={styles.transferFeeContainer}>
              <div className={styles.heading}>
                {SEND_ENUM.recipientGets}
                <br />
                <span className={styles.USDToINR}>
                  {SEND_ENUM.sendingThousand}
                </span>
              </div>{" "}
              <div className={styles.exchangeRateValuesPayezy}>
                <p>
                  {" "}
                  ₹{" "}
                  {(usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE).toFixed(
                    TWO_FIXED_TWO
                  )}
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  {" "}
                  ₹{" "}
                  {calculateRecipientGetsValue(
                    exchangeRateData.westernUnion,
                    transferFeeData.westernUnion
                  )}
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  ₹{" "}
                  {calculateRecipientGetsValue(
                    exchangeRateData.wise,
                    transferFeeData.wise
                  )}
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  {" "}
                  ₹{" "}
                  {calculateRecipientGetsValue(
                    exchangeRateData.remitly,
                    transferFeeData.remitly
                  )}
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  ₹{" "}
                  {calculateRecipientGetsValue(
                    exchangeRateData.xoom,
                    transferFeeData.xoom
                  )}
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  ₹{" "}
                  {calculateRecipientGetsValue(
                    exchangeRateData.instaram,
                    transferFeeData.instaram
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.priceDiffContainer}>
            <div>
              {" "}
              <span className={styles.priceDifference}>
                <img src={downArrow} className={styles.downArrow} alt="" /> -
                {(
                  usdToInrExRate * THOUSAND -
                  PAYEZY_TRANSFER_FEE -
                  calculateRecipientGetsValue(
                    exchangeRateData.westernUnion,
                    transferFeeData.westernUnion
                  )
                ).toFixed(TWO_FIXED_TWO)}{" "}
              </span>
            </div>
            <div>
              {" "}
              <span className={styles.priceDifference}>
                <img src={downArrow} className={styles.downArrow} alt="" /> -
                {(
                  usdToInrExRate * THOUSAND -
                  PAYEZY_TRANSFER_FEE -
                  calculateRecipientGetsValue(
                    exchangeRateData.wise,
                    transferFeeData.wise
                  )
                ).toFixed(TWO_FIXED_TWO)}{" "}
              </span>
            </div>
            <div>
              {" "}
              <span className={styles.priceDifference}>
                <img src={downArrow} className={styles.downArrow} alt="" /> -
                {(
                  usdToInrExRate * THOUSAND -
                  PAYEZY_TRANSFER_FEE -
                  calculateRecipientGetsValue(
                    exchangeRateData.remitly,
                    transferFeeData.remitly
                  )
                ).toFixed(TWO_FIXED_TWO)}{" "}
              </span>
            </div>
            <div>
              {" "}
              <span className={styles.priceDifference}>
                <img src={downArrow} className={styles.downArrow} alt="" /> -
                {(
                  usdToInrExRate * THOUSAND -
                  PAYEZY_TRANSFER_FEE -
                  calculateRecipientGetsValue(
                    exchangeRateData.xoom,
                    transferFeeData.xoom
                  )
                ).toFixed(TWO_FIXED_TWO)}{" "}
              </span>
            </div>
            <div>
              {" "}
              <span className={styles.priceDifference}>
                <img src={downArrow} className={styles.downArrow} alt="" /> -
                {(
                  usdToInrExRate * THOUSAND -
                  PAYEZY_TRANSFER_FEE -
                  calculateRecipientGetsValue(
                    exchangeRateData.instaram,
                    transferFeeData.instaram
                  )
                ).toFixed(TWO_FIXED_TWO)}{" "}
              </span>
            </div>
          </div>
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer1}`}
          >
            <div className={styles.transferFeeContainer}>
              <div className={styles.heading}>
                True Rate{" "}
                <OverlayTrigger
                  placement="right"
                  overlay={renderTooltipTruRate}
                >
                  <img
                    src={ToolttipIcon}
                    className={styles.toolTipIcon}
                    alt="Tooltip"
                  />
                </OverlayTrigger>
                <br />
                <span className={styles.USDToINR}>
                  Effective Mid-Market Rate
                </span>
              </div>{" "}
              <div className={styles.exchangeRateValuesPayezy}>
                <p>
                  {" "}
                  ${" "}
                  {(usdToInrExRate * (THOUSAND - PAYEZY_TRANSFER_FEE)) /
                    THOUSAND}
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  {" "}
                  ${" "}
                  {calculateTrueValue(
                    exchangeRateData.westernUnion,
                    transferFeeData.westernUnion
                  )}{" "}
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  ${" "}
                  {calculateTrueValue(
                    exchangeRateData.wise,
                    transferFeeData.wise
                  )}
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  {" "}
                  ${" "}
                  {calculateTrueValue(
                    exchangeRateData.remitly,
                    transferFeeData.remitly
                  )}
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  ${" "}
                  {calculateTrueValue(
                    exchangeRateData.xoom,
                    transferFeeData.xoom
                  )}
                </p>
              </div>
              <div className={styles.exchangeRateValues}>
                <p>
                  ${" "}
                  {calculateTrueValue(
                    exchangeRateData.instaram,
                    transferFeeData.instaram
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <>
          <div className={styles.whyPayezyContainer}>
            <div className={styles.whyPayezyMob}>{SEND_ENUM.bestInMarket}</div>

            <div className={styles.comparisonMob}>{SEND_ENUM.comparison}</div>
            <div className={styles.liveGoogleRate}>
              Live google rate: 83.88 INR/USD
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
                      <p className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </p>
                      <p className={styles.exchangeRateInMob}>
                        ₹ {usdToInrExRate ? usdToInrExRate : "-"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipPayezy}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </p>
                      <p className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </p>
                      <p className={styles.exchangeRateInMob}>
                        ₹ {usdToInrExRate * (THOUSAND - PAYEZY_TRANSFER_FEE)}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <p className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </p>
                      <p className={styles.exchangeRateInMob}>$ 0</p>
                      <p className={styles.trueRateInMob}>
                        Tru Rate{" "}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipTruRate}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIcon}
                          />
                        </OverlayTrigger>
                      </p>
                      <p className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </p>
                      <p className={styles.exchangeRateInMob}>
                        $ {usdToInrExRate}{" "}
                      </p>
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
                      <p className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.westernUnion
                          ? exchangeRateData.westernUnion.toFixed(TWO_FIXED_TWO)
                          : "-"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipPayezy}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </p>
                      <p className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {calculateRecipientGetsValue(
                          exchangeRateData.westernUnion,
                          transferFeeData.westernUnion
                        )}
                        <span className={styles.priceDifference}>
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
                              exchangeRateData.westernUnion,
                              transferFeeData.westernUnion
                            )
                          ).toFixed(TWO_FIXED_TWO)}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <p className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </p>

                      <p className={styles.exchangeRateNotPayezyInMob}>
                        $ {transferFeeData.westernUnion.toFixed(TWO_FIXED_TWO)}
                      </p>
                      <p className={styles.trueRateInMob}>Tru Rate</p>
                      <p className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTrueValue(
                          exchangeRateData.westernUnion,
                          transferFeeData.westernUnion
                        )}{" "}
                      </p>
                    </div>
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
                      <p className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.wise
                          ? exchangeRateData.wise.toFixed(TWO_FIXED_TWO)
                          : "-"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipPayezy}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </p>
                      <p className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {calculateRecipientGetsValue(
                          exchangeRateData.wise,
                          transferFeeData.wise
                        )}
                        <span className={styles.priceDifference}>
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
                              exchangeRateData.wise,
                              transferFeeData.wise
                            )
                          ).toFixed(TWO_FIXED_TWO)}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <p className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </p>

                      <p className={styles.exchangeRateNotPayezyInMob}>
                        $ {transferFeeData.wise.toFixed(TWO_FIXED_TWO)}
                      </p>
                      <p className={styles.trueRateInMob}>
                        True Rate{" "}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipTruRate}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIcon}
                          />
                        </OverlayTrigger>
                      </p>
                      <p className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTrueValue(
                          exchangeRateData.wise,
                          transferFeeData.wise
                        )}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceComparisonMainContainer}>
              <div className={styles.payezyImageMobContainer}>
                <img src={RemitlyIcon} className={styles.wiseLyImageMob} />
              </div>
              <div className={styles.priceComparisonSubContainer}>
                <div>
                  <div>
                    <div>
                      <p className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.remitly
                          ? exchangeRateData.remitly.toFixed(TWO_FIXED_TWO)
                          : "-"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipRemitely}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </p>
                      <p className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {calculateRecipientGetsValue(
                          exchangeRateData.remitly,
                          transferFeeData.remitly
                        )}
                        <span className={styles.priceDifference}>
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
                              exchangeRateData.remitly,
                              transferFeeData.remitly
                            )
                          ).toFixed(TWO_FIXED_TWO)}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <p className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </p>

                      <p className={styles.exchangeRateNotPayezyInMob}>
                        $ {transferFeeData.remitly.toFixed(TWO_FIXED_TWO)}
                      </p>
                      <p className={styles.trueRateInMob}>
                        True Rate{" "}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipTruRate}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIcon}
                          />
                        </OverlayTrigger>
                      </p>
                      <p className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTrueValue(
                          exchangeRateData.remitly,
                          transferFeeData.remitly
                        )}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceComparisonMainContainer}>
              <div className={styles.payezyImageMobContainer}>
                <img src={XoomIcon} className={styles.wiseLyImageMob} />
              </div>
              <div className={styles.priceComparisonSubContainer}>
                <div>
                  <div>
                    <div>
                      <p className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.xoom
                          ? exchangeRateData.xoom.toFixed(TWO_FIXED_TWO)
                          : "-"}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipXoom}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIconImage}
                          />
                        </OverlayTrigger>
                      </p>
                      <p className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {calculateRecipientGetsValue(
                          exchangeRateData.instaram,
                          transferFeeData.instaram
                        )}{" "}
                        <span className={styles.priceDifference}>
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
                              exchangeRateData.xoom,
                              transferFeeData.xoom
                            )
                          ).toFixed(TWO_FIXED_TWO)}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <p className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </p>

                      <p className={styles.exchangeRateNotPayezyInMob}>
                        $ {transferFeeData.xoom.toFixed(TWO_FIXED_TWO)}
                      </p>
                      <p className={styles.trueRateInMob}>
                        True Rate{" "}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipTruRate}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIcon}
                          />
                        </OverlayTrigger>
                      </p>
                      <p className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTrueValue(
                          exchangeRateData.xoom,
                          transferFeeData.xoom
                        )}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceComparisonMainContainer}>
              <div className={styles.payezyImageMobContainer}>
                <img src={InstaramIcon} className={styles.wiseLyImageMob} />
              </div>
              <div className={styles.priceComparisonSubContainer}>
                <div>
                  <div>
                    <div>
                      <p className={styles.exchangeRateInMob}>
                        {SEND_ENUM.exchangeRate}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.USDToINR}
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {exchangeRateData.instaram
                          ? exchangeRateData.instaram.toFixed(TWO_FIXED_TWO)
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
                      </p>
                      <p className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </p>
                      <p className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ₹{" "}
                        {calculateRecipientGetsValue(
                          exchangeRateData.instaram,
                          transferFeeData.instaram
                        )}
                        <span className={styles.priceDifference}>
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
                              exchangeRateData.instaram,
                              transferFeeData.instaram
                            )
                          ).toFixed(TWO_FIXED_TWO)}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <p className={styles.transferRateInMob}>
                        {SEND_ENUM.transferFee}
                      </p>

                      <p className={styles.exchangeRateNotPayezyInMob}>
                        $ {transferFeeData.instaram.toFixed(TWO_FIXED_TWO)}
                      </p>
                      <p className={styles.trueRateInMob}>
                        True Rate{" "}
                        <OverlayTrigger
                          placement="right"
                          overlay={renderTooltipTruRate}
                        >
                          <img
                            src={ToolttipIcon}
                            className={styles.toolTipIcon}
                          />
                        </OverlayTrigger>
                      </p>
                      <p className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </p>
                      <p className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTrueValue(
                          exchangeRateData.instaram,
                          transferFeeData.instaram
                        )}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BestInMarket;
