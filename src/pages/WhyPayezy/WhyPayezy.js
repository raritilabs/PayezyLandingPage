// import React from "react";
// import styles from "./index.module.scss";
// import { SEND_ENUM } from "../../enums/sendEnum";
// import fullyTransparentIcon from "../../assets/fullyTransparentsvg.svg";
// import fastAndEasyIcon from "../../assets/fastAndEasyIcon.svg";
// import bestFXRateIcon from "../../assets/bestFXRate.svg";
// const WhyPayezy = () => {
//   return (
//     <>
//       <div className={styles.whyPayezyContainer}>
//         <div className={styles.whyPayezy}>{SEND_ENUM.whyPayezy}</div>
//         <div className={styles.lineContainer}></div>
//         <div className={styles.features}>{SEND_ENUM.features}</div>
//       </div>
//       <div className={styles.feauturesContainer}>
//         <div className={styles.feauturesSubContainer}>
//           <p className={styles.featuresText}>
//             {SEND_ENUM.fullyTransparentHeading}
//             <img
//               src={fullyTransparentIcon}
//               alt="fullyTransparent"
//               className={styles.fullyTransparentIcon}
//             />
//           </p>
//           <p className={styles.definition}>
//             {SEND_ENUM.fullyTransparentDefinition}
//           </p>
//         </div>
//         <div className={styles.feauturesSubContainer}>
//           {" "}
//           <p className={styles.featuresText}>
//             {SEND_ENUM.fastAndEasy}
//             <img
//               src={fastAndEasyIcon}
//               alt="fastAndEasyIcon"
//               className={styles.fastAndEasyIcon}
//             />
//           </p>
//           <p className={styles.definition}>{SEND_ENUM.fastAndEasyDefinition}</p>
//         </div>
//         <div className={styles.feauturesSubContainer}>
//           {" "}
//           <p className={styles.featuresText}>
//             {SEND_ENUM.bestExchangeRate}
//             <img
//               src={bestFXRateIcon}
//               alt="bestFXRateIcon"
//               className={styles.bestFXRateIcon}
//             />
//           </p>
//           <p className={styles.definition}>{SEND_ENUM.bestFXRateDefinition}</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WhyPayezy;
import React from "react";
import styles from "./index.module.scss";
import { SEND_ENUM } from "../../enums/sendEnum";
import fullyTransparentIcon from "../../assets/fullyTransparentsvg.svg";
import fastAndEasyIcon from "../../assets/fastAndEasyIcon.svg";
import bestFXRateIcon from "../../assets/bestFXRate.svg";

const WhyPayezy = () => {
  return (
    <>
      <div className={styles.whyPayezyContainer}>
        <div className={styles.whyPayezy}>{SEND_ENUM.whyPayezy}</div>
        <div className={styles.lineContainer}></div>
        <div className={styles.features}>{SEND_ENUM.features}</div>
      </div>
      <div className={styles.feauturesContainer}>
        <div
          className={`${styles.feauturesSubContainer} ${styles.subContainer1}`}
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
          <p className={styles.definition}>{SEND_ENUM.fastAndEasyDefinition}</p>
        </div>
        <div
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
          <p className={styles.definition}>{SEND_ENUM.bestFXRateDefinition}</p>
        </div>
      </div>
    </>
  );
};

export default WhyPayezy;
