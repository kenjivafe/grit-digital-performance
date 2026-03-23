"use client";

import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const differentiators = [
  {
    title: "Built for Your World",
    body: "We specialize in sports organizations, schools, and camps. We understand your calendar, your audience, and your pressure points — no onboarding required.",
  },
  {
    title: "Fixed Quotes, No Surprises",
    body: "Every project starts with a clear, fixed quote. You'll always know exactly what you're paying before a single line of code is written.",
  },
  {
    title: "Two Services, One Team",
    body: "Marketing website and event registration under one roof. No coordinating between agencies, no finger-pointing. One team owns the outcome.",
  },
  {
    title: "We Ship Fast",
    body: "Most websites launch in 4–8 weeks. Most registration systems in 2–4 weeks. We move with urgency because your season doesn't wait.",
  },
];

const comparisons = [
  { label: "Sports-specific expertise", grit: true, generic: false },
  { label: "Fixed project pricing", grit: true, generic: false },
  { label: "Website + registration bundled", grit: true, generic: false },
  { label: "Launch in under 8 weeks", grit: true, generic: false },
  { label: "Ongoing support included", grit: true, generic: false },
  { label: "Dedicated point of contact", grit: true, generic: false },
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .aw-display { font-family:'Barlow Condensed',sans-serif; }
        .aw-body    { font-family:'Barlow',sans-serif; }
        .aw-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .aw-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .aw-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }

        /* Differentiator card */
        .aw-card {
          background:#fff; border:1.5px solid #e2e8f0;
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
          position:relative; overflow:hidden;
          transition:transform .25s ease, box-shadow .25s ease;
        }
        .aw-card:hover { transform:translateY(-5px); box-shadow:0 24px 56px rgba(0,0,0,.09); }
        .aw-card-bar {
          height:3px;
          background:linear-gradient(to right,#e8192c,rgba(232,25,44,.2));
          transform-origin:left; transform:scaleX(0);
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .aw-card:hover .aw-card-bar { transform:scaleX(1); }

        .aw-card-num {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          font-size:5.5rem; line-height:1; color:transparent;
          -webkit-text-stroke:1.5px rgba(232,25,44,.06);
          position:absolute; bottom:-10px; right:-4px;
          user-select:none; pointer-events:none;
        }

        /* Comparison table */
        .aw-table-row {
          display:flex; align-items:center; justify-content:space-between;
          padding:.85rem 0;
          border-bottom:1px solid #f1f5f9;
          transition:background .15s;
        }
        .aw-table-row:last-child { border-bottom:none; }
        .aw-table-row:hover { background:rgba(232,25,44,.02); }

        .aw-check-yes {
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          width:28px; height:28px;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.08); color:#e8192c; flex-shrink:0;
        }
        .aw-check-no {
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          width:28px; height:28px;
          display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,.04); color:#cbd5e1; flex-shrink:0;
        }

        /* Table header */
        .aw-col-head {
          font-family:'Barlow Condensed',sans-serif; font-weight:800;
          text-transform:uppercase; letter-spacing:.08em; font-size:.8rem;
        }

        .aw-btn {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; white-space:nowrap;
        }
        .aw-btn:hover { background:#b91220; transform:translateX(3px); }

        .aw-rule { height:1px; background:linear-gradient(to right,#e8192c,rgba(232,25,44,.15),transparent); }
      `}</style>

      <div className="aw-halftone absolute inset-0 z-0" />
      <div className="aw-jersey  absolute inset-0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="aw-tag" style={{ color: "#e8192c" }}>Why GRIT</span>
            </div>
            <h2
              className="aw-display font-black uppercase text-[#0f1623] leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Why Choose
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Us.
              </span>
            </h2>
          </div>
          <p className="aw-body text-slate-500 max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            There are a lot of agencies out there. Here's why organizations that care about results choose GRIT.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-start">

          {/* Left — differentiator cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map((d, i) => (
              <div key={d.title} className="aw-card">
                <div className="aw-card-bar" />
                <div className="aw-card-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
                <div className="relative z-10 p-7">
                  <h3
                    className="aw-display font-black uppercase text-[#0f1623] leading-none mb-3"
                    style={{ fontSize: "clamp(1.1rem,1.8vw,1.35rem)", letterSpacing: ".03em" }}
                  >
                    {d.title}
                  </h3>
                  <div className="w-6 h-0.5 mb-3" style={{ background: "rgba(232,25,44,.35)" }} />
                  <p className="aw-body text-slate-500 text-sm leading-relaxed">{d.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — comparison table */}
          <div>
            <div
              style={{
                background: "#fff", border: "1.5px solid #e2e8f0",
                clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
                overflow: "hidden",
              }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-[1fr_80px_80px] gap-2 px-6 py-4"
                style={{ background: "#0f1623", borderBottom: "1px solid rgba(255,255,255,.07)" }}
              >
                <div className="aw-col-head text-white" style={{ fontSize: ".7rem", opacity: .5 }}>Feature</div>
                <div className="aw-col-head text-center" style={{ color: "#e8192c", fontSize: ".7rem" }}>GRIT</div>
                <div className="aw-col-head text-center text-white" style={{ fontSize: ".7rem", opacity: .4 }}>Others</div>
              </div>

              {/* Rows */}
              <div className="px-6">
                {comparisons.map(({ label, grit, generic }) => (
                  <div key={label} className="aw-table-row">
                    <span className="aw-body text-slate-600 text-sm flex-1 pr-4">{label}</span>
                    <div className="w-20 flex justify-center">
                      <div className="aw-check-yes">
                        <Check style={{ width: 13, height: 13 }} />
                      </div>
                    </div>
                    <div className="w-20 flex justify-center">
                      <div className="aw-check-no">
                        <X style={{ width: 12, height: 12 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table footer */}
              <div className="px-6 py-5 border-t border-slate-100">
                <Link href="/contact" className="aw-btn w-full justify-center">
                  Start With GRIT <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}