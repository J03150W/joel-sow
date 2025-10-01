// @ts-nocheck

"use client";
import Image from "next/image";

import { useEffect, useRef } from "react";
import { animate, scroll, spring } from "motion";
import { ReactLenis } from "lenis/react";
import BlobCursor from "@/components/BlobCursor/BlobCursor";

export default function Projects() {
  const ulRef = useRef<HTMLUListElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ulRef.current || !sectionRef.current) return;

    const items = ulRef.current.querySelectorAll("li");
    if (items.length === 0) return;

    // Horizontal scroll animation (based on vertical scroll)
    const controls = animate(
      ulRef.current,
      {
        transform: ["none", `translateX(-${(items.length - 1) * 100}vw)`],
      },
      { easing: spring() }
    );

    scroll(controls, { target: sectionRef.current });

    return () => {
      // No manual cleanup needed
    };
  }, []);

  return (
    <ReactLenis root>
      <section ref={sectionRef} className="h-[500vh] relative">
        <ul ref={ulRef} className="flex sticky top-0 h-screen w-full">
          <li className="w-[100vw] h-[100vh] bg-[#101010] flex flex-col justify-center overflow-hidden items-center flex-shrink-0">
            <h2
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-6xl italic font-bold relative right-90 bottom-25 inline-block text-[#faf6d4]"
            >
              UI/UX Design
            </h2>
            <p
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="relative right-80 top-30 text-3xl italic max-w-lg text-[#faf6d4]"
            >
              I work best with an existing design, as it allows me to focus
              directly on clean and efficient implementation. If no design is
              provided, I create a suitable interface myself.
            </p>
            <Image
              src="/media/design.png"
              className="2xl:w-[550px] w-100 bottom-20 right-40 absolute"
              width={450}
              height={450}
              alt="image"
            />
            <Image
              src="/media/logo.ong.png"
              className="2xl:w-[550px] w-20 bottom-35 right-130 absolute"
              width={500}
              height={500}
              alt="image"
            />
          </li>
          <li className="w-[130vw] h-[100vh] bg-[#faf6d4] flex flex-col justify-center overflow-hidden items-center flex-shrink-0">
            <p className="text-4xl relative right-160 italic font-semibold bottom-0">
              „Don’t make the user think.“ - Steve Krug
            </p>
            <p
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-2xl max-w-2xl italic relative right-160 top-5 mx-auto text-center"
            >
              When developing frontends, I focus on user-friendly, intuitive
              interfaces that feel natural and effortless. Good design shouldn't
              make users think — it should just work. And it shouldn't be boring
              either. I aim to make the experience fun, engaging, and a little
              bit delightful.
            </p>
            <h2
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-6xl italic font-bold relative right-160 top-55 inline-block text-[#101010]"
            >
              Frontend Development
            </h2>
            <p
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-4xl max-w-3xl relative italic font-semibold left-160 top-40 mx-auto text-center"
            >
              „Code is like humor. When you have to explain it, it’s bad.“ -
              Cory House
            </p>
            <p
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-2xl max-w-2xl italic relative left-160 bottom-10 mx-auto text-center"
            >
              When working on the backend, I focus on keeping the code as simple
              and clear as possible. It should be easy to understand, not
              unnecessarily complex or bloated.
            </p>
            <h2
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-6xl italic font-bold relative left-160 bottom-105 inline-block text-[#101010]"
            >
              Backend Development
            </h2>
          </li>
          <li className="w-[70vw] h-[100vh] bg-[#1d8945] flex flex-col justify-center overflow-hidden items-center flex-shrink-0">
            <p
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-3xl italic max-w-3xl relative bottom-35 inline-block text-right text-[#101010]"
            >
              I have experience managing databases across multiple production
              projects, using both ORMs like Hibernate and writing raw SQL when
              needed.
            </p>
            <h2
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-6xl italic font-bold relative top-40 inline-block text-[#101010]"
            >
              Database Management
            </h2>
          </li>
          <li className="w-[100vw] h-[100vh] bg-[#101010] flex flex-col justify-center overflow-hidden items-center flex-shrink-0">
            <p
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-3xl italic max-w-3xl relative bottom-35 inline-block text-right text-[#faf6d4]"
            >
              I have experience managing databases across multiple production
              projects, using both ORMs like Hibernate and writing raw SQL when
              needed.
            </p>
            <h2
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-6xl italic font-bold relative top-40 inline-block text-[#faf6d4]"
            >
              Teamwork
            </h2>
          </li>
          <li className="w-[100vw] h-[100vh] bg-[#2b2b2b] flex flex-col justify-center overflow-hidden items-center flex-shrink-0">
            <video
              src="media/presenting.mp4"
              className="h-[110vh] w-auto top-20 left-85 relative object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              preload="metadata"
            />
            <h2
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-6xl font-bold italic relative bottom-110 right-80 max-w-lg inline-block text-[#faf6d4] z-20"
            >
              Presenting
            </h2>
            <p
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-3xl italic max-w-xl relative text-left right-70 bottom-50 text-[#faf6d4] z-20"
            >
              I enjoy collaborating with others and presenting ideas clearly and
              effectively.
            </p>
          </li>
          <li className="w-[100vw] h-[100vh] bg-[#faf6d4] flex flex-col justify-center overflow-hidden items-center flex-shrink-0">
            <h2
              style={{ fontFamily: "Switzer, sans-serif" }}
              className="text-6xl font-bold italic relative inline-block text-[#101010] z-20"
            >
              Languages
            </h2>
            <Image
              src="/media/german.png"
              className="relative h-50 w-auto left-60 top-20"
              width={500}
              height={500}
              alt="image"
            />
            <Image
              src="/media/italian.png"
              className="relative h-50 w-auto right-60 top-20"
              width={500}
              height={500}
              alt="image"
            />
            <Image
              src="/media/english.png"
              className="relative h-50 w-auto left-50 top-20"
              width={500}
              height={500}
              alt="image"
            />
            <Image
              src="/media/french.png"
              className="relative h-50 w-auto right-50 top-20"
              width={500}
              height={500}
              alt="image"
            />
          </li>
        </ul>
      </section>
    </ReactLenis>
  );
}
