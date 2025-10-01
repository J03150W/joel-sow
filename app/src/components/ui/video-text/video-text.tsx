import React, { useEffect, useState, useMemo } from "react";

interface VideoTextMaskProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
  fontFamily?: string;
  children?: React.ReactNode;
}

const VideoTextMask: React.FC<VideoTextMaskProps> = ({
  src,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  children,
}) => {
  const [svgMask, setSvgMask] = useState<string>("");

  const content = useMemo(() => {
    if (typeof children === "string") {
      return children;
    }
    return React.Children.toArray(children).join("");
  }, [children]);

  const dataUrlMask = useMemo(
    () => `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`,
    [svgMask]
  );

  const updateSvgMask = () => {
    const responsiveFontSize =
      typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
    const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}'>${content}</text></svg>`;
    setSvgMask(newSvgMask);
  };

  useEffect(() => {
    updateSvgMask();
    window.addEventListener("resize", updateSvgMask);

    return () => {
      window.removeEventListener("resize", updateSvgMask);
    };
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);

  return (
    <div className={`relative size-full ${className}`}>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          className="size-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>
      <span className="sr-only">{content}</span>
    </div>
  );
};

export default VideoTextMask;
