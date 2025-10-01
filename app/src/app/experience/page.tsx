"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence, useSpring } from "framer-motion";

const workExperience = [
  {
    title: {
      en: "IPA",
      de: "Idividuelle Praktische Arbeit (IPA) - File-Upload",
    },
    range: {
      en: "Mar. 2023 - Now",
      de: "12. - 28. März 2025",
    },
    description: {
      en: `As part of my IPA, I developed a new file upload system for the risk assessment application of SIX Group AG. The aim was to implement the upload in a user-friendly and efficient way. To achieve this, I created new frontend components, developed suitable backend endpoints and expanded the database structure. The project was implemented in ten working days, including documentation.`,
      de: `Im Rahmen meiner IPA entwickelte ich ein neues File-Upload-System für die Risikobewertungs-Applikation der SIX Group AG. Ziel war es, den Upload benutzerfreundlich und effizient umzusetzen. Dafür erstellte ich neue Komponenten im Frontend, entwickelte passende Backend-Endpunkte und erweiterte die Datenbankstruktur. Das Projekt wurde in zehn Arbeitstagen inklusive Dokumentation umgesetzt.`,
    },
    logo: "logos/six.png",
    link: "https://www.six-group.com/en/home.html",
    techStack: [
      {
        name: "Typescript",
        type: "language",
      },
      {
        name: "Java",
        type: "language",
      },
      {
        name: "SQL",
        type: "language",
      },
      {
        name: "Angular",
        type: "framework",
      },
      {
        name: "AG Grid",
        type: "framework",
      },
      {
        name: "Spring Boot",
        type: "framework",
      },
      {
        name: "JUnit",
        type: "framework",
      },
    ],
  },
  {
    title: {
      en: "Fullstack Developer - IT-Lab",
      de: "Fullstack Entwickler - IT-Lab",
    },
    range: {
      en: "Aug. 2023 - Jul. 2025",
      de: "Aug. 2023 - Juli. 2025",
    },
    description: {
      en: `Since the third year of my apprenticeship, I have been part of the development team in the IT Lab, a department of SIX Group AG that reports to the HR division and is responsible for the operation and further development of internal applications. There I was able to take on the role of lead developer for an internal risk assessment application. In this role, I deepened my knowledge in the front-end area, in particular by learning and using the Angular framework. I also supervise younger trainees who also work in the IT-Lab and support them in their professional development and induction.`,
      de: `Seit dem dritten Lehrjahr bin ich Teil des Entwicklerteams im IT-Lab, einer Abteilung der SIX Group AG, die dem HR-Bereich unterstellt ist und für den Betrieb sowie die Weiterentwicklung interner Applikationen verantwortlich ist. Dort konnte ich die Rolle des Lead-Entwicklers für eine interne Applikation zur Risikobewertung übernehmen. In diesem Rahmen habe ich meine Kenntnisse im Frontend-Bereich vertieft, insbesondere durch das Erlernen und den Einsatz des Frameworks Angular. Zudem betreue ich jüngere Lernende (Unterstifte), die ebenfalls im IT-Lab tätig sind, und unterstütze sie bei ihrer fachlichen Entwicklung und Einarbeitung.`,
    },
    logo: "logos/it-lab.png",
    link: "https://www.six-group.com/en/home.html",
    techStack: [
      {
        name: "Typescript",
        type: "language",
      },
      {
        name: "Java",
        type: "language",
      },
      {
        name: "SQL",
        type: "language",
      },
      {
        name: "Angular",
        type: "framework",
      },
      {
        name: "AG Grid",
        type: "framework",
      },
      {
        name: "Spring Boot",
        type: "framework",
      },
      {
        name: "JUnit",
        type: "framework",
      },
    ],
  },
  {
    title: {
      en: "Fullstack Developer - SDX",
      de: "Fullstack Entwickler - SDX",
    },
    range: {
      en: "Aug. 2022 - Jul. 2023",
      de: "Aug. 2022 - Juli 2023",
    },
    description: {
      en: `In the second year of my apprenticeship, I worked at SDX, the crypto exchange department of SIX Group AG. I worked there as a full-stack developer on a customer project under the guidance of my team lead. In this role, I was able to deepen my backend knowledge in particular by using Kotlin with Spring Boot in conjunction with the R3 Corda blockchain platform. Thanks to the international team environment, I was also able to actively use and further strengthen my very good English skills in daily exchanges.`,
      de: `Im zweiten Jahr meiner Lehre war ich bei SDX tätig, der Krypto-Börsenabteilung der SIX Group AG. Dort arbeitete ich als Fullstack-Entwickler im Rahmen eines Kundenprojekts unter der Anleitung meines Teamleads. In dieser Rolle konnte ich insbesondere meine Backend-Kenntnisse vertiefen, indem ich Kotlin mit Spring Boot in Verbindung mit der Blockchain-Plattform R3 Corda einsetzte. Durch das internationale Teamumfeld konnte ich zudem meine sehr guten Englischkenntnisse im täglichen Austausch aktiv nutzen und weiter stärken.`,
    },
    logo: "/logos/sdx.png",
    link: "https://www.sdx.com/",
    techStack: [
      {
        name: "Typescript",
        type: "language",
      },
      {
        name: "Kotlin",
        type: "language",
      },
      {
        name: "React",
        type: "framework",
      },
      {
        name: "Spring Boot",
        type: "framework",
      },
      {
        name: "R3 Corda",
        type: "framework",
      },
    ],
  },
  {
    title: {
      en: "Apprenticeship Foundation Year - TIE International",
      de: "Basislehrjahr - TIE International",
    },
    range: {
      en: "Aug. 2021 - Jul. 2022",
      de: "Aug. 2021 - Juli 2022",
    },
    description: {
      en: `At TIE International, I completed a foundation year where I learned the fundamentals of programming, agile collaboration, and teamwork. These skills were reinforced through hands-on client projects, allowing me to apply what I learned in real-world scenarios. Additionally, I was introduced to blockchain technologies and developed a console application simulating the core features of a crypto wallet.`,
      de: `Bei TIE International absolvierte ich das Basislehrjahr, in dem ich die Grundlagen der Programmierung, agiler Zusammenarbeit und Teamarbeit erlernte. Das Wissen konnte ich direkt in realen Kundenprojekten anwenden und vertiefen. Ausserdem wurde ich in die Blockchain-Technologie eingeführt und entwickelte eine Konsolenanwendung, die die Grundfunktionen einer Krypto-Wallet simulierte.`,
    },
    logo: "logos/tie.png",
    link: "https://tie.international/en/",
    techStack: [
      {
        name: "Typescript",
        type: "language",
      },
      {
        name: "React",
        type: "framework",
      },
      {
        name: "Node.js",
        type: "framework",
      },
    ],
  },
];

const schoolExperience = [
  {
    title: {
      en: "Technische Berufsschule Zürich - TBZ",
      de: "Technische Berufsschule Zürich - TBZ",
    },
    range: {
      en: "Aug. 2021 - May 2025",
      de: "Aug. 2021 - Mai 2025",
    },
    description: {
      en: `During my apprenticeship, I attended TBZ alongside my work at the company. There I learned the basics of programming in modules. This included various programming languages, theoretical concepts and practical project work in which I applied what I had learned.`,
      de: `Während meiner Lehre besuchte ich parallel zur Arbeit im Betrieb die TBZ. Dort lernte ich in Modulen die Grundlagen der Programmierung. Dies umfasste unter anderem verschiedene Programmiersprachen, theoretische Konzepte sowie praktische Projektarbeiten, in denen das Gelernte angewendet wurde.`,
    },
    logo: "logos/tbz.svg",
    techStack: [
      {
        name: "HTML",
        type: "language",
      },
      {
        name: "CSS",
        type: "language",
      },
      {
        name: "Typescript",
        type: "language",
      },
      {
        name: "Java",
        type: "language",
      },
      {
        name: "SQL",
        type: "language",
      },
      {
        name: "Python",
        type: "language",
      },
      {
        name: "Scala",
        type: "language",
      },
      {
        name: "React",
        type: "framework",
      },
      {
        name: "Spring Boot",
        type: "framework",
      },
      {
        name: "JUnit",
        type: "framework",
      },
    ],
  },
  {
    title: {
      en: "Berufsmaturitätsschule Zürich - BMZ",
      de: "Berufsmaturitätsschule Zürich - BMZ",
    },
    range: {
      en: "Aug. 2021 - May 2025",
      de: "Aug. 2021 - Mai 2025",
    },
    description: {
      en: `During my apprenticeship, I also attended the "Berufsmaturitätsschule Zürich" with a technical focus. At the BMS, general subjects such as mathematics, German, English and history are taught. The focus is on an in-depth general education as preparation for later studies. In the technical track, there is a stronger emphasis on mathematics, which fits in well with my training in software development.`,
      de: `Während der Lehre besuchte ich parallel die Berufsmaturitätsschule mit technischer Ausrichtung. In der BMS werden allgemeinbildende Fächer wie Mathematik, Deutsch, Englisch und Geschichte unterrichtet. Der Fokus liegt dabei auf einer vertieften Allgemeinbildung als Vorbereitung für ein späteres Studium. In der technischen Richtung wird insbesondere Mathematik stärker gewichtet, was gut zu meiner Ausbildung im Informatikbereich passt.`,
    },
    logo: "logos/bms.png",
  },
  {
    title: {
      en: "Primary & Secondary School - Zürich",
      de: "Sekundarschule - Affoltern am Albis",
    },
    range: {
      en: "Aug. 2018 - Juli 2021",
      de: "Aug. 2018 - Juli 2021",
    },
    description: {
      en: `After elementary school, I attended the Ennetgraben upper school in Affoltern am Albis. There I completed secondary school at the highest level (A) and graduated successfully. During this time, I became increasingly interested in technology. I consciously opted for technical electives such as robotics, which allowed me to gain my first practical experience in the technical field. This experience led me to decide to do a software developer apprenticeship.`,
      de: `Nach der Primarschule besuchte ich die Oberstufe Ennetgraben in Affoltern am Albis. Dort absolvierte ich die Sekundarschule im höchsten Niveau (A) und schloss diese erfolgreich ab. Während dieser Zeit wuchs mein Interesse an Technik zunehmend. Ich entschied mich bewusst für technische Wahlfächer wie Robotik, wodurch ich erste praktische Erfahrungen im technischen Bereich sammeln konnte. Diese Erfahrungen führten dazu, dass ich mich für eine Informatiklehre entschied.`,
    },
    logo: "logos/osa.png",
  },
  {
    title: {
      en: "Primary & Secondary School - Zürich",
      de: "Primarschule - Affoltern am Albis",
    },
    range: {
      en: "Aug. 2012 - Juli 2018",
      de: "Aug. 2012 - Juli 2018",
    },
    description: {
      en: `I attended the Semper and Butzen elementary school in Affoltern am Albis for six years. During this time, I laid the school foundations and developed an early interest in technical and creative subjects.`,
      de: `Ich besuchte sechs Jahre die Primarschulen Semper und Butzen in Affoltern am Albis. In dieser Zeit legte ich die schulischen Grundlagen und entwickelte früh ein Interesse an technischen und kreativen Themen.`,
    },
    logo: "logos/primar.png",
  },
];

const now = {
  en: "Now",
  de: "Jetzt",
};

interface ExperienceSectionProps {
  experiences: {
    title: { [key: string]: string };
    range: { [key: string]: string };
    description: { [key: string]: string };
    logo: string;
    link: string;
    techStack?: Tech[];
  }[];
  highlightColor: string;
  reversed: boolean;
  markers: string[];
  title: string;
}

interface Tech {
  name: string;
  type: string;
}

const ExperienceSection = ({
  experiences,
  highlightColor,
  reversed,
  markers,
  title,
}: ExperienceSectionProps) => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const total = experiences.length;
  const CARD_HEIGHT = 80;
  const scrollSectionHeight = total * CARD_HEIGHT;

  const springProgress = useSpring(0, {
    stiffness: 80,
    damping: 25,
  });

  useEffect(() => {
    if (!isDragging) {
      springProgress.set(progress);
    }
  }, [progress, isDragging, springProgress]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isDragging) return;

      const viewportHeight = window.innerHeight;
      const sectionHeight = sectionRef.current.offsetHeight;

      const scrollPosition = window.scrollY - sectionRef.current.offsetTop;
      const maxScroll = sectionHeight - viewportHeight;
      const scrollPercentage = Math.max(
        0,
        Math.min(1, scrollPosition / maxScroll)
      );

      setProgress(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDragging]);

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = offsetX / rect.width;

    const segmentWidth = 1 / (total - 1);
    const segmentIndex = Math.round(newProgress / segmentWidth);
    const snappedProgress = segmentIndex * segmentWidth;

    setProgress(snappedProgress);

    if (sectionRef.current) {
      const sectionHeight = sectionRef.current.offsetHeight;
      const maxScroll = sectionHeight - window.innerHeight;
      const scrollTo = maxScroll * snappedProgress;
      window.scrollTo({
        top: scrollTo + sectionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const currentIndex = Math.min(Math.floor(progress * total), total - 1);

  const segmentWidth = 1 / total;

  if (reversed) experiences = [...experiences].reverse();

  return (
    <div
      ref={sectionRef}
      style={{ height: `${scrollSectionHeight}vh` }}
      className="relative text-[#3e3e2e]"
    >
      <div
        id="experience"
        className="sticky top-0 h-screen flex flex-col justify-center items-center p-4 md:p-8 md:pt-32 -translate-y-12"
      >
        <div
          ref={timelineRef}
          className="flex w-full max-w-3xl 2xl:max-w-6xl items-center mb-8 lg:mb-16 relative cursor-pointer mt-16"
          onClick={handleTimelineClick}
        >
          <div className="w-full h-1 bg-[#3e3e2e]/30 rounded-full" />
          {Array.from({ length: total + 1 }).map((_, index) => {
            const isFirstOrLast = index === 0 || index === total;
            return (
              <div
                key={index}
                className={`absolute w-1 h-6 bg-[#3e3e2e]/50 rounded-full top-1/2 transform -translate-y-1/2 ${
                  isFirstOrLast ? "z-10" : "z-0"
                }`}
                style={{
                  left: `${(index / total) * 100}%`,
                }}
              />
            );
          })}
          <div
            className="absolute bg-[#EEEDE9] px-4 py-1 z-50 h-8"
            style={{
              left: "100%",
              transform: "translateX(0) translateY(-50%)",
              top: "50%",
              marginLeft: "4px",
            }}
          />
          <motion.div
            className="absolute h-4 top-1/2 transform -translate-y-1/2 rounded-full z-0"
            style={{
              background: highlightColor,
              left: `${Math.max(
                0,
                springProgress.get() * 100 -
                  Math.min(
                    springProgress.get() * 100,
                    segmentWidth * 100 * (1 - springProgress.get())
                  )
              )}%`,
              width: `${Math.min(
                segmentWidth * 100,
                springProgress.get() < segmentWidth
                  ? springProgress.get() *
                      (segmentWidth * 100) *
                      (1 / segmentWidth)
                  : Math.min(
                      segmentWidth * 100,
                      ((1 - springProgress.get()) * 100) / (1 - segmentWidth)
                    )
              )}%`,
              transformOrigin: "left center",
            }}
            transition={{ type: "spring", stiffness: 80, damping: 25 }}
          />
          <div
            className="absolute -top-16 left-0 w-full flex justify-between text-4xl font-medium z-10"
            style={{ fontFamily: "Luxurious Script, sans-serif" }}
          >
            <span>{markers[0]}</span>
            <span>{markers[markers.length - 1]}</span>
          </div>
        </div>
        <div className="relative w-full max-w-3xl 2xl:max-w-6xl h-80 lg:h-96 xl:h-[32rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, y: -50, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 w-full h-full perspective-1000"
            >
              <div className="h-full pl-6 pr-6 pb-6 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <a href={experiences[currentIndex].link}>
                    <img
                      src={experiences[currentIndex].logo}
                      alt="Logo"
                      className="w-12 h-12 md:w-14 md:h-14 object-contain"
                    />
                  </a>
                  <div>
                    <div className="text-sm md:text-base lg:text-xl font-bold">
                      {experiences[currentIndex].title[lang]}
                    </div>
                    <div className="text-xs md:text-sm italic text-[#3e3e2e]/70">
                      {experiences[currentIndex].range[lang]}
                    </div>
                  </div>
                </div>
                <p className="text-sm md:text-base lg:text-md 2xl:text-xl leading-relaxed whitespace-pre-wrap">
                  {experiences[currentIndex].description[lang]}
                </p>
                {experiences[currentIndex].techStack && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experiences[currentIndex].techStack?.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs md:text-sm 2xl:text-base bg-[#3e3e2e]/10 rounded-full text-[#3e3e2e]"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function Experience() {
  const { lang } = useLanguage();

  return (
    <div className="">
      <ExperienceSection
        experiences={workExperience}
        highlightColor="linear-gradient(to right, rgba(255,255,255), rgba(200,200,200))"
        reversed={false}
        markers={[now[lang], "2021"]}
        title="Work Experience"
      />
    </div>
  );
}
