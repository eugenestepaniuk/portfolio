import { useMemo, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children?: ReactNode;
  /** Element type to render (div, h1, nav, p, ...). */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

export default function FadeIn({
  children,
  as = 'div',
  className,
  style,
  id,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const MotionTag = useMemo(() => motion.create(as), [as]);

  return (
    <MotionTag
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
