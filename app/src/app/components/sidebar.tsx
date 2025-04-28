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
      className={`fixed top-16 left-0 w-full z-50 transition-opacity duration-100
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
        bg-white/50 backdrop-blur-lg
        md:bg-transparent md:backdrop-blur-none
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
