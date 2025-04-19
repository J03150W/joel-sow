"use client";
import Carousel from "../components/carousel";
import { useLanguage } from "../../context/LanguageContext";
import Image from "next/image";

const sectionTitles = {
  about: {
    en: "About me",
    de: "Über mich",
  },
  traits: {
    en: "Traits",
    de: "Kenntnisse",
  },
  hobbies: {
    en: "Interests",
    de: "Interessen",
  },
  contact: {
    en: "Contact",
    de: "Kontakt",
  },
};

const aboutMeText = {
  en: `I am motivated and use my creativity to solve technical challenges in my own way, whether in code or design. Technology inspires me every day, but at the same time, interacting with people is important to me. I enjoy working in a team and feel comfortable in social situations.`,
  de: `Ich bin motiviert und setze meine Kreativität gezielt ein, um technische Herausforderungen auf eigene Art zu lösen, ob im Code oder im Design. Technik begeistert mich jeden Tag, gleichzeitig ist mir der Austausch mit Menschen wichtig. Ich arbeite gerne im Team und finde mich in sozialen Situationen wohl.`,
};

const hobbiesText = {
  en: `Programming, Gaming, Music, Fashion, Soccer, Fitness, Camping, Traveling `,
  de: `Programmieren, Gaming, Musik, Fashion, Fussball, Fitness, Camping, Reisen`,
};

const links = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/joel-sow-a24051220/",
    icon: "/icons/linkedin.svg",
  },
  {
    name: "GitHub",
    link: "https://github.com/J03150W",
    icon: "/icons/github.svg",
  },
  {
    name: "Email",
    link: "mailto:joelsow247@gmail.com",
    icon: "/icons/email.svg",
  },
];

export default function About() {
  const { lang } = useLanguage();

  return (
    <div className="w-5xl mx-auto mb-6 flex justify-between gap-6  bg-[#f6f0e1]/50 backdrop-blur-sm rounded-xl">
      <div className="flex-shrink-0 w-[360px] mt-12">
        <Carousel />
      </div>

      <div className="flex flex-col gap-8 w-[calc(100%-380px)] p-4 ">
        <div>
          <h2 className="text-4xl font-bold text-[#4b4b3b] mb-4">
            {sectionTitles.about[lang]}
          </h2>
          <p className="text-lg leading-relaxed text-[#2e2e2e]">
            {aboutMeText[lang]}
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#4b4b3b] mb-2">
            {sectionTitles.hobbies[lang]}
          </h3>
          <p className="text-lg text-[#2e2e2e]">{hobbiesText[lang]}</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#4b4b3b] mb-2">
            {sectionTitles.contact[lang]}
          </h3>
          <div className="flex gap-1 items-center">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 p-1 rounded-md flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Image
                  src={link.icon}
                  alt={link.name}
                  width={32}
                  height={32}
                  className={`object-contain ${
                    link.name === "Email" ? "scale-125" : ""
                  }`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
