import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import logoImage from "../../assets/svgs/logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={logoImage} alt="Pacride Logo" className="footer__logo" />
            <p>Making travel affordable, sustainable, and social.</p>
          </div>

          <div className="footer__column">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Blog</Link>
          </div>

          <div className="footer__column">
            <h4>Support</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/safety">Safety</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer__column">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {new Date().getFullYear()} Pacride Inc. All rights reserved.
          </p>
          <div className="footer__socials">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="footer__social"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="footer__social"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="footer__social"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
