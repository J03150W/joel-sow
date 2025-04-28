"use client";
import { useEffect, useRef, useState } from "react";
import Template from "./components/template";
import Experience from "./experience/page";
import About from "./about/page";
import Skills from "./skills/page";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [follower, setFollower] = useState({ x: 0, y: 0 });
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const welcomeSectionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const speed = 0.1;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      setFollower((prev) => {
        const dx = (mouse.x - prev.x) * speed * (delta / 16);
        const dy = (mouse.y - prev.y) * speed * (delta / 16);
        return {
          x: prev.x + dx,
          y: prev.y + dy,
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mouse]);

  useEffect(() => {
    const handleScroll = () => {
      if (!welcomeSectionRef.current) return;

      const rect = welcomeSectionRef.current.getBoundingClientRect();
      const isVisible =
        rect.top >= -100 && rect.top <= window.innerHeight * 0.25;

      setShowScrollDown(isVisible && !isHoveringTitle);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHoveringTitle]);

  return (
    <Template>
      <div
        className={`text-[#3e3e2e] italic text-md flex items-center justify-center pointer-events-none z-50 transition-opacity duration-300 ease-in-out ${
          showScrollDown ? "opacity-100" : "opacity-0"
        } ${isSmallScreen ? "fixed bottom-2 left-2 text-xl italic" : ""}`}
        style={
          isSmallScreen
            ? {
                fontFamily: "Switzer, sans-serif",
              }
            : {
                left: follower.x,
                top: follower.y,
                position: "fixed",
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
                fontFamily: "Switzer, sans-serif",
                marginTop: "1.25rem",
                marginLeft: "3.75rem",
              }
        }
      >
        scroll down
      </div>

      <div
        id="home"
        ref={welcomeSectionRef}
        className="luxurious h-screen w-screen flex justify-center items-center pb-36 text-5xl lg:text-9xl 2xl:text-[180px]"
        onMouseEnter={() => setShowScrollDown(true)}
        onMouseLeave={() => {
          if (!welcomeSectionRef.current) return;
          const rect = welcomeSectionRef.current.getBoundingClientRect();
          const isVisible =
            rect.top >= -100 && rect.top <= window.innerHeight * 0.25;
          setShowScrollDown(isVisible);
        }}
      >
        <div
          className="flex justify-center items-center"
          onMouseEnter={() => setIsHoveringTitle(true)}
          onMouseLeave={() => setIsHoveringTitle(false)}
          style={{ fontFamily: "Luxurious Script, sans-serif" }}
        >
          Welcome to my CV
        </div>
      </div>
      <Experience />
      <Skills />
      <About />
    </Template>
  );
}
