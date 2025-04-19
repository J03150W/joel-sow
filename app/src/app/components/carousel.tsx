"use client";
import { useState } from "react";

const media = [
  { type: "image", src: "/media/lego.jpeg" },
  { type: "image", src: "/media/luna.jpeg" },
  { type: "image", src: "/media/football.png" },
  { type: "image", src: "/media/sunset.jpeg" },
  { type: "video", src: "/media/camping.mp4" },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev - 1 + media.length) % media.length);
  const next = () => setIndex((prev) => (prev + 1) % media.length);

  const current = media[index];

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto">
      <div className="flex items-center gap-4 w-full">
        <button
          onClick={prev}
          className="text-[#4b4b3b] text-3xl font-bold px-2 py-1 rounded hover:scale-110 transition-transform"
        >
          &lt;
        </button>

        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden flex items-center justify-center bg-white shadow-lg">
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
          onClick={next}
          className="text-[#4b4b3b] text-3xl font-bold px-2 py-1 rounded hover:scale-110 transition-transform"
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
