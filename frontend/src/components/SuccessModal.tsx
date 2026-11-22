'use client';

import React, { useEffect } from 'react';

type SuccessModalProps = {
  message: React.ReactNode;
  onClose: () => void;
  heading?: string;
};

export default function SuccessModal({ message, onClose, heading = 'Submission successful' }: SuccessModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="success-modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-modal-heading">
        <div className="success-modal-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h2 id="success-modal-heading">{heading}</h2>
        <div className="success-modal-message">{message}</div>
        <button type="button" className="btn btn-primary success-modal-close" onClick={onClose} autoFocus>Close</button>
      </section>
    </div>
  );
}
