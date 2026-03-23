"use client";

import {
  Gauge, Search, Smartphone, LayoutDashboard,
  RefreshCw, ShieldCheck, Globe, Pencil,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Blazing Fast Performance",
    body: "Every site is engineered for Core Web Vitals — fast load times, optimized assets, and server-side rendering out of the box.",
  },
  {
    icon: Search,
    title: "SEO-Optimized from Day One",
    body: "Semantic HTML, meta structure, sitemap, schema markup, and page speed — all built in before launch, not bolted on after.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    body: "We design for small screens first. Every layout, interaction, and component is tested across devices before it ships.",
  },
  {
    icon: LayoutDashboard,
    title: "CMS Included",
    body: "Your team can update pages, schedules, rosters, and news without touching code. Full onboarding and documentation included.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing Support & Updates",
    body: "Post-launch isn't the end of the relationship. Monthly maintenance plans keep your site secure, fast, and up to date.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Reliability",
    body: "SSL, secure hosting, regular backups, and uptime monitoring — your digital presence stays live when it matters most.",
  },
  {
    icon: Globe,
    title: "Custom Domain & Hosting Setup",
    body: "We handle the full technical setup — domain configuration, DNS, hosting deployment — so you don't have to.",
  },
  {
    icon: Pencil,
    title: "Brand-Aligned Design",
    body: "No templates. Every site is designed to match your brand identity — colors, fonts, tone, and visual language.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .wf-display { font-family:'Barlow Condensed',sans-serif; }
        .wf-body    { font-family:'Barlow',sans-serif; }
        .wf-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .wf-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .wf-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }

        .wf-card {
          background:#fff; border:1.5px solid #e2e8f0;
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
          position:relative; overflow:hidden;
          transition:transform .25s ease, box-shadow .25s ease;
        }
        .wf-card:hover { transform:translateY(-5px); box-shadow:0 24px 56px rgba(0,0,0,.09); }

        .wf-card-bar {
          height:3px;
          background:linear-gradient(to right,#e8192c,rgba(232,25,44,.2));
          transform-origin:left; transform:scaleX(0);
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .wf-card:hover .wf-card-bar { transform:scaleX(1); }

        .wf-icon {
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          width:44px; height:44px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.07); color:#e8192c;
          transition:background .2s, color .2s;
        }
        .wf-card:hover .wf-icon { background:#e8192c; color:#fff; }

        .wf-ghost {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          color:transparent; -webkit-text-stroke:1.5px rgba(232,25,44,.05);
          position:absolute; bottom:-10px; right:-4px;
          font-size:5.5rem; line-height:1;
          user-select:none; pointer-events:none; white-space:nowrap;
        }

        .wf-rule { height:1px; background:linear-gradient(to right,#e8192c,rgba(232,25,44,.15),transparent); }
      `}</style>

      <div className="wf-halftone absolute inset-0 z-0" />
      <div className="wf-jersey  absolute inset-0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="wf-tag" style={{ color: "#e8192c" }}>What's Included</span>
            </div>
            <h2
              className="wf-display font-black uppercase text-[#0f1623] leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Everything You
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Need.
              </span>
            </h2>
          </div>
          <p className="wf-body text-slate-500 max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            Every website we build comes with the full package — no add-ons, no hidden extras.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={f.title} className="wf-card">
              <div className="wf-card-bar" />
              <div className="wf-ghost" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
              <div className="relative z-10 p-6">
                <div className="wf-icon mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3
                  className="wf-display font-black uppercase text-[#0f1623] leading-none mb-2"
                  style={{ fontSize: "clamp(1rem,1.6vw,1.2rem)", letterSpacing: ".03em" }}
                >
                  {f.title}
                </h3>
                <div className="w-6 h-0.5 mb-3" style={{ background: "rgba(232,25,44,.3)" }} />
                <p className="wf-body text-slate-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}