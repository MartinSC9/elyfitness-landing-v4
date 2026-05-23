import { useState, useEffect } from 'react';

export default function FlipWords({
  words = [],
  duration = 2400,
  colors = ['#D9A3FF', '#c084fc'],
}) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % words.length);
        setIsExiting(false);
      }, 400);
    }, duration);
    return () => clearTimeout(timer);
  }, [index, duration, words.length]);

  return (
    <span
      className={`inline-block transition-all duration-400 ease-in-out ${isExiting ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}
      style={{ color: colors[0] }}
    >
      {words[index]}
    </span>
  );
}
