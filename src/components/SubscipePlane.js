import React from 'react'

export const SubscipePlane = () => {
  return (
    <>
          <div className="plan-info">
        <h2>Plan: Professional</h2>
        <p>$9.99 / month</p>
        <button className="upgrade-btn">Upgrade Plan</button>
      </div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Billing Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Plan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Invoice #1023</td>
            <td>May 15, 2022</td>
            <td className="paid">Paid</td>
            <td>$9.99</td>
            <td>Basic</td>
            <td><button>Download</button></td>
          </tr>
          {/* Add more invoice rows here */}
        </tbody>
      </table>
    </>
  )
}
