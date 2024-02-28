import React, { useState } from "react";
import styles from "./index.module.scss";
import cx from "classnames";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context";
import { SEND_ENUM } from "../../enums/sendEnum";
import RadeButton from "../../components/RadeButtons";
import NextIcon from "../../assets/NextIcon";
const SendINR = ({
  amountInUSD,
  amountInINR,
  setAmountInINR,
  usdToInrExRate,
  treasuryBalance,
  fetchingPrice,
  errorForLogin,
  handleClickProceedButton,
  handleChageAmountInUSD,
  paymentType,
  setFetchingPrice,
}) => {
  const { isMobile, profileEmail } = useContext(AppContext);
  const MAX_DECIMAL_PLACE = 2; //varibale that defines maximum decimal place after integer
  const [processingCharge, setProcessingCharge] = useState(null); //state that store processing charge
  const MAX_BANK_PROCESSING_CHARGE = 5; //varibale that store maximum bank tranfer processing charge
  const MAX_ALLOWED_TRANSFER = 2000; //varibale that store maximum allowed tranfer

  useEffect(() => {
    // Function to convert the currency
    const convert = () => {
      if (usdToInrExRate > 0) {
        // if payment type is card
        if (paymentType === SEND_ENUM.cardPayment) {
          setProcessingCharge(amountInUSD * 0.04);
          // Limit the processing charge to 4 for card

          setAmountInINR(
            ((amountInUSD - processingCharge) * usdToInrExRate).toFixed(
              MAX_DECIMAL_PLACE
            )
          );

          // if payment type is bank transfer
        } else if (paymentType === SEND_ENUM.bankTransfer) {
          setProcessingCharge(amountInUSD * 0.008);
          // Limit the processing charge to 1 for bank tranfer
          if (processingCharge < MAX_BANK_PROCESSING_CHARGE) {
            setAmountInINR(
              ((amountInUSD - processingCharge) * usdToInrExRate).toFixed(
                MAX_DECIMAL_PLACE
              )
            );
          } else {
            setAmountInINR(
              (
                (amountInUSD - MAX_BANK_PROCESSING_CHARGE) *
                usdToInrExRate
              ).toFixed(MAX_DECIMAL_PLACE)
            );
          }
        }

        setFetchingPrice(false);
      } else {
        setFetchingPrice(true);
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
  return (
    <div>
      <div className={styles.enterAmountOfUSDWishToSend}>
        {SEND_ENUM.enterAmountOfUSDWishToSend}
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
          {profileEmail && (
            <div
              className={cx(styles.treasuryBalance, {
                [styles.treasuryBalanceMob]: isMobile,
              })}
            >
              Maximum allowed: $
              {treasuryBalance / usdToInrExRate < MAX_ALLOWED_TRANSFER
                ? (treasuryBalance / usdToInrExRate).toFixed(MAX_DECIMAL_PLACE)
                : MAX_ALLOWED_TRANSFER}
            </div>
          )}
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
                if (e.key === "-" || e.key === "e" || e.key === ".") {
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

        {usdToInrExRate && (
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
        )}
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
                placeholder="00.00"
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
        {fetchingPrice && !usdToInrExRate && amountInUSD > 0 && (
          <div className={styles.USDConvertionRate}>
            Fetching USD to INR conversion rate
            <div className={styles.spinnerOverlay}>
              <div className={styles.spinnerContainer} />
            </div>
          </div>
        )}

        {amountInUSD > 0 && (
          <div className={styles.feeBreakDown}>Charges Breakdown</div>
        )}
        {paymentType === SEND_ENUM.bankTransfer && amountInUSD > 0 && (
          <div className={styles.feeBreakDownContainer}>
            {" "}
            <div className={styles.bankTransferCharge}>
              {SEND_ENUM.bankTransferCharges}
            </div>
            <div className={styles.bankTransferCharge}>
              {paymentType === SEND_ENUM.bankTransfer && processingCharge && (
                <>
                  ${" "}
                  {processingCharge > MAX_BANK_PROCESSING_CHARGE
                    ? MAX_BANK_PROCESSING_CHARGE
                    : processingCharge.toFixed(MAX_DECIMAL_PLACE)}
                </>
              )}
            </div>
          </div>
        )}
        {paymentType === SEND_ENUM.cardPayment && amountInUSD > 0 && (
          <div className={styles.feeBreakDownContainer}>
            {" "}
            <div className={styles.bankTransferCharge}>
              {SEND_ENUM.cardProcessingCharge}
            </div>
            <div className={styles.bankTransferCharge}>
              {paymentType === SEND_ENUM.cardPayment && processingCharge && (
                <>$ {processingCharge.toFixed(MAX_DECIMAL_PLACE)}</>
              )}
            </div>
          </div>
        )}
        {paymentType === SEND_ENUM.bankTransfer && amountInUSD > 0 && (
          <div className={styles.cappedAt5Container}>
            {" "}
            <div className={styles.cappedAt5}>(Capped at $5.00)</div>
          </div>
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
        {amountInUSD > 0 &&
          processingCharge &&
          paymentType === SEND_ENUM.bankTransfer && (
            <div className={styles.radeFeeContainer}>
              {" "}
              <div className={styles.bankTransferChargeTotal}>
                Total Charges
              </div>
              <div className={styles.bankTransferChargeTotal}>
                <>
                  ${" "}
                  {processingCharge > MAX_BANK_PROCESSING_CHARGE
                    ? MAX_BANK_PROCESSING_CHARGE
                    : processingCharge.toFixed(MAX_DECIMAL_PLACE)}
                </>
              </div>
            </div>
          )}

        {amountInUSD > 0 && (
          <div className={styles.feeBreakDown}>{SEND_ENUM.feeBreakDown}</div>
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
              <>
                ${" "}
                {processingCharge < 5
                  ? (amountInUSD - processingCharge).toFixed(MAX_DECIMAL_PLACE)
                  : (amountInUSD - 5).toFixed(MAX_DECIMAL_PLACE)}
              </>
            </div>
          </div>
        )}
        {amountInUSD > 0 && (
          <div className={styles.feeBreakDownNetTransfer}>Net Transfer</div>
        )}
        {amountInINR && amountInUSD > 0 && processingCharge && (
          <div className={styles.radeFeeContainer}>
            {" "}
            <div className={styles.bankTransferChargeTotal}>
              Total INR Transferred
            </div>
            <div className={styles.bankTransferChargeTotal}>
              <>₹{amountInINR}</>
            </div>
          </div>
        )}
        {amountInINR > 0 && processingCharge && (
          <div className={styles.radeFeeContainerInclucingTax}>
            {" "}
            <div className={styles.bankTransferChargeTotal}>
              Effective mid-market rate
              <div className={styles.includingTaxes}>
                {" "}
                (inc. taxes and charges)
              </div>
            </div>
            <div className={styles.bankTransferChargeTotal}>
              <>₹{(amountInINR / amountInUSD).toFixed(MAX_DECIMAL_PLACE)}</>
            </div>
          </div>
        )}
        {errorForLogin && (
          <div className={styles.errorMessageForLogin}>{errorForLogin}</div>
        )}
        <div
          className={cx(styles.buttonContainer, {
            [styles.buttonContainerMob]: isMobile,
          })}
        >
          <RadeButton
            onClick={handleClickProceedButton}
            disabled={fetchingPrice}
            customStyling={cx(
              styles.proceedButton,
              {
                [styles.proceedButtonMob]: isMobile,
              },
              {
                [styles.disabledButton]: fetchingPrice, // Apply the disabledButton class when fetchingPrice is true
              }
            )}
          >
            {SEND_ENUM.proceedButton}
            <NextIcon />
          </RadeButton>
        </div>
      </div>
    </div>
  );
};

export default SendINR;
