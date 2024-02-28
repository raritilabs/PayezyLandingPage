import * as React from "react";
import styles from "../components/DocButton/DocButton.module.scss";
const DocButton = (props) => (
  <svg
    {...props}
    width={15}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.docImage}
  >
    <path
      d="M12.162 15H2.838A2.82 2.82 0 0 1 0 12.162V2.838A2.82 2.82 0 0 1 2.838 0h9.324A2.82 2.82 0 0 1 15 2.838v9.324A2.82 2.82 0 0 1 12.162 15ZM2.838.81A2.007 2.007 0 0 0 .81 2.839v9.324c0 1.135.892 2.027 2.027 2.027h9.324a2.007 2.007 0 0 0 2.027-2.027V2.838A2.007 2.007 0 0 0 12.162.81H2.838Z"
      fill="#fff"
    />
    <rect x={7} y={7} width={1} height={4} rx={0.5} fill="#fff" />
    <rect x={7} y={5} width={1} height={1} rx={0.5} fill="#fff" />
  </svg>
);

export default DocButton;
