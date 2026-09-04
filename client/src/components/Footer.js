import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        

        <div className="footer-inspiration">
          <h2>Inspiration for future getaways</h2>
          <nav className="inspo-categories" aria-label="Inspiration categories">
            <button className="inspo-tab active">Popular</button>
            <button className="inspo-tab">Arts & culture</button>
            <button className="inspo-tab">Beach</button>
            <button className="inspo-tab">Mountains</button>
            <button className="inspo-tab">Outdoors</button>
            <button className="inspo-tab">Things to do</button>
            <button className="inspo-tab">Airbnb-friendly apartments</button>
          </nav>
          <ul className="inspo-list">
            <li>
              <a href="https://www.airbnb.co.za/philadelphia-pa/stays" target="_blank" rel="noreferrer">
                <strong>Philadelphia</strong>
                <div className="inspo-sub">Vacation rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/orange-beach-al/stays/villas" target="_blank" rel="noreferrer">
                <strong>Orange Beach</strong>
                <div className="inspo-sub">Villa rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/portland-or/stays/monthly" target="_blank" rel="noreferrer">
                <strong>Portland</strong>
                <div className="inspo-sub">Monthly Rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/minneapolis-mn/stays/houses" target="_blank" rel="noreferrer">
                <strong>Minneapolis</strong>
                <div className="inspo-sub">House rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/charlotte-nc/stays" target="_blank" rel="noreferrer">
                <strong>Charlotte</strong>
                <div className="inspo-sub">Vacation rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/dallas-tx/stays" target="_blank" rel="noreferrer">
                <strong>Dallas</strong>
                <div className="inspo-sub">Vacation rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/raleigh-nc/stays/villas" target="_blank" rel="noreferrer">
                <strong>Raleigh</strong>
                <div className="inspo-sub">Villa rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/tokyo-japan/stays/condos" target="_blank" rel="noreferrer">
                <strong>Tokyo</strong>
                <div className="inspo-sub">Condo rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/north-myrtle-beach-sc/stays/condos" target="_blank" rel="noreferrer">
                <strong>North Myrtle Beach</strong>
                <div className="inspo-sub">Condo rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/portland-me/stays/cottages" target="_blank" rel="noreferrer">
                <strong>Portland</strong>
                <div className="inspo-sub">Cottage rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/nice-france/stays" target="_blank" rel="noreferrer">
                <strong>Nice</strong>
                <div className="inspo-sub">Vacation rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/cleveland-oh/stays/villas" target="_blank" rel="noreferrer">
                <strong>Cleveland</strong>
                <div className="inspo-sub">Villa rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/kauai-hi/stays/condos" target="_blank" rel="noreferrer">
                <strong>Kauai</strong>
                <div className="inspo-sub">Condo rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/gulf-shores-al/stays/condos" target="_blank" rel="noreferrer">
                <strong>Gulf Shores</strong>
                <div className="inspo-sub">Condo rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/montreal-canada/stays" target="_blank" rel="noreferrer">
                <strong>Montreal</strong>
                <div className="inspo-sub">Vacation rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/amsterdam-netherlands/stays/cottages" target="_blank" rel="noreferrer">
                <strong>Amsterdam</strong>
                <div className="inspo-sub">Cottage rentals</div>
              </a>
            </li>
            <li>
              <a href="https://www.airbnb.co.za/london-united-kingdom/stays/villas" target="_blank" rel="noreferrer">
                <strong>London</strong>
                <div className="inspo-sub">Villa rentals</div>
              </a>
            </li>
            <li className="show-more">
              <button className="show-more-btn">Show more <span className="chev">▾</span></button>
            </li>
          </ul>
        </div>
        <div className="footer-top">
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="https://www.airbnb.co.za/help/home?from=footer" target="_blank" rel="noreferrer">Help Center</a></li>
              <li><a href="https://www.airbnb.co.za/help/contact-us?entry=DESKTOP_FOOTER_SAFETY" target="_blank" rel="noreferrer">Get help with a safety issue</a></li>
              <li><a href="https://www.airbnb.co.za/aircover" target="_blank" rel="noreferrer">AirCover</a></li>
              <li><a href="https://www.airbnb.co.za/against-discrimination" target="_blank" rel="noreferrer">Anti-discrimination</a></li>
              <li><a href="https://www.airbnb.co.za/accessibility" target="_blank" rel="noreferrer">Disability support</a></li>
              <li><a href="https://www.airbnb.co.za/help/article/2701/extenuating-circumstances-policy-and-the-coronavirus-covid19" target="_blank" rel="noreferrer">Cancellation options</a></li>
              <li><a href="https://www.airbnb.co.za/neighbors" target="_blank" rel="noreferrer">Report neighborhood concern</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Hosting</h3>
            <ul>
              <li><a href="https://www.airbnb.co.za/host/homes?from_footer=1" target="_blank" rel="noreferrer">Airbnb your home</a></li>
              <li><a href="https://www.airbnb.co.za/host/experiences" target="_blank" rel="noreferrer">Airbnb your experience</a></li>
              <li><a href="https://www.airbnb.co.za/host/services" target="_blank" rel="noreferrer">Airbnb your service</a></li>
              <li><a href="https://www.airbnb.co.za/aircover-for-hosts" target="_blank" rel="noreferrer">AirCover for Hosts</a></li>
              <li><a href="https://www.airbnb.co.za/resources" target="_blank" rel="noreferrer">Hosting resources</a></li>
              <li><a href="https://community.withairbnb.com/t5/Community-Center/ct-p/community-center" target="_blank" rel="noreferrer">Community forum</a></li>
              <li><a href="https://www.airbnb.co.za/help/responsible-hosting" target="_blank" rel="noreferrer">Hosting responsibly</a></li>
              <li><a href="https://www.airbnb.co.za/e/intro-to-hosting" target="_blank" rel="noreferrer">Join a free hosting class</a></li>
              <li><a href="https://www.airbnb.co.za/host/co-hosts" target="_blank" rel="noreferrer">Find a co‑host</a></li>
              <li><a href="https://www.airbnb.co.za/refer" target="_blank" rel="noreferrer">Refer a host</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Airbnb</h3>
            <ul>
              <li><a href="https://www.airbnb.co.za/release" target="_blank" rel="noreferrer">2026 Summer Release</a></li>
              <li><a href="https://www.airbnb.co.za/press/news" target="_blank" rel="noreferrer">Newsroom</a></li>
              <li><a href="https://www.airbnb.co.za/careers" target="_blank" rel="noreferrer">Careers</a></li>
              <li><a href="https://investors.airbnb.com/" target="_blank" rel="noreferrer">Investors</a></li>
              <li><a href="https://www.airbnb.org/?locale=en" target="_blank" rel="noreferrer">Airbnb.org emergency stays</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-left">
            <span>Footer section© 2026 Airbnb, Inc.</span>
            <span className="dot">·</span>
            <a href="https://www.airbnb.co.za/terms/privacy_policy" target="_blank" rel="noreferrer">Privacy</a>
            <span className="dot">·</span>
            <a href="https://www.airbnb.co.za/terms" target="_blank" rel="noreferrer">Terms</a>
          </div>
          <div className="footer-right">
            <div className="lang-currency">English R ZAR</div>
            <div className="social-links">
              <a href="https://www.facebook.com/airbnb" className="social-link" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://twitter.com/airbnb" className="social-link" target="_blank" rel="noreferrer" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://instagram.com/airbnb" className="social-link" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
