'use client';

import { useState, type InputHTMLAttributes } from 'react';
import styles from './PasswordInput.module.css';

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export default function PasswordInput({ className, style, ...inputProps }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <input
        {...inputProps}
        type={isVisible ? 'text' : 'password'}
        className={className}
        style={{ ...style, paddingRight: style?.paddingRight ?? '3rem' }}
      />
      <button
        type="button"
        className={styles.visibilityButton}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        title={isVisible ? 'Hide password' : 'Show password'}
        onClick={() => setIsVisible((visible) => !visible)}
      >
        {isVisible ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
            <path d="M9.9 5.2A10.8 10.8 0 0112 5c6.4 0 10 7 10 7a15.8 15.8 0 01-3.1 3.8M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7a10.9 10.9 0 004.1-.8" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
