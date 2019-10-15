import React from 'react';

const DonationButton = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_donations" />
            <input type="hidden" name="business" value={emailAddress} />
            <input type="hidden" name="currency_code" value="EUR" />
            <button class="button donate-button" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button">Donate for this campaign</button>
        </form>
  );
};

export default DonationButton;
