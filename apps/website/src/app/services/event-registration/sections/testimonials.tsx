"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "We used to manage registrations through Google Forms and Venmo. GRIT built us a real system and we processed over $80K through it in our first season. Night and day difference.",
    author: "Tournament Director Name",
    org: "Youth Basketball Organization, State",
    initials: "TD",
    color: "#e8192c",
  },
  {
    quote: "The check-in system alone was worth it. On event day, what used to take 45 minutes took 8. Parents weren't frustrated, staff weren't stressed. It just worked.",
    author: "Camp Director Name",
    org: "Summer Sports Camp, State",
    initials: "CD",
    color: "#1c2638",
  },
  {
    quote: "GRIT set up our entire season — 8 different events, all with separate forms and reporting. I could see everything from one dashboard. I don't know how we managed before.",
    author: "Athletic Director Name",
    org: "School Athletic Program, State",
    initials: "AD",
    color: "#243044",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0f1623" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .rte-display { font-family:'Barlow Condensed',sans-serif; }
        .rte-body    { font-family:'Barlow',sans-serif; }
        .rte-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }
        .rte-halftone {
          background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .rte-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.016) 18px,rgba(255,255,255,.016) 36px);
          pointer-events:none;
        }
        .rte-card {
          background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.08);
          clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
          position:relative; overflow:hidden;
          transition:transform .25s ease, border-color .25s ease, background .25s ease;
          display:flex; flex-direction:column;
        }
        .rte-card:hover {
          transform:translateY(-5px);
          border-color:rgba(232,25,44,.3);
          background:rgba(255,255,255,.05);
        }
        .rte-card::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
          background:#e8192c; transform:scaleX(0); transform-origin:left;
          transition:transform .35s cubic-bezier(.22,1,.36,1);
        }
        .rte-card:hover::after { transform:scaleX(1); }
        .rte-quote-icon {
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          width:40px; height:40px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.12); color:#e8192c;
        }
        .rte-avatar {
          clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));
          width:42px; height:42px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
        }
        .rte-avatar-initials {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          font-size:1rem; color:rgba(255,255,255,.7);
        }
        .rte-stars { display:flex; gap:3px; }
        .rte-star { color:#e8192c; font-size:.9rem; }
        .rte-placeholder-note {
          font-family:'Barlow Condensed',sans-serif; font-weight:600;
          text-transform:uppercase; font-size:.55rem; letter-spacing:.12em;
          color:rgba(255,255,255,.2); background:rgba(0,0,0,.2);
          clip-path:polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px));
          padding:2px 8px; display:inline-block;
        }
      `}</style>

      <div className="rte-halftone absolute inset-0 z-0" />
      <div className="rte-jersey  absolute inset-0 z-0" />
      <div className="absolute z-0 pointer-events-none" style={{
        top: "-10%", right: "-5%", width: "35vw", height: "35vw", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
      }} />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="rte-tag" style={{ color: "#e8192c" }}>Client Testimonials</span>
            </div>
            <h2 className="rte-display font-black uppercase text-white leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}>
              What Organizers
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Say.
              </span>
            </h2>
          </div>
          <div className="text-right">
            <span className="rte-placeholder-note">Placeholder — replace with real quotes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="rte-card p-7 gap-6 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div className="rte-quote-icon"><Quote className="w-4 h-4" /></div>
                <div className="rte-stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className="rte-star">★</span>
                  ))}
                </div>
              </div>
              <blockquote className="rte-body leading-relaxed flex-1 italic"
                style={{ color: "rgba(255,255,255,.55)", fontSize: ".92rem" }}>
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
                <div className="rte-avatar" style={{ background: t.color }}>
                  <span className="rte-avatar-initials">{t.initials}</span>
                </div>
                <div>
                  <div className="rte-display font-bold uppercase text-white"
                    style={{ fontSize: ".9rem", letterSpacing: ".04em" }}>
                    {t.author}
                  </div>
                  <div className="rte-tag" style={{ color: "rgba(255,255,255,.3)", fontSize: ".58rem" }}>
                    {t.org}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}