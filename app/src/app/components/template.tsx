"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import FakeSong from "./musicPlayer";
import { useAudioPlayer } from "./audioPlayer";
import Sidebar from "./sidebar";

function useSectionObserver(setActiveSection: (id: string) => void) {
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("div[id]");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.current?.observe(section);
    });

    return () => observer.current?.disconnect();
  }, [setActiveSection]);
}

export default function Template({ children }: { children: React.ReactNode }) {
  const [showUI, setShowUI] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const player = useAudioPlayer();
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useSectionObserver(setActiveSection);

  useEffect(() => {
    const handleResize = () => {
      setHasScrollbar(
        document.documentElement.scrollHeight > window.innerHeight
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative bg-[#101010] dark:bg-[#202020]">
      <div className="md:block fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="md:block fixed top-16 left-0 w-full z-40">
        <Sidebar activeSection={activeSection} />
      </div>
      <div>
        {/* <audio
          ref={player.audioRef}
          src={player.currentSong.src}
          preload="auto"
        />

        {!showUI && (
          <button
            onClick={() => setShowUI(true)}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <img src="/icons/music.svg" alt="music" width={32} height={32} />
          </button>
        )}

        {showUI && (
          <FakeSong showClose onClose={() => setShowUI(false)} {...player} />
        )} */}

        <main className="relative z-10">{children}</main>

        <div
          id="portal-root"
          className="z-[10001] fixed inset-0 pointer-events-none"
        />
      </div>
    </div>
  );
}
