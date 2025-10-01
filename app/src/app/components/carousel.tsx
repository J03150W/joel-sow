"use client";
import { useState } from "react";

const media = [
  { type: "image", src: "/media/luna.jpeg" },
  { type: "image", src: "/media/football.png" },
  { type: "image", src: "/media/sunset.jpeg" },
  { type: "video", src: "/media/camping.mp4" },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const current = media[index];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-[14rem] md:max-w-[24rem] 2xl:max-w-[32rem] mx-auto">
        <button
          className="text-[#4b4b3b] text-2xl md:text-3xl font-bold px-2 py-1 hover:scale-110 transition-transform"
          onClick={() => setIndex((index - 1 + media.length) % media.length)}
        >
          &lt;
        </button>

        <div className="relative w-full aspect-[3/4] max-h-[32rem] overflow-hidden flex items-center justify-center bg-white shadow-lg">
          {current.type === "image" ? (
            <img
              src={current.src}
              className="w-full h-full object-cover"
              alt="carousel"
            />
          ) : (
            <video
              src={current.src}
              className="w-full h-full object-cover"
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              preload="metadata"
            />
          )}
        </div>

        <button
          className="text-[#4b4b3b] text-2xl md:text-3xl font-bold px-2 py-1 hover:scale-110 transition-transform"
          onClick={() => setIndex((index + 1) % media.length)}
        >
          &gt;
        </button>
      </div>

      <div className="flex gap-2 mt-2">
        {media.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? "bg-[#4b4b3b]" : "bg-[#4b4b3b]/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
