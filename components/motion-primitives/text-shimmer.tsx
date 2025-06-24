'use client';
import React, { useMemo, type JSX } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export type TextShimmerProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
};

function TextShimmerComponent({
  children,
  as: Component = 'span',
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );

  const dynamicSpread = useMemo(() => {
    return Math.max(children.length * spread, 20);
  }, [children, spread]);

  return (
    <MotionComponent
      className={cn(
        'relative inline-block bg-[length:200%_100%] bg-clip-text',
        'text-transparent',
        '[background-repeat:no-repeat] [--bg:linear-gradient(90deg,transparent_calc(50%-var(--spread)),currentColor,transparent_calc(50%+var(--spread)))]',
        'bg-gradient-to-r from-transparent via-current to-transparent',
        className
      )}
      initial={{ backgroundPosition: '-200% center' }}
      animate={{ backgroundPosition: '200% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `linear-gradient(90deg, transparent calc(50% - ${dynamicSpread}px), currentColor, transparent calc(50% + ${dynamicSpread}px))`,
        } as React.CSSProperties
      }
    >
      {children}
    </MotionComponent>
  );
}

export const TextShimmer = React.memo(TextShimmerComponent);
