import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios"; // Import axios
import styles from "./index.module.scss";
import { SEND_ENUM } from "../../enums/sendEnum";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { AppContext } from "../../context";
import PayezyIcon from "../../assets/PayezyIcon.svg";
import InstaremIcon from "../../assets/InstaramIcon.svg";
import RemitlyIcon from "../../assets/RemitlyIcon.svg";
import WiselyIcon from "../../assets/WiseIcon.svg";
import ToolttipIcon from "../../assets/ToolTipIcon.svg";
import WesternUnionIcon from "../../assets/westernUnionImage.svg";
import AOS from "aos";
import downArrow from "../../assets/downArrow.svg";
import ofxIcon from "../../assets/ofxIcon.svg";
import Spinner from "../../components/Spinner/Spinner";
import ButtonRade from "../../components/RadeButtons";
import Modal from "react-modal";
import JoinWaitListEmailFetching from "../JoinWaitListEmailFetching/JoinWaitListEmailFetching";

const BestInMarket = ({ usdToInrExRate }) => {
  const { isMobile } = useContext(AppContext);

  const featuresContainerRef = useRef(null);
  useEffect(() => {
    AOS.init({});
  }, []);

  const [exchangeRateData, setExchangeRateData] = useState(null);
  const [transferFeeData, setTransferFeeData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
  const handleOnClickSendNow = () => {
    setModalIsOpen(true);
  };

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
        const remitly = copperxData.find(
          (provider) => provider.alias === "remitly"
        );
        const instarem = copperxData.find(
          (provider) => provider.alias === "instarem"
        );
        setExchangeRateData({
          westernUnion: westernUnion?.quotes[0]?.rate,
          wise: wiseData.value,
          remitly: remitlyData.estimate.exchange_rate.base_rate,
          ofx: ofxData.CustomerRate,
          instarem: instarem?.quotes[0]?.rate,
        });
        setTransferFeeData({
          westernUnion: westernUnion?.quotes[0]?.fee,
          wise: wise?.quotes[0]?.fee,
          remitly: remitlyData.estimate.fee.total_fee_amount,
          ofx: ofxData.Fee,
          instarem: instarem?.quotes[0]?.fee,
        });
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [THOUSAND]);

  if (!exchangeRateData && !transferFeeData) return <Spinner />;
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
            <div className={styles.recipientGetsHeading}>
              {SEND_ENUM.recipientGets}
              <br />
              <span className={styles.USDToINR}>
                {SEND_ENUM.sendingThousand}
              </span>
            </div>
            <div className={styles.trueRateHeading}>
              {SEND_ENUM.trueRate}
              <OverlayTrigger placement="right" overlay={renderTooltipTruRate}>
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
                ₹ {usdToInrExRate ? usdToInrExRate.toFixed(TWO_FIXED_TWO) : "0"}
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
            <div className={styles.recipientGetsValuePayezy}>
              <div className={styles.valueAndTooltipPayezy}>
                ₹{" "}
                {(usdToInrExRate * THOUSAND - PAYEZY_TRANSFER_FEE).toFixed(
                  TWO_FIXED_TWO
                )}
              </div>
            </div>
            <div className={styles.trueRateValuePayezy}>
              <div className={styles.valueAndTooltipPayezy}>
                ${" "}
                {(usdToInrExRate * (THOUSAND - PAYEZY_TRANSFER_FEE)) / THOUSAND}
              </div>
              <div>
                <ButtonRade
                  customStyling={styles.sendNowButton}
                  onClick={handleOnClickSendNow}
                >
                  Send Now
                </ButtonRade>
              </div>
            </div>
          </div>
          <div className={styles.providerDetailsContainer}>
            <div className={styles.providerIcon}>
              <img src={WesternUnionIcon} className={styles.wiseImage} />
            </div>
            <div className={styles.providerExchangeRateValues}>
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
            </div>
            <div className={styles.providerTransferFees}>
              ${" "}
              {transferFeeData.westernUnion
                ? transferFeeData.westernUnion.toFixed(TWO_FIXED_TWO)
                : "0"}
            </div>
            <div className={styles.providerRecipientGetsValues}>
              <div className={styles.recipientGets}>
                ₹{" "}
                {calculateRecipientGetsValue(
                  exchangeRateData.westernUnion,
                  transferFeeData.westernUnion
                )}
              </div>
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
            </div>
            <div className={styles.providerTrueRateValues}>
              ${" "}
              {calculateTrueValue(
                exchangeRateData.westernUnion,
                transferFeeData.westernUnion
              )}
            </div>
          </div>
          <div className={styles.providerDetailsContainer}>
            <div className={styles.providerIcon}>
              <img src={WiselyIcon} className={styles.wiseImage} />
            </div>
            <div className={styles.providerExchangeRateValues}>
              ₹ {exchangeRateData.wise.toFixed(TWO_FIXED_TWO)}{" "}
              <OverlayTrigger placement="right" overlay={renderTooltipWise}>
                <img src={ToolttipIcon} className={styles.toolTipIcon} />
              </OverlayTrigger>
            </div>
            <div className={styles.providerTransferFees}>
              ${" "}
              {transferFeeData.wise
                ? transferFeeData.wise.toFixed(TWO_FIXED_TWO)
                : "0"}
            </div>
            <div className={styles.providerRecipientGetsValues}>
              <div className={styles.recipientGets}>
                ₹{" "}
                {calculateRecipientGetsValue(
                  exchangeRateData.wise,
                  transferFeeData.wise
                )}
              </div>
              <div>
                <span className={styles.priceDifference}>
                  <img src={downArrow} className={styles.downArrow} alt="" /> -
                  {(
                    usdToInrExRate * THOUSAND -
                    PAYEZY_TRANSFER_FEE -
                    calculateRecipientGetsValue(
                      exchangeRateData.wise,
                      transferFeeData.wise
                    )
                  ).toFixed(TWO_FIXED_TWO)}
                </span>
              </div>
            </div>
            <div className={styles.providerTrueRateValues}>
              ${" "}
              {calculateTrueValue(exchangeRateData.wise, transferFeeData.wise)}
            </div>
          </div>
          <div className={styles.providerDetailsContainer}>
            <div className={styles.providerIcon}>
              <img src={RemitlyIcon} className={styles.remitlyImage} />
            </div>
            <div className={styles.providerExchangeRateValues}>
              ₹ {exchangeRateData.remitly}{" "}
              <OverlayTrigger placement="right" overlay={renderTooltipRemitely}>
                <img src={ToolttipIcon} className={styles.toolTipIcon} />
              </OverlayTrigger>
            </div>
            <div className={styles.providerTransferFees}>
              $ {transferFeeData.remitly ? transferFeeData.remitly : "0"}
            </div>
            <div className={styles.providerRecipientGetsValues}>
              <div className={styles.recipientGets}>
                ₹{" "}
                {calculateRecipientGetsValue(
                  exchangeRateData.remitly,
                  transferFeeData.remitly
                )}
              </div>
              <div>
                <span className={styles.priceDifference}>
                  <img src={downArrow} className={styles.downArrow} alt="" /> -
                  {(
                    usdToInrExRate * THOUSAND -
                    PAYEZY_TRANSFER_FEE -
                    calculateRecipientGetsValue(
                      exchangeRateData.remitly,
                      transferFeeData.remitly
                    )
                  ).toFixed(TWO_FIXED_TWO)}
                </span>
              </div>
            </div>
            <div className={styles.providerTrueRateValues}>
              ${" "}
              {calculateTrueValue(
                exchangeRateData.remitly,
                transferFeeData.remitly
              )}
            </div>
          </div>
          <div className={styles.providerDetailsContainer}>
            <div className={styles.providerIcon}>
              <img src={ofxIcon} className={styles.ofxIcon} />
            </div>
            <div className={styles.providerExchangeRateValues}>
              ₹ {exchangeRateData.ofx.toFixed(TWO_FIXED_TWO)}{" "}
              <OverlayTrigger placement="right" overlay={renderTooltipRemitely}>
                <img src={ToolttipIcon} className={styles.toolTipIcon} />
              </OverlayTrigger>
            </div>
            <div className={styles.providerTransferFees}>
              $ {transferFeeData.ofx ? transferFeeData.ofx : "0"}
            </div>
            <div className={styles.providerRecipientGetsValues}>
              <div className={styles.recipientGets}>
                ₹{" "}
                {calculateRecipientGetsValue(
                  exchangeRateData.ofx,
                  transferFeeData.ofx
                )}
              </div>
              <div>
                <span className={styles.priceDifference}>
                  <img src={downArrow} className={styles.downArrow} alt="" /> -
                  {(
                    usdToInrExRate * THOUSAND -
                    PAYEZY_TRANSFER_FEE -
                    calculateRecipientGetsValue(
                      exchangeRateData.ofx,
                      transferFeeData.ofx
                    )
                  ).toFixed(TWO_FIXED_TWO)}
                </span>
              </div>
            </div>
            <div className={styles.providerTrueRateValues}>
              $ {calculateTrueValue(exchangeRateData.ofx, transferFeeData.ofx)}
            </div>
          </div>
          <div className={styles.providerDetailsContainer}>
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
                : "0"}
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
          </div>
        </div>
      )}
      {isMobile && (
        <>
          <div className={styles.whyPayezyContainer}>
            <div className={styles.whyPayezyMob}>{SEND_ENUM.bestInMarket}</div>

            <div className={styles.comparisonMob}>{SEND_ENUM.comparison}</div>
            <div className={styles.liveGoogleRateMob}>
              Live google rate: {usdToInrExRate} INR/USD
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
                      </div>
                      <div className={styles.recipientGetsInMob}>
                        {SEND_ENUM.recipientGets}
                      </div>
                      <div className={styles.USDToINRInamob}>
                        {SEND_ENUM.sendingThousand}
                      </div>
                      <div className={styles.exchangeRateInMob}>
                        ₹ {usdToInrExRate * (THOUSAND - PAYEZY_TRANSFER_FEE)}
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
                      <div className={styles.exchangeRateInMob}>$ 0</div>
                      <div className={styles.trueRateInMob}>
                        Tru Rate{" "}
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
                      <div className={styles.exchangeRateInMob}>
                        $ {usdToInrExRate}{" "}
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
                          exchangeRateData.westernUnion,
                          transferFeeData.westernUnion
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
                              exchangeRateData.westernUnion,
                              transferFeeData.westernUnion
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
                        $ {transferFeeData.westernUnion.toFixed(TWO_FIXED_TWO)}
                      </div>
                      <div className={styles.trueRateInMob}>Tru Rate</div>
                      <div className={styles.USDToINRInamob}>
                        Effective Mid-Market Rate
                      </div>
                      <div className={styles.exchangeRateNotPayezyInMob}>
                        ${" "}
                        {calculateTrueValue(
                          exchangeRateData.westernUnion,
                          transferFeeData.westernUnion
                        )}{" "}
                      </div>
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
                          exchangeRateData.wise,
                          transferFeeData.wise
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
                              exchangeRateData.wise,
                              transferFeeData.wise
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
                        $ {transferFeeData.wise.toFixed(TWO_FIXED_TWO)}
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
                          exchangeRateData.wise,
                          transferFeeData.wise
                        )}{" "}
                      </div>
                    </div>
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
                          exchangeRateData.remitly,
                          transferFeeData.remitly
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
                              exchangeRateData.remitly,
                              transferFeeData.remitly
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
                        $ {transferFeeData.remitly}
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
                          exchangeRateData.remitly,
                          transferFeeData.remitly
                        )}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceComparisonMainContainer}>
              <div className={styles.payezyImageMobContainer}>
                <img src={ofxIcon} className={styles.ofxIconMob} />
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
                        {exchangeRateData.ofx
                          ? exchangeRateData.ofx.toFixed(TWO_FIXED_TWO)
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
                          exchangeRateData.ofx,
                          transferFeeData.ofx
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
                              exchangeRateData.ofx,
                              transferFeeData.ofx
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
                        $ {transferFeeData.ofx.toFixed(TWO_FIXED_TWO)}
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
                          exchangeRateData.ofx,
                          transferFeeData.ofx
                        )}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceComparisonMainContainer}>
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
            </div>
          </div>
        </>
      )}
      <Modal
        isOpen={modalIsOpen}
        overlayClassName={styles.popupOverlay}
        className={styles.popupContent}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <JoinWaitListEmailFetching setModalIsOpen={setModalIsOpen} />
      </Modal>
    </>
  );
};

export default BestInMarket;
