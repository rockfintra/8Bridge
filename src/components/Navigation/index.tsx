import React, { useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import Logo from "../../assets/images/sidebarLogo.png";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as MenuIcon2 } from "../../assets/icons/menu2.svg";

import { ReactComponent as MoonIcon } from "../../assets/icons/moon.svg";
import { ReactComponent as SunIcon } from "../../assets/icons/sun.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Live } from "../../assets/icons/live.svg";
import { ReactComponent as Pair } from "../../assets/icons/liveexplorer.svg";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import Menu from "../../assets/images/menu.png";
import BitChain from "../../assets/images/LogoImg.png";
import "./Navigation.scss";
import Dropdown from "../Dropdown";
import Loogo from "../../assets/images/scan.png";
import A from "../../assets/images/LogoImg.png";
import B from "../../assets/images/protracker.png";
import C from "../../assets/images/proassure.png";
import D from "../../assets/images/prodex.png";
import E from "../../assets/images/prostake.png";
import F from "../../assets/images/progallery.png";
import G from "../../assets/images/propad.png";
import H from "../../assets/images/propos.png";
import { useTransactionStore } from "../../store/transactionStore";
import Modal from "../Modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/Cross.svg";
import { ReactComponent as PendingIcon } from "../../assets/icons/pending.svg";
import { ReactComponent as SuccessIcon } from "../../assets/icons/success.svg";
import { ReactComponent as ErrorIcon } from "../../assets/icons/error.svg";

const Navigation: React.FC = () => {
  const { isDarkMode, toggle } = useDarkMode();
  const [openClose, setOpenClose] = useState(false);
  const [openCloses, setOpenCloses] = useState(false);

  const [activeLink, setActiveLink] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();
  const transactionStatus = useTransactionStore((store) => store.transactionStatus);
  const setTransactionStatus = useTransactionStore((store) => store.setTransactionStatus);

  // Get the current location using useLocation hook

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get the current URL pathname
    const currentUrlPathname = window.location.pathname;

    // Set the active link based on the current URL pathname
    setActiveLink(currentUrlPathname);
  }, []);

  useEffect(() => {
    if (openClose) {
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflowY = "initial";
      document.body.style.height = "initial";
    }
  }, [openClose]);

  useEffect(() => {
    if (isDarkMode) {
      if (document.body.classList.contains("light")) {
        document.body.classList.remove("light");
      }
      document.body.classList.add("dark");
    } else {
      if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
      }
      document.body.classList.add("light");
    }
  }, [isDarkMode]);

  return (
    <div className="navigation-wrapper">
      <div className="mx">
        <div className="desktophead">
          <div>
            {" "}
            <img src={Loogo} className="logoo" />
          </div>
          <div>
            {" "}
            <nav className="site-navigation">
              <ul className="nav">
                <li>
                  <Link to="/app" className={`navlink ${location.pathname === "/" ? "active" : ""}`}>
                    Bridge
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app/explore"
                    className={`navlink ${location.pathname === "/explore" ? "active" : ""}`}
                  >
                    Explore Swaps
                  </Link>
                </li>

                <li>
                  <div className="parent-container">
                    <div className="changeddrop">
                      <div className="changedrop" onClick={() => setOpenDropdown((d) => !d)}>
                        <span>
                          <img src={Menu} alt="Menu Icon" />
                        </span>
                      </div>
                      {openDropdown && (
                        <div className="changedrop-content">
                          <div>
                            <span>
                              <a href="https://8bitchain.io">Website</a>
                            </span>
                          </div>
                          <div>
                            <span>
                              <a href="https://protracker.8bitchain.io">ProTracker</a>
                            </span>
                          </div>
                          <div>
                            <span>
                              <a href="https://proassure.8bitchain.io">ProAssure</a>
                            </span>
                          </div>
                          <div>
                            <span>
                              <a href="https://prodex.app">ProDex</a>
                            </span>
                          </div>
                          <div>
                            <span>
                              <a href="https://protracker.8bitchain.io">ProStake</a>
                            </span>
                          </div>
                          <div>
                            <span>
                              <a href="https://protracker.8bitchain.io">ProGallery</a>
                            </span>
                          </div>
                          <div>
                            <span>
                              <a href="https://propad.app">ProPad</a>
                            </span>
                          </div>
                          <div>
                            <span>
                              <a href="https://scan.8bitchain.io">8Bit Chain Testnet</a>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mobilehead">
          <div>
            {" "}
            <div className="circlebg newmwnu" onClick={() => setOpenCloses((m) => !m)}>
              <MenuIcon2 />
            </div>
          </div>
          <div>
            {" "}
            <img src={Loogo} className="logoo" />
          </div>
          <div>
            {" "}
            <div className="circlebg newmwnu" onClick={() => setOpenClose((m) => !m)}>
              <MenuIcon />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openClose && (
            <motion.div
              className="sidebar-backdrop"
              onClick={() => setOpenClose(false)}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <motion.div
                className="bar"
                onClick={(e: any) => e.stopPropagation()}
                animate={{ right: 0, transitionDelay: "-200ms" }}
                exit={{ right: -300 }}
                initial={{ right: -300 }}
              >
                <div className="header-side-bar">
                  <div className="close-icon" onClick={() => setOpenClose(false)}>
                    <Close />
                  </div>

                  <div style={{ flex: 1 }}>
                    <nav>
                      <NavLink
                        to="/"
                        className="list flex-item"
                        onClick={() => setOpenClose(false)}
                      >
                        <span>Bridge</span>
                      </NavLink>
                      <NavLink
                        to="/explore"
                        className="list flex-item"
                        onClick={() => setOpenClose(false)}
                      >
                        <span>Explore Swaps</span>
                      </NavLink>
                    </nav>
                    <div className="allChains"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {openCloses && (
            <motion.div
              className="sidebar-backdrop"
              onClick={() => setOpenCloses(false)}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <motion.div
                className="bar"
                onClick={(e: any) => e.stopPropagation()}
                animate={{ left: 0, transitionDelay: "-200ms" }}
                exit={{ left: -300 }}
                initial={{ left: -300 }}
              >
                <div className="header-side-bar">
                  <div className="close-icon" onClick={() => setOpenCloses(false)}>
                    <Close />
                  </div>

                  <div style={{ flex: 1 }}>
                    <nav>
                      <NavLink
                        to="https://8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        <img src={A} alt="prodex" width="25" height="25"></img>
                        <span>Website</span>
                      </NavLink>
                      <NavLink
                        to="https://protracker.8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        {" "}
                        <img src={B} alt="prodex" width="25" height="25"></img>
                        <span>ProTracker</span>
                      </NavLink>
                      <NavLink
                        to="https://proassure.8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        {" "}
                        <img src={C} alt="prodex" width="30" height="30"></img>
                        <span>ProAssure</span>
                      </NavLink>
                      <NavLink
                        to="https://prodex.app"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        {" "}
                        <img src={D} alt="prodex" width="30" height="30"></img>
                        <span>ProDex</span>
                      </NavLink>
                      <NavLink
                        to="https://8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        {" "}
                        <img src={E} alt="prodex" width="30" height="30"></img>
                        <span>ProStake</span>
                      </NavLink>
                      <NavLink
                        to="https://8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        {" "}
                        <img src={F} alt="prodex" width="30" height="30"></img>
                        <span>ProGallery</span>
                      </NavLink>
                      <NavLink
                        to="https://propad.app"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        {" "}
                        <img src={G} alt="prodex" width="30" height="30"></img>
                        <span>ProPad</span>
                      </NavLink>
                      <NavLink
                        to="https://scan.8bitchain.io"
                        className="list flex-item"
                        onClick={() => setOpenCloses(false)}
                      >
                        {" "}
                        <img src={H} alt="prodex" width="30" height="30"></img>
                        <span>8Bit Chain Testnet</span>
                      </NavLink>
                    </nav>
                    <div className="allChains"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {transactionStatus && (
        <Modal isOpen>
          <div className={`transaction-modal ${transactionStatus.status}`}>
            <div className="transaction-modal-header">
              <div></div>
              <h3>{transactionStatus.title}</h3>
              {transactionStatus.status !== "PENDING" && (
                <div className="close-icon" onClick={() => setTransactionStatus(null)}>
                  <CloseIcon />
                </div>
              )}
            </div>
            <div className="transaction-modal-content">
              <div className={`icon ${transactionStatus.status}`}>
                {transactionStatus.status === "ERROR" ? (
                  <ErrorIcon />
                ) : transactionStatus.status === "SUCCESS" ? (
                  <SuccessIcon />
                ) : (
                  <PendingIcon />
                )}
              </div>
              <p>{transactionStatus.message}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Navigation;
