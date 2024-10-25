import React from "react";
import cx from "classnames";
import { AppContext } from "../../context";
import { useContext } from "react";
import { HEADER_ENUM } from "../../enums/headerEnum";
import payezyLogo from "../../assets/payezyLogo.svg";
import styles from "./header.module.scss";
import { useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.REACT_APP_MIXPANEL_API, {
  debug: true,
});
const Header = () => {
  const { isMobile } = useContext(AppContext);

  let navigate = useNavigate();
  const handleOnClickLogoContainer = () => {
    navigate("/buy"); //return back to homescreen
  };

  const handleClickLogin = () => {
    mixpanel.track("User clicked on login buttton!");
    // Redirect to the app.payezy.io homepage or specific URL
    window.open("https://app.payezy.io", "_blank");
  };
  return (
    <>
      <div
        className={cx(styles.headerMainContainer, {
          [styles.headerMainContainerMob]: isMobile,
        })}
      >
        <div
          className={cx(styles.logoContainer, {
            [styles.logoContainerMob]: isMobile,
          })}
          onClick={handleOnClickLogoContainer}
        >
          <img
            src={payezyLogo}
            alt="logo"
            className={cx(styles.fairexLogo, {
              [styles.fairexLogoMob]: isMobile,
            })}
          />
        </div>

        <div
          className={cx(styles.connectWalletContainer, {
            [styles.connectWalletContainerMob]: isMobile,
          })}
        >
          <a
            href="https://docs.payezy.io/overview/payezy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className={cx(styles.docsButton, {
                [styles.docsButtonMob]: isMobile,
              })}
            >
              {HEADER_ENUM.docsButton}
            </button>
          </a>

          <button
            className={cx(styles.loginButton, {
              [styles.loginButtonMob]: isMobile,
            })}
            onClick={handleClickLogin}
          >
            {HEADER_ENUM.loginButton}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
