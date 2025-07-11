import React, { useEffect, useRef, useState } from "react";

// Example blob SVG paths from blobmaker.app
const blobs = [
  {
    color: "#ffe29a",
    path: "M44.2,-62.2C56.7,-54.7,65.7,-41.2,69.2,-26.9C72.7,-12.6,70.7,3.5,64.2,17.2C57.7,30.9,46.7,42.2,33.7,50.7C20.7,59.2,10.4,64.9,-2.2,68C-14.8,71.1,-29.6,71.6,-41.2,64.7C-52.8,57.8,-61.2,43.5,-65.2,28.7C-69.2,13.9,-68.8,-1.4,-63.7,-15.2C-58.6,-29,-48.8,-41.3,-36.7,-48.7C-24.6,-56.1,-12.3,-58.6,2.1,-61.2C16.5,-63.8,33,-66.7,44.2,-62.2Z",
    style: {
      left: "-8vw",
      bottom: "-6vw",
      width: "38vw",
      height: "38vw",
      zIndex: 0,
      filter: "blur(2px)",
    },
    animation: "blob-float-1"
  },
  {
    color: "#ffd6e0",
    path: "M54.6,-60.2C68.2,-49.2,74.7,-27.2,70.2,-8.2C65.7,10.8,50.2,21.7,36.6,32.2C23,42.7,11.5,52.8,-2.2,55.7C-15.9,58.6,-31.8,54.3,-44.2,44.2C-56.6,34.1,-65.5,18.1,-66.2,2.1C-66.9,-13.9,-59.3,-27.8,-47.9,-38.7C-36.5,-49.6,-21.2,-57.5,-3.7,-59.7C13.8,-61.9,27.6,-58.4,54.6,-60.2Z",
    style: {
      right: "-10vw",
      bottom: "-4vw",
      width: "32vw",
      height: "32vw",
      zIndex: 0,
      filter: "blur(1.5px)",
    },
    animation: "blob-float-2"
  },
  {
    color: "#b6f7e3",
    path: "M54.2,-61.2C67.2,-49.2,71.7,-27.2,67.2,-8.2C62.7,10.8,49.2,21.7,36.6,32.2C24,42.7,12,52.8,-2.2,55.7C-16.4,58.6,-32.8,54.3,-45.2,44.2C-57.6,34.1,-66.5,18.1,-67.2,2.1C-67.9,-13.9,-60.3,-27.8,-48.9,-38.7C-37.5,-49.6,-22.2,-57.5,-4.7,-59.7C12.8,-61.9,25.6,-58.4,54.2,-61.2Z",
    style: {
      left: "30vw",
      bottom: "-7vw",
      width: "28vw",
      height: "28vw",
      zIndex: 0,
      filter: "blur(1.5px)",
    },
    animation: "blob-float-3"
  },
];

const BlobBackground: React.FC<{ className?: string }> = ({ className }) => {
  const [visible, setVisible] = useState(0.2); // initial opacity
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Increase opacity as user scrolls past the hero section
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // When the top of the blob container is at the top of the viewport, opacity = 1
      // When it's at the bottom of the hero, opacity = 0.2
      const heroHeight = window.innerHeight * 0.7; // adjust as needed
      const scrollY = window.scrollY || window.pageYOffset;
      const start = heroHeight - 100;
      const end = heroHeight + 200;
      const y = scrollY;
      let op = 0.2;
      if (y > start) {
        op = Math.min(1, 0.2 + ((y - start) / (end - start)) * 0.8);
      }
      setVisible(op);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute w-full left-0 right-0 bottom-0 z-0 ${className || ""}`}
      style={{ height: "0", minHeight: 0 }}
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <svg
          key={i}
          viewBox="0 0 140 140"
          width={blob.style.width}
          height={blob.style.height}
          style={{
            position: "absolute",
            ...blob.style,
            opacity: visible,
            transition: "opacity 0.6s cubic-bezier(.4,0,.2,1)",
            willChange: "opacity, transform",
            animation: `${blob.animation} 12s ease-in-out infinite alternate`,
          }}
        >
          <path d={blob.path} fill={blob.color} />
        </svg>
      ))}
      <style>{`
        @keyframes blob-float-1 {
          0% { transform: translateY(0) scale(1) rotate(-2deg); }
          50% { transform: translateY(-18px) scale(1.04) rotate(2deg); }
          100% { transform: translateY(0) scale(1) rotate(-2deg); }
        }
        @keyframes blob-float-2 {
          0% { transform: translateY(0) scale(1) rotate(1deg); }
          50% { transform: translateY(-12px) scale(1.03) rotate(-2deg); }
          100% { transform: translateY(0) scale(1) rotate(1deg); }
        }
        @keyframes blob-float-3 {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-22px) scale(1.06) rotate(3deg); }
          100% { transform: translateY(0) scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default BlobBackground; 