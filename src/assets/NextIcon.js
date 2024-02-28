import * as React from "react";
import styles from "./../styles/app.module.scss";
const NextIcon = (props) => (
  <svg
    {...props}
    width={7}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.nextIcon}
  >
    <path
      d="M1.098.177a.67.67 0 0 0-.91 0 .58.58 0 0 0 0 .857L5.457 6 .189 10.966a.58.58 0 0 0 0 .857.671.671 0 0 0 .909 0l5.72-5.395a.564.564 0 0 0 .18-.472.607.607 0 0 0-.18-.385L1.099.177Z"
      fill="#fff"
    />
  </svg>
);

export default NextIcon;
