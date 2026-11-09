import React, { useEffect, useRef } from 'react';

export const CursorSpotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isVisible = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = '1';
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
    };

    const loop = () => {
      // Lerp interpolation (smoothing factor 0.12)
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX - 225}px, ${currentY - 225}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none z-[1] transition-opacity duration-500 opacity-0 will-change-transform"
      style={{
        background: 'radial-gradient(circle, rgba(112, 168, 59, 0.14) 0%, rgba(107, 142, 35, 0.05) 45%, transparent 70%)',
        filter: 'blur(30px)',
      }}
      aria-hidden="true"
    />
  );
};
