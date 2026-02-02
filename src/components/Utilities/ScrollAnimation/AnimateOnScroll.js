import React from 'react';
import useScrollAnimation from './useScrollAnimation';

/**
 * AnimateOnScroll Component
 * Wrapper component for easy scroll-triggered animations
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {string} props.animation - Animation class name (e.g., 'fade-slide-up', 'fade-scale')
 * @param {number} props.delay - Animation delay in ms (0-600)
 * @param {number} props.threshold - Visibility threshold (0-1, default 0.1)
 * @param {boolean} props.triggerOnce - Trigger animation only once (default true)
 * @param {string} props.className - Additional CSS classes
 */
const AnimateOnScroll = ({
  children,
  animation = 'fade-slide-up',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  ...rest
}) => {
  const [ref, isVisible] = useScrollAnimation({
    threshold,
    triggerOnce,
    rootMargin: '0px 0px -50px 0px'
  });

  // Build delay class
  const delayClass = delay > 0 ? `animate-delay-${delay}` : '';

  // Combine all classes
  const combinedClasses = [
    animation,
    delayClass,
    isVisible ? 'is-visible' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={combinedClasses} {...rest}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;
