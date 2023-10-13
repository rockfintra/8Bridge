import React from "react";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitterIcon.svg";
import { ReactComponent as TelegramIcon } from "../../assets/icons/telegramIcon.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/instagram.svg";
import { ReactComponent as YouTubeIcon } from "../../assets/icons/youtube.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/icons/linkedin.svg";
import { ReactComponent as RedditIcon } from "../../assets/icons/reditt.svg";

// import { ReactComponent as AppStoreIcon } from "../../assets/icons/appstore.svg";
// import { ReactComponent as TikTok } from "../../assets/icons/tiktok.svg";
// import { ReactComponent as GooglePayIcon } from "../../assets/icons/googleplay.svg";
import { ReactComponent as DiscordIcon } from "../../assets/icons/discord.svg";
import { ReactComponent as MediumIcon } from "../../assets/icons/mediumIcon.svg";

import "./Footer.scss";
import { Link } from "react-router-dom";


const Footer: React.FC = () => {
  return (
    <div className="footer-wrapper pad">
      <div className="mx">
        <div className="footer-container">
        
          <div className="footer-content flex-item">
            <div className="media flex-item">
              <a href="https://twitter.com/8Bit_Chain">
                <TwitterIcon />
              </a>
              <a href="https://t.me/official_8Bitchain">
                <TelegramIcon />
              </a>
              <a href="https://discord.gg/BEuD56UqZ6">
                <DiscordIcon />
              </a>
              <a href="https://medium.com/@8bitchain/">
                <MediumIcon />
              </a>
              <a href="https://instagram.com/8bitchain/">
                <InstagramIcon />
              </a>

              <a href="https://www.youtube.com/@8bitchain">
                <YouTubeIcon />
              </a>

              <a href="https://www.linkedin.com/groups/7478646">
                <LinkedinIcon />
              </a>

              <a href="https://www.reddit.com/u/official8bit">
                <RedditIcon />
              </a>
            </div>

            <div className="footer-second-content flex-item">
              {/* <div className="app-icon flex-item">
                <AppStoreIcon />
                <GooglePayIcon />
              </div> */}
              

                <div>
                  <p className="para">
                    ©                      <span style={{ color: '#ffba00' }} >
8BitChain.io </span> 2023
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Footer;
