"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const skillCards = [
  {
    title: "UI/UX Design",
    subtitle: "Design Systems & Prototyping",
    description:
      "Designing intuitive interfaces with Figma and design thinking.",
    thumbnail: "media/six.png",
    size: "h-60",
  },
  {
    title: "Frontend Development",
    subtitle: "React, Tailwind & More",
    description: "Responsive UIs using React and Tailwind CSS.",
    thumbnail: "media/sdx.png",
    size: "h-80",
  },
  {
    title: "Version Control",
    subtitle: "Git Workflows",
    description: "Tracking changes using Git and GitHub.",
    thumbnail: "media/lego.jpeg",
    size: "h-60",
  },
  {
    title: "Backend Development",
    subtitle: "Node.js & Express",
    description: "Building APIs and logic for apps.",
    thumbnail: "media/sdx1.png",
    size: "h-100",
  },
  {
    title: "Database Management",
    subtitle: "SQL & NoSQL",
    description: "Data modeling with PostgreSQL and MongoDB.",
    thumbnail: "media/ny.png",
    size: "h-60",
  },
  {
    title: "Docker & Deployment",
    subtitle: "CI/CD & DevOps",
    description: "Containers and deployment pipelines.",
    thumbnail: "media/now.jpg",
    size: "h-40",
  },
  {
    title: "Presenting",
    subtitle: "Communication Skills",
    description: "Effectively sharing ideas with stakeholders.",
    thumbnail: "media/six.png",
    size: "h-40",
  },
  {
    title: "Languages",
    subtitle: "English, German, French",
    description: "Fluent in multiple languages for team integration.",
    thumbnail: "media/sunset.jpeg",
    size: "h-80",
  },
  {
    title: "Teamwork",
    subtitle: "Agile & Scrum",
    description: "Collaborative development environments.",
    thumbnail: "media/ny1.jpg",
    size: "h-80",
  },
];

export const LayoutGrid = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen pt-8">
      <div className="px-10 pb-10">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {skillCards.map((card, index) => (
            <div
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "relative w-full rounded-2xl overflow-hidden group break-inside-avoid transition-all duration-300 ease-out",
                card.size,
                hovered !== null &&
                  hovered !== index &&
                  "blur-[2px] scale-[0.98]"
              )}
            >
              <img
                src={card.thumbnail}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-black/50 transition-opacity duration-300",
                  hovered === index ? "opacity-100" : "opacity-0"
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 p-6 flex flex-col justify-end text-white transition-opacity duration-300",
                  hovered === index ? "opacity-100" : "opacity-0"
                )}
              >
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-sm text-neutral-200">{card.subtitle}</p>
                <p className="text-xs text-neutral-300 mt-2">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
