import * as React from "react";
import styles from "../pages/StripePaymentIntent/index.module.scss";

const InfoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 24 24"
    className={styles.infoIconSvg}
    {...props}
    style={{ fill: "orange", stroke: "orange" }}
  >
    <title />
    <g
      fill="none"
      stroke="#f9b959"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <circle cx={12} cy={12} r={10} data-name="--Circle" />
      <path d="M12 12v4M12 8h0" />
    </g>
  </svg>
);

export default InfoIcon;
