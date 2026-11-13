import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  threshold = 0.15,
  className = '',
  as: Component = 'div',
  ...rest
}) {
  const [ref, isVisible] = useScrollReveal({ threshold });

  const getAnimationStyles = () => {
    // Base inline styles for hardware-accelerated transforms
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return {
            opacity: 0,
            transform: 'translate3d(0, 36px, 0)',
            transition: baseTransition,
            willChange: 'opacity, transform',
          };
        case 'fade-down':
          return {
            opacity: 0,
            transform: 'translate3d(0, -36px, 0)',
            transition: baseTransition,
            willChange: 'opacity, transform',
          };
        case 'slide-left':
          return {
            opacity: 0,
            transform: 'translate3d(40px, 0, 0)',
            transition: baseTransition,
            willChange: 'opacity, transform',
          };
        case 'slide-right':
          return {
            opacity: 0,
            transform: 'translate3d(-40px, 0, 0)',
            transition: baseTransition,
            willChange: 'opacity, transform',
          };
        case 'zoom-in':
          return {
            opacity: 0,
            transform: 'scale3d(0.92, 0.92, 1)',
            transition: baseTransition,
            willChange: 'opacity, transform',
          };
        case 'fade-in':
        default:
          return {
            opacity: 0,
            transform: 'none',
            transition: baseTransition,
            willChange: 'opacity',
          };
      }
    }

    return {
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
      transition: baseTransition,
      willChange: 'opacity, transform',
    };
  };

  return (
    <Component
      ref={ref}
      style={getAnimationStyles()}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
