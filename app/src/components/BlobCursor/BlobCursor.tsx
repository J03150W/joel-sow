"use client";
import { useTrail, animated } from "@react-spring/web";
import { useState, useRef, useEffect, useCallback } from "react";

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x: number, y: number) =>
  `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

// Create a proper animated component with children
const AnimatedBlob = animated.div as React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}>;

export default function BlobCursor({
  blobType,
  fillColor,
}: {
  blobType: string;
  fillColor: string;
}) {
  const [hasMoved, setHasMoved] = useState(false);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [isVisible, setIsVisible] = useState(true);
  const [isCursorInViewport, setIsCursorInViewport] = useState(true);
  const [lastCursorPosition, setLastCursorPosition] = useState<
    [number, number]
  >([0, 0]);
  const [oElementSize, setOElementSize] = useState({ width: 0, height: 0 });
  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const oElementRef = useRef<HTMLElement | null>(null);

  const [trail, api] = useTrail(3, (i) => ({
    xy: position,
    opacity: 1,
    config: i === 0 ? fast : slow,
  }));

  // Get position with consistent offsets
  const getPositionWithOffsets = useCallback(
    (x: number, y: number): [number, number] => {
      return [x + 5, y + 10]; // Apply consistent offsets
    },
    []
  );

  // Get and update the size of the "o" element
  const updateOElementSize = useCallback(() => {
    oElementRef.current = document.getElementById("o");
    if (oElementRef.current) {
      const rect = oElementRef.current.getBoundingClientRect();
      setOElementSize({ width: rect.width, height: rect.height });
    }
  }, []);

  // Calculate sizes based on "o" element dimensions - use one-third scale
  const getSizes = useCallback(() => {
    if (oElementSize.height === 0) {
      // Default sizes if "o" element not found
      return [
        { width: 60, height: 60 },
        { width: 125, height: 125 },
        { width: 75, height: 75 },
      ];
    }

    // Use one-third of the "o" element height as base
    const baseHeight = oElementSize.height * (7 / 30); // One-third of o's height

    return [
      { width: baseHeight * 0.8, height: baseHeight * 0.8 }, // Smallest: 80% of base
      { width: baseHeight * 1.6, height: baseHeight * 1.6 }, // Medium: 160% of base
      { width: baseHeight * 1.2, height: baseHeight * 1.2 }, // Large: 120% of base
    ];
  }, [oElementSize]);

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

  // Check if cursor is in viewport
  const checkCursorInViewport = useCallback((x: number, y: number) => {
    const inViewport =
      x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight;
    setIsCursorInViewport(inViewport);
    return inViewport;
  }, []);

  // Check if cursor is in allowed section
  const checkCursorInAllowedSection = useCallback((x: number, y: number) => {
    if (!sectionsRef.current) return false;

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

  // Update visibility based on current cursor position
  const updateVisibility = useCallback(
    (x: number, y: number) => {
      const inViewport = checkCursorInViewport(x, y);
      const inAllowedSection = checkCursorInAllowedSection(x, y);

      const shouldBeVisible = inViewport && inAllowedSection;
      const body = document.body;

      if (shouldBeVisible) {
        if (!isVisible) {
          setIsVisible(true);
          api.start({ xy: getPositionWithOffsets(x, y), opacity: 1 });
        } else {
          api.start({ xy: getPositionWithOffsets(x, y), opacity: 1 });
        }
        body.classList.add("cursor-none");
      } else {
        if (isVisible) {
          setIsVisible(false);
          api.start({ opacity: 0 });
        }
        body.classList.remove("cursor-none");
      }
    },
    [
      api,
      isVisible,
      checkCursorInViewport,
      checkCursorInAllowedSection,
      getPositionWithOffsets,
    ]
  );

  // Update position based on "o" element
  const updatePosition = useCallback(() => {
    updateOElementSize(); // Update the size first
    oElementRef.current = document.getElementById("o");
    if (oElementRef.current) {
      const rect = oElementRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const [offsetX, offsetY] = getPositionWithOffsets(x, y);
      setPosition([offsetX, offsetY]);

      if (!hasMoved) {
        api.start({ xy: [offsetX, offsetY], opacity: isVisible ? 1 : 0 });
      }
    }
  }, [api, hasMoved, isVisible, getPositionWithOffsets, updateOElementSize]);

  // Handle mouse movement
  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);

      const x = e.clientX;
      const y = e.clientY;
      const [offsetX, offsetY] = getPositionWithOffsets(x, y);
      setPosition([offsetX, offsetY]);
      setLastCursorPosition([x, y]);

      updateVisibility(x, y);
    },
    [hasMoved, updateVisibility, getPositionWithOffsets]
  );

  // Handle scroll to update "o" position and check section visibility
  const handleScroll = useCallback(() => {
    updatePosition();

    // Check visibility based on last known cursor position
    const [x, y] = lastCursorPosition;
    updateVisibility(x, y);

    // If cursor hasn't moved yet, check at "o" element position
    if (!hasMoved && oElementRef.current) {
      const rect = oElementRef.current.getBoundingClientRect();
      const oX = rect.left + rect.width / 2;
      const oY = rect.top + rect.height / 2;
      updateVisibility(oX, oY);
    }
  }, [updatePosition, lastCursorPosition, hasMoved, updateVisibility]);

  useEffect(() => {
    // Get all sections where the blob should be visible
    sectionsRef.current = document.querySelectorAll("[data-blob-active]");

    // Initial position update
    updatePosition();

    // Add event listeners
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Check if cursor leaves viewport
    document.addEventListener("mouseleave", () => {
      setIsCursorInViewport(false);
      setIsVisible(false);
      api.start({ opacity: 0 });
    });

    // Check if cursor enters viewport
    document.addEventListener("mouseenter", (e) => {
      setIsCursorInViewport(true);
      if (e instanceof MouseEvent) {
        updateVisibility(e.clientX, e.clientY);
      }
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      document.removeEventListener("mouseleave", () => {});
      document.removeEventListener("mouseenter", () => {});
    };
  }, [handleMove, handleScroll, updatePosition, api, updateVisibility]);

  // Calculate sizes and pseudo styles dynamically
  const sizes = getSizes();
  const pseudoStyles = getPseudoStyles(sizes);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 100, pointerEvents: "none" }}
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
        className="absolute w-full h-full overflow-hidden bg-transparent select-none cursor-default mr-5"
        style={{
          filter: 'url("#blob")',
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
      >
        {trail.map((props, index) => (
          <AnimatedBlob
            key={index}
            className="absolute shadow-[10px_10px_5px_0_rgba(0,0,0,0.75)]"
            style={{
              transform: props.xy.to(trans as any),
              opacity: props.opacity as any,
              width: `${sizes[index].width}px`,
              height: `${sizes[index].height}px`,
              willChange: "transform, opacity",
              borderRadius: blobType === "circle" ? "50%" : "0%",
              backgroundColor: fillColor,
              pointerEvents: "none",
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
          </AnimatedBlob>
        ))}
      </div>
    </div>
  );
}
