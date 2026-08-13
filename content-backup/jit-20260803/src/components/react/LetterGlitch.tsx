import { useRef, useEffect } from "react";

interface LetterGlitchProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  desktopBreakpoint?: number;
}

const DEFAULT_COLORS = ["#38bdf8", "#818cf8", "#34d399", "#0ea5e9"];

const CHARACTER_SET = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "!","@","#","$","&","*","(",")","-","_","+","=","/",
  "[","]","{","}",";",":","<",">",",",
  "0","1","2","3","4","5","6","7","8","9",
];

const FONT_SIZE = 16;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;

function getRandomChar() {
  return CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)];
}

function getRandomColor(colors: string[]) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function hexToRgb(hex: string) {
  const six = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (six) return { r: parseInt(six[1], 16), g: parseInt(six[2], 16), b: parseInt(six[3], 16) };
  const three = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
  if (three) return { r: parseInt(three[1] + three[1], 16), g: parseInt(three[2] + three[2], 16), b: parseInt(three[3] + three[3], 16) };
  return null;
}

function interpolateColor(
  start: { r: number; g: number; b: number },
  end: { r: number; g: number; b: number },
  factor: number,
) {
  const r = Math.round(start.r + (end.r - start.r) * factor);
  const g = Math.round(start.g + (end.g - start.g) * factor);
  const b = Math.round(start.b + (end.b - start.b) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

interface Letter {
  char: string;
  color: string;
  targetColor: string;
  colorProgress: number;
}

export default function LetterGlitch({
  glitchColors = DEFAULT_COLORS,
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  desktopBreakpoint = 1024,
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lettersRef = useRef<Letter[]>([]);
  const gridRef = useRef({ columns: 0, rows: 0 });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchRef = useRef(Date.now());
  const animatingRef = useRef(false);

  const drawLetters = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${FONT_SIZE}px monospace`;
    ctx.textBaseline = "top";

    lettersRef.current.forEach((letter, i) => {
      const x = (i % gridRef.current.columns) * CHAR_WIDTH;
      const y = Math.floor(i / gridRef.current.columns) * CHAR_HEIGHT;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;

    const columns = Math.ceil(rect.width / CHAR_WIDTH);
    const rows = Math.ceil(rect.height / CHAR_HEIGHT);
    gridRef.current = { columns, rows };

    lettersRef.current = Array.from({ length: columns * rows }, () => ({
      char: getRandomChar(),
      color: getRandomColor(glitchColors),
      targetColor: getRandomColor(glitchColors),
      colorProgress: 1,
    }));

    drawLetters();
  };

  const updateLetters = () => {
    const letters = lettersRef.current;
    if (!letters.length) return;

    const updateCount = Math.max(1, Math.floor(letters.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.length);
      if (!letters[index]) continue;

      letters[index].char = getRandomChar();
      letters[index].targetColor = getRandomColor(glitchColors);

      if (!smooth) {
        letters[index].color = letters[index].targetColor;
        letters[index].colorProgress = 1;
      } else {
        letters[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    lettersRef.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress = Math.min(letter.colorProgress + 0.05, 1);
        const start = hexToRgb(letter.color);
        const end = hexToRgb(letter.targetColor);
        if (start && end) {
          letter.color = interpolateColor(start, end, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });
    if (needsRedraw) drawLetters();
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchRef.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchRef.current = now;
    }
    if (smooth) handleSmoothTransitions();
    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    animate();
  };

  const stopAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    animatingRef.current = false;
  };

  const shouldAnimate = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return window.innerWidth >= desktopBreakpoint && !prefersReduced;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initCanvas();

    if (shouldAnimate()) startAnimation();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        stopAnimation();
        initCanvas();
        if (shouldAnimate()) startAnimation();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
    };
  }, [glitchColors, glitchSpeed, smooth, desktopBreakpoint]);

  return (
    <div className="relative w-full h-full bg-[#0b0f17] overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {outerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(11,15,23,0)_60%,_rgba(11,15,23,1)_100%)]" />
      )}
      {centerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]" />
      )}
    </div>
  );
}
