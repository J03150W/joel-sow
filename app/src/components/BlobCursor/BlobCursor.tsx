"use client";
import { useTrail, animated } from "@react-spring/web";
import { useState, useRef, useEffect, useCallback } from "react";

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x: number, y: number) =>
  `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

export default function BlobCursor({
  blobType,
  fillColor,
}: {
  blobType: string;
  fillColor: string;
}) {
  const [hasMoved, setHasMoved] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [letterSize, setLetterSize] = useState({ width: 0, height: 0 });

  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const currentPositionRef = useRef<[number, number]>([0, 0]);
  const isInitializedRef = useRef(false);
  const lastMousePositionRef = useRef<[number, number]>([0, 0]);

  // Get initial position from "o" element
  const getInitialPosition = (): [number, number] => {
    if (typeof window === "undefined") return [0, 0];

    const oElement = document.getElementById("o");
    if (oElement) {
      const rect = oElement.getBoundingClientRect();
      const x = rect.left + rect.width / 2 + 5;
      const y = rect.top + rect.height / 2 + 10;
      return [x, y];
    }
    return [window.innerWidth / 2, window.innerHeight / 2];
  };

  // Set the initial position
  const initialPosition = getInitialPosition();
  currentPositionRef.current = initialPosition;
  lastMousePositionRef.current = [
    initialPosition[0] - 5,
    initialPosition[1] - 10,
  ];

  const [trail, api] = useTrail(3, (i) => ({
    xy: initialPosition,
    config: i === 0 ? fast : slow,
  }));

  // Get position with consistent offsets
  const getPositionWithOffsets = useCallback(
    (x: number, y: number): [number, number] => {
      return [x + 5, y + 10];
    },
    []
  );

  // Get and update the size of the "o" element
  const updateLetterSize = useCallback(() => {
    const oElement = document.getElementById("o");
    if (oElement) {
      const rect = oElement.getBoundingClientRect();
      const baseHeight = rect.height * (7 / 30);
      setLetterSize({
        width: baseHeight,
        height: baseHeight,
      });
    }
  }, []);

  // Calculate sizes based on "o" element dimensions
  const getSizes = useCallback(() => {
    if (letterSize.height === 0) {
      return [
        { width: 60, height: 60 },
        { width: 125, height: 125 },
        { width: 75, height: 75 },
      ];
    }

    return [
      { width: letterSize.width * 0.8, height: letterSize.height * 0.8 },
      { width: letterSize.width * 1.6, height: letterSize.height * 1.6 },
      { width: letterSize.width * 1.2, height: letterSize.height * 1.2 },
    ];
  }, [letterSize]);

  // Calculate pseudo-element styles based on sizes
  const getPseudoStyles = useCallback(
    (sizes: { width: number; height: number }[]) => {
      return sizes.map((size) => ({
        top: size.height * 0.3,
        left: size.width * 0.3,
        width: size.width * 0.3,
        height: size.height * 0.3,
      }));
    },
    []
  );

  // Check if cursor is in allowed section
  const checkCursorInAllowedSection = useCallback((x: number, y: number) => {
    // If no sections are defined, allow cursor everywhere
    if (!sectionsRef.current || sectionsRef.current.length === 0) {
      return true;
    }

    for (const section of Array.from(sectionsRef.current)) {
      const rect = section.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        return true;
      }
    }
    return false;
  }, []);

  // Update position and animate
  const updatePosition = useCallback(
    (x: number, y: number) => {
      const [newX, newY] = getPositionWithOffsets(x, y);
      currentPositionRef.current = [newX, newY];
      lastMousePositionRef.current = [x, y];
      api.start({ xy: [newX, newY] });
    },
    [api, getPositionWithOffsets]
  );

  // Update visibility based on current mouse position
  const updateVisibility = useCallback(
    (shouldBeVisible: boolean) => {
      if (shouldBeVisible && !isVisible) {
        setIsVisible(true);
        document.documentElement.style.cursor = "none";
        document.body.style.cursor = "none";
      } else if (!shouldBeVisible && isVisible) {
        setIsVisible(false);
        document.documentElement.style.cursor = "auto";
        document.body.style.cursor = "auto";
      }
    },
    [isVisible]
  );

  // Check visibility based on current mouse position
  const checkVisibility = useCallback(() => {
    const [lastX, lastY] = lastMousePositionRef.current;
    const inAllowedSection = checkCursorInAllowedSection(lastX, lastY);
    return inAllowedSection;
  }, [checkCursorInAllowedSection]);

  // Handle mouse movement
  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);

      const x = e.clientX;
      const y = e.clientY;

      updatePosition(x, y);

      // Update visibility based on current position
      const shouldBeVisible = checkVisibility();
      updateVisibility(shouldBeVisible);
    },
    [hasMoved, updatePosition, checkVisibility, updateVisibility]
  );

  // Handle scroll - check visibility when scrolling
  const handleScroll = useCallback(() => {
    // Only update position based on "o" element if cursor hasn't moved yet
    if (!hasMoved) {
      const initialPos = getInitialPosition();
      updatePosition(initialPos[0] - 5, initialPos[1] - 10);
    }

    // Check visibility based on last known mouse position
    const shouldBeVisible = checkVisibility();
    updateVisibility(shouldBeVisible);

    updateLetterSize();
  }, [
    hasMoved,
    updatePosition,
    checkVisibility,
    updateVisibility,
    updateLetterSize,
  ]);

  // Initialize once on mount
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    console.log("Initializing blob at position:", initialPosition);

    // Get sections
    sectionsRef.current = document.querySelectorAll("[data-blob-active]");

    // Log for debugging
    console.log(
      "Found sections with data-blob-active:",
      sectionsRef.current?.length || 0
    );

    // Check initial visibility
    const shouldBeVisible = checkVisibility();
    updateVisibility(shouldBeVisible);

    updateLetterSize();

    // Add event listeners
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      // Restore cursor on cleanup
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
    };
  }, []);

  const sizes = getSizes();
  const pseudoStyles = getPseudoStyles(sizes);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full ml-2 mt-2 2xl:mt-3"
      style={{
        zIndex: 100,
        pointerEvents: "none",
        cursor: "none",
      }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="blob">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10"
          />
        </filter>
      </svg>
      <div
        className="absolute w-full h-full overflow-hidden bg-transparent select-none cursor-default"
        style={{
          filter: 'url("#blob")',
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          cursor: "none",
        }}
      >
        {trail.map((props, index) => (
          <animated.div
            key={index}
            className="absolute shadow-[10px_10px_5px_0_rgba(0,0,0,0.75)]"
            style={{
              transform: props.xy.to(
                trans
              ) as unknown as React.CSSProperties["transform"],
              width: `${sizes[index].width}px`,
              height: `${sizes[index].height}px`,
              willChange: "transform",
              borderRadius: blobType === "circle" ? "50%" : "0%",
              backgroundColor: fillColor,
              pointerEvents: "none",
              cursor: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: `${pseudoStyles[index].top}px`,
                left: `${pseudoStyles[index].left}px`,
                width: `${pseudoStyles[index].width}px`,
                height: `${pseudoStyles[index].height}px`,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.8)",
              }}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
}
