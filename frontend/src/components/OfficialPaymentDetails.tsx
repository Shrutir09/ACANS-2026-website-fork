'use client';

import React, { useState } from 'react';
import { officialPaymentDetails } from '../lib/paymentDetails';

export default function OfficialPaymentDetails() {
  const [copyMessage, setCopyMessage] = useState('');

  const copyAccountNumber = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard access is unavailable.');
      }
      await navigator.clipboard.writeText(officialPaymentDetails.accountNumber);
      setCopyMessage('Account number copied.');
    } catch {
      setCopyMessage('Copy is unavailable. Select the account number to copy it.');
    }
  };

  return (
    <section
      className="card"
      aria-labelledby="official-payment-details-title"
      style={{
        margin: '1rem 0',
        padding: '1.25rem',
        border: '1px solid #dbeafe',
        borderRadius: '10px',
        backgroundColor: '#f8fafc',
      }}
    >
      <h3 id="official-payment-details-title" style={{ color: '#0f294a', marginBottom: '1rem' }}>
        Official Bank Account Details for Fee Payment
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.5rem 1.25rem', lineHeight: '1.7' }}>
        <p><strong>Account Holder Name:</strong> {officialPaymentDetails.accountHolderName}</p>
        <p style={{ overflowWrap: 'anywhere' }}><strong>Account Number:</strong> <span>{officialPaymentDetails.accountNumber}</span></p>
        <p><strong>IFSC Code:</strong> {officialPaymentDetails.ifscCode}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button
          type="button"
          onClick={copyAccountNumber}
          className="btn btn-primary"
          style={{ minHeight: '44px' }}
        >
          Copy Account Number
        </button>
        <span role="status" aria-live="polite" style={{ color: '#475569', fontSize: '0.85rem' }}>
          {copyMessage}
        </span>
      </div>
    </section>
  );
}
