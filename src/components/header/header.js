import React, { useState } from "react";
import cx from "classnames";
import payezyText from "../../assets/payezyText.svg";
import { AppContext } from "../../context";
import { useContext } from "react";
import { HEADER_ENUM } from "../../enums/headerEnum";
import payezyLogo from "../../assets/payezyLogo.svg";
import logoutIcon from "../../assets/LogoutIcon.svg";
import styles from "./header.module.scss";
// import GoogleLogout from "../GoogleLogout/GoogleLogout";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const Header = ({
  setGoogleLoginPageNumber,
  setProfile,
  setProfileEmail,
  profileEmail,
  setOnClickLoginButton,
  setAmountInINR,
  setAmountInUSD,
  setSendFlowPageNumber,
}) => {
  const { isMobile } = useContext(AppContext);

  const handleClickLogin = () => {
    setGoogleLoginPageNumber(0);
    setOnClickLoginButton(true);
  };
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
        {/* <GoogleLogout
          setModalIsOpen={setModalIsOpen}
          setProfile={setProfile}
          setProfileEmail={setProfileEmail}
          setAmountInINR={setAmountInINR}
          setAmountInUSD={setAmountInUSD}
          setSendFlowPageNumber={setSendFlowPageNumber}
        /> */}
      </Modal>
    </>
  );
};

export default Header;
