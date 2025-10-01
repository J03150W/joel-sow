import { useEffect, useState, useRef, CSSProperties } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface DecryptedTextProps extends HTMLMotionProps<"span"> {
  text: string | string[]; // Modified to accept both string and array
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover";
  style?: CSSProperties;
  // New props for array functionality
  wordTransitionDelay?: number; // Delay between words in ms
  cycleWords?: boolean; // Whether to cycle through words continuously
  inline?: boolean; // Whether to display inline or block
}

export default function DecryptedText({
  text,
  speed = 100,
  maxIterations = 20,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  style,
  wordTransitionDelay = 2000, // 2 seconds between words
  cycleWords = true,
  inline = false, // New prop to control inline vs block display
  ...props
}: DecryptedTextProps) {
  const isArrayMode = Array.isArray(text);
  const textArray = isArrayMode ? text : [text];
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>(textArray[0]);

  const [displayText, setDisplayText] = useState<string>(textArray[0]);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set()
  );
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<string>("2.5rem");
  const [reservedWidth, setReservedWidth] = useState<number>(0);
  const wordTransitionTimeoutRef = useRef<NodeJS.Timeout>(null);
  const decryptionIntervalRef = useRef<NodeJS.Timeout>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1536px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setFontSize("200px");
      } else {
        setFontSize("120px");
      }
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // Calculate and reserve maximum width needed for all possible character combinations
  useEffect(() => {
    if (!containerRef.current) return;

    const calculateMaxWidth = () => {
      const testElement = document.createElement("span");
      testElement.style.position = "absolute";
      testElement.style.visibility = "hidden";
      testElement.style.whiteSpace = "nowrap";
      testElement.style.fontSize = fontSize;
      testElement.style.fontFamily = "Switzer, sans-serif";
      testElement.style.fontWeight = "bold";
      testElement.style.fontStyle = "italic";

      document.body.appendChild(testElement);

      let maxWidth = 0;
      const availableChars = useOriginalCharsOnly
        ? Array.from(new Set(currentText.split(""))).filter(
            (char) => char !== " "
          )
        : characters.split("");

      // Test with widest possible characters for each position
      const testCombinations = [];

      // Add original text
      testCombinations.push(currentText);

      // Add combinations with widest characters
      const wideChars = ["W", "M", "Q", "@", "#", "%", "&"];
      const testText = currentText
        .split("")
        .map((char) => {
          if (char === " ") return " ";
          // Use the first wide character that exists in available chars, or 'W' as fallback
          return wideChars.find((w) => availableChars.includes(w)) || "W";
        })
        .join("");
      testCombinations.push(testText);

      // Test a few random combinations
      for (let i = 0; i < 5; i++) {
        const randomText = currentText
          .split("")
          .map((char) => {
            if (char === " ") return " ";
            return availableChars[
              Math.floor(Math.random() * availableChars.length)
            ];
          })
          .join("");
        testCombinations.push(randomText);
      }

      testCombinations.forEach((text) => {
        testElement.textContent = text;
        const width = testElement.getBoundingClientRect().width;
        maxWidth = Math.max(maxWidth, width);
      });

      document.body.removeChild(testElement);
      setReservedWidth(Math.ceil(maxWidth + 10)); // Add small buffer
    };

    // Recalculate when text or font size changes
    const timeoutId = setTimeout(calculateMaxWidth, 10);
    return () => clearTimeout(timeoutId);
  }, [currentText, fontSize, useOriginalCharsOnly, characters]);

  // Handle word cycling for array mode
  useEffect(() => {
    if (!isArrayMode || !cycleWords || textArray.length <= 1) return;

    const startWordCycle = () => {
      if (wordTransitionTimeoutRef.current) {
        clearTimeout(wordTransitionTimeoutRef.current);
      }

      wordTransitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(true);

        // Start scrambling current word
        setIsScrambling(true);

        // After a brief scrambling period, switch to next word
        setTimeout(() => {
          const nextIndex = (currentWordIndex + 1) % textArray.length;
          setCurrentWordIndex(nextIndex);
          setCurrentText(textArray[nextIndex]);
          setDisplayText(textArray[nextIndex]);
          setRevealedIndices(new Set());
          setIsTransitioning(false);

          // Trigger decryption animation for new word
          setIsHovering(true);
        }, speed * 5); // Brief scrambling period
      }, wordTransitionDelay);
    };

    // Only start cycling if we're in hover/view mode and not currently transitioning
    if ((isHovering || animateOn === "view") && !isTransitioning) {
      startWordCycle();
    }

    return () => {
      if (wordTransitionTimeoutRef.current) {
        clearTimeout(wordTransitionTimeoutRef.current);
      }
    };
  }, [
    currentWordIndex,
    isHovering,
    isTransitioning,
    isArrayMode,
    cycleWords,
    textArray,
    wordTransitionDelay,
    speed,
    animateOn,
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const getNextIndex = (revealedSet: Set<number>): number => {
      const textLength = currentText.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !revealedSet.has(nextIndex)
          ) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(currentText.split(""))).filter(
          (char) => char !== " "
        )
      : characters.split("");

    const shuffleText = (
      originalText: string,
      currentRevealed: Set<number>
    ): string => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split("").map((char, i) => ({
          char,
          isSpace: char === " ",
          index: i,
          isRevealed: currentRevealed.has(i),
        }));

        const nonSpaceChars = positions
          .filter((p) => !p.isSpace && !p.isRevealed)
          .map((p) => p.char);

        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonSpaceChars[i], nonSpaceChars[j]] = [
            nonSpaceChars[j],
            nonSpaceChars[i],
          ];
        }

        let charIndex = 0;
        return positions
          .map((p) => {
            if (p.isSpace) return " ";
            if (p.isRevealed) return originalText[p.index];
            return nonSpaceChars[charIndex++];
          })
          .join("");
      } else {
        return originalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (currentRevealed.has(i)) return originalText[i];
            return availableChars[
              Math.floor(Math.random() * availableChars.length)
            ];
          })
          .join("");
      }
    };

    if (isHovering || isTransitioning) {
      setIsScrambling(true);
      decryptionIntervalRef.current = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential && !isTransitioning) {
            if (prevRevealed.size < currentText.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(currentText, newRevealed));
              return newRevealed;
            } else {
              clearInterval(decryptionIntervalRef.current!);
              setIsScrambling(false);
              return prevRevealed;
            }
          } else {
            setDisplayText(
              shuffleText(
                currentText,
                isTransitioning ? new Set() : prevRevealed
              )
            );
            currentIteration++;
            if (currentIteration >= maxIterations && !isTransitioning) {
              clearInterval(decryptionIntervalRef.current!);
              setIsScrambling(false);
              setDisplayText(currentText);
            }
            return prevRevealed;
          }
        });
      }, speed);
      interval = decryptionIntervalRef.current;
    } else {
      setDisplayText(currentText);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isHovering,
    isTransitioning,
    currentText,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
  ]);

  useEffect(() => {
    if (animateOn !== "view") return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true);
          setHasAnimated(true);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (wordTransitionTimeoutRef.current) {
        clearTimeout(wordTransitionTimeoutRef.current);
      }
      if (decryptionIntervalRef.current) {
        clearInterval(decryptionIntervalRef.current);
      }
    };
  }, []);

  const hoverProps =
    animateOn === "hover"
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => {
            if (!isArrayMode) {
              setIsHovering(false);
            }
            // For array mode, keep hovering state to continue cycling
          },
        }
      : {};

  const defaultStyle: CSSProperties = {
    color: "#101010",
    fontSize,
    fontStyle: "italic",
    fontWeight: "bold",
    lineHeight: 1.1,
    display: inline ? "inline-block" : "block",
    fontFamily: "Switzer, sans-serif",
    minWidth: inline
      ? reservedWidth > 0
        ? `${reservedWidth}px`
        : "auto"
      : "auto",
    whiteSpace: "nowrap", // Prevent wrapping during animation
    ...style,
  };

  return (
    <motion.span
      ref={containerRef}
      className={`whitespace-pre-wrap ${parentClassName}`}
      style={defaultStyle}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{displayText}</span>

      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) ||
            (!isScrambling && !isTransitioning) ||
            !isHovering;

          return (
            <span
              key={`${currentWordIndex}-${index}`} // Include word index in key for proper re-rendering
              className={`${isRevealedOrDone ? className : encryptedClassName}`}
              style={{ display: "inline-block" }}
              aria-hidden="true"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
