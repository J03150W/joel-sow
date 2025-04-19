"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const outPutText = {
  en: "Welcome to my CV!",
  de: "Willkommen zu meinem Lebenslauf!",
};

export default function Terminal() {
  const { lang } = useLanguage();
  const [typedCommand, setTypedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const command = "ls".split("");
    let i = 0;

    const startTyping = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < command.length) {
          const nextChar = command[i];
          setTypedCommand((prev) => prev + nextChar);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowOutput(true), 500);
        }
      }, 200);
    }, 2000);

    return () => clearTimeout(startTyping);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] flex justify-center items-start pt-24 font-mono text-lg mt-6">
      <div className="bg-[#f6f0e1]/50 border border-[#8D5B44] shadow-md rounded-md p-4 w-[100%] max-w-4xl">
        {/* Terminal header */}
        <div className="text-[#657b83] mb-2">
          <span className="text-green-600">user@machine</span>:
          <span className="text-yellow-600">~/cv/joel-sow</span>
          <span className="text-cyan-600"> (main)</span>
        </div>

        <div className="whitespace-pre">
          <span>$ </span>
          <span>{typedCommand}</span>
          {!showOutput && <span className="animate-blink">|</span>}
        </div>

        {showOutput && <div className="pt-1">{outPutText[lang]}</div>}
      </div>
    </div>
  );
}
