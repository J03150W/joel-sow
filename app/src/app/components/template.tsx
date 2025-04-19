"use client";
import { useState } from "react";
import Navbar from "./navbar";
import FakeSong from "./musicPlayer";
import { useAudioPlayer } from "./audioPlayer";

export default function Template({ children }: { children: React.ReactNode }) {
  const [showUI, setShowUI] = useState(false);
  const player = useAudioPlayer();

  return (
    <div className="relative min-h-screen bg-[#F6F0E1] overflow-hidden">
      <div className="fixed bottom-0 left-0 w-full z-0 pointer-events-none select-none">
        <img src="/backgroundGrass.png" alt="Grass" className="w-full h-auto" />
      </div>

      <div className="fixed top-0 left-0 w-full z-40">
        <Navbar />
      </div>

      <div>
        <audio
          ref={player.audioRef}
          src={player.currentSong.src}
          preload="auto"
        />

        {!showUI && (
          <button
            onClick={() => setShowUI(true)}
            className="fixed bottom-6 left-6 z-[9999] w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <img src="/icons/music.svg" alt="music" width={32} height={32} />
          </button>
        )}

        {showUI && (
          <FakeSong showClose onClose={() => setShowUI(false)} {...player} />
        )}

        {/* Content */}
        <main className="relative z-10 pt-16 custom-scroll overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
