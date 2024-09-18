import React, { useState } from "react";
import styles from "./index.module.scss";
import cx from "classnames";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context";
import { SEND_ENUM } from "../../enums/sendEnum";
import RadeButton from "../../components/RadeButtons";
import SendNowArrow from "../../assets/sendNowArrow.js";
import Modal from "react-modal";
import JoinWaitListEmailFetching from "../JoinWaitListEmailFetching/JoinWaitListEmailFetching.js";

const ExchangeRateDisplay = ({
  amountInUSD,
  amountInINR,
  setAmountInINR,
  usdToInrExRate,
  treasuryBalance,
  handleChageAmountInUSD,
  paymentType,
  setFetchingPrice,
  setErrorForLogin,
  errorForLogin,
}) => {
  const { isMobile, profileEmail } = useContext(AppContext);
  const MAX_DECIMAL_PLACE = 2; //varibale that defines maximum decimal place after integer
  const [processingCharge, setProcessingCharge] = useState(null); //state that store processing charge
  const MAX_BANK_PROCESSING_CHARGE = 5; //varibale that store maximum bank tranfer processing charge
  const MAX_ALLOWED_TRANSFER = 2000; //varibale that store maximum allowed tranfer
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClickSendNow = () => {
    if (!amountInUSD) {
      setErrorForLogin("Please enter an amount to continue!");
    } else {
      window.open("https://app.payezy.io", "_blank");
    }
  };
  useEffect(() => {
    // Function to convert the currency
    const convert = () => {
      if (usdToInrExRate > 0) {
        setAmountInINR((usdToInrExRate * amountInUSD).toFixed(2));
      }
    };

    convert();
  }, [
    amountInUSD,
    usdToInrExRate,
    setAmountInINR,
    paymentType,
    processingCharge,
    setFetchingPrice,
  ]);
  const containerClass =
    amountInUSD > 0
      ? styles.exchangeRateValues
      : styles.exchangeRateMainContainer;

  return (
    <div className={containerClass}>
      <div className={styles.enterAmountOfUSDWishToSend}>
        {SEND_ENUM.instantTransferAt}
      </div>{" "}
      <div
        className={cx(styles.sendRUDMainContainer, {
          [styles.sendRUDMainContainerMob]: isMobile,
        })}
      >
        <div
          className={cx(styles.sendRUD, {
            [styles.sendRUDMob]: isMobile,
          })}
        >
          <div
            className={cx(styles.sendRUDDiv, {
              [styles.sendRUDDivMob]: isMobile,
            })}
          >
            <div
              className={cx(styles.sendingRUD, {
                [styles.sendingRUDMob]: isMobile,
              })}
            >
              {SEND_ENUM.youSend}
            </div>
          </div>

          <div
            className={cx(styles.sendingRUDValue, {
              [styles.sendingRUDValueMob]: isMobile,
            })}
          >
            <div
              className={cx(styles.dollarSymbol, {
                [styles.dollarSymbolMob]: isMobile,
              })}
            >
              $
            </div>
            <input
              onChange={handleChageAmountInUSD}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {
                  e.preventDefault();
                }
              }}
              type="number"
              placeholder="00.00"
              value={amountInUSD || ""}
              autoComplete="off"
              className={cx(styles.inputAmount, {
                [styles.inputAmountMob]: isMobile,
              })}
            />

            <span
              className={cx(styles.USD, {
                [styles.USDMob]: isMobile,
              })}
            >
              USD
            </span>
          </div>
        </div>

        {/* {usdToInrExRate && (
          <div className={styles.feeBreakDownContainerHighlighted}>
            {" "}
            <div className={styles.bankTransferChargeHighlighted}>
              {" "}
              Exchange Rate (Best Price){" "}
            </div>
            <div className={styles.bankTransferChargeValueHighlighted}>
              <>₹{usdToInrExRate.toFixed(MAX_DECIMAL_PLACE)}</>
            </div>
          </div>
        )} */}
        <div>
          <div
            className={cx(styles.getINRContainer, {
              [styles.getINRContainerMob]: isMobile,
            })}
          >
            <div
              className={cx(styles.getINRAmount, {
                [styles.getINRAmountMob]: isMobile,
              })}
            >
              {" "}
              {SEND_ENUM.recipientGets}
            </div>

            <div
              className={cx(styles.getINRAmountValue, {
                [styles.getINRAmountValueMob]: isMobile,
              })}
            >
              <span
                className={cx(styles.INRSymbol, {
                  [styles.INRSymbolMob]: isMobile,
                })}
              >
                {" "}
                ₹
              </span>

              <input
                type="number"
                placeholder="0.00"
                value={amountInINR || ""}
                min="0"
                autoComplete="off"
                disabled
                className={cx(styles.inputAmount, {
                  [styles.inputAmountMob]: isMobile,
                })}
              ></input>

              <span
                className={cx(styles.INR, {
                  [styles.INRMob]: isMobile,
                })}
              >
                INR
              </span>
            </div>
          </div>
        </div>
        {amountInUSD > 0 && (
          <div className={styles.feeBreakDown}>Charges Breakdown</div>
        )}
        {amountInUSD > 0 && (
          <div className={styles.radeFeeContainer}>
            {" "}
            <div className={styles.bankTransferCharge}>
              Payezy Platform Fees
            </div>
            <div className={styles.bankTransferCharge}>
              <>$0.00</>
            </div>
          </div>
        )}
        {amountInUSD > 0 && (
          <div className={styles.feeBreakDownContainerAmountPaid}>
            {" "}
            <div className={styles.bankTransferCharge}>Amount Paid (Due)</div>
            <div className={styles.bankTransferCharge}>
              <>$ {amountInUSD}</>
            </div>
          </div>
        )}
        {amountInUSD > 0 && (
          <div className={styles.feeBreakDownContainerAmountPaid}>
            {" "}
            <div className={styles.bankTransferCharge}>Amount Exchanged</div>
            <div className={styles.bankTransferCharge}>
              <>$ {amountInUSD}</>
            </div>
          </div>
        )}
        {errorForLogin ? (
          <div className={styles.errorMessageForLogin}>{errorForLogin} </div>
        ) : (
          "-"
        )}
        <div
          className={cx(styles.buttonContainer, {
            [styles.buttonContainerMob]: isMobile,
          })}
        >
          <RadeButton
            onClick={handleClickSendNow}
            customStyling={cx(styles.proceedButton, {
              [styles.proceedButtonMob]: isMobile,
            })}
          >
            <span className={styles.sendNowText}> {SEND_ENUM.sendNow}</span>
            <span className={styles.sendNowArrow}>
              <SendNowArrow />
            </span>
          </RadeButton>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        overlayClassName={styles.popupOverlay}
        className={styles.popupContent}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <JoinWaitListEmailFetching setModalIsOpen={setModalIsOpen} />
      </Modal>
    </div>
  );
};

export default ExchangeRateDisplay;
