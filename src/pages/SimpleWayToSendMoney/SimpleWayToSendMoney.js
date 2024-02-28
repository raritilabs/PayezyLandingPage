import React, { useContext, useState } from "react";
import styles from "./index.module.scss";
import oneImage from "../../assets/OneImage.svg";
import twoImage from "../../assets/TwoImage.svg";
import threeImage from "../../assets/threeImage.svg";
import fourImage from "../../assets/FourImage.svg";
import { SEND_ENUM } from "../../enums/sendEnum";
import simpleWayToSendMoneyIconOverlayOne from "../../assets/simpleWayTOSendIconOverlay.svg";
import simpleWayToSendMoneyIconOne from "../../assets/hand phone group.svg";
import simpleWayToSendMoneyIconOverlayTwo from "../../assets/imageTwoForSimpleWayToSend.svg";
import simpleWayToSendMoneyIconOverlayThree from "../../assets/imageThreeForSimpleWayToSend.svg";
import simpleWayToSendMoneyIconOverlayFour from "../../assets/imageFourForSimpleWayToSend.svg";
import backgroundForMobile from "../../assets/backgroundForMobile.svg";
import { AppContext } from "../../context";
const SimpleWayToSendMoney = () => {
  const { isMobile } = useContext(AppContext);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.simpleWayToSendMoneyMainContainer}>
        <p className={styles.simpleWayToSendMoney}>
          {SEND_ENUM.simpleWayToSendMoney}
        </p>
        <div className={styles.simpleWayToSendMoneySubContainer}>
          <div>
            <img src={oneImage} alt="oneImage" className={styles.oneImage} />
          </div>
          <div
            className={`${styles.simpleWayToSendMoneyDefContainer} ${
              hoveredIndex === 0 ? styles.active : ""
            }`}
            onMouseEnter={() => {
              console.log("Clicked on item 0");
              setHoveredIndex(0);
            }}
          >
            <p
              className={`${styles.simpleWayToSendMoneyHeadings} ${
                hoveredIndex === 0 ? styles.activePara : ""
              }`}
            >
              {SEND_ENUM.chooseATransferAmount}
            </p>
            <p className={styles.simpleWayToSendMoneyDef}>
              {SEND_ENUM.enterTheAmountYouWishToTransfer}
            </p>
          </div>
        </div>
        {isMobile && (
          <img
            src={simpleWayToSendMoneyIconOverlayOne}
            // className={styles.simpleWayToSendMoneyIconOverlay}
            className={styles.simpleWayToSendMoneyIconOverlayMobile}
            alt="simpleWayToSendMoney"
          />
        )}
        <div className={styles.simpleWayToSendMoneySubContainer}>
          <div>
            <img src={twoImage} alt="twoImage" className={styles.twoImage} />
          </div>
          <div
            className={`${styles.simpleWayToSendMoneyDefContainer} ${
              hoveredIndex === 1 ? styles.active : ""
            }`}
            onMouseEnter={() => setHoveredIndex(1)}
          >
            <p
              className={`${styles.simpleWayToSendMoneyHeadings} ${
                hoveredIndex === 1 ? styles.activePara : ""
              }`}
            >
              {SEND_ENUM.signUp}
            </p>
            <p className={styles.simpleWayToSendMoneyDef}>
              {SEND_ENUM.completeTheSimpleReg}
            </p>
          </div>
        </div>
        {isMobile && (
          <img
            src={simpleWayToSendMoneyIconOverlayTwo}
            // className={styles.simpleWayToSendMoneyIconOverlay}
            className={styles.simpleWayToSendMoneyIconOverlayMobile}
            alt="simpleWayToSendMoney"
          />
        )}
        <div className={styles.simpleWayToSendMoneySubContainer}>
          <div>
            <img
              src={threeImage}
              alt="threeImage"
              className={styles.threeImage}
            />
          </div>
          <div
            className={`${styles.simpleWayToSendMoneyDefContainer} ${
              hoveredIndex === 2 ? styles.active : ""
            }`}
            onMouseEnter={() => setHoveredIndex(2)}
          >
            <p
              className={`${styles.simpleWayToSendMoneyHeadings} ${
                hoveredIndex === 2 ? styles.activePara : ""
              }`}
            >
              {SEND_ENUM.addTransferDetails}
            </p>
            <p className={styles.simpleWayToSendMoneyDef}>
              {SEND_ENUM.enterTheDetailsOfReciever}
            </p>
          </div>
        </div>
        {isMobile && (
          <img
            src={simpleWayToSendMoneyIconOverlayThree}
            // className={styles.simpleWayToSendMoneyIconOverlay}
            className={styles.simpleWayToSendMoneyIconOverlayMobile}
            alt="simpleWayToSendMoney"
          />
        )}
        <div className={styles.simpleWayToSendMoneySubContainer}>
          <div>
            <img src={fourImage} alt="fourImage" className={styles.fourImage} />
          </div>
          <div
            className={`${styles.simpleWayToSendMoneyDefContainer} ${
              hoveredIndex === 3 ? styles.active : ""
            }`}
            onMouseEnter={() => setHoveredIndex(3)}
          >
            <p
              className={`${styles.simpleWayToSendMoneyHeadings} ${
                hoveredIndex === 3 ? styles.activePara : ""
              }`}
            >
              {SEND_ENUM.deliveryOfFunds}
            </p>
            <p className={styles.simpleWayToSendMoneyDef}>
              {SEND_ENUM.seeTheTransferHappening}
            </p>
          </div>
        </div>
      </div>
      {isMobile && (
        <img
          src={simpleWayToSendMoneyIconOverlayFour}
          // className={styles.simpleWayToSendMoneyIconOverlay}
          className={styles.simpleWayToSendMoneyIconOverlayMobile}
          alt="simpleWayToSendMoney"
        />
      )}
      <div className={styles.imageContainer}>
        <img
          src={simpleWayToSendMoneyIconOne}
          className={styles.simpleWayToSendMoneyIcon}
          alt="simpleWayToSendMoney"
        />
        {hoveredIndex === 0 && !isMobile && (
          <img
            src={simpleWayToSendMoneyIconOverlayOne}
            // className={styles.simpleWayToSendMoneyIconOverlay}
            className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
            alt="simpleWayToSendMoney"
          />
        )}
        {hoveredIndex === 1 && !isMobile && (
          <img
            src={simpleWayToSendMoneyIconOverlayTwo}
            // className={styles.simpleWayToSendMoneyIconOverlay}
            className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
            alt="simpleWayToSendMoney"
          />
        )}
        {hoveredIndex === 2 && !isMobile && (
          <img
            src={simpleWayToSendMoneyIconOverlayThree}
            // className={styles.simpleWayToSendMoneyIconOverlay}
            className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
            alt="simpleWayToSendMoney"
          />
        )}
        {hoveredIndex === 3 && !isMobile && (
          <img
            src={simpleWayToSendMoneyIconOverlayFour}
            // className={styles.simpleWayToSendMoneyIconOverlay}
            className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
            alt="simpleWayToSendMoney"
          />
        )}
      </div>
      {/* <img
        src={backgroundForMobile}
        className={styles.simpleWayToSendMoneyIconOverlayImage}
        alt="backgroundForMobile"
      /> */}
    </div>
  );
};

export default SimpleWayToSendMoney;
