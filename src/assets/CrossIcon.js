import * as React from "react";
import styles from "../pages/TransactionSubmit/TransactionSubmit";
const CrossIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    className={styles.crossIcon}
  >
       {" "}
    <path
      fill="#fff"
      d="m23.13 26.333-9.616-9.614-9.617 9.614A2.267 2.267 0 0 1 .692 23.13l9.617-9.616L.692 3.896A2.266 2.266 0 1 1 3.897.692l9.617 9.614L23.13.692a2.267 2.267 0 0 1 3.207 3.205l-9.617 9.618 9.617 9.616a2.267 2.267 0 1 1-3.207 3.204v-.002Z"
    />
     {" "}
  </svg>
);
export default CrossIcon;
