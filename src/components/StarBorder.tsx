import React, {ComponentPropsWithoutRef, ElementType} from 'react';
import {cn} from '@site/src/utils/cn';

interface BaseProps {
  color?: string;
  speed?: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

type StarBorderProps<T extends ElementType> = {
  as?: T;
} & BaseProps & Omit<ComponentPropsWithoutRef<T>, keyof BaseProps | 'as'>;

const defaultColor = 'rgba(154, 152, 177, 0.9)';

export function StarBorder<T extends ElementType = 'div'>({
  as,
  className,
  contentClassName,
  color,
  speed = '6s',
  children,
  ...props
}: StarBorderProps<T>) {
  const Component = (as || 'div') as ElementType;
  const glowColor = color ?? defaultColor;

  return (
    <Component className={cn('awa-star-border', className)} {...props}>
      <span
        className={cn('awa-star-border__halo', 'awa-star-border__halo--bottom')}
        style={{
          background: `radial-gradient(circle, ${glowColor}, transparent 14%)`,
          animationDuration: speed,
        }}
      />
      <span
        className={cn('awa-star-border__halo', 'awa-star-border__halo--top')}
        style={{
          background: `radial-gradient(circle, ${glowColor}, transparent 14%)`,
          animationDuration: speed,
        }}
      />
      <span className={cn('awa-star-border__content', contentClassName)}>{children}</span>
    </Component>
  );
}
