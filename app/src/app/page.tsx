"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import BlobCursor from "@/components/BlobCursor/BlobCursor";
import SplitText from "@/components/SplitText/SplitText";
import Template from "./components/template";
import Timeline from "./components/timeline";
import Loader from "./components/loader";
import SkillsPage from "./skills/page";

export default function NewPage() {
  const { lang } = useLanguage();
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(true);

  const animRef = useRef({ currentScroll: 0 });

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [showLoader]);

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;
      isScrollingDown.current = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    function animate() {
      const lerpFactor = isScrollingDown.current ? 0.03 : 0.08;

      animRef.current.currentScroll +=
        (scrollY - animRef.current.currentScroll) * lerpFactor;

      const scroll = animRef.current.currentScroll;

      const maxScroll = 800;
      const progress = Math.min(scroll / maxScroll, 1);

      const maxTranslateX = 100;
      const maxTranslateY = -100;
      const maxScaleChange = 0.3;
      const maxRotate = 10;

      const translateX = Math.round(maxTranslateX * progress);
      const translateY = Math.round(maxTranslateY * progress);
      const scale = 1 - maxScaleChange * progress;
      const rotate = -maxRotate * progress;

      const transform = `
        translate3d(${translateX}px, ${translateY}px, 0)
        scale(${scale})
        rotate(${rotate}deg)
      `;

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = transform;
        backgroundRef.current.style.transformOrigin = "top left";
        backgroundRef.current.style.willChange = "transform";
        backgroundRef.current.style.backfaceVisibility = "hidden";
        backgroundRef.current.style.transformStyle = "preserve-3d";
      }

      if (contentRef.current) {
        contentRef.current.style.transform = transform;
        contentRef.current.style.transformOrigin = "top left";
        contentRef.current.style.willChange = "transform";
        contentRef.current.style.backfaceVisibility = "hidden";
        contentRef.current.style.transformStyle = "preserve-3d";
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollY]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowLoader(false), 1000);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Template>
      <div className="relative">
        <div
          id="home"
          data-blob-active
          className="relative z-20 flex flex-col h-screen overflow-hidden"
        >
          <div
            ref={contentRef}
            className="relative z-20 w-full h-full origin-top-left bg-[#202020]"
            style={{ transformOrigin: "top left" }}
          >
            <BlobCursor blobType="circle" fillColor="#717171ff" />

            <div className="h-full w-full">
               <div
                className="relative flex flex-row text-white font-bold italic left-5 top-4/7 2xl:top-4/8"
                style={{ fontFamily: "Switzer, sans-serif" }}
              >
                <p className="text-[250px] 2xl:text-[350px]">welc</p>
                <p id="o" className="text-[250px] 2xl:text-[350px]">
                  o
                </p>
                <p className="text-[250px] 2xl:text-[350px]">me</p>
                {/*<SplitText
                text="scroll to explore"
                className="text-2xl font-semibold text-center absolute bottom-70 2xl:bottom-85 text-white"
                loop={true}
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />*/}
              </div>              
              
            </div>
          </div>

          <div
            ref={backgroundRef}
            className={`fixed inset-0 origin-top-left transition-opacity duration-1000 bg-[#202020] z-50 ${
              fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{
              width: "100vw",
              height: "100vh",
              transformOrigin: "top left",
            }}
          >
            {showLoader && <Loader />}
          </div>
        </div>
      </div>
      <Timeline />
      <SkillsPage />
    </Template>
  );
}
