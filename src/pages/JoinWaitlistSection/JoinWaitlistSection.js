import React, { useState } from "react";
import cx from "classnames";
import { useContext } from "react";
import { AppContext } from "../../context";
import styles from "./index.module.scss";
import ButtonRade from "../../components/RadeButtons";
import { SEND_ENUM } from "../../enums/sendEnum";
import Modal from "react-modal";
import JoinWaitListEmailFetching from "../JoinWaitListEmailFetching/JoinWaitListEmailFetching";
import joinWaitlistButtonArrow from "../../assets/joinWaitlistButtonArrowNew.svg";
const JoinWaitlistSection = () => {
  const { isMobile } = useContext(AppContext);
  // State to set the Modal open or close
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClickJoinWaitlistButton = () => {
    console.log("Hai");
    setModalIsOpen(true);
    console.log("modalIsOpen", modalIsOpen);
  };
  return (
    <div className={styles.joinWaitlistContainer}>
      {" "}
      <div
        className={cx(styles.withZeroFee, {
          [styles.withZeroFeeMob]: isMobile,
        })}
      >
        With <span style={{ color: "#F3E445" }}>$0</span> platform fees,{" "}
        <span style={{ color: "#05D2FF" }}>Payezy</span> is the cheapest money
        transfer platform in USA.
      </div>
      <div className={styles.buttonContainer}>
        <ButtonRade
          customStyling={styles.joinWaitlistButton}
          onClick={handleClickJoinWaitlistButton}
        >
          {SEND_ENUM.joinWaitlist}
          <img
            src={joinWaitlistButtonArrow}
            alt="joinWaitlistButtonArrow"
            className={styles.joinWaitlistButtonArrow}
          />
        </ButtonRade>
      </div>
      <Modal
        isOpen={modalIsOpen}
        overlayClassName={styles.popupOverlay}
        className={styles.popupContent}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <JoinWaitListEmailFetching setModalIsOpen={setModalIsOpen} />
      </Modal>
    </div>
  );
};

export default JoinWaitlistSection;
