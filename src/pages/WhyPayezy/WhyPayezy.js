import React, { useContext, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { SEND_ENUM } from "../../enums/sendEnum";
import fullyTransparentIcon from "../../assets/fullyTransparentsvg.svg";
import fastAndEasyIcon from "../../assets/fastAndEasyIcon.svg";
import bestFXRateIcon from "../../assets/bestFXRate.svg";
import { AppContext } from "../../context";
import AOS from "aos";
import "aos/dist/aos.css";
const WhyPayezy = () => {
  const { isMobile } = useContext(AppContext);

  const featuresContainerRef = useRef(null);
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <>
      <div className={styles.whyPayezyContainer}>
        <div className={styles.whyPayezy}>{SEND_ENUM.whyPayezy}</div>
        <div className={styles.lineContainer}></div>
        <div className={styles.features}>{SEND_ENUM.features}</div>
      </div>
      {!isMobile && (
        <div ref={featuresContainerRef} className={styles.feauturesContainer}>
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer1}`}
            data-aos="slide-up"
            data-aos-offset="200"
            data-aos-duration="400"
            data-aos-easing="ease-in"
            data-aos-delay="200"
          >
            <p className={styles.featuresText}>
              {SEND_ENUM.fullyTransparentHeading}
              <img
                src={fullyTransparentIcon}
                alt="fullyTransparent"
                className={styles.fullyTransparentIcon}
              />
            </p>
            <p className={styles.definition}>
              {SEND_ENUM.fullyTransparentDefinition}
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="400"
            data-aos-easing="ease-in"
            data-aos-delay="600"
            className={`${styles.feauturesSubContainer} ${styles.subContainer2}`}
          >
            {" "}
            <p className={styles.featuresText}>
              {SEND_ENUM.fastAndEasy}
              <img
                src={fastAndEasyIcon}
                alt="fastAndEasyIcon"
                className={styles.fastAndEasyIcon}
              />
            </p>
            <p className={styles.definition}>
              {SEND_ENUM.fastAndEasyDefinition}
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="400"
            data-aos-easing="ease-in"
            data-aos-delay="1000"
            className={`${styles.feauturesSubContainer} ${styles.subContainer3}`}
          >
            {" "}
            <p className={styles.featuresText}>
              {SEND_ENUM.bestExchangeRate}
              <img
                src={bestFXRateIcon}
                alt="bestFXRateIcon"
                className={styles.bestFXRateIcon}
              />
            </p>
            <p className={styles.definition}>
              {SEND_ENUM.bestFXRateDefinition}
            </p>
          </div>
        </div>
      )}
      {isMobile && (
        <div className={styles.feauturesContainer}>
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer1}`}
            data-aos="fade-left"
            data-aos-duration="200"
            data-aos-easing="ease-in"
            data-aos-delay="120"
          >
            <p className={styles.featuresText}>
              {SEND_ENUM.fullyTransparentHeading}
              <img
                src={fullyTransparentIcon}
                alt="fullyTransparent"
                className={styles.fullyTransparentIcon}
              />
            </p>
            <p className={styles.definition}>
              {SEND_ENUM.fullyTransparentDefinition}
            </p>
          </div>
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer2}`}
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-easing="ease-in"
          >
            {" "}
            <p className={styles.featuresText}>
              {SEND_ENUM.fastAndEasy}
              <img
                src={fastAndEasyIcon}
                alt="fastAndEasyIcon"
                className={styles.fastAndEasyIcon}
              />
            </p>
            <p className={styles.definition}>
              {SEND_ENUM.fastAndEasyDefinition}
            </p>
          </div>
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer3}`}
            data-aos="fade-left"
            data-aos-duration="600"
            data-aos-easing="ease-in"
          >
            {" "}
            <p className={styles.featuresText}>
              {SEND_ENUM.bestExchangeRate}
              <img
                src={bestFXRateIcon}
                alt="bestFXRateIcon"
                className={styles.bestFXRateIcon}
              />
            </p>
            <p className={styles.definition}>
              {SEND_ENUM.bestFXRateDefinition}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WhyPayezy;
