"use client";

import { ArrowRight, Globe, ClipboardList } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const ticker = [
  "Marketing Websites",
  "Event Registration",
  "Sports Consulting",
  "School Camps",
  "Youth Athletics",
  "Tournament Systems",
  "Fan Engagement",
  "Mobile-First Design",
];

const services = [
  {
    icon: Globe,
    label: "Marketing Websites",
    desc: "Custom-built sites that convert visitors into clients",
    stat: "50+",
    statLabel: "Sites Launched",
    accent: "#e8192c",
  },
  {
    icon: ClipboardList,
    label: "Event Registration",
    desc: "End-to-end systems for sports orgs, schools & camps",
    stat: "100K+",
    statLabel: "Registrations",
    accent: "rgba(255,255,255,.7)",
  },
];

/* Simple count-up hook */
function useCountUp(target: string, duration = 1400, delay = 800) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const numeric = parseInt(target.replace(/[^0-9]/g, ""), 10);
    const suffix = target.replace(/[0-9]/g, "");
    if (!numeric) { setDisplay(target); return; }
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

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const slashRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .h-root    { font-family:'Barlow',sans-serif; background:#0f1623; }
        .h-display { font-family:'Barlow Condensed',sans-serif; }

        /* ── Animations ── */
        @keyframes h-up    { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }
        @keyframes h-left  { from{opacity:0;transform:translateX(-40px);}to{opacity:1;transform:translateX(0);} }
        @keyframes h-right { from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0);} }
        @keyframes h-ticker{ 0%{transform:translateX(0);}100%{transform:translateX(-50%);} }
        @keyframes h-fade  { from{opacity:0;}to{opacity:1;} }

        /* Slash draw-down */
        @keyframes slash-draw {
          from { stroke-dashoffset: 2000; }
          to   { stroke-dashoffset: 0; }
        }
        .h-slash-line {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: slash-draw .9s cubic-bezier(.22,1,.36,1) .2s forwards;
        }

        /* Headline word stagger */
        .h-word { display:block; overflow:hidden; }
        .h-word-inner {
          display:block;
          transform:translateY(100%);
          opacity:0;
          animation:h-up .7s cubic-bezier(.22,1,.36,1) forwards;
        }

        .h-au  { animation:h-up    .65s cubic-bezier(.22,1,.36,1) both; }
        .h-al  { animation:h-left  .65s cubic-bezier(.22,1,.36,1) both; }
        .h-ar  { animation:h-right .65s cubic-bezier(.22,1,.36,1) both; }
        .h-af  { animation:h-fade  .6s  ease both; }

        .h-d0 { animation-delay:.05s; }
        .h-d1 { animation-delay:.18s; }
        .h-d2 { animation-delay:.32s; }
        .h-d3 { animation-delay:.46s; }
        .h-d4 { animation-delay:.60s; }
        .h-d5 { animation-delay:.75s; }
        .h-d6 { animation-delay:.90s; }
        .h-d7 { animation-delay:1.05s; }

        .h-ticker { animation:h-ticker 28s linear infinite; white-space:nowrap; }

        /* ── Halftone dot bg ── */
        .h-halftone {
          background-image: radial-gradient(circle, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events:none;
        }

        /* ── Jersey diagonal stripe ── */
        .h-jersey {
          background-image: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 18px,
            rgba(255,255,255,.018) 18px,
            rgba(255,255,255,.018) 36px
          );
          pointer-events:none;
        }

        /* ── Noise grain ── */
        .h-grain {
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.055; mix-blend-mode:overlay; pointer-events:none;
        }

        /* ── Vignette ── */
        .h-vignette {
          background: radial-gradient(ellipse at 40% 50%, transparent 30%, rgba(5,8,14,.65) 100%);
          pointer-events:none;
        }

        /* ── Headline ── */
        .h-headline {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900; font-style:italic; text-transform:uppercase;
          line-height:.88; letter-spacing:-.01em;
          font-size: clamp(4rem, 9vw, 10rem);
        }

        .h-outline {
          -webkit-text-stroke: 3px #e8192c;
          color: transparent;
        }

        .h-tag {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700; text-transform:uppercase;
          font-size:.68rem; letter-spacing:.18em;
        }

        /* ── CTA buttons ── */
        .h-btn-red {
          font-family:'Barlow Condensed',sans-serif;font-weight:700;
          text-transform:uppercase;letter-spacing:.09em;
          background:#e8192c;color:#fff;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex;align-items:center;gap:8px;
          padding:13px 28px;font-size:1rem;white-space:nowrap;
        }
        .h-btn-red:hover { background:#b91220; transform:translateX(3px); }

        .h-btn-ghost {
          font-family:'Barlow Condensed',sans-serif;font-weight:700;
          text-transform:uppercase;letter-spacing:.09em;color:#fff;
          border:1.5px solid rgba(255,255,255,.22);
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:border-color .18s,background .18s;
          display:inline-flex;align-items:center;gap:8px;
          padding:13px 28px;font-size:1rem;white-space:nowrap;
        }
        .h-btn-ghost:hover { border-color:rgba(255,255,255,.55); background:rgba(255,255,255,.07); }

        /* ── Scoreboard panel ── */
        .h-board {
          border-left: 3px solid #e8192c;
          background: rgba(255,255,255,.03);
          backdrop-filter: blur(4px);
          position:relative; overflow:hidden;
        }

        .h-board-row {
          transition: background .2s;
          position:relative;
        }
        .h-board-row:hover { background: rgba(232,25,44,.06); }

        /* Live indicator pulse */
        @keyframes live-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.7); }
        }
        .h-live-dot {
          width:7px;height:7px;border-radius:50%;background:#e8192c;
          animation:live-pulse 1.6s ease-in-out infinite;
          flex-shrink:0;
        }

        /* Scoreboard stat count */
        .h-score-val {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900;font-style:italic;
          font-size:2.4rem;line-height:1;
          color:#fff;
        }

        /* Divider line */
        .h-divider {
          height:1px;
          background:linear-gradient(to right,rgba(255,255,255,.08),transparent);
        }

        /* Red left glow behind panel */
        .h-panel-glow {
          position:absolute;left:-60px;top:20%;bottom:20%;width:120px;
          background:radial-gradient(ellipse at right,rgba(232,25,44,.18),transparent 70%);
          pointer-events:none;
        }

        /* Bottom rule */
        .h-rule {
          height:1px;
          background:linear-gradient(to right,#e8192c,rgba(232,25,44,.2),transparent);
        }
      `}</style>

      <section className="h-root relative overflow-hidden min-h-screen flex flex-col">

        {/* ── BG TEXTURE STACK ── */}
        <div className="h-halftone absolute inset-0 z-0" />
        <div className="h-jersey  absolute inset-0 z-0" />
        <div className="h-grain   absolute inset-0 z-0" />
        <div className="h-vignette absolute inset-0 z-0" />

        {/* Soft red bloom — top left */}
        <div
          className="absolute z-0 pointer-events-none"
          style={{
            top: "-10%", left: "-8%",
            width: "55vw", height: "55vw",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
          }}
        />

        {/* Top red bar */}
        <div className="absolute top-0 left-0 right-0 h-0.75 z-30" style={{ background: "#e8192c" }} />

        {/* ── SVG Diagonal slash — full height, sits between left & right ── */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            ref={slashRef}
            className="h-slash-line"
            x1="62" y1="-2"
            x2="52" y2="102"
            stroke="#e8192c"
            strokeWidth=".35"
            vectorEffect="non-scaling-stroke"
          />
          {/* Faint shadow echo */}
          <line
            x1="63.4" y1="-2"
            x2="53.4" y2="102"
            stroke="rgba(232,25,44,.15)"
            strokeWidth=".8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-20 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-16 xl:py-0">

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-10 xl:gap-0 items-stretch min-h-[calc(100vh-56px)]">

              {/* ════ LEFT ════ */}
              <div className="flex flex-col justify-center gap-7 xl:pr-16 py-16">

                {/* Tag */}
                <div className={`flex items-center gap-3 ${mounted ? "h-au h-d0" : "opacity-0"}`}>
                  <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
                  <span className="h-tag" style={{ color: "#e8192c" }}>
                    Digital Performance Agency
                  </span>
                </div>

                {/* Headline — 3 word stagger */}
                <div>
                  <h1 className="h-headline">
                    {/* GRIT */}
                    <span className="h-word">
                      <span
                        className="h-word-inner text-white"
                        style={{ animationDelay: ".1s" }}
                      >
                        GRIT.
                      </span>
                    </span>
                    {/* DIGITAL */}
                    <span className="h-word">
                      <span
                        className="h-word-inner text-white"
                        style={{ animationDelay: ".24s" }}
                      >
                        DIGITAL.
                      </span>
                    </span>
                    {/* PERFORMANCE — outline */}
                    <span className="h-word">
                      <span
                        className="h-word-inner h-outline"
                        style={{ animationDelay: ".4s" }}
                      >
                        PERFORMANCE.
                      </span>
                    </span>
                  </h1>
                </div>

                {/* Rule */}
                <div className={`h-rule ${mounted ? "h-af h-d3" : "opacity-0"}`} />

                {/* Body copy */}
                <p
                  className={`text-slate-400 leading-relaxed max-w-md ${mounted ? "h-au h-d4" : "opacity-0"}`}
                  style={{ fontSize: "clamp(.9rem,1.15vw,1.02rem)" }}
                >
                  We engineer{" "}
                  <span className="text-white font-semibold">marketing websites</span>{" "}
                  that grow your brand and{" "}
                  <span className="text-white font-semibold">registration systems</span>{" "}
                  that run your events — so your organization can focus on what it does best.
                </p>

                {/* CTAs */}
                <div className={`flex flex-col sm:flex-row gap-3 ${mounted ? "h-au h-d5" : "opacity-0"}`}>
                  <button className="h-btn-red">
                    Start Your Project <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <button className="h-btn-ghost">View Our Work</button>
                </div>

                {/* Social proof */}
                <div className={`flex items-center gap-3 flex-wrap ${mounted ? "h-au h-d6" : "opacity-0"}`}>
                  <div className="flex -space-x-2 shrink-0">
                    {["#e8192c", "#1c2638", "#b91220", "#243044"].map((bg, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: bg, borderColor: "#0f1623" }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-400 text-sm">
                    Trusted by{" "}
                    <span className="text-white font-semibold">50+ organizations</span>{" "}
                    nationwide
                  </p>
                </div>

              </div>

              {/* ════ RIGHT — Scoreboard panel ════ */}
              <div className={`hidden xl:flex flex-col justify-center py-16 xl:pl-14 ${mounted ? "h-ar h-d3" : "opacity-0"}`}>

                <div className="h-board p-0 relative">
                  <div className="h-panel-glow" />

                  {/* Panel header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,.07)" }}>
                    <span className="h-tag text-white" style={{ opacity: .5, fontSize: ".62rem" }}>
                      What We Build
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-live-dot" />
                      <span className="h-tag" style={{ color: "#e8192c", fontSize: ".58rem" }}>LIVE</span>
                    </div>
                  </div>

                  {/* Service rows */}
                  {services.map((s, i) => (
                    <div key={i}>
                      <div className="h-board-row px-6 py-6">
                        <div className="flex items-start gap-4">

                          {/* Icon */}
                          <div
                            className="shrink-0 mt-0.5"
                            style={{
                              width: 38, height: 38,
                              background: "rgba(232,25,44,.12)",
                              clipPath: "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#e8192c",
                            }}
                          >
                            <s.icon style={{ width: 16, height: 16 }} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div
                              className="h-display font-bold uppercase text-white mb-1"
                              style={{ fontSize: ".95rem", letterSpacing: ".05em" }}
                            >
                              {s.label}
                            </div>
                            <p className="text-slate-500 leading-snug" style={{ fontSize: ".78rem" }}>
                              {s.desc}
                            </p>
                          </div>

                          {/* Stat */}
                          <div className="text-right shrink-0 ml-3">
                            <div className="h-score-val">
                              {mounted
                                ? <StatCount value={s.stat} delay={900 + i * 300} />
                                : "0"}
                            </div>
                            <div className="h-tag" style={{ color: "rgba(255,255,255,.3)", fontSize: ".55rem" }}>
                              {s.statLabel}
                            </div>
                          </div>

                        </div>
                      </div>
                      {i < services.length - 1 && <div className="h-divider mx-6" />}
                    </div>
                  ))}

                  {/* Panel footer */}
                  <div
                    className="px-6 py-4 border-t flex items-center justify-between"
                    style={{ borderColor: "rgba(255,255,255,.07)", background: "rgba(232,25,44,.06)" }}
                  >
                    <span className="h-tag text-white" style={{ opacity: .35, fontSize: ".58rem" }}>
                      Est. USA · Grit Digital Performance
                    </span>
                    <div
                      className="h-tag"
                      style={{ color: "#e8192c", fontSize: ".6rem" }}
                    >
                      98% Satisfaction
                    </div>
                  </div>

                </div>

                {/* Stats row below panel */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { value: "300%", label: "Avg. Growth" },
                    { value: "$2M+", label: "Revenue Driven" },
                  ].map(({ value, label }, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,.03)",
                        border: "1px solid rgba(255,255,255,.07)",
                        clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                        padding: ".9rem 1.1rem",
                      }}
                    >
                      <div className="h-display font-black italic text-white" style={{ fontSize: "1.8rem", lineHeight: 1 }}>
                        {value}
                      </div>
                      <div className="h-tag mt-1" style={{ color: "rgba(255,255,255,.3)", fontSize: ".58rem" }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ── TICKER ── */}
        <div
          className="relative z-30 py-3 overflow-hidden border-t shrink-0"
          style={{ background: "#e8192c", borderColor: "rgba(255,255,255,.1)" }}
        >
          <div className="h-ticker inline-flex gap-12">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="inline-flex gap-12">
                {ticker.map((item, j) => (
                  <span key={j} className="h-display inline-flex items-center gap-3 text-white font-bold uppercase text-sm tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block shrink-0" />
                    {item}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}