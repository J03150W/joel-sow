import { useLanguage } from "@/context/LanguageContext";

type Props = {
  activeSection: string;
};

export default function Sidebar({ activeSection }: Props) {
  const { lang } = useLanguage();

  const isVisible =
    activeSection &&
    activeSection !== "home" &&
    activeSection !== "portal-root";

  const navItems = [
    { id: "experience", label: { en: "Experience", de: "Erfahrung" } },
    { id: "skills", label: { en: "Skills", de: "Kenntnisse" } },
    { id: "about", label: { en: "About", de: "Über mich" } },
  ];

  return (
    <div
      className={`w-full transition-opacity duration-150
      ${
        isVisible
          ? "opacity-100 backdrop-blur-md bg-[#EEEDE9]/50"
          : "opacity-0 pointer-events-none"
      }
      md:fixed md:top-16 md:left-0 md:bg-transparent md:backdrop-blur-none z-40
    `}
    >
      <ul
        className={`
          flex
          flex-row
          md:flex-col
          space-x-4
          md:space-x-0
          md:space-y-4
          pl-4 py-2
        `}
      >
        {navItems.map(({ id, label }) => (
          <li
            key={id}
            className="italic text-sm text-[#3e3e2e]"
            style={{ fontFamily: "Switzer, sans-serif" }}
          >
            <a href={`#${id}`}>
              {label[lang]}
              {activeSection === id && <span className="ml-2">{"<"}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
