'use client'

import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Define the type for the component's props
interface ImmersiveHomepageProps {
  onLoadingComplete: () => void;
}

export default function ImmersiveHomepage({ onLoadingComplete }: ImmersiveHomepageProps) {
  // useMotionValue is a special value from Framer Motion that can be animated
  const count = useMotionValue(0);
  
  // useTransform will create a new MotionValue that updates when `count` changes.
  // We use it to round the count to the nearest whole number for display.
  const roundedCount = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    // The `animate` function is a simple way to animate a value over time.
    const controls = animate(count, 100, {
      duration: 2.5, // The animation will last 2.5 seconds
      ease: 'easeInOut',
      onComplete: () => {
        // Wait for a brief moment after reaching 100% before transitioning
        setTimeout(onLoadingComplete, 500);
      },
    });

    // The return function in useEffect is a cleanup function.
    // It stops the animation if the component is unmounted prematurely.
    return () => controls.stop();
  }, [onLoadingComplete, count]);

  return (
    <>
      {/* It's good practice to encapsulate component-specific fonts here */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap');
      `}</style>
      
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          className="relative w-40 h-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* The SVG for the circular progress bar */}
          <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* The background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#282828" // A dark gray for the track
              strokeWidth="5"
            />
            {/* The progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#E0E0E0" // A light gray for the progress
              strokeWidth="5"
              strokeLinecap="round"
              // Animate the path length to create the loading effect
              style={{ pathLength: useTransform(count, [0, 100], [0, 1]) }}
            />
          </svg>

          {/* The percentage text in the center */}
          <motion.p className="text-gray-200 text-4xl font-medium" style={{ fontFamily: "'Roboto Mono', monospace" }}>
            {roundedCount}
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}