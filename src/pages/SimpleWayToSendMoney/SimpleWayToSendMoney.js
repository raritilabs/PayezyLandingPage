import React, { useContext, useState, useEffect } from "react";
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
import simpleWaytoSendmoneyImageOne from "../../assets/simpleWaytoSendmoneyImageOne.svg";
import simpleWaytoSendmoneyImageTwo from "../../assets/simpleWaytoSendmoneyImageTwo.svg";
import simpleWaytoSendmoneyImageThree from "../../assets/simpleWaytoSendmoneyImageThree.svg";
import simpleWaytoSendmoneyImageFour from "../../assets/simpleWaytoSendmoneyImageFour.svg";
import { AppContext } from "../../context";
import AOS from "aos";
import "aos/dist/aos.css";
const SimpleWayToSendMoney = () => {
  const { isMobile } = useContext(AppContext);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);
  return (
    <>
      {" "}
      {!isMobile ? (
        <div className={styles.mainContainer}>
          <div className={styles.simpleWayToSendMoneyMainContainer}>
            <p className={styles.simpleWayToSendMoney}>
              {SEND_ENUM.simpleWayToSendMoney}
            </p>
            <div
              className={styles.simpleWayToSendMoneySubContainer}
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-duration="400"
              data-aos-easing="ease-in"
              data-aos-delay="100"
            >
              <div>
                <img
                  src={oneImage}
                  alt="oneImage"
                  className={styles.oneImage}
                />
              </div>
              <div
                className={`${styles.simpleWayToSendMoneyDefContainer} ${
                  hoveredIndex === 0 ? styles.active : ""
                }`}
                onMouseEnter={() => {
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
                className={styles.simpleWayToSendMoneyIconOverlayMobile}
                alt="simpleWayToSendMoney"
              />
            )}
            <div
              className={styles.simpleWayToSendMoneySubContainer}
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-duration="400"
              data-aos-easing="ease-in"
              data-aos-delay="200"
            >
              <div>
                <img
                  src={twoImage}
                  alt="twoImage"
                  className={styles.twoImage}
                />
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
                className={styles.simpleWayToSendMoneyIconOverlayMobile}
                alt="simpleWayToSendMoney"
              />
            )}
            <div
              className={styles.simpleWayToSendMoneySubContainer}
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-duration="400"
              data-aos-easing="ease-in"
              data-aos-delay="300"
            >
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
                className={styles.simpleWayToSendMoneyIconOverlayMobile}
                alt="simpleWayToSendMoney"
              />
            )}
            <div
              className={styles.simpleWayToSendMoneySubContainer}
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-duration="400"
              data-aos-easing="ease-in"
              data-aos-delay="400"
            >
              <div>
                <img
                  src={fourImage}
                  alt="fourImage"
                  className={styles.fourImage}
                />
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
                className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
                alt="simpleWayToSendMoney"
              />
            )}
            {hoveredIndex === 1 && !isMobile && (
              <img
                src={simpleWayToSendMoneyIconOverlayTwo}
                className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
                alt="simpleWayToSendMoney"
              />
            )}
            {hoveredIndex === 2 && !isMobile && (
              <img
                src={simpleWayToSendMoneyIconOverlayThree}
                className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
                alt="simpleWayToSendMoney"
              />
            )}
            {hoveredIndex === 3 && !isMobile && (
              <img
                src={simpleWayToSendMoneyIconOverlayFour}
                className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
                alt="simpleWayToSendMoney"
              />
            )}
          </div>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.simpleWayToSendMoneyMainContainer}>
            <p className={styles.simpleWayToSendMoney}>
              {SEND_ENUM.simpleWayToSendMoney}
            </p>
            <div className={styles.simpleWayToSendMoneySubContainer}>
              <div>
                <img
                  src={oneImage}
                  alt="oneImage"
                  className={styles.oneImage}
                />
              </div>
              <div
                className={`${styles.simpleWayToSendMoneyDefContainer} ${
                  hoveredIndex === 0 ? styles.active : ""
                }`}
                onMouseEnter={() => {
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
              <div
                className={
                  styles.simpleWayToSendMoneyIconOverlayMobileOneContainer
                }
              >
                {" "}
                <img
                  src={simpleWaytoSendmoneyImageOne}
                  className={styles.simpleWayToSendMoneyIconOverlayMobileOne}
                  alt="simpleWayToSendMoney"
                />
              </div>
            )}
            <div className={styles.simpleWayToSendMoneySubContainer}>
              <div>
                <img
                  src={twoImage}
                  alt="twoImage"
                  className={styles.twoImage}
                />
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
                src={simpleWaytoSendmoneyImageTwo}
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
                src={simpleWaytoSendmoneyImageThree}
                className={styles.simpleWayToSendMoneyIconOverlayMobile}
                alt="simpleWayToSendMoney"
              />
            )}
            <div className={styles.simpleWayToSendMoneySubContainer}>
              <div>
                <img
                  src={fourImage}
                  alt="fourImage"
                  className={styles.fourImage}
                />
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
              src={simpleWaytoSendmoneyImageFour}
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
                className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
                alt="simpleWayToSendMoney"
              />
            )}
            {hoveredIndex === 1 && !isMobile && (
              <img
                src={simpleWayToSendMoneyIconOverlayTwo}
                className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
                alt="simpleWayToSendMoney"
              />
            )}
            {hoveredIndex === 2 && !isMobile && (
              <img
                src={simpleWayToSendMoneyIconOverlayThree}
                className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
                alt="simpleWayToSendMoney"
              />
            )}
            {hoveredIndex === 3 && !isMobile && (
              <img
                src={simpleWayToSendMoneyIconOverlayFour}
                className={`${styles.simpleWayToSendMoneyIconOverlay} animate`}
                alt="simpleWayToSendMoney"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleWayToSendMoney;
