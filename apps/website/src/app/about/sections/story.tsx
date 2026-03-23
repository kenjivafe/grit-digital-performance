"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Story() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .as-display { font-family:'Barlow Condensed',sans-serif; }
        .as-body    { font-family:'Barlow',sans-serif; }
        .as-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .as-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .as-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }

        /* Pull quote block */
        .as-pullquote {
          border-left:4px solid #e8192c;
          padding-left:1.25rem;
        }

        /* Mission / vision cards */
        .as-mv-card {
          position:relative; overflow:hidden;
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
          transition:transform .25s ease, box-shadow .25s ease;
        }
        .as-mv-card:hover { transform:translateY(-5px); box-shadow:0 24px 56px rgba(0,0,0,.09); }

        .as-mv-bar {
          height:3px;
          background:linear-gradient(to right,#e8192c,rgba(232,25,44,.2));
          transform-origin:left; transform:scaleX(0);
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .as-mv-card:hover .as-mv-bar { transform:scaleX(1); }

        .as-mv-num {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          font-size:5rem; line-height:1; color:transparent;
          -webkit-text-stroke:1.5px rgba(232,25,44,.07);
          position:absolute; bottom:-8px; right:-4px;
          user-select:none; pointer-events:none;
        }

        /* Stat strip */
        .as-stat {
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          border:1.5px solid #e2e8f0; background:#fff;
          padding:.9rem 1.1rem; flex:1;
          transition:border-color .2s, transform .2s;
        }
        .as-stat:hover { border-color:rgba(232,25,44,.3); transform:translateY(-3px); }

        .as-btn {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; white-space:nowrap;
        }
        .as-btn:hover { background:#b91220; transform:translateX(3px); }

        .as-rule { height:1px; background:linear-gradient(to right,#e8192c,rgba(232,25,44,.15),transparent); }
      `}</style>

      <div className="as-halftone absolute inset-0 z-0" />
      <div className="as-jersey  absolute inset-0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* ── Story ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">

          {/* Left — headline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="as-tag" style={{ color: "#e8192c" }}>Our Story</span>
            </div>
            <h2
              className="as-display font-black uppercase text-[#0f1623] leading-[.9] mb-6"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Built by People
              <br />
              Who Know the
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Game.
              </span>
            </h2>

            {/* Stats strip */}
            <div className="flex gap-3 flex-wrap">
              {[
                { value: "50+", label: "Organizations" },
                { value: "100K+", label: "Registrations" },
                { value: "98%", label: "Satisfaction" },
              ].map(({ value, label }) => (
                <div key={label} className="as-stat">
                  <div className="as-display font-black text-[#0f1623]" style={{ fontSize: "1.5rem", lineHeight: 1 }}>
                    {value}
                  </div>
                  <div className="as-tag mt-1" style={{ color: "#94a3b8", fontSize: ".58rem" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — narrative */}
          <div className="space-y-6">
            <div className="as-pullquote">
              <p
                className="as-display font-black italic uppercase text-[#0f1623]"
                style={{ fontSize: "clamp(1.1rem,2vw,1.4rem)", lineHeight: 1.2 }}
              >
                "We got tired of seeing sports organizations settle for digital tools that weren't built for them."
              </p>
            </div>

            <p className="as-body text-slate-500 leading-relaxed" style={{ fontSize: ".95rem" }}>
              GRIT Digital Performance was founded with a clear focus: build the digital infrastructure that sports organizations, schools, and camps actually need. Not generic templates. Not bloated platforms. Purpose-built websites and registration systems that perform under pressure — just like the athletes they serve.
            </p>

            <p className="as-body text-slate-500 leading-relaxed" style={{ fontSize: ".95rem" }}>
              We started by working closely with coaches, athletic directors, and event organizers to understand the real problems — clunky registration flows, slow websites, zero data visibility. Everything we build is a direct answer to those pain points.
            </p>

            <div className="as-rule" />

            <Link href="/contact" className="as-btn">
              Work With Us <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>

        {/* ── Mission & Vision cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            {
              label: "Our Mission",
              num: "M",
              headline: "Empower Organizations Through Digital Performance",
              body: "To give every sports organization, school, and camp the digital tools they need to grow, connect, and compete — regardless of size or budget.",
            },
            {
              label: "Our Vision",
              num: "V",
              headline: "The Go-To Digital Partner for the Sports World",
              body: "To become the most trusted digital performance agency in youth and amateur sports — known for building systems that actually work when it counts.",
            },
          ].map((card) => (
            <div key={card.label} className="as-mv-card" style={{ background: "#fff", border: "1.5px solid #e2e8f0" }}>
              <div className="as-mv-bar" />
              <div className="as-mv-num" aria-hidden="true">{card.num}</div>
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-0.5" style={{ background: "#e8192c" }} />
                  <span className="as-tag" style={{ color: "#e8192c" }}>{card.label}</span>
                </div>
                <h3
                  className="as-display font-black uppercase text-[#0f1623] leading-[.95] mb-4"
                  style={{ fontSize: "clamp(1.3rem,2.2vw,1.8rem)" }}
                >
                  {card.headline}
                </h3>
                <p className="as-body text-slate-500 leading-relaxed text-sm">{card.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}