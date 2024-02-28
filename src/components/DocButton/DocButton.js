import React from "react";
import styles from "./DocButton.module.scss";
import DocButton from "../../assets/DocButton";
import cx from "classnames";
import { useContext } from "react";
import { AppContext } from "../../context";
const DocsButton = () => {
  const { isMobile } = useContext(AppContext);
  return (
    <button
      className={cx(styles.docButton, {
        [styles.docButtonMob]: isMobile,
      })}
    >
      <DocButton />
      Docs
    </button>
  );
};

export default DocsButton;
