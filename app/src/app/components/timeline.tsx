import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Matthias Leidinger",
    src: "",
    link: "#",
    color: "",
    content: (
      <div className="h-full relative">
        <img
          src="media/ny.png"
          alt="hackathon"
          className="h-screen w-full absolute left-0 z-10"
        />
        {/*<video
          src="media/camping.mp4"
          className="h-1/4 w-2/5 absolute left-90 2xl:left-124 top-80 2xl:top-140 object-cover z-20"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          preload="metadata"
        />*/}
      </div>
    ),
  },
  {
    title: "Clément Chapillon",
    src: "",
    link: "#",
    color: "#",
    content: (
      <div className="h-full relative">
        <img
          src="media/sdxx.jpg"
          alt="hackathon"
          className="h-screen w-full absolute"
        />
        {/*
        <video
          src="media/camping.mp4"
          className="h-1/4 w-2/5 absolute left-14 top-40 object-cover z-20"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          preload="metadata"
        />*/}
      </div>
    ),
  },
  {
    title: "Zissou",
    src: "",
    link: "#",
    color: "#",
    content: (
      <div className="h-full relative">
        <img
          src="media/six.png"
          alt="hackathon"
          className="h-screen w-full absolute left-0 z-10"
        />
        {/*<video
          src="media/coding1.mp4"
          className="h-50 w-xs absolute left-110 2xl:left-150 top-75 2xl:top-140 object-cover z-20"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          preload="metadata"
        />*/}
      </div>
    ),
  },
  {
    title: "Mathias Svold",
    src: "",
    link: "#",
    color: "#",
    content: (
      <div id="experience" className="h-full relative">
        <img
          src="media/now.jpg"
          alt="hackathon"
          className="h-screen w-full absolute"
        />
        {/*<video
          src="media/camping.mp4"
          className="h-1/4 w-2/5 absolute left-14 top-80 2xl:top-160 object-cover z-20"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          preload="metadata"
        />*/}
      </div>
    ),
  },
];

const accordionData = [
  {
    title: "TIE International",
    range: "2021 - 2022",
    content:
      "At TIE International, I completed a foundation year where I learned the fundamentals of programming, agile collaboration, and teamwork. These skills were reinforced through hands-on client projects, allowing me to apply what I learned in real-world scenarios. Additionally, I was introduced to blockchain technologies and developed a console application simulating the core features of a crypto wallet.",
    techStack: [
      { name: "Typescript", logo: "logos/typescript.png" },
      { name: "React", logo: "logos/react.png" },
      { name: "NodeJs", logo: "logos/NodeJs.png" },
      { name: "Kotlin", logo: "logos/Kotlin.png" },
      { name: "Java", logo: "logos/Java.png" },
      { name: "Git", logo: "logos/git.png" },
      { name: "HTML", logo: "logos/html.png" },
      { name: "CSS", logo: "logos/css.png" },
    ],
  },
  {
    title: "SIX Digital Exchange",
    range: "2022 - 2023",
    content:
      "In the second year of my apprenticeship, I worked at SDX, the crypto exchange department of SIX Group AG. I worked there as a full-stack developer on a customer project under the guidance of my team lead. In this role, I was able to deepen my backend knowledge in particular by using Kotlin with Spring Boot in conjunction with the R3 Corda blockchain platform. Thanks to the international team environment, I was also able to actively use and further strengthen my very good English skills in daily exchanges.",
    techStack: [
      { name: "Typescript", logo: "logos/typescript.png" },
      { name: "React", logo: "logos/react.png" },
      { name: "Kotlin", logo: "logos/Kotlin.png" },
      { name: "Spring-Boot", logo: "logos/spring-boot.png" },
      { name: "Corda", logo: "logos/Corda.png" },
      { name: "Git", logo: "logos/git.png" },
      { name: "HTML", logo: "logos/html.png" },
      { name: "CSS", logo: "logos/css.png" },
    ],
  },
  {
    title: "IT-Lab",
    range: "2023 - 2025",
    content:
      "In the last two years of my apprenticeship, I was part of the development team in the IT-Lab, a department of SIX Group AG that reports to the HR division and is responsible for the operation and further development of internal applications. There I was able to take on the role of lead developer for an internal risk assessment application. In this role, I deepened my knowledge in the front-end area, in particular by learning and using the Angular framework. I also supervise younger trainees who also work in the IT-Lab and support them in their professional development and induction.",
    techStack: [
      { name: "Typescript", logo: "logos/typescript.png" },
      { name: "Angular", logo: "logos/react.png" },
      { name: "Java", logo: "logos/Java.png" },
      { name: "Spring-Boot", logo: "logos/spring-boot.png" },
      { name: "JUnit", logo: "logos/JUnit.png" },
      { name: "Log4J", logo: "logos/Log4J.png" },
      { name: "MySQL", logo: "logos/MySQL.png" },
      { name: "Git", logo: "logos/git.png" },
      { name: "HTML", logo: "logos/html.png" },
      { name: "CSS", logo: "logos/css.png" },
    ],
  },
  {
    title: "Now",
    range: "",
    content:
      "As part of my ongoing professional development, I am currently in the first semester of my bachelor's degree in Software Engineering. This marks the next step in my goal of expanding both my theoretical and practical knowledge in the field. I am eager to deepen my understanding of modern software development practices and technologies, and I am particularly motivated to work in productive and collaborative environments where I can contribute meaningfully while continuously learning.",
    techStack: [
      { name: "Typescript", logo: "logos/typescript.png" },
      { name: "tailwindcss", logo: "logos/tailwindcss.png" },
      { name: "React", logo: "logos/react.png" },
      { name: "Next.js", logo: "logos/nextJs.png" },
      { name: "Kotlin", logo: "logos/Kotlin.png" },
      { name: "Spring-Boot", logo: "logos/spring-boot.png" },
      { name: "Python", logo: "logos/python.png" },
      { name: "Git", logo: "logos/git.png" },
      { name: "HTML", logo: "logos/html.png" },
      { name: "CSS", logo: "logos/css.png" },
    ],
  },
];

interface AccordionItemProps {
  title: string;
  content: string;
  range: string;
  techStack: Tech[];
  distance: MotionValue<number>;
  isActive: MotionValue<boolean>;
  isLast: boolean;
}

interface AccordionColumnProps {
  scrollProgress: MotionValue<number>;
}

interface Tech {
  name: string;
  logo: string;
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="w-full min-h-screen flex bg-[#101010]">
      <div className="w-1/2">
        {projects.map((project, i) => (
          <div
            key={i}
            className="w-full h-screen flex items-center justify-center"
          >
            <div className="relative w-full h-full overflow-hidden">
              {project.content}
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2 relative">
        <div ref={containerRef} className="h-[400vh] w-full relative">
          <div
            id="experience"
            className="absolute top-0 h-screen w-full pointer-events-none"
          />
          <div className="sticky top-0 w-full h-screen flex items-center">
            <AccordionStack scrollProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}

const AccordionStack: React.FC<AccordionColumnProps> = ({ scrollProgress }) => {
  const itemCount = accordionData.length;
  const activeIndex = useTransform(scrollProgress, [0, 1], [0, itemCount - 1]);

  return (
    <div className="w-full px-12 h-[90vh] overflow-hidden">
      <div className="mt-8 2xl:mt-12 flex flex-col">
        {accordionData.map((item, i) => {
          const distance = useTransform(activeIndex, (v) => Math.abs(v - i));
          const isActive = useTransform(
            activeIndex,
            (v) => Math.round(v) === i
          );
          return (
            <React.Fragment key={i}>
              {i !== 0 && (
                <motion.div
                  className="border-t-2 border-white/50"
                  style={{ width: "100%" }}
                />
              )}
              <AccordionItem
                title={item.title}
                content={item.content}
                range={item.range}
                techStack={item.techStack}
                distance={distance}
                isActive={isActive}
                isLast={i === accordionData.length - 1}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  range,
  content,
  techStack,
  distance,
}) => {
  const [is2xl, setIs2xl] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1536px)");
    const onChange = () => setIs2xl(mq.matches);
    mq.addEventListener("change", onChange);
    onChange();
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const openHeight = is2xl ? 420 : 330;
  const closedHeight = is2xl ? 80 : 50;

  const openPadding = is2xl ? 32 : 20;
  const closedPadding = is2xl ? 16 : 8;

  const height = useTransform(distance, [0, 1], [openHeight, closedHeight], {
    clamp: true,
  });

  const roundedHeight = useTransform(height, (v) => Math.round(v));
  const padding = useTransform(distance, [0, 1], [openPadding, closedPadding]);

  return (
    <motion.div
      className="overflow-hidden"
      style={{
        height: roundedHeight,
        paddingTop: useTransform(padding, (v) => Math.round(v)),
        paddingBottom: useTransform(padding, (v) => Math.round(v)),
      }}
    >
      <motion.h3
        className="flex justify-between items-center w-full text-white text-xl 2xl:text-3xl italic"
        style={{ fontFamily: "Switzer, sans-serif" }}
      >
        <span>{title}</span>
        <p className="text-md 2xl:text-xl">{range}</p>
      </motion.h3>

      <div className="mt-3 2xl:mt-6">
        <p className="text-white/70 text-md 2xl:text-lg leading-relaxed">
          {content}
        </p>
      </div>
      <motion.div
        className="overflow-hidden flex items-center mt-6 2xl:mt-12
          [mask-image:linear-gradient(to_right,transparent_0,black_100px,black_calc(100%-100px),transparent_100%)]
          [--webkit-mask-image:linear-gradient(to_right,transparent_0,black_100px,black_calc(100%-100px),transparent_100%)]"
      >
        <div className="flex animate-infinite-scroll w-[200%]">
          {techStack.concat(techStack).map((tech, index) => (
            <img
              key={`${tech.name}-${index}`}
              src={tech.logo}
              alt={tech.name}
              className="h-8 md:h-10 2xl:h-16 w-auto mx-4"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
