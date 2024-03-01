import { AnimatedOnScroll } from "react-animated-css-onscroll";
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
    AOS.init({
      // offset: 200,
      // duration: 400,
      // easing: "ease-in",
      // delay: 60,
    });
  }, []);
  useEffect(() => {
    const featuresContainer = featuresContainerRef.current;
    const feauturesSubContainers = featuresContainer.querySelectorAll(
      `.${styles.feauturesSubContainer}`
    );

    const observerOptions = {
      root: null, // use the viewport as the root
      rootMargin: "0px", // no margin
      threshold: 0.5, // trigger when 50% of the element is visible
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          feauturesSubContainers.forEach((subContainer, index) => {
            subContainer.style.animationDelay = `${0.5 + index * 0.2}s`;
            subContainer.classList.add(styles.slideInAnimation);
          });
          observer.unobserve(entry.target); // stop observing once animation triggered
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (featuresContainer) {
      observer.observe(featuresContainer);
    }

    return () => {
      if (featuresContainer) {
        observer.unobserve(featuresContainer);
      }
    };
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
          {/* <AnimatedOnScroll animationIn="bounce" delay={1000}> */}
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer1}`}
            data-aos="slide-up"
            data-aos-offset="200"
            data-aos-duration="400"
            data-aos-easing="ease-in"
            data-aos-delay="50"
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
          {/* </AnimatedOnScroll> */}
          {/* <AnimatedOnScroll animationIn="bounce" delay={1200}> */}
          <div
            data-aos="slide-up"
            data-aos-offset="200"
            data-aos-duration="400"
            data-aos-easing="ease-in"
            data-aos-delay="100"
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
          {/* </AnimatedOnScroll> */}
          {/* <AnimatedOnScroll animationIn="bounce" delay={1400}> */}
          <div
            data-aos="slide-up"
            data-aos-offset="200"
            data-aos-duration="400"
            data-aos-easing="ease-in"
            data-aos-delay="150"
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
          {/* </AnimatedOnScroll> */}
        </div>
      )}
      {isMobile && (
        <div ref={featuresContainerRef} className={styles.feauturesContainer}>
          <div
            className={`${styles.feauturesSubContainer} ${styles.subContainer1}`}
            data-aos="slide-left"
            data-aos-offset="200"
            data-aos-duration="400"
            data-aos-easing="ease-in"
            data-aos-delay="50"
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
            data-aos="slide-left"
            data-aos-offset="200"
            data-aos-duration="400"
            data-aos-easing="ease-in"
            data-aos-delay="100"
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
            data-aos="slide-left"
            data-aos-offset="200"
            data-aos-duration="400"
            data-aos-easing="ease-in"
            data-aos-delay="150"
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
