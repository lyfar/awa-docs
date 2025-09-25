import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';

import styles from '../css/docs-access-gate.module.css';

const STORAGE_KEY = '__awat_docs_access__';
const DEFAULT_CODE = '220088';

type DocsAccessGateProps = {
  children: React.ReactNode;
};

const accessCode = (process.env.DOCS_ACCESS_CODE as string | undefined)
  || (process.env.NEXT_PUBLIC_DOCS_ACCESS_CODE as string | undefined)
  || DEFAULT_CODE;

const CODE_LENGTH = accessCode.length;

const DocsAccessGate: React.FC<DocsAccessGateProps> = ({children}) => {
  const [value, setValue] = useState('');
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored === accessCode) {
      setUnlocked(true);
    } else {
      setUnlocked(false);
    }
  }, []);

  const handleUnlock = useCallback((code: string) => {
    if (code === accessCode) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, accessCode);
      }
      setUnlocked(true);
      setError('');
    } else {
      setError('Incorrect code. Try again.');
      setValue('');
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH);
    setValue(nextValue);
    if (error) {
      setError('');
    }
    if (nextValue.length === CODE_LENGTH) {
      handleUnlock(nextValue);
    }
  }, [error, handleUnlock]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.length === CODE_LENGTH) {
      handleUnlock(value);
    }
  }, [handleUnlock, value]);

  const handleReset = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setUnlocked(false);
    setValue('');
    setError('');
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  const isReady = useMemo(() => unlocked !== null, [unlocked]);

  if (!isReady) {
    return null;
  }

  if (unlocked) {
    return <>{children}</>;
  }

  const displayDigits = value.padEnd(CODE_LENGTH, '•').split('');

  return (
    <div className={styles.gateWrapper}>
      <div className={styles.gateCard}>
        <h1 className={styles.gateTitle}>Documentation Locked</h1>
        <p className={styles.gateSubtitle}>Enter the 6-digit access code to continue.</p>
        <form className={styles.gateForm} onSubmit={handleSubmit}>
          <div className={styles.codeFrame}>
            <div className={styles.codeDisplay}>
              {displayDigits.map((digit, index) => (
                <span key={index} className={clsx(styles.codeDigit, value.length === index && styles.codeDigitActive)}>
                  {digit}
                </span>
              ))}
            </div>
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              className={styles.hiddenInput}
              value={value}
              onChange={handleChange}
              maxLength={CODE_LENGTH}
              aria-label="Access code"
            />
          </div>
        </form>
        {error ? <p className={styles.gateError}>{error}</p> : null}
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          Reset code
        </button>
      </div>
    </div>
  );
};

export default DocsAccessGate;
