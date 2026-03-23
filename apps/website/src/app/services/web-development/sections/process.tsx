"use client";

import { Fragment } from "react";
import { ArrowRight, MessageSquare, Layers, Code2, Rocket, LifeBuoy } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery",
    subtitle: "We learn your goals.",
    body: "A focused call to understand your organization, audience, and what success looks like. We ask the right questions so nothing gets built twice.",
    details: ["Goal & audience alignment", "Competitor review", "Scope definition", "Timeline agreement"],
  },
  {
    number: "02",
    icon: Layers,
    title: "Design",
    subtitle: "We map it out.",
    body: "Wireframes, design direction, and content structure — all signed off before development starts. No surprises mid-build.",
    details: ["Wireframes & site map", "Brand-aligned design", "Mobile-first layouts", "Client approval checkpoint"],
  },
  {
    number: "03",
    icon: Code2,
    title: "Development",
    subtitle: "We build it right.",
    body: "Custom-coded in Next.js or WordPress. Clean, performant, and built to scale. You'll see progress at every stage.",
    details: ["Next.js or WordPress build", "CMS integration", "Performance optimization", "Regular preview links"],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    subtitle: "We go live.",
    body: "Full QA, cross-device testing, SEO checks, and a smooth deployment. We stay on standby for 48 hours post-launch.",
    details: ["Cross-device QA", "SEO & speed audit", "Domain & hosting setup", "48hr post-launch support"],
  },
  {
    number: "05",
    icon: LifeBuoy,
    title: "Support",
    subtitle: "We stay in your corner.",
    body: "Monthly maintenance, security patches, performance monitoring, and priority support — so your site keeps performing long-term.",
    details: ["Monthly maintenance", "Security & uptime monitoring", "Content update support", "Priority response"],
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0f1623" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .wp-display { font-family:'Barlow Condensed',sans-serif; }
        .wp-body    { font-family:'Barlow',sans-serif; }
        .wp-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .wp-halftone {
          background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .wp-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.016) 18px,rgba(255,255,255,.016) 36px);
          pointer-events:none;
        }

        /* Step card */
        .wp-card {
          position:relative; overflow:hidden;
          background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.08);
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
          transition:transform .25s ease, border-color .25s ease, background .25s ease;
        }
        .wp-card:hover {
          transform:translateY(-5px);
          border-color:rgba(232,25,44,.35);
          background:rgba(255,255,255,.055);
        }
        .wp-card::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
          background:#e8192c; transform:scaleX(0); transform-origin:left;
          transition:transform .35s cubic-bezier(.22,1,.36,1);
        }
        .wp-card:hover::after { transform:scaleX(1); }

        .wp-icon {
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          width:44px; height:44px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.12); color:#e8192c;
          transition:background .2s,color .2s;
        }
        .wp-card:hover .wp-icon { background:#e8192c; color:#fff; }

        .wp-num {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          font-size:.72rem; color:rgba(255,255,255,.2); letter-spacing:.06em;
        }

        .wp-ghost {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.04);
          position:absolute; bottom:-12px; right:-6px;
          font-size:6rem; line-height:1;
          user-select:none; pointer-events:none; white-space:nowrap;
        }

        .wp-detail {
          font-family:'Barlow',sans-serif; font-size:.8rem;
          display:flex; align-items:center; gap:.55rem;
          color:rgba(255,255,255,.38);
        }
        .wp-detail-dot {
          width:4px; height:4px; border-radius:50%;
          background:rgba(232,25,44,.5); flex-shrink:0;
          transition:background .2s;
        }
        .wp-card:hover .wp-detail-dot { background:#e8192c; }

        .wp-subtitle {
          font-family:'Barlow Condensed',sans-serif; font-weight:700; font-style:italic;
          text-transform:uppercase; font-size:.9rem; letter-spacing:.05em;
          color:#e8192c; border-left:3px solid #e8192c; padding-left:10px;
        }

        /* Connector */
        .wp-connector {
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; color:rgba(232,25,44,.3);
        }
      `}</style>

      <div className="wp-halftone absolute inset-0 z-0" />
      <div className="wp-jersey  absolute inset-0 z-0" />
      <div className="absolute z-0 pointer-events-none" style={{
        top: "-10%", left: "-5%", width: "40vw", height: "40vw", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
      }} />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="wp-tag" style={{ color: "#e8192c" }}>Our Process</span>
            </div>
            <h2
              className="wp-display font-black uppercase text-white leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              How We
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Build.
              </span>
            </h2>
          </div>
          <p className="wp-body text-sm leading-relaxed lg:text-right lg:pb-1 max-w-xs"
            style={{ color: "rgba(255,255,255,.35)" }}>
            A transparent, milestone-driven process — from first call to long-term partnership.
          </p>
        </div>

        {/* Steps — horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step) => (
            <div key={step.number} className="wp-card">
              <div className="wp-ghost" aria-hidden="true">{step.number}</div>
              <div className="relative z-10 p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="wp-icon"><step.icon className="w-4 h-4" /></div>
                  <span className="wp-num">{step.number}</span>
                </div>
                <h3
                  className="wp-display font-black uppercase text-white leading-none"
                  style={{ fontSize: "clamp(1.1rem,1.5vw,1.35rem)", letterSpacing: ".03em" }}
                >
                  {step.title}
                </h3>
                <div className="wp-subtitle">{step.subtitle}</div>
                <p className="wp-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.42)" }}>
                  {step.body}
                </p>
                <ul className="space-y-2 mt-auto">
                  {step.details.map((d) => (
                    <li key={d} className="wp-detail">
                      <span className="wp-detail-dot" />{d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}