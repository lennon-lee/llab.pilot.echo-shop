import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Footer = ({ device }) => (
  <div className="footer">
    <div className={`footer-link ${device}`}>
      {/* Logo */}
      <div className="footer-link-logo">
        <Link to="/">
          <img
            style={{ width: '50px', height: '50px' }}
            src={Logo}
            alt="logo"
          />
        </Link>
      </div>

      {/* Products */}
      <div className="footer-link-common">
        <div className="footer-link-common-type">Products</div>
        <div className="focus footer-link-common-title">
          <Link to="/">PANTS</Link>
          <Link to="/">SHIRTS</Link>
          <Link to="/">DRESS</Link>
        </div>
      </div>

      {/* Support */}
      <div className="footer-link-common">
        <div className="footer-link-common-type">Support</div>
        <div className="footer-link-common-title">
          <Link to="/">PRODUCT HELP</Link>
          <Link to="/">SERVICE & WARRANTY</Link>
          <Link to="/">REGISTER YOUR BEATS</Link>
          <Link to="/">UPDATE YOUR BEATS</Link>
          <Link to="/">AUTHORIZED SERVICE PROVIDERS</Link>
          <Link to="/">CONTACT SUPPORT</Link>
          <Link to="/">INTERNATIONAL NUMBERS</Link>
        </div>
      </div>

      {/* Company */}
      <div className="footer-link-common">
        <div className="footer-link-common-type">Company</div>
        <div className="footer-link-common-title">
          <Link to="/">PRODUCT HELP</Link>
          <Link to="/">NEWS AND EVENTS</Link>
          <Link to="/">PROMOTION TERMS</Link>
          <Link to="/">PRIVACY POLICY</Link>
          <Link to="/">TRADEMARK</Link>
          <Link to="/">TERMS OF USE</Link>
          <Link to="/">COOKIES</Link>
        </div>
      </div>

      {/* Follow Us */}
      <div className="footer-link-common">
        <div className="footer-link-common-type">Follow Us</div>
        <div className="footer-link-common-title">
          <Link to="/">No Icon</Link>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      Copyright © 2021 Apple Inc. - All rights reserved.
    </div>
  </div>
);

export default Footer;
