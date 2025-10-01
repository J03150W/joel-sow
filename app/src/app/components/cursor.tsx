import React, { useEffect, useRef, useState } from "react";

interface CursorFollowerProps {
  size?: number;
  color?: string;
  delay?: number; // Lower = faster following, higher = more delay
  opacity?: number;
  zIndex?: number;
  fadeDuration?: number; // Duration of fade transition in ms
}

export default function Cursor({
  size = 12,
  color = "#10b981", // Tailwind green-500
  delay = 0.1,
  opacity = 0.8,
  zIndex = 9999,
  fadeDuration = 300,
}: CursorFollowerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentOpacity, setCurrentOpacity] = useState(0);
  const ballRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout>(null);
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) {
        setIsVisible(true);
        // Start with 0 opacity and fade in
        setCurrentOpacity(0);
        // Use setTimeout to ensure the element is rendered before starting fade
        setTimeout(() => setCurrentOpacity(opacity), 0);
      }
    };

    const handleMouseLeave = () => {
      // Start fade out
      setCurrentOpacity(0);

      // Clear any existing timeout
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }

      // Hide completely after fade duration
      fadeTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, fadeDuration);
    };

    const handleMouseEnter = () => {
      // Clear hide timeout if mouse re-enters during fade
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }

      if (!isVisible) {
        setIsVisible(true);
        // Start with 0 opacity and fade in
        setCurrentOpacity(0);
        setTimeout(() => setCurrentOpacity(opacity), 0);
      } else {
        setCurrentOpacity(opacity);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [isVisible, opacity, fadeDuration]);

  useEffect(() => {
    const animate = () => {
      if (!ballRef.current) return;

      // Smooth interpolation (lerp) for delayed following
      currentPos.current.x += (mousePosition.x - currentPos.current.x) * delay;
      currentPos.current.y += (mousePosition.y - currentPos.current.y) * delay;

      // Apply transform to the ball
      ballRef.current.style.transform = `translate3d(${
        currentPos.current.x - size / 2
      }px, ${currentPos.current.y - size / 2}px, 0)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isVisible) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, delay, size, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={ballRef}
      className="pointer-events-none fixed rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        opacity: currentOpacity,
        zIndex,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        mixBlendMode: "normal",
        boxShadow: `0 0 ${size / 2}px ${color}40`, // Subtle glow effect
        transition: `opacity ${fadeDuration}ms ease-out`,
      }}
    />
  );
}
