'use client';

import { useEffect, useState } from 'react';

export default function FollowingDog() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      const targetX = e.clientX;
      const targetY = e.clientY;

      // Smooth following animation
      const animate = () => {
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        
        // Easing factor (lower = smoother but slower)
        currentX += dx * 0.1;
        currentY += dy * 0.1;

        setPosition({ x: currentX, y: currentY });

        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(animate);
      
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="following-dog"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div style={{ fontSize: '32px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
        🐕
      </div>
    </div>
  );
}
