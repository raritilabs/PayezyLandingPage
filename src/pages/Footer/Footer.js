import React from "react";
import styles from "./index.module.scss";
import payezyLogo from "../../assets/payezyIconForFooter.svg";
import linkedinIcon from "../../assets/linkedinIconForFooter.svg";
import discordIcon from "../../assets/discordIconForFooter.svg";
import XIcon from "../../assets/XIconFooter.svg";
import { SEND_ENUM } from "../../enums/sendEnum";
import { useContext } from "react";
import { AppContext } from "../../context";

const Footer = () => {
  const { isMobile } = useContext(AppContext);
  return (
    <div className={styles.footerMainContainer}>
      {" "}
      <div className={styles.footerSubContainer}>
        <div className={styles.logoContainer}>
          <img
            src={payezyLogo}
            className={styles.payezyLogo}
            alt="payezyLogo"
          />
          <p className={styles.supportEmailStatement}>
            For general enquiries, just hit us up on
            {!isMobile && (
              <span className={styles.supportEmail}>support@rariti.io</span>
            )}
            {isMobile && (
              <span className={styles.supportEmail}>
                <br />
                support@rariti.io
              </span>
            )}
          </p>
        </div>
        <div>
          <a
            href="https://discord.com/invite/QjPXwpCUA2"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={discordIcon}
              className={styles.discordIcon}
              alt="discordIcon"
            />
          </a>
          <a
            href="https://twitter.com/i/flow/login?redirect_after_login=%2Frariti_io"
            target="_blank"
            rel="noreferrer"
          >
            <img src={XIcon} className={styles.XIcon} alt="XIcon" />
          </a>
          <a
            href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGkYPcLkrpcWQAAAY3vQ6fI1FaAKmRrXsCGHNm2v-6RjHyqe7ZEqzW8gFsRJZm4zO1DgZcSrLBRJhQ1FAV2sCPgFm23nEovz44q4_S6xJDj1pyVa7SqmSDwsLK9LJPBTktTp7Q=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Frariti-inc%2F"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={linkedinIcon}
              className={styles.linkedinIcon}
              alt="linkedinIcon"
            />
          </a>
        </div>
      </div>
      <div className={styles.privacyPolicyContainer}>
        <div className={styles.privacyPolicyContainer}>
          <a
            className={styles.privacyPolicy}
            href="https://docs.payezy.io/platform/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >
            {SEND_ENUM.privacyPolicy}
          </a>
          <a
            className={styles.termsOfUse}
            href="https://docs.payezy.io/platform/terms-of-use"
            target="_blank"
            rel="noreferrer"
          >
            {SEND_ENUM.termsOfUse}
          </a>
          <a
            className={styles.termsOfUse}
            href="https://docs.payezy.io/platform/aml-kyc-policy-india"
            target="_blank"
            rel="noreferrer"
          >
            AML/KYC
          </a>
        </div>
        {!isMobile && (
          <div className={styles.copyRight}>{SEND_ENUM.copyRight}</div>
        )}
      </div>
      {isMobile && <div>{SEND_ENUM.copyRight}</div>}
    </div>
  );
};

export default Footer;
