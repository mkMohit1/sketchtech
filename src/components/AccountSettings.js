import React, { useState } from 'react';
import "../styles/AccountSetting.scss";
import { SubscipePlane } from './SubscipePlane';
import Address from './Address';

const AccountSettings = () => {
  const [currentPage, setCurrentPage] = useState('account');
  const address = [
    {
      name: 'Punit Verma',
      address1: '123 Main St',
      address2: 'Apt 456',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      phone: '0995005265',
      email: 'punit@example.com',
    },
    {
      name: 'John Doe',
      address1: '456 Elm St',
      address2: 'Suite 789',
      city: 'Othertown',
      state: 'NY',
      zip: '67890',
      phone: '0987654321',
      email: 'john@example.com',
    },
  ];

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'account':
        return <SubscipePlane />;
      case 'address':
        return <Address data={address} />;
      default:
        return <SubscipePlane />;
    }
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>

      <div className="accountMode">
        <ul>
          <li
            className={currentPage === 'account' ? 'active' : ''}
            onClick={() => handleCurrentPage('account')}
          >
            Subscription
          </li>
          <li
            className={currentPage === 'address' ? 'active' : ''}
            onClick={() => handleCurrentPage('address')}
          >
            Address
          </li>
        </ul>
      </div>
      <hr />

      {renderContent()}
    </div>
  );
};

export default AccountSettings;
