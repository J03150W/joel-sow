"use client";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import NoStrictPortal from "../components/noStrictPortal";

const skills = [
  {
    title: "Frontend",
    desc: {
      en: `When developing frontends, my focus is on creating user-friendly and intuitive interfaces. Good design shouldn't make users think – it should feel natural and effortless.

I work best with an existing design, as it allows me to focus directly on clean and efficient implementation. If no design is provided, I create a suitable interface myself. My background in design helps me build solutions that are both functional and visually appealing.

I prefer working with TypeScript – especially in React or Angular. I've gained extensive experience with both frameworks through a wide range of projects and know how to build stable, modern frontends with them.`,
      de: `Beim Frontend-Entwickeln ist mir wichtig, eine benutzerfreundliche und intuitive Oberfläche zu schaffen. Ein gutes Design soll den Nutzer nicht zum Nachdenken bringen – es soll sich einfach natürlich anfühlen.

Ich arbeite am besten mit einem bestehenden Design, da ich mich so direkt auf eine saubere und effiziente Umsetzung konzentrieren kann. Ist kein Design vorhanden, entwickle ich eigenständig ein passendes Interface. Mein gestalterischer Hintergrund unterstützt mich dabei, funktionale und visuell ansprechende Lösungen zu schaffen.

Am liebsten entwickle ich mit TypeScript – besonders in React oder Angular. Mit beiden Frameworks habe ich über viele Projekte hinweg tiefe Erfahrung gesammelt und weiss, wie man damit stabile und moderne Frontends umsetzt.`,
    },

    quote: '"Don’t make the user think." - Steve Krug',
    prefered: [
      { name: "HTML", logo: "logos/html.png" },
      { name: "Typescript", logo: "logos/typescript.png" },
      { name: "tailwindcss", logo: "logos/tailwindcss.png" },
      { name: "React", logo: "logos/react.png" },
      { name: "Next.js", logo: "logos/nextJs.png" },
    ],
    extra: [
      { name: "Javascript", logo: "logos/javascript.png" },
      { name: "Angular", logo: "logos/angular.png" },
    ],
  },
  {
    title: "Backend",
    desc: {
      en: `When working on the backend, I focus on keeping the code as simple and clear as possible. It should be easy to understand, not unnecessarily complex or bloated.

Most of my experience is with Java and Spring Boot – well-established, stable, and reliable. At the same time, I'm always curious about new technologies. I quickly took a liking to Kotlin and have already used it, along with Java, in several client projects.

Testing and logging are equally important to me. Not just to improve my own workflow, but to make things easier for my teammates as well.`,
      de: `Beim Backend-Entwickeln ist mir wichtig, den Code so einfach und klar wie möglich zu halten. Er soll verständlich sein, nicht unnötig verschachtelt oder aufgebläht.

Ich habe die meiste Erfahrung mit Java und Spring Boot – bekannt, stabil, zuverlässig. Gleichzeitig interessiere ich mich sehr für neue Technologien. Kotlin zum Beispiel hat mir direkt gefallen, und ich konnte es – genau wie Java – bereits in mehreren Kundenprojekten einsetzen.

Testing und Logging gehören für mich genauso dazu. Nicht nur, weil es meinen Workflow verbessert, sondern weil ich auch meinen Teamkollegen damit das Leben leichter machen will.`,
    },
    quote:
      '"Code is like humor. When you have to explain it, it’s bad." - Cory House',
    prefered: [
      { name: "Kotlin", logo: "logos/kotlin.png" },
      { name: "Spring Boot", logo: "logos/spring-boot.png" },
      { name: "JUnit", logo: "logos/JUnit.png" },
    ],
    extra: [
      { name: "Java", logo: "logos/java.png" },
      { name: "Python", logo: "logos/python.png" },
      { name: "Javascript", logo: "logos/javascript.png" },
      { name: "Node.js", logo: "logos/nodeJs.png" },
    ],
  },
  {
    title: "Else",
    desc: "",
    quote: "",
    prefered: [],
    extra: [],
  },
];

const techStackTitles = {
  prefered: {
    en: "Preferred Techstack",
    de: "Bevorzugter Techstack",
  },
  extra: {
    en: "Additional Technologies",
    de: "Weitere Technologien",
  },
};

interface Tech {
  name: string;
  logo: string;
}

interface Props {
  title: string;
  desc: Record<string, string>;
  quote: string;
  prefered: Tech[];
  extra: Tech[];
  onClose: () => void;
  isClosing?: boolean;
}

const SkillSection = ({
  title,
  desc,
  quote,
  prefered,
  extra,
  onClose,
  isClosing = false,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startScrollTopRef = useRef(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const content = contentRef.current;
    const thumb = thumbRef.current;
    const scrollbar = scrollbarRef.current;

    if (!content || !thumb || !scrollbar) return;

    const ARROW_HEIGHT = 20;
    const SCROLLBAR_WIDTH = 14;
    const THUMB_WIDTH = 8;

    const updateThumbPosition = () => {
      const { scrollTop, scrollHeight, clientHeight } = content;
      const trackHeight = scrollbar.clientHeight - 2 * ARROW_HEIGHT;
      const thumbHeight = Math.max(
        30,
        (clientHeight / scrollHeight) * trackHeight
      );

      const maxScrollTop = scrollHeight - clientHeight;
      const scrollRatio = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
      const thumbTop = ARROW_HEIGHT + scrollRatio * (trackHeight - thumbHeight);

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.top = `${thumbTop}px`;
      thumb.style.width = `${THUMB_WIDTH}px`;
      thumb.style.left = `${(SCROLLBAR_WIDTH - THUMB_WIDTH) / 2}px`;
    };

    const handleScroll = (e: Event) => {
      e.preventDefault();
      updateThumbPosition();
    };

    const handleWheel = (e: WheelEvent) => {
      if (content) {
        content.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };

    const handleThumbMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isDraggingRef.current = true;
      startYRef.current = e.clientY;
      startScrollTopRef.current = content.scrollTop;
      document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !content || !thumb) return;
      e.preventDefault();

      const trackHeight = scrollbar.clientHeight - 2 * ARROW_HEIGHT;
      const thumbHeight = parseInt(thumb.style.height);
      const deltaY = e.clientY - startYRef.current;
      const scrollRatio = deltaY / (trackHeight - thumbHeight);

      content.scrollTop = Math.min(
        startScrollTopRef.current +
          scrollRatio * (content.scrollHeight - content.clientHeight),
        content.scrollHeight - content.clientHeight
      );
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      isDraggingRef.current = false;
      document.body.style.userSelect = "";
    };

    updateThumbPosition();

    content.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });
    thumb.addEventListener("mousedown", handleThumbMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      content.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      thumb.removeEventListener("mousedown", handleThumbMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="fixed right-0 top-0 h-full w-full max-w-2xl 2xl:max-w-4xl bg-[#3b3b3b] shadow-xl z-[10001] overflow-hidden"
        style={{
          animation: isClosing
            ? "slideOutToLeft 2s cubic-bezier(0.2, 0.8, 0.3, 1) forwards"
            : "slideInFromLeft 1s cubic-bezier(0.2, 0.8, 0.3, 1) forwards",
        }}
      >
        <div className="h-full flex">
          <div
            ref={contentRef}
            className="h-full overflow-y-auto px-6 py-6 flex-1 
            [scrollbar-width:none] [-ms-overflow-style:none]
            [-webkit-scrollbar]:hidden"
          >
            <div className="flex items-center justify-between">
              <h2
                className="italic text-2xl 2xl:text-4xl text-white"
                style={{ fontFamily: "Switzer, sans-serif" }}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 hover:scale-105 focus:outline-none p-1 cursor-pointer md:mr-3"
                aria-label="Close"
              >
                <span className="block relative w-6 h-6">
                  <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2 rotate-45"></span>
                  <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2 -rotate-45"></span>
                </span>
              </button>
            </div>
            <p
              className="text-4xl 2xl:text-6xl max-w-xl 2xl:max-w-3xl italic text-[#e0e0c7] mt-2 "
              style={{ fontFamily: "Switzer, sans-serif" }}
            >
              {quote}
            </p>
            <p
              className="text-md 2xl:text-2xl mt-4 whitespace-pre-line mb-4 text-white"
              style={{ fontFamily: "Switzer, sans-serif" }}
            >
              {desc[lang]}
            </p>
            {title !== "Else" && (
              <>
                <div className="mb-20">
                  <h4 className="text-xl 2xl:text-3xl font-semibold mb-4 text-white">
                    {techStackTitles.prefered[lang]}
                  </h4>

                  <div className="flex flex-wrap gap-4 h-7 mb-10 2xl:mb-16">
                    {prefered.map((tech) => {
                      return (
                        <img
                          key={tech.name}
                          src={tech.logo}
                          className="h-12 md:h-15 2xl:h-20 w-auto hover:scale-110"
                        />
                      );
                    })}
                  </div>
                  <p className="text-xl 2xl:text-3xl font-semibold mb-4 text-white">
                    {techStackTitles.extra[lang]}
                  </p>
                  <div className="flex flex-wrap gap-4 h-7">
                    {extra.map((tech) => {
                      return (
                        <img
                          key={tech.name}
                          src={tech.logo}
                          className="h-12 md:h-15 2xl:h-20 w-auto hover:scale-110"
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {title === "Else" && <p className="text-white">Coming Soon</p>}
          </div>
        </div>
      </div>
      <div
        ref={scrollbarRef}
        className="fixed right-0 top-0 h-full w-[var(--scrollbar-width)] 
            bg-gray-100 z-[10002] flex-col hidden md:flex"
      >
        <div
          className="w-full h-4 flex items-center justify-center cursor-pointer hover:bg-gray-300"
          onClick={() =>
            contentRef.current?.scrollBy({ top: -50, behavior: "smooth" })
          }
        >
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-gray-500" />
        </div>
        <div>
          <div
            ref={thumbRef}
            className="absolute bg-[#8B8B8B] rounded hover:bg-[#636363] active:bg-[#636363]"
          />
        </div>
        <div
          className="w-full h-4 flex items-center justify-center cursor-pointer hover:bg-gray-300 mt-auto"
          onClick={() =>
            contentRef.current?.scrollBy({ top: 50, behavior: "smooth" })
          }
        >
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-500" />
        </div>
      </div>
    </>
  );
};

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<any | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (selectedSkill) {
      document.body.classList.add("no-scrollbar");
    } else {
      document.body.classList.remove("no-scrollbar");
    }

    return () => {
      document.body.classList.remove("no-scrollbar");
    };
  }, [selectedSkill]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedSkill(null);
      setIsClosing(false);
      setShowContent(false);
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
      const portalRoot = document.getElementById("portal-root");
      if (portalRoot) portalRoot.style.pointerEvents = "none";
    }, 400);
  };

  useEffect(() => {
    if (selectedSkill) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
      const portalRoot = document.getElementById("portal-root");
      if (portalRoot) portalRoot.style.pointerEvents = "auto";

      setTimeout(() => setShowContent(true), 10);
    }
  }, [selectedSkill]);
  return (
    <>
      <div id="skills" className="h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-4 h-screen">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="h-40 md:h-80 2xl:h-3/6 w-2xs 2xl:w-sm transition-all rounded-lg flex justify-center items-center text-5xl 2xl:text-7xl hover:scale-110 cursor-pointer group"
              onClick={() => setSelectedSkill(skill)}
              style={{ fontFamily: "Luxurious Script, sans-serif" }}
            >
              <div className="relative">
                {skill.title}
                <span className="absolute bottom-0 left-0 w-0 h-1 2xl:h-1.5 bg-[#CED877] transition-all duration-300 group-hover:w-full rounded-xs"></span>
              </div>
            </div>
          ))}
          {selectedSkill && (
            <NoStrictPortal>
              <div
                className={`fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm skill-section-backdrop ${
                  isClosing ? "skill-section-backdrop-exit" : ""
                }`}
              />
              {showContent && (
                <div
                  className={`skill-section-enter ${
                    isClosing ? "skill-section-exit" : ""
                  }`}
                >
                  <SkillSection
                    {...selectedSkill}
                    onClose={handleClose}
                    isClosing={isClosing}
                  />
                </div>
              )}
            </NoStrictPortal>
          )}
        </div>
      </div>
    </>
  );
}
