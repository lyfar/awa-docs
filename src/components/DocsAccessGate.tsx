import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from '../css/docs-access-gate.module.css';

const STORAGE_KEY = '__awat_docs_access__';
const DEFAULT_CODE = '220088';
const SUCCESS_DELAY_MS = 900;

type DocsAccessGateProps = {
  children: React.ReactNode;
};

const CheckIcon: React.FC<{size?: number}> = ({size = 36}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const resolveAccessCode = (): string => {
  if (typeof window !== 'undefined') {
    const fromWindow = (window as typeof window & {__DOCS_ACCESS_CODE?: string}).__DOCS_ACCESS_CODE;
    if (typeof fromWindow === 'string' && fromWindow.trim().length > 0) {
      return fromWindow.trim();
    }
  }

  if (typeof process !== 'undefined' && process.env) {
    const envCode = (process.env.DOCS_ACCESS_CODE || process.env.NEXT_PUBLIC_DOCS_ACCESS_CODE || '').trim();
    if (envCode.length > 0) {
      return envCode;
    }
  }

  return DEFAULT_CODE;
};

const accessCode = resolveAccessCode();
const CODE_LENGTH = accessCode.length;

const DocsAccessGate: React.FC<DocsAccessGateProps> = ({children}) => {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'initial' | 'error' | 'success'>('initial');
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const logoUrl = useBaseUrl('img/awa-logo.svg');

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

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, accessCode);
        }
        setUnlocked(true);
      }, SUCCESS_DELAY_MS);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [status]);

  const handleUnlockAttempt = useCallback((code: string) => {
    if (code === accessCode) {
      setStatus('success');
    } else {
      setStatus('error');
      setValue('');
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH);
      setValue(nextValue);
      if (status === 'error') {
        setStatus('initial');
      }
      if (nextValue.length === CODE_LENGTH) {
        handleUnlockAttempt(nextValue);
      }
    },
    [handleUnlockAttempt, status],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (value.length === CODE_LENGTH) {
        handleUnlockAttempt(value);
      }
    },
    [handleUnlockAttempt, value],
  );

  const handleReset = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setUnlocked(false);
    setValue('');
    setStatus('initial');
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  const ready = unlocked !== null;
  const displayDigits = useMemo(
    () => value.split('').concat(Array.from({length: CODE_LENGTH - value.length}, () => '•')),
    [value],
  );

  useEffect(() => {
    if (ready && !unlocked) {
      inputRef.current?.focus();
    }
  }, [ready, unlocked]);

  if (!ready) {
    return null;
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className={styles.gateWrapper}>
      <div className={clsx(styles.gateCard, styles[`gate-${status}`])}>
        <div className={styles.logoWrap}>
          <img src={logoUrl} alt="AWATERRA" className={styles.logo} />
        </div>
        <h1 className={styles.gateTitle}>
          {status === 'success' ? 'Access Granted' : 'Documentation Locked'}
        </h1>
        {status !== 'success' && (
          <p className={styles.gateSubtitle}>Enter the 6-digit access code to continue.</p>
        )}

        {status === 'success' ? (
          <div className={styles.successState}>
            <div className={styles.successBadge}>
              <CheckIcon />
            </div>
            <p className={styles.successMessage}>Success! Loading docs…</p>
          </div>
        ) : (
          <form className={styles.gateForm} onSubmit={handleSubmit}>
            <div className={clsx(styles.codeDisplay, status === 'error' && styles.codeDisplayError)}>
              {displayDigits.map((digit, index) => (
                <span
                  key={index}
                  className={clsx(
                    styles.codeDigit,
                    value.length === index && styles.codeDigitActive,
                  )}
                >
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
          </form>
        )}

        {status === 'error' ? <p className={styles.gateError}>Incorrect code. Try again.</p> : null}

        <button type="button" className={styles.resetButton} onClick={handleReset}>
          Clear stored access
        </button>
      </div>
    </div>
  );
};

export default DocsAccessGate;
