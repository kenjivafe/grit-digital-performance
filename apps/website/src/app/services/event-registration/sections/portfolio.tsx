"use client";

import { ArrowRight, ClipboardList } from "lucide-react";

const events = [
  {
    name: "Event Name",
    category: "Youth Basketball Tournament",
    result: "1,200 registrations · $84K revenue",
    tags: ["Multi-Day", "Team Registration", "Waiver Collection"],
    color: "#e8192c",
  },
  {
    name: "Event Name",
    category: "Summer Sports Camp",
    result: "450 campers · sold out in 6 days",
    tags: ["Waitlist System", "Parent Consent Forms", "Custom Forms"],
    color: "#0f1623",
  },
  {
    name: "Event Name",
    category: "School Athletic Program",
    result: "Full season · 8 events managed",
    tags: ["Multi-Event", "Season Pass", "Real-Time Reporting"],
    color: "#1c2638",
  },
];

export default function Portfolio() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .rpo-display { font-family:'Barlow Condensed',sans-serif; }
        .rpo-body    { font-family:'Barlow',sans-serif; }
        .rpo-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }
        .rpo-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .rpo-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }
        .rpo-card {
          background:#fff; border:1.5px solid #e2e8f0;
          clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
          overflow:hidden; position:relative;
          transition:transform .25s ease, box-shadow .25s ease;
        }
        .rpo-card:hover { transform:translateY(-6px); box-shadow:0 28px 64px rgba(0,0,0,.1); }
        .rpo-thumb {
          width:100%; aspect-ratio:16/9;
          display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden;
        }
        .rpo-thumb-pattern {
          position:absolute; inset:0;
          background-image:repeating-linear-gradient(-45deg,transparent,transparent 8px,rgba(255,255,255,.06) 8px,rgba(255,255,255,.06) 16px);
        }
        .rpo-thumb-jersey {
          position:absolute; inset:0;
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 14px,rgba(255,255,255,.04) 14px,rgba(255,255,255,.04) 28px);
        }
        .rpo-thumb-label {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.58rem; letter-spacing:.16em;
          color:rgba(255,255,255,.3); background:rgba(0,0,0,.3);
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          padding:4px 10px; position:absolute; bottom:10px; z-index:1;
        }
        .rpo-chip {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.62rem; letter-spacing:.08em;
          color:#475569; background:rgba(15,22,35,.05);
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          padding:3px 9px;
        }
        .rpo-result {
          background:rgba(232,25,44,.06); border-top:1.5px solid rgba(232,25,44,.12);
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.72rem; letter-spacing:.1em;
          color:#e8192c; padding:.65rem 1.25rem;
          display:flex; align-items:center; gap:.5rem;
        }
        .rpo-btn {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; white-space:nowrap;
        }
        .rpo-btn:hover { background:#b91220; transform:translateX(3px); }
        .rpo-link {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:.85rem;
          color:#e8192c; display:inline-flex; align-items:center; gap:5px;
          transition:gap .18s,color .18s;
        }
        .rpo-link:hover { gap:9px; color:#b91220; }
      `}</style>

      <div className="rpo-halftone absolute inset-0 z-0" />
      <div className="rpo-jersey  absolute inset-0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="rpo-tag" style={{ color: "#e8192c" }}>Past Events</span>
            </div>
            <h2 className="rpo-display font-black uppercase text-[#0f1623] leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}>
              Events We've
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Powered.
              </span>
            </h2>
          </div>
          <p className="rpo-body text-slate-500 max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            Over 100,000 registrations processed. Here's a sample of what we've built.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
          {events.map((e, i) => (
            <div key={i} className="rpo-card">
              <div className="rpo-thumb" style={{ background: e.color }}>
                <div className="rpo-thumb-pattern" />
                <div className="rpo-thumb-jersey" />
                <ClipboardList style={{ width: 32, height: 32, color: "rgba(255,255,255,.2)", position: "relative", zIndex: 1 }} />
                <div className="rpo-thumb-label">Screenshot Placeholder</div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="rpo-tag mb-1" style={{ color: "#94a3b8", fontSize: ".58rem" }}>{e.category}</div>
                  <h3 className="rpo-display font-black uppercase text-[#0f1623] leading-none"
                    style={{ fontSize: "1.4rem", letterSpacing: ".03em" }}>
                    {e.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {e.tags.map((t) => <span key={t} className="rpo-chip">{t}</span>)}
                </div>
                <a href="#" className="rpo-link">
                  View Case Study <ArrowRight style={{ width: 13, height: 13 }} />
                </a>
              </div>
              <div className="rpo-result">
                <div className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                {e.result}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a href="/portfolio" className="rpo-btn">
            View All Events <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}