import * as React from "react";
const sendNowArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M13 1a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h8v8a1 1 0 1 0 2 0V1ZM1.707 12.707l11-11L11.293.293l-11 11 1.414 1.414Z"
    />
  </svg>
);
export default sendNowArrow;
