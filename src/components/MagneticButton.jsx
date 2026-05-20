import { useEffect, useRef, useState } from 'react';

export default function MagneticButton({ children, href, className = '', strength = 0.25 }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [isTouchDevice] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  );

  useEffect(() => {
    if (isTouchDevice) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let raf;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let cachedRect = null;
    let lastMoveTime = 0;

    function onEnter() {
      cachedRect = outer.getBoundingClientRect();
    }

    function onMove(e) {
      const now = performance.now();
      if (now - lastMoveTime < 16) return;
      lastMoveTime = now;

      if (!cachedRect) cachedRect = outer.getBoundingClientRect();
      tx = (e.clientX - cachedRect.left - cachedRect.width / 2) * strength;
      ty = (e.clientY - cachedRect.top - cachedRect.height / 2) * strength;
      if (!raf) loop();
    }

    function onLeave() {
      tx = 0; ty = 0;
      cachedRect = null;
      if (!raf) loop();
    }

    function loop() {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      inner.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
        inner.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
    }

    outer.addEventListener('mouseenter', onEnter);
    outer.addEventListener('mousemove', onMove);
    outer.addEventListener('mouseleave', onLeave);
    return () => {
      outer.removeEventListener('mouseenter', onEnter);
      outer.removeEventListener('mousemove', onMove);
      outer.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, isTouchDevice]);

  if (isTouchDevice) {
    return <a href={href} className={className}>{children}</a>;
  }

  return (
    <span ref={outerRef} style={{ display: 'inline-block' }}>
      <span ref={innerRef} style={{ display: 'inline-block', willChange: 'transform' }}>
        <a href={href} className={className}>{children}</a>
      </span>
    </span>
  );
}
