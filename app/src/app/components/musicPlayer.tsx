"use client";
import { X } from "lucide-react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

type MusicPlayerProps = {
  showClose?: boolean;
  onClose?: () => void;
  currentSong: {
    title: string;
    artist: string;
    cover: string;
    background: string;
    artistColor: string;
    progressBarColor: string;
  };
  isPlaying: boolean;
  progress: number;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (percent: number) => void;
};

export default function musicPlayer({
  showClose,
  onClose,
  currentSong,
  isPlaying,
  progress,
  toggle,
  next,
  prev,
  seek,
}: MusicPlayerProps) {
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    seek(percent);
  };

  const { title, artist, cover, background, artistColor, progressBarColor } =
    currentSong;

  return (
    <div
      className="fixed bottom-6 left-6 z-[9999] flex items-center p-4 rounded-2xl shadow-xl w-[340px] sm:w-[380px]"
      style={{ backgroundColor: background }}
    >
      <img
        src={cover}
        alt={title}
        className="w-25 h-25 rounded-lg object-cover"
      />

      <div className="flex flex-col flex-1 ml-4">
        <div>
          <h2 className="text-lg text-white font-bold">{title}</h2>
          <p className="text-sm" style={{ color: artistColor }}>
            {artist}
          </p>
        </div>

        <div
          onClick={handleSeek}
          className="relative w-full h-[6px] mt-3 rounded cursor-pointer"
          style={{ backgroundColor: progressBarColor }}
        >
          <div
            className="absolute top-0 left-0 h-full rounded"
            style={{ width: `${progress}%`, backgroundColor: "#fff" }}
          />
        </div>

        <div className="flex items-center justify-center gap-5 mt-3 text-xl text-white">
          <button onClick={prev} className=" cursor-pointer">
            <FaStepBackward />
          </button>
          <button
            onClick={toggle}
            className="text-2xl hover:scale-110 transition-transform cursor-pointer"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={next} className=" cursor-pointer">
            <FaStepForward />
          </button>
        </div>
      </div>

      {showClose && onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:scale-110 transition-transform cursor-pointer"
          aria-label="Close player"
        >
          <X size={18} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
