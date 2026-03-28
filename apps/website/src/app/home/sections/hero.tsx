"use client";

import { ArrowRight, Globe, ClipboardList } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// const ticker = [
//   "Marketing Websites",
//   "Event Registration",
//   "Sports Consulting",
//   "School Camps",
//   "Youth Athletics",
//   "Tournament Systems",
//   "Fan Engagement",
//   "Mobile-First Design",
// ];

// const services = [
//   {
//     icon: Globe,
//     label: "Marketing Websites",
//     desc: "Custom-built sites that convert visitors into clients",
//     stat: "50+",
//     statLabel: "Sites Launched",
//     accent: "#e8192c",
//   },
//   {
//     icon: ClipboardList,
//     label: "Event Registration",
//     desc: "End-to-end systems for sports orgs, schools & camps",
//     stat: "100K+",
//     statLabel: "Registrations",
//     accent: "rgba(255,255,255,.7)",
//   },
// ];

function useCountUp(target: string, duration = 1400, delay = 800) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const numeric = parseInt(target.replace(/[^0-9]/g, ""), 10);
    const suffix = target.replace(/[0-9]/g, "");
    if (!numeric) {
      setDisplay(target);
      return;
    }
    const start = performance.now() + delay;
    let raf: number;
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - start);
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * numeric) + suffix);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay]);
  return display;
}

function StatCount({ value, delay }: { value: string; delay: number }) {
  const v = useCountUp(value, 1400, delay);
  return <>{v}</>;
}

// Keyframe animations and a tiny set of design tokens that cannot be expressed
// in Tailwind utility classes (clip-path values, stroke-dasharray, @keyframes,
// clamp() font-sizes, custom font imports). Everything else is Tailwind.
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

  @keyframes h-up    { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }
  @keyframes h-left  { from{opacity:0;transform:translateX(-40px);}to{opacity:1;transform:translateX(0);} }
  @keyframes h-right { from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0);} }
  @keyframes h-ticker{ 0%{transform:translateX(0);}100%{transform:translateX(-50%);} }
  @keyframes h-fade  { from{opacity:0;}to{opacity:1;} }
  @keyframes slash-draw { from{stroke-dashoffset:2000;}to{stroke-dashoffset:0;} }
  @keyframes live-pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.7);} }

  .animate-h-up    { animation: h-up    0.7s  cubic-bezier(.22,1,.36,1) both; }
  .animate-h-left  { animation: h-left  0.65s cubic-bezier(.22,1,.36,1) both; }
  .animate-h-right { animation: h-right 0.65s cubic-bezier(.22,1,.36,1) both; }
  .animate-h-fade  { animation: h-fade  0.6s  ease both; }
  .animate-ticker  { animation: h-ticker 28s linear infinite; }
  .animate-live-pulse { animation: live-pulse 1.6s ease-in-out infinite; }

  .animate-word-in {
    display: block;
    transform: translateY(100%);
    opacity: 0;
    animation: h-up 0.7s cubic-bezier(.22,1,.36,1) forwards;
  }

  .slash-line {
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    animation: slash-draw 0.9s cubic-bezier(.22,1,.36,1) 0.2s forwards;
  }

  /* Delay helpers */
  .delay-d0 { animation-delay: .05s; }
  .delay-d1 { animation-delay: .18s; }
  .delay-d2 { animation-delay: .32s; }
  .delay-d3 { animation-delay: .46s; }
  .delay-d4 { animation-delay: .60s; }
  .delay-d5 { animation-delay: .75s; }
  .delay-d6 { animation-delay: .90s; }
  .delay-d7 { animation-delay: 1.05s; }

  /* Font families */
  .font-barlow           { font-family: 'Barlow', sans-serif; }
  .font-barlow-condensed { font-family: 'Barlow Condensed', sans-serif; }

  /* Fluid font size — no Tailwind equivalent */
  .text-headline { font-size: clamp(3rem, 9vw, 10rem); }
  .text-body     { font-size: clamp(.9rem, 1.15vw, 1.02rem); }

  /* Clip-path shapes */
  .clip-cta  { clip-path: polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px)); }
  .clip-icon { clip-path: polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px)); }
  .clip-stat { clip-path: polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px)); }
`;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const slashRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <section
        className="font-barlow h-[70vh] relative overflow-hidden flex flex-col bg-[#0f1623]"
      >
        {/* ── BG TEXTURE STACK ── */}

        {/* Halftone dots */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.055) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Jersey diagonal stripes */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-55deg, transparent, transparent 18px, rgba(255,255,255,.018) 18px, rgba(255,255,255,.018) 36px)",
          }}
        />

        {/* Noise grain */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.055,
            mixBlendMode: "overlay",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 40% 50%, transparent 30%, rgba(5,8,14,.65) 100%)",
          }}
        />

        {/* Red bloom — top left */}
        <div
          className="absolute z-0 pointer-events-none"
          style={{
            top: "-10%",
            left: "-8%",
            width: "55vw",
            height: "55vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,25,44,.07) 0%, transparent 65%)",
          }}
        />

        {/* Top red bar */}
        <div
          className="absolute top-0 left-0 right-0 z-30 h-px bg-[#e8192c]"
        />

        {/* ── SVG Diagonal slash ── */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            ref={slashRef}
            className="slash-line"
            x1="62"
            y1="-2"
            x2="52"
            y2="102"
            stroke="#e8192c"
            strokeWidth=".35"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="63.4"
            y1="-2"
            x2="53.4"
            y2="102"
            stroke="rgba(232,25,44,.15)"
            strokeWidth=".8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-20 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-12 xl:py-0">
            <div
              className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-10 xl:gap-0 items-stretch"
              style={{ minHeight: "calc(80vh - 56px)" }}
            >
              {/* ════ LEFT ════ */}
              <div className="flex flex-col justify-center gap-7 xl:pr-16 py-8">

                {/* Headline */}
                <div>
                  <h1
                    className="font-barlow-condensed font-black italic uppercase text-headline leading-[.88] tracking-[-0.01em]"
                  >
                    {/* GRIT DIGITAL */}
                    <span className="block overflow-hidden">
                      <span
                        className="animate-word-in text-white block"
                        style={{ animationDelay: ".1s" }}
                      >
                        GRIT DIGITAL
                      </span>
                    </span>

                    {/* PERFORMANCE — outline */}
                    <span className="block overflow-hidden">
                      <span
                        className="animate-word-in text-stroke-red block"
                        style={{ animationDelay: ".4s" }}
                      >
                        PERFORMANCE.
                      </span>
                    </span>
                  </h1>
                </div>

                {/* Divider rule */}
                <div
                  className={mounted ? "animate-h-fade delay-d3 h-px" : "opacity-0 h-px"}
                  style={{
                    background:
                      "linear-gradient(to right, #e8192c, rgba(232,25,44,.2), transparent)",
                  }}
                />

                {/* Body copy */}
                <p
                  className={`text-slate-400 leading-relaxed max-w-md text-body ${mounted ? "animate-h-up delay-d4" : "opacity-0"
                    }`}
                >
                  Strategy, systems, and execution designed to drive measurable
                  growth across every digital channel.
                </p>

                {/* CTAs */}
                <div
                  className={`flex flex-col sm:flex-row gap-3 ${mounted ? "animate-h-up delay-d5" : "opacity-0"
                    }`}
                >
                  {/* Primary red button */}
                  <button
                    className="clip-cta font-barlow-condensed font-bold uppercase tracking-[.09em] bg-[#e8192c] text-white inline-flex items-center gap-2 px-7 py-3 text-base whitespace-nowrap transition-colors duration-180 hover:bg-[#b91220] hover:translate-x-[3px]"
                  >
                    Get a Performance Audit{" "}
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>

                  {/* Ghost button */}
                  <button
                    className="clip-cta font-barlow-condensed font-bold uppercase tracking-[.09em] text-white border border-white/20 inline-flex items-center gap-2 px-7 py-3 text-base whitespace-nowrap transition-[border-color,background] duration-180 hover:border-white/50 hover:bg-white/[.07]"
                  >
                    View Our Work
                  </button>
                </div>
              </div>

              {/* ════ RIGHT — Scoreboard panel (commented out, preserved) ════ */}
              {/*
              <div
                className={`hidden xl:flex flex-col justify-center py-16 xl:pl-14 ${
                  mounted ? "animate-h-right delay-d3" : "opacity-0"
                }`}
              >
                <div
                  className="border-l-[3px] border-[#e8192c] bg-white/[.03] backdrop-blur-[4px] relative overflow-hidden p-0"
                >
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: -60, top: "20%", bottom: "20%", width: 120,
                      background:
                        "radial-gradient(ellipse at right, rgba(232,25,44,.18), transparent 70%)",
                    }}
                  />

                  {services.map((s, i) => (
                    <div key={i}>
                      <div className="px-6 py-6 transition-colors duration-200 hover:bg-[rgba(232,25,44,.06)]">
                        <div className="flex items-start gap-4">
                          <div
                            className="clip-icon shrink-0 mt-0.5 flex items-center justify-center bg-[rgba(232,25,44,.12)] text-[#e8192c]"
                            style={{ width: 38, height: 38 }}
                          >
                            <s.icon style={{ width: 16, height: 16 }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-barlow-condensed font-bold uppercase text-white mb-1 text-[.95rem] tracking-[.05em]">
                              {s.label}
                            </div>
                            <p className="text-slate-500 leading-snug text-[.78rem]">
                              {s.desc}
                            </p>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <div className="font-barlow-condensed font-black italic text-white text-[2.4rem] leading-none">
                              {mounted ? (
                                <StatCount value={s.stat} delay={900 + i * 300} />
                              ) : (
                                "0"
                              )}
                            </div>
                            <div className="font-barlow-condensed font-bold uppercase text-[.55rem] tracking-[.18em] text-white/30">
                              {s.statLabel}
                            </div>
                          </div>
                        </div>
                      </div>
                      {i < services.length - 1 && (
                        <div
                          className="mx-6 h-px"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(255,255,255,.08), transparent)",
                          }}
                        />
                      )}
                    </div>
                  ))}

                  <div
                    className="px-6 py-4 border-t border-white/[.07] flex items-center justify-between bg-[rgba(232,25,44,.06)]"
                  >
                    <span className="font-barlow-condensed font-bold uppercase text-[.58rem] tracking-[.18em] text-white opacity-35">
                      Est. USA · Grit Digital Performance
                    </span>
                    <div className="font-barlow-condensed font-bold uppercase text-[.6rem] tracking-[.18em] text-[#e8192c]">
                      98% Satisfaction
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { value: "300%", label: "Avg. Growth" },
                    { value: "$2M+", label: "Revenue Driven" },
                  ].map(({ value, label }, i) => (
                    <div
                      key={i}
                      className="clip-stat bg-white/[.03] border border-white/[.07] p-[.9rem_1.1rem]"
                    >
                      <div className="font-barlow-condensed font-black italic text-white text-[1.8rem] leading-none">
                        {value}
                      </div>
                      <div className="font-barlow-condensed font-bold uppercase text-[.58rem] tracking-[.18em] text-white/30 mt-1">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}