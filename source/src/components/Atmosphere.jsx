import React, { useEffect, useRef } from "react";
// Local canvas: no WebGL, tracking, texture downloads or permanent animation loop off screen.
export default function Atmosphere({ paused }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      frame = 0,
      time = 0,
      previous = 0,
      visible = true;
    let pointer = { x: 0, y: 0 },
      eased = { x: 0, y: 0 };
    const draw = (now = 0) => {
      if (now - previous < 32 && now !== 0) {
        frame = requestAnimationFrame(draw);
        return;
      }
      previous = now;
      ctx.clearRect(0, 0, width, height);
      eased.x += (pointer.x - eased.x) * 0.045;
      eased.y += (pointer.y - eased.y) * 0.045;
      ctx.save();
      ctx.translate(width * 0.73 + eased.x * 22, height * 0.49 + eased.y * 18);
      ctx.rotate(-0.35 + Math.sin(time * 0.11) * 0.08);
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          width * (0.17 + i * 0.035),
          height * (0.3 + i * 0.036),
          0.26 + i * 0.045,
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = `rgba(216,183,137,${0.17 - i * 0.018})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      ctx.restore();
      time += 0.032;
      if (visible && !document.hidden && !paused && !media.matches)
        frame = requestAnimationFrame(draw);
    };
    const stop = () => cancelAnimationFrame(frame);
    const restart = () => {
      stop();
      draw();
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      restart();
    };
    const move = (e) => {
      if (paused || media.matches) return;
      const r = canvas.getBoundingClientRect();
      pointer = {
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
      };
    };
    const reset = () => {
      pointer = { x: 0, y: 0 };
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    const hero = canvas.parentElement;
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset, { passive: true });
    hero.addEventListener("pointerup", reset, { passive: true });
    document.addEventListener("visibilitychange", restart);
    media.addEventListener("change", restart);
    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
      hero.removeEventListener("pointerup", reset);
      document.removeEventListener("visibilitychange", restart);
      media.removeEventListener("change", restart);
    };
  }, [paused]);
  return <canvas ref={ref} className="atmosphere" aria-hidden="true" />;
}
