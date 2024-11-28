import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import "../styles/PaymentSetting.scss";
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

export default function PaymentSettings() {
  const [autoPayoutEnabled, setAutoPayoutEnabled] = useState(true);
  const [newPaymentsNotification, setNewPaymentsNotification] = useState(true);
  const [cardNumber, setCardNumber] = useState('9978 1128 1558 1978');
  const [cardHolderName, setCardHolderName] = useState('Azusa Nakano');
  const [country, setCountry] = useState('United Kingdom');
  const [accountType, setAccountType] = useState('Regular');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div  className='PaymentContainer'>
        <div className="infoPayment">
            <div className="infoHeader">Payments{" "}<FontAwesomeIcon icon={faCircleQuestion} /></div>
            <div className="infodetail">You can change  your payment credentials here.</div>
          </div>
          <div className="payment-settings">
      <div className="setting-row">
      <div className="setting-value">
          <label className="switch">
            <input
              type="checkbox"
              checked={autoPayoutEnabled}
              onChange={(e) => setAutoPayoutEnabled(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="setting-label">
            <div className='setting-label-head'>Enable Auto Payout</div>
            <div>Autopayout occurs at the end of each month.</div>
            </div>
        
      </div>
      <div className="setting-row">
      <div className="setting-value">
          <label className="switch">
            <input
              type="checkbox"
              checked={newPaymentsNotification}
              onChange={(e) => setNewPaymentsNotification(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="setting-label">
            <div className='setting-label-head'>Notify New Payments</div>
            <div>You will be notified when a payment has been made.</div>
        </div>
        
      </div>
      <div className="setting-row">
  <div className="setting-label">
    <div className="setting-label-head">Credit Card</div>
  </div>
  <div className="setting-value">
    <div className="credit-card-wrapper">
      <input
        type="text"
        className="credit-card-input"
        defaultValue="9978 1128 1558 1978"
      />
      <div className="credit-card-type">VISA</div>
    </div>
  </div>
</div>
<div className="setting-row">
  <div className="setting-label">
    <div className="setting-label-head">Card Holder Name</div>
  </div>
  <div className="setting-value">
    <input type="text" className="card-holder-input" defaultValue="Azusa Nakano" />
  </div>
</div>
<div className="setting-row">
  <div className="setting-label">
    <div className="setting-label-head">Country</div>
  </div>
  <div className="setting-value">
    <div className="country-wrapper">
      <div className="country-flag">🇬🇧</div>
      <div className="country-name">United Kingdom</div>
    </div>
  </div>
</div>
    </div>
    </div>
    
  );
}