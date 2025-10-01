"use client";
import React, { useEffect, useRef, useState } from "react";
import BlobCursor from "../../components/BlobCursor/BlobCursor";
import Loader from "../components/loader";
import Template from "../components/template";
import Experience from "../experience/page";
import Timeline from "../components/timeline";
import Skills from "../skills/page";
import { TextReveal } from "@/components/magicui/text-reveal";
import Ballpit from "@/components/Ballpit/Ballpit";
import DecryptedText from "@/components/DecryptedText";
import SplitText from "@/components/SplitText/SplitText";
import Waves from "@/components/Waves/Waves";
import Silk from "@/components/Silk/Silk";
import { useLanguage } from "@/context/LanguageContext";
import Cursor from "../components/cursor";
import { LayoutGrid } from "../components/layout";
import SkillsPage from "../skills/page";
import Projects from "../projects/page";

const description = {
  en: "HI, I'M A 19-YEAR-OLD JUNIOR DEVELOPER BASED IN ZÜRICH, FOCUSED ON LEARNING NEW TECHNOLOGIES AND USING THEM TO SOLVE REAL-WORLD PROBLEMS. SCROLL TO EXPLORE MY CV.",
  de: "HI, ICH BIN EIN 19-JÄHRIGER JUNIOR-ENTWICKLER AUS ZÜRICH, DER SICH DARAUF KONZENTRIERT, NEUE TECHNOLOGIEN ZU LERNEN UND DAMIT REALE PROBLEME ZU LÖSEN. SCROLL, UM MEINEN LEBENSLAUF ZU ENTDECKEN.",
};

export default function NewPage() {
  const { lang } = useLanguage();
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track scrollY and direction for animation
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(true);

  // Smooth animation with lerp
  const animRef = useRef({ currentScroll: 0 });

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
      // Different lerp values for scroll directions
      const lerpFactor = isScrollingDown.current ? 0.03 : 0.08; // Slower when scrolling down, faster when up

      animRef.current.currentScroll +=
        (scrollY - animRef.current.currentScroll) * lerpFactor;

      const scroll = animRef.current.currentScroll;

      const maxScroll = 800; // Balanced max scroll distance
      const progress = Math.min(scroll / maxScroll, 1);

      // Use original max values for full effect
      const maxTranslateX = 100; // px
      const maxTranslateY = -100; // px
      const maxScaleChange = 0.3;
      const maxRotate = 10; // degrees

      // Round translate values to avoid pixelation on edges
      const translateX = Math.round(maxTranslateX * progress);
      const translateY = Math.round(maxTranslateY * progress);
      const scale = 1 - maxScaleChange * progress;
      const rotate = -maxRotate * progress; // flipped rotation to other side

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
      <div className="dark:bg-[#2b2b2b] relative">
        {/* Loader only covers content temporarily 
        {showLoader && (
          <div
            className={`fixed inset-0 z-60 flex items-center justify-center bg-[#2b2b2b] transition-opacity duration-1000 ${
              fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <Loader />
          </div>
        )}*/}

        <div
          id="home"
          data-blob-active
          className="relative z-20 flex flex-col h-screen overflow-hidden"
        >
          {/* Silk background always showing */}
          <div
            ref={backgroundRef}
            className="absolute inset-0 origin-top-left"
            style={{
              width: "100vw",
              height: "100vh",
              transformOrigin: "top left",
            }}
          >
            {/*<Silk />*/}
          </div>

          {/* Text content appears only after loader disappears */}
          <div
            ref={contentRef}
            className={`relative z-20 w-full h-full origin-top-left transition-opacity duration-1000 ${
              showLoader ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{ transformOrigin: "top left" }}
          >
            <BlobCursor blobType="circle" fillColor="#ffffff" />

            {/* Centered Welcome Text */}
            <div className="flex items-center justify-center h-full w-full">
              <div
                className="flex flex-row justify-center items-center text-white font-bold italic"
                style={{ fontFamily: "Switzer, sans-serif" }}
              >
                <p className="text-[150px]">Welc</p>
                <p id="o" className="text-[150px]">
                  o
                </p>
                <p className="text-[150px]">me</p>
              </div>
              <SplitText
                text="scroll to explore"
                className="text-2xl font-semibold text-center absolute bottom-40 text-white"
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
              />
            </div>
          </div>
        </div>
      </div>
      <Timeline />
      <div
        id="skills"
        className="bg-[#2b2b2b] h-screen flex items-center justify-center"
      ></div>
      <div
        id="about"
        className="bg-[#2b2b2b] h-screen flex items-center justify-center"
      ></div>
    </Template>
  );
}
