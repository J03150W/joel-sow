"use client";
import { useLanguage } from "../../context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Preload } from "@react-three/drei";
import { Mesh } from "three";
import { DraggableCardBody } from "@/components/ui/draggable-card";
import Carousel from "../components/carousel";
import FramedImage from "../components/framedImage";
import * as THREE from "three";
import Image from "next/image";
import CountUp from "@/components/countUp";
import React from "react";

const sectionTitles = {
  about: {
    en: "Who am I?",
    de: "Wer bin ich?",
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
  en: `My name is Joel Sow, I am {age} years old, and I live in Zurich. I am currently in the final year of my apprenticeship as a Software Developer. \n\n I am motivated and use my creativity to solve technical challenges in my own way, whether in code or design. Technology inspires me every day, but at the same time, interacting with people is important to me. I enjoy working in a team and feel comfortable in social situations.`,
  de: `Ich heisse Joel Sow, bin {age} Jahre alt und wohne in Zürich. Momentan befinde ich mich im letzten Jahr meiner Lehre als Informatiker in Richtung Applikationsentwicklung. \n\n Ich bin motiviert und setze meine Kreativität gezielt ein, um technische Herausforderungen auf eigene Art zu lösen, ob im Code oder im Design. Technik begeistert mich jeden Tag, gleichzeitig ist mir der Austausch mit Menschen wichtig. Ich arbeite gerne im Team und finde mich in sozialen Situationen wohl.`,
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

const moveText = {
  en: "Move me!",
  de: "Bewege mich!",
};

const media = [
  { type: "image", src: "/media/lego.jpeg" },
  { type: "image", src: "/media/luna.jpeg" },
  { type: "image", src: "/media/football.png" },
  { type: "image", src: "/media/sunset.jpeg" },
  { type: "video", src: "/media/camping.mp4" },
];

function MeshComponent({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scene } = useGLTF("/models/me.gltf");
  const mesh = useRef<THREE.Mesh>(null!);

  const [isDragging, setIsDragging] = useState(false);
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });

  const inertia = useRef({ x: 0, y: 0 });
  const friction = 0.8;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (!container.contains(e.target as Node)) return;
      setIsDragging(true);
      setPrevMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !container.contains(e.target as Node)) return;

      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;

      mesh.current.rotation.y += deltaX * 0.005;
      mesh.current.rotation.x += deltaY * 0.005;

      inertia.current = {
        x: deltaY * 0.005,
        y: deltaX * 0.005,
      };

      setPrevMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerRef, isDragging, prevMouse]);

  useFrame(() => {
    if (!isDragging) {
      mesh.current.rotation.x += inertia.current.x;
      mesh.current.rotation.y += inertia.current.y;
      inertia.current.x *= friction;
      inertia.current.y *= friction;
    }
  });

  return <primitive ref={mesh} object={scene} />;
}

useGLTF.preload("/models/me.gltf"); // preload globally outside component

export default function About() {
  const modelContainerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const imageUrls = [
      "/media/luna.jpeg",
      "/media/firework.jpeg",
      "/media/football.png",
      "/media/sunset.jpeg",
    ];

    imageUrls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, []);

  return (
    <>
      <div className="w-full flex justify-center px-4 md:py-5 2xl:py-16 md:mt-5 2xl:mt-20"></div>
    </>
  );
}
