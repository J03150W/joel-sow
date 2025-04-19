"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const toggleLangMenu = () => setShowLangMenu((prev) => !prev);

  return (
    <div className="h-16 flex bg-[#f6f0e1] items-center justify-between px-4 relative z-50">
      <Link
        href="/"
        className="text-4xl font-bold text-[#3e3e2e]"
        style={{ fontFamily: "Switzer, sans-serif" }}
      >
        Joel Sow
      </Link>

      <div className="relative">
        <button onClick={toggleLangMenu}>
          <Image
            className="rounded-full object-cover"
            src="/black-cat.gif"
            alt="Profile Picture"
            width={40}
            height={40}
          />
        </button>

        {showLangMenu && (
          <div className="absolute right-0 mt-2 w-24 bg-[#f4ebd3] rounded-lg shadow-lg p-2 z-50">
            <button
              onClick={() => {
                setLang("de");
                setShowLangMenu(false);
              }}
              className={`block w-full text-left px-2 py-1 rounded hover:bg-[#e5daba] ${
                lang === "de" ? "font-bold" : "opacity-80"
              }`}
            >
              De
            </button>
            <button
              onClick={() => {
                setLang("en");
                setShowLangMenu(false);
              }}
              className={`block w-full text-left px-2 py-1 rounded hover:bg-[#e5daba] ${
                lang === "en" ? "font-bold" : "opacity-80"
              }`}
            >
              En
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
