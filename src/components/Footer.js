import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
        <footer className="footer">
            <div className="footer-links">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Explore Campaigns</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Signup</Link></li>
                <li><Link to="https://om.org">Contact Us</Link></li>
            </ul>
            </div>
            <div className="hr50">
            <hr />
            </div>
            <div className="copyright">
            <p>
                Copyright - 2019 - Funding OM Romania - All rights reserved.
            </p>
            </div>
      </footer>
    );
  }
}

export default Footer;
