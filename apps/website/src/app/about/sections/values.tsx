"use client";

import { Zap, Target, Shield, Users, TrendingUp, Clock } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Performance First",
    body: "Every site we build is engineered for speed, every system designed to handle the load. We don't cut corners on performance — it's the baseline, not the bonus.",
  },
  {
    icon: Target,
    title: "Purpose-Built",
    body: "We don't use generic templates. Everything we ship is designed specifically for the organization in front of us — their audience, their goals, their constraints.",
  },
  {
    icon: Shield,
    title: "Radical Transparency",
    body: "Fixed quotes. No surprise invoices. Clear timelines. We say what we're going to do and we do what we say. Every time.",
  },
  {
    icon: Users,
    title: "Partnership Over Projects",
    body: "We're not a build-and-disappear agency. We invest in long-term relationships and measure our success by how well our clients grow after launch.",
  },
  {
    icon: TrendingUp,
    title: "Results Over Aesthetics",
    body: "Beautiful design matters — but conversion, performance, and usability matter more. We build things that look great and actually work.",
  },
  {
    icon: Clock,
    title: "Respect for Your Time",
    body: "We move fast, communicate clearly, and never leave you wondering where things stand. Your time is as valuable as ours.",
  },
];

export default function Values() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0f1623" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .av-display { font-family:'Barlow Condensed',sans-serif; }
        .av-body    { font-family:'Barlow',sans-serif; }
        .av-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .av-halftone {
          background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .av-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.016) 18px,rgba(255,255,255,.016) 36px);
          pointer-events:none;
        }

        /* Value card */
        .av-card {
          position:relative; overflow:hidden;
          background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.07);
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
          transition:transform .25s ease, background .25s ease, border-color .25s ease;
        }
        .av-card:hover {
          transform:translateY(-5px);
          background:rgba(255,255,255,.055);
          border-color:rgba(232,25,44,.3);
        }

        /* Red underline reveal */
        .av-card::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
          background:#e8192c; transform:scaleX(0); transform-origin:left;
          transition:transform .35s cubic-bezier(.22,1,.36,1);
        }
        .av-card:hover::after { transform:scaleX(1); }

        /* Icon */
        .av-icon {
          clip-path:polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,9px 100%,0 calc(100% - 9px));
          width:46px; height:46px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.12); color:#e8192c;
          transition:background .2s, color .2s;
        }
        .av-card:hover .av-icon { background:#e8192c; color:#fff; }

        /* Ghost number */
        .av-ghost {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.04);
          position:absolute; bottom:-12px; right:-6px;
          font-size:6rem; line-height:1;
          user-select:none; pointer-events:none; white-space:nowrap;
        }
      `}</style>

      <div className="av-halftone absolute inset-0 z-0" />
      <div className="av-jersey  absolute inset-0 z-0" />

      {/* Blooms */}
      <div className="absolute z-0 pointer-events-none" style={{
        top: "-10%", left: "-5%", width: "40vw", height: "40vw", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
      }} />
      <div className="absolute z-0 pointer-events-none" style={{
        bottom: "-10%", right: "-5%", width: "30vw", height: "30vw", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,25,44,.05) 0%,transparent 65%)",
      }} />

      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="av-tag" style={{ color: "#e8192c" }}>What We Stand For</span>
            </div>
            <h2
              className="av-display font-black uppercase text-white leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Our
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Values.
              </span>
            </h2>
          </div>
          <p className="av-body text-sm leading-relaxed lg:text-right lg:pb-1 max-w-xs"
            style={{ color: "rgba(255,255,255,.35)" }}>
            The principles that guide every project, every decision, every conversation.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div key={v.title} className="av-card p-7">
              <div className="av-ghost" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
              <div className="relative z-10">
                <div className="av-icon mb-5">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3
                  className="av-display font-black uppercase text-white leading-none mb-3"
                  style={{ fontSize: "clamp(1.2rem,1.8vw,1.5rem)", letterSpacing: ".03em" }}
                >
                  {v.title}
                </h3>
                <div className="w-8 h-0.5 mb-3" style={{ background: "rgba(232,25,44,.4)" }} />
                <p className="av-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.42)" }}>
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}