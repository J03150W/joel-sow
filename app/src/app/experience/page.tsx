"use client";
import { useLanguage } from "../../context/LanguageContext";

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

export default function Experience() {
  const { lang } = useLanguage();

  const SectionCard = ({
    title,
    data,
  }: {
    title: string;
    data: {
      title: { en: string; de: string };
      range: { en: string; de: string };
      description: { en: string; de: string };
      logo?: string;
      techStack?: { name: string; type: string }[];
    }[];
  }) => (
    <div className="bg-[#f6f0e1]/50 backdrop-blur-md rounded-xl p-6 mb-6 self-center w-5xl">
      <span className="w-full text-left text-2xl font-bold text-[#3e3e2e] flex justify-between items-center mb-4 gap-2">
        {title}
      </span>

      <div className="flex flex-col gap-6">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="border-b border-[#ddd0bb] pb-4 last:border-none"
          >
            {/* Title + Logo + Date in one row */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-1">
              <div className="flex items-center gap-3">
                {item.logo && (
                  <img
                    src={item.logo}
                    alt="logo"
                    className="w-10 h-10 object-contain rounded-md"
                  />
                )}
                <div className="text-md font-semibold text-[#3e3e2e]">
                  {item.title[lang]}
                </div>
              </div>
              <div className="text-md font-semibold text-[#3e3e2e] sm:text-right">
                {item.range[lang]}
              </div>
            </div>

            <p className="text-[#2e2e2e] text-base leading-relaxed">
              {item.description[lang]}
            </p>

            {item.techStack && item.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 items-center">
                <span className="font-bold text-[#3e3e2e]">
                  {lang === "en" ? "Tech Stack:" : "Technologien:"}
                </span>
                {item.techStack.map((tech, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-[#eee3cd] text-[#3e3e2e] px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        tech.type === "language"
                          ? "bg-[#ff0000]"
                          : "bg-[#00aaff]"
                      }`}
                    ></span>
                    {tech.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="px-20 py-10 flex flex-col gap-6">
      <SectionCard
        title={lang === "en" ? "Work Experience" : "Berufserfahrung"}
        data={workExperience}
      />

      <SectionCard
        title={lang === "en" ? "Education" : "Ausbildung"}
        data={schoolExperience}
      />
    </div>
  );
}
