import React, {useEffect, useRef} from 'react';
import {useLocation} from '@docusaurus/router';
import OriginalDocItemLayout from '@theme-original/DocItem/Layout';

import styles from './styles.module.css';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

type DocItemLayoutProps = React.ComponentProps<typeof OriginalDocItemLayout>;

export default function DocItemLayout(props: DocItemLayoutProps) {
  const {pathname} = useLocation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<Animation | null>(null);

  useIsomorphicLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    animationRef.current?.cancel();
    animationRef.current = null;

    if (prefersReducedMotion?.matches) {
      node.style.opacity = '';
      node.style.transform = '';
      return;
    }

    node.style.willChange = 'opacity, transform';
    node.style.opacity = '0';
    node.style.transform = 'translateY(18px)';

    animationRef.current = node.animate(
      [
        {opacity: 0, transform: 'translateY(18px)'},
        {opacity: 1, transform: 'translateY(0)'},
      ],
      {
        duration: 320,
        easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
        fill: 'forwards',
      },
    );

    animationRef.current.onfinish = () => {
      node.style.opacity = '';
      node.style.transform = '';
      node.style.willChange = '';
      animationRef.current = null;
    };

    animationRef.current.oncancel = () => {
      node.style.opacity = '';
      node.style.transform = '';
      node.style.willChange = '';
      animationRef.current = null;
    };

    return () => {
      animationRef.current?.cancel();
      animationRef.current = null;
    };
  }, [pathname]);

  useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }

    const listener = () => {
      if (prefersReducedMotion.matches && animationRef.current) {
        animationRef.current.cancel();
      }
    };

    prefersReducedMotion.addEventListener('change', listener);

    return () => {
      prefersReducedMotion.removeEventListener('change', listener);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <OriginalDocItemLayout {...props} />
    </div>
  );
}
