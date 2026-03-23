"use client";

import { useState } from "react";
import { Monitor, Smartphone, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    name: "Template 01",
    tag: "Clean & Modern",
    url: "https://template1.gritdp.com/home",
    color: "#0f1623",
  },
  {
    name: "Template 02",
    tag: "Bold & Athletic",
    url: "https://grit-template-2.vercel.app/home",
    color: "#e8192c",
  },
  {
    name: "Template 03",
    tag: "Sharp & Minimal",
    url: "https://grit-template-3.vercel.app/home",
    color: "#1c2638",
  },
  {
    name: "Template 04",
    tag: "Dynamic & Rich",
    url: "https://template4.gritdp.com/",
    color: "#243044",
  },
];

export default function Templates() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const active = templates[activeIndex];

  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .rt-display { font-family:'Barlow Condensed',sans-serif; }
        .rt-body    { font-family:'Barlow',sans-serif; }
        .rt-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .rt-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .rt-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }

        /* Template selector pills */
        .rt-pill {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.78rem; letter-spacing:.07em;
          padding:9px 18px; border:1.5px solid #e2e8f0; color:#94a3b8;
          background:#fff; cursor:pointer; transition:all .18s; white-space:nowrap;
          clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px));
          display:flex; flex-direction:column; align-items:flex-start; gap:2px;
        }
        .rt-pill:hover { border-color:rgba(232,25,44,.3); color:#0f1623; }
        .rt-pill.active { background:#0f1623; border-color:#0f1623; color:#fff; }
        .rt-pill.active .rt-pill-sub { color:rgba(255,255,255,.45); }
        .rt-pill-sub {
          font-family:'Barlow',sans-serif; font-weight:400;
          text-transform:none; font-size:.68rem; letter-spacing:0;
          color:#94a3b8; transition:color .18s;
        }

        /* Device toggle */
        .rt-device-btn {
          width:36px; height:36px;
          clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));
          display:flex; align-items:center; justify-content:center;
          background:#fff; border:1.5px solid #e2e8f0; color:#94a3b8;
          cursor:pointer; transition:all .18s;
        }
        .rt-device-btn:hover { border-color:rgba(232,25,44,.3); color:#0f1623; }
        .rt-device-btn.active { background:#e8192c; border-color:#e8192c; color:#fff; }

        /* Preview frame */
        .rt-preview-wrap {
          position:relative; overflow:hidden;
          background:#e2e8f0;
          clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
          border:1.5px solid #e2e8f0;
          transition:all .3s ease;
        }

        /* Browser chrome bar */
        .rt-chrome {
          background:#f1f5f9; border-bottom:1px solid #e2e8f0;
          padding:8px 12px; display:flex; align-items:center; gap:8px;
          flex-shrink:0;
        }
        .rt-chrome-dot {
          width:10px; height:10px; border-radius:50%; flex-shrink:0;
        }
        .rt-chrome-url {
          font-family:'Barlow',sans-serif; font-size:.72rem; color:#94a3b8;
          background:#fff; border:1px solid #e2e8f0; border-radius:3px;
          padding:3px 10px; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
        }

        /* iframe container */
        .rt-iframe-wrap {
          position:relative; width:100%; overflow:hidden;
          background:#fff;
        }
        .rt-iframe-wrap iframe {
          width:100%; border:none; display:block;
          transition:opacity .3s ease;
        }

        /* Desktop mode */
        .rt-iframe-wrap.desktop {
          height:520px;
        }
        .rt-iframe-wrap.desktop iframe {
          height:520px;
          transform-origin:top left;
        }

        /* Mobile mode — narrow iframe scaled up */
        .rt-mobile-outer {
          display:flex; justify-content:center; align-items:flex-start;
          height:580px; padding:20px 0; background:#e8eaed;
          overflow:hidden;
        }
        .rt-mobile-shell {
          width:375px; flex-shrink:0;
          background:#fff;
          border-radius:0;
          box-shadow:0 8px 40px rgba(0,0,0,.2);
          overflow:hidden;
          display:flex; flex-direction:column;
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          height:540px;
        }
        .rt-mobile-shell iframe {
          width:375px; height:100%; border:none; display:block;
        }

        /* Loading overlay */
        .rt-loading {
          position:absolute; inset:0; z-index:5;
          display:flex; align-items:center; justify-content:center;
          background:rgba(248,249,251,.9);
          pointer-events:none;
        }
        @keyframes rt-spin { to{transform:rotate(360deg);} }
        .rt-spinner {
          width:28px; height:28px; border-radius:50%;
          border:2.5px solid rgba(232,25,44,.2); border-top-color:#e8192c;
          animation:rt-spin .7s linear infinite;
        }

        /* CTA button */
        .rt-btn {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; white-space:nowrap;
        }
        .rt-btn:hover { background:#b91220; transform:translateX(3px); }

        .rt-btn-ghost {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          color:#0f1623; border:1.5px solid rgba(15,22,35,.2);
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:border-color .18s,background .18s;
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; white-space:nowrap;
        }
        .rt-btn-ghost:hover { border-color:#0f1623; background:rgba(15,22,35,.05); }

        /* Free badge */
        .rt-free-badge {
          font-family:'Barlow Condensed',sans-serif; font-weight:800;
          text-transform:uppercase; font-size:.65rem; letter-spacing:.14em;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));
          padding:4px 12px; display:inline-block;
        }

        .rt-rule { height:1px; background:linear-gradient(to right,#e8192c,rgba(232,25,44,.15),transparent); }

        @keyframes rt-fade { from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);} }
        .rt-fade { animation:rt-fade .3s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      <div className="rt-halftone absolute inset-0 z-0" />
      <div className="rt-jersey  absolute inset-0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="rt-tag" style={{ color: "#e8192c" }}>Included Free</span>
            </div>
            <h2
              className="rt-display font-black uppercase text-[#0f1623] leading-[.9] mb-3"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Your Free
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Website.
              </span>
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <span className="rt-free-badge">Free with every plan</span>
              <p className="rt-body text-slate-500 text-sm">
                Choose from 4 professionally designed templates — included at no extra cost.
              </p>
            </div>
          </div>
          <p className="rt-body text-slate-500 max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            Every registration plan comes with a fully built website. Pick your template, we handle the rest.
          </p>
        </div>

        <div className="rt-rule mb-10" />

        {/* Template selector + device toggle row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">

          {/* Template pills */}
          <div className="flex flex-wrap gap-2">
            {templates.map((t, i) => (
              <button
                key={t.name}
                className={`rt-pill ${activeIndex === i ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                <span>{t.name}</span>
                <span className="rt-pill-sub">{t.tag}</span>
              </button>
            ))}
          </div>

          {/* Device toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="rt-tag" style={{ color: "#94a3b8", fontSize: ".6rem" }}>Preview:</span>
            <button
              className={`rt-device-btn ${device === "desktop" ? "active" : ""}`}
              onClick={() => setDevice("desktop")}
              aria-label="Desktop preview"
            >
              <Monitor style={{ width: 15, height: 15 }} />
            </button>
            <button
              className={`rt-device-btn ${device === "mobile" ? "active" : ""}`}
              onClick={() => setDevice("mobile")}
              aria-label="Mobile preview"
            >
              <Smartphone style={{ width: 15, height: 15 }} />
            </button>
          </div>
        </div>

        {/* Preview window */}
        <div className="rt-preview-wrap mb-8">

          {/* Browser chrome */}
          <div className="rt-chrome">
            <div className="rt-chrome-dot" style={{ background: "#ff5f57" }} />
            <div className="rt-chrome-dot" style={{ background: "#ffbd2e" }} />
            <div className="rt-chrome-dot" style={{ background: "#28c840" }} />
            <div className="rt-chrome-url">{active.url}</div>
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Open in new tab"
            >
              <ExternalLink style={{ width: 13, height: 13 }} />
            </a>
          </div>

          {/* iframe */}
          <div key={`${activeIndex}-${device}`} className="rt-fade">
            {device === "desktop" ? (
              <div className="rt-iframe-wrap desktop">
                <iframe
                  src={active.url}
                  title={active.name}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            ) : (
              <div className="rt-mobile-outer">
                <div className="rt-mobile-shell">
                  <iframe
                    src={active.url}
                    title={`${active.name} mobile`}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active template info + CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-3 h-3 shrink-0"
                style={{
                  background: active.color,
                  clipPath: "polygon(0 0,calc(100% - 3px) 0,100% 3px,100% 100%,3px 100%,0 calc(100% - 3px))",
                }}
              />
              <span className="rt-display font-black uppercase text-[#0f1623]"
                style={{ fontSize: "1.1rem", letterSpacing: ".04em" }}>
                {active.name}
              </span>
              <span className="rt-tag" style={{ color: "#94a3b8", fontSize: ".6rem" }}>— {active.tag}</span>
            </div>
            <p className="rt-body text-slate-500 text-sm">
              Included free with your registration plan. We configure and launch it for you.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rt-btn-ghost"
            >
              <ExternalLink className="w-4 h-4 shrink-0" /> Full Preview
            </a>
            <Link href="/contact" className="rt-btn">
              Choose This Template <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>

        {/* Bottom note */}
        <div
          className="mt-10 p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            background: "#0f1623",
            clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.015) 18px,rgba(255,255,255,.015) 36px)",
            }}
          />
          <div className="relative z-10">
            <div className="rt-display font-black italic uppercase text-white mb-1"
              style={{ fontSize: "1.05rem", letterSpacing: ".03em" }}>
              Not sure which template fits?
            </div>
            <p className="rt-body text-slate-400 text-sm">
              Tell us about your organization and we'll recommend the best starting point.
            </p>
          </div>
          <Link href="/contact" className="rt-btn relative z-10 shrink-0">
            Talk to Us <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

      </div>
    </section>
  );
}