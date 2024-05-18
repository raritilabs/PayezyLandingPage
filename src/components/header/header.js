import React, { useState } from "react";
import cx from "classnames";
import { AppContext } from "../../context";
import { useContext } from "react";
import { HEADER_ENUM } from "../../enums/headerEnum";
import payezyLogo from "../../assets/payezyLogo.svg";
import logoutIcon from "../../assets/LogoutIcon.svg";
import styles from "./header.module.scss";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";

import JoinWaitListEmailFetching from "../../pages/JoinWaitListEmailFetching/JoinWaitListEmailFetching";
mixpanel.init(process.env.REACT_APP_MIXPANEL_API, {
  debug: true,
});
const Header = ({ profileEmail }) => {
  const { isMobile } = useContext(AppContext);

  let navigate = useNavigate();
  const handleOnClickLogoContainer = () => {
    navigate("/buy"); //return back to homescreen
  };
  // State to set the Modal open or close
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    setModalIsOpen(true);
  };
  const handleClickLogin = () => {
    mixpanel.track("User clicked on login buttton!");
    setModalIsOpen(true);
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
                [styles.ifLogin]: profileEmail,
                [styles.ifLoginMob]: profileEmail && isMobile,
              })}
            >
              {HEADER_ENUM.docsButton}
            </button>
          </a>
          {!profileEmail && (
            <button
              className={cx(styles.loginButton, {
                [styles.loginButtonMob]: isMobile,
              })}
              onClick={handleClickLogin}
            >
              {HEADER_ENUM.loginButton}
            </button>
          )}

          <div className={styles.flex}>
            {profileEmail && !isMobile && (
              <div
                className={cx(styles.profileEmailContainer, {
                  [styles.profileEmailContainerMob]: isMobile,
                })}
              >
                <div
                  className={cx(styles.profileEmail, {
                    [styles.profileEmailMob]: isMobile,
                  })}
                >
                  {profileEmail}
                </div>

                <button
                  onClick={logOut}
                  className={cx(styles.logoutButton, {
                    [styles.logoutButtonMob]: isMobile,
                  })}
                >
                  <img
                    src={logoutIcon}
                    alt="logout"
                    className={cx(styles.logoutIcon, {
                      [styles.logoutIconMob]: isMobile,
                    })}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
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
    </>
  );
};

export default Header;
