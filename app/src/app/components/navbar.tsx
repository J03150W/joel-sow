"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [needsMargin, setNeedsMargin] = useState(false);

  useEffect(() => {
    const checkScrollbar = () => {
      const hasScrollbar =
        window.innerWidth > document.documentElement.clientWidth;
      setNeedsMargin(!hasScrollbar);
    };

    const timer = setTimeout(() => {
      checkScrollbar();
      window.addEventListener("resize", checkScrollbar);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScrollbar);
    };
  }, []);

  const toggleLangMenu = () => setShowLangMenu((prev) => !prev);

  return (
    <div
      className="h-16 flex bg-white/50 backdrop-blur-md items-center justify-between px-4 w-full"
      style={{ marginRight: needsMargin ? "16px" : "0" }}
    >
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
        <Link
          href="#home"
          className="text-2xl italic text-[#3e3e2e] absolute left-4"
          style={{ fontFamily: "Switzer, sans-serif" }}
        >
          joel sow
        </Link>

        <div className="absolute right-4">
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
            <div className="absolute right-0 mt-2 w-24 bg-[#ebebeb]/70 backdrop-blur-md rounded-lg shadow-lg p-2 z-50 overflow-hidden">
              <div className="absolute inset-0 bg-[#ebebeb]/40 backdrop-blur-xl" />
              <button
                onClick={() => {
                  setLang("de");
                  setShowLangMenu(false);
                }}
                className={`italic block w-full text-left px-2 py-1 rounded hover:bg-[#cdcdcd]/80 relative z-10 ${
                  lang === "de" ? "font-bold" : "opacity-80"
                }`}
                style={{ fontFamily: "Switzer, sans-serif" }}
              >
                de
              </button>
              <button
                onClick={() => {
                  setLang("en");
                  setShowLangMenu(false);
                }}
                className={`italic block w-full text-left px-2 py-1 rounded hover:bg-[#cdcdcd]/80 relative z-10 ${
                  lang === "en" ? "font-bold" : "opacity-80"
                }`}
                style={{ fontFamily: "Switzer, sans-serif" }}
              >
                en
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
