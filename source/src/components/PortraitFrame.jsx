import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "./Icon.jsx";
import "./PortraitFrame.css";

/**
 * Gallery treatment inspired by React Bits TiltedCard and SpotlightCard.
 * Reference/license details: source/MATERIAIS.md and REACT-BITS-LICENSE.txt.
 * Reuses GSAP; no gyroscope, continuous loop, touch capture, or remote assets.
 */
export default function PortraitFrame({ children, paused = false }) {
  const root = useRef(null);

  useEffect(() => {
    if (paused) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        pointer: "(hover: hover) and (pointer: fine)",
        mobile: "(max-width: 700px)",
      },
      (context) => {
        if (!context.conditions.motion) return;
        const stage = root.current;
        const frame = stage.querySelector(".portrait-gallery__body");
        const light = stage.querySelector(".portrait-gallery__spotlight");
        const select = gsap.utils.selector(stage);

        // Separate elements own scroll, pointer, and photograph transforms.
        const entrance = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top 94%",
            end: "top 35%",
            scrub: 0.65,
          },
        });
        entrance
          .from(
            select(".portrait-gallery__arrival"),
            {
              y: context.conditions.mobile ? 18 : 30,
              rotation: -1.4,
              ease: "power2.out",
              duration: 1,
            },
            0,
          )
          .from(
            select(".portrait-gallery__outline rect"),
            {
              strokeDashoffset: 1,
              ease: "power1.inOut",
              duration: 1,
            },
            0,
          )
          .fromTo(
            select(".portrait-gallery__shine"),
            { xPercent: -110 },
            { xPercent: 110, ease: "none", duration: 0.8 },
            0.15,
          );

        gsap.fromTo(
          select(".portrait-gallery__photo img"),
          { yPercent: 1, scale: 1.035 },
          {
            yPercent: -1,
            scale: 1.035,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );

        if (!context.conditions.pointer) return;
        const tween = { duration: 0.55, ease: "power3.out" };
        const rotateX = gsap.quickTo(frame, "rotationX", tween);
        const rotateY = gsap.quickTo(frame, "rotationY", tween);
        const lightX = gsap.quickTo(light, "--light-x", tween);
        const lightY = gsap.quickTo(light, "--light-y", tween);
        const presence = gsap.quickTo(light, "opacity", tween);
        const tweens = [rotateX, rotateY, lightX, lightY, presence];
        let visible = false;

        const reset = () => {
          rotateX(0);
          rotateY(0);
          presence(0);
        };
        const stop = () => {
          tweens.forEach((to) => to.tween.pause());
          gsap.set(frame, { rotationX: 0, rotationY: 0 });
          gsap.set(light, { opacity: 0 });
        };
        const move = (event) => {
          if (event.pointerType === "touch" || !visible || document.hidden)
            return;
          const box = stage.getBoundingClientRect();
          const x = gsap.utils.clamp(
            0,
            1,
            (event.clientX - box.left) / box.width,
          );
          const y = gsap.utils.clamp(
            0,
            1,
            (event.clientY - box.top) / box.height,
          );
          rotateX((0.5 - y) * 5);
          rotateY((x - 0.5) * 6);
          lightX(x * 100);
          lightY(y * 100);
          presence(1);
        };
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (!visible) stop();
        });
        const visibility = () => {
          if (document.hidden) stop();
        };
        observer.observe(stage);
        stage.addEventListener("pointermove", move, { passive: true });
        stage.addEventListener("pointerleave", reset, { passive: true });
        stage.addEventListener("pointercancel", reset, { passive: true });
        document.addEventListener("visibilitychange", visibility);
        return () => {
          observer.disconnect();
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerleave", reset);
          stage.removeEventListener("pointercancel", reset);
          document.removeEventListener("visibilitychange", visibility);
          tweens.forEach((to) => to.tween.kill());
        };
      },
      root,
    );
    return () => media.revert();
  }, [paused]);

  return (
    <div className="portrait-gallery" ref={root}>
      <div className="portrait-gallery__halo" aria-hidden="true" />
      <svg
        className="portrait-gallery__outline"
        viewBox="0 0 400 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="398" height="498" pathLength="1" />
      </svg>
      <div className="portrait-gallery__arrival">
        <div className="portrait-gallery__body">
          <div className="portrait-gallery__mount">
            <div className="portrait-gallery__photo">{children}</div>
          </div>
          <div className="portrait-gallery__edge" aria-hidden="true">
            <span className="portrait-gallery__shine" />
          </div>
          <span className="portrait-gallery__spotlight" aria-hidden="true" />
          <svg
            className="portrait-gallery__corners"
            viewBox="0 0 400 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M8 35V8h27M365 8h27v27M392 465v27h-27M35 492H8v-27" />
          </svg>
          <span className="portrait-gallery__seal" aria-hidden="true">
            <Icon name="scales" />
          </span>
        </div>
      </div>
    </div>
  );
}
