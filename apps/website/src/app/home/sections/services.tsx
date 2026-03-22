"use client";

import { ArrowRight, Globe, ClipboardList, Check } from "lucide-react";
import Link from "next/link";

const services = [
  {
    number: "01",
    icon: Globe,
    category: "Web Services",
    title: "Marketing Websites",
    tagline: "Your digital storefront, built to convert.",
    description:
      "We design and develop custom, high-performance websites that position your organization for growth — fast, mobile-first, and built to rank. From landing pages to full multi-page experiences, every pixel earns its place.",
    features: [
      "Custom Next.js or WordPress builds",
      "SEO-optimized from the ground up",
      "Mobile-first, blazing fast performance",
      "CMS so your team can self-manage",
      "Ongoing support & maintenance plans",
    ],
    stats: [
      { label: "Projects Delivered", value: "50+" },
      { label: "Client Satisfaction", value: "98%" },
    ],
    href: "/services/web-development",
    dark: false,
  },
  {
    number: "02",
    icon: ClipboardList,
    category: "Event Management",
    title: "Event Registration",
    tagline: "From sign-up to showtime — fully handled.",
    description:
      "Our registration platform is purpose-built for sports organizations, schools, and camps. Handle payments, waivers, check-ins, and real-time reporting — all in one system that scales from 50 to 50,000 participants.",
    features: [
      "Online registration & payment processing",
      "Digital waiver & consent management",
      "Automated confirmations & reminders",
      "Real-time check-in and reporting",
      "Stripe & PayPal integrations built-in",
    ],
    stats: [
      { label: "Registrations Processed", value: "100K+" },
      { label: "Revenue Generated", value: "$2M+" },
    ],
    href: "/services/event-registration",
    dark: true,
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .sv-display { font-family:'Barlow Condensed',sans-serif; }
        .sv-body    { font-family:'Barlow',sans-serif; }

        .sv-tag {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700;text-transform:uppercase;
          font-size:.68rem;letter-spacing:.18em;
        }

        /* Halftone dot — matches hero */
        .sv-halftone {
          background-image: radial-gradient(circle, rgba(0,0,0,.04) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events:none;
        }

        /* Jersey stripe — matches hero */
        .sv-jersey {
          background-image: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 18px,
            rgba(0,0,0,.015) 18px,
            rgba(0,0,0,.015) 36px
          );
          pointer-events:none;
        }

        /* ── Card ── */
        .sv-card {
          position:relative; overflow:hidden;
          clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px));
          transition:transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease;
        }
        .sv-card:hover {
          transform:translateY(-7px);
        }
        .sv-card-light {
          background:#fff;
          border:1.5px solid #e2e8f0;
        }
        .sv-card-light:hover {
          box-shadow:0 32px 72px rgba(0,0,0,.1);
        }
        .sv-card-dark {
          background:#0f1623;
          border:1.5px solid rgba(255,255,255,.07);
        }
        .sv-card-dark:hover {
          box-shadow:0 32px 72px rgba(0,0,0,.35);
        }

        /* Top accent bar — draws in on hover */
        .sv-card-bar {
          height:3px;
          background:linear-gradient(to right,#e8192c,rgba(232,25,44,.25));
          transform-origin:left;
          transform:scaleX(0);
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .sv-card:hover .sv-card-bar { transform:scaleX(1); }

        /* Ghost number */
        .sv-ghost {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900;font-style:italic;
          line-height:1;user-select:none;pointer-events:none;
          position:absolute;bottom:-24px;right:-12px;
          font-size:10rem;white-space:nowrap;color:transparent;
        }

        /* Feature row */
        .sv-feature {
          font-family:'Barlow',sans-serif;
          display:flex;align-items:flex-start;gap:.65rem;
          font-size:.875rem;
          line-height:1.4;
        }

        .sv-check {
          width:18px;height:18px;
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;margin-top:1px;
          clip-path:polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px));
        }

        /* Stat chip */
        .sv-stat {
          font-family:'Barlow Condensed',sans-serif;
          clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px));
          padding:.75rem 1rem;flex:1;
          transition:border-color .2s;
        }

        /* CTA */
        .sv-btn {
          font-family:'Barlow Condensed',sans-serif;font-weight:700;
          text-transform:uppercase;letter-spacing:.09em;font-size:1rem;
          background:#e8192c;color:#fff;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex;align-items:center;gap:8px;
          padding:13px 28px;white-space:nowrap;
        }
        .sv-btn:hover { background:#b91220;transform:translateX(3px); }

        .sv-btn-ghost {
          font-family:'Barlow Condensed',sans-serif;font-weight:700;
          text-transform:uppercase;letter-spacing:.09em;font-size:1rem;
          border:1.5px solid rgba(255,255,255,.18);color:#fff;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:border-color .18s,background .18s;
          display:inline-flex;align-items:center;gap:8px;
          padding:13px 28px;white-space:nowrap;
        }
        .sv-btn-ghost:hover { border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.07); }

        /* Icon wrap */
        .sv-icon {
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          width:52px;height:52px;
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;
          transition:background .2s;
        }

        /* Tagline border-left accent */
        .sv-tagline {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700;font-style:italic;text-transform:uppercase;
          font-size:1rem;letter-spacing:.04em;color:#e8192c;
          border-left:3px solid #e8192c;
          padding-left:12px;
        }

        /* Section number badge */
        .sv-num {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900;font-style:italic;
          font-size:.75rem;color:rgba(0,0,0,.18);
          letter-spacing:.04em;
        }
        .sv-card-dark .sv-num { color:rgba(255,255,255,.18); }

        /* Bottom CTA band */
        .sv-cta-band {
          clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
        }

        /* Diagonal slash accent — echoes hero */
        .sv-slash-deco {
          position:absolute;
          top:0;bottom:0;
          left:50%;width:1.5px;
          background:linear-gradient(to bottom,transparent,rgba(232,25,44,.1) 30%,rgba(232,25,44,.1) 70%,transparent);
          transform:rotate(2deg);
          pointer-events:none;
        }
      `}</style>

      {/* Texture layers */}
      <div className="sv-halftone absolute inset-0 pointer-events-none" />
      <div className="sv-jersey  absolute inset-0 pointer-events-none" />

      {/* Top red bar */}
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="sv-tag" style={{ color: "#e8192c" }}>What We Do</span>
            </div>
            <h2
              className="sv-display font-black uppercase text-[#0f1623] leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Two Services.
              <br />
              <span
                className="italic"
                style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}
              >
                One Vision.
              </span>
            </h2>
          </div>
          <p className="sv-body text-slate-500 max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            Everything your organization needs to grow online and run events with confidence —
            delivered under one roof.
          </p>
        </div>

        {/* ── Two-column cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">

          {/* Faint center slash — visual echo of hero */}
          <div className="sv-slash-deco hidden lg:block" />

          {services.map((s) => {
            const isDark = s.dark;
            return (
              <div
                key={s.number}
                className={`sv-card ${isDark ? "sv-card-dark" : "sv-card-light"}`}
              >
                {/* Animated top bar */}
                <div className="sv-card-bar" />

                {/* Ghost number */}
                <div
                  className="sv-ghost"
                  aria-hidden="true"
                  style={{
                    WebkitTextStroke: isDark
                      ? "1.5px rgba(255,255,255,.04)"
                      : "1.5px rgba(232,25,44,.05)",
                  }}
                >
                  {s.number}
                </div>

                <div className="relative z-10 p-8 lg:p-10 flex flex-col gap-6">

                  {/* Header row */}
                  <div className="flex items-start gap-4">
                    <div
                      className="sv-icon"
                      style={{
                        background: isDark ? "rgba(232,25,44,.14)" : "rgba(232,25,44,.07)",
                        color: "#e8192c",
                      }}
                    >
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="sv-num mb-0.5">{s.number}</div>
                      <div
                        className="sv-tag mb-0.5"
                        style={{ color: isDark ? "rgba(255,255,255,.3)" : "#94a3b8" }}
                      >
                        {s.category}
                      </div>
                      <h3
                        className="sv-display font-black uppercase leading-none"
                        style={{
                          fontSize: "clamp(1.6rem,2.8vw,2.2rem)",
                          letterSpacing: ".02em",
                          color: isDark ? "#fff" : "#0f1623",
                        }}
                      >
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="sv-tagline">{s.tagline}</div>

                  {/* Description */}
                  <p
                    className="sv-body leading-relaxed"
                    style={{
                      fontSize: ".94rem",
                      color: isDark ? "rgba(255,255,255,.5)" : "#64748b",
                    }}
                  >
                    {s.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2.5">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="sv-feature"
                        style={{ color: isDark ? "rgba(255,255,255,.65)" : "#475569" }}
                      >
                        <div
                          className="sv-check"
                          style={{
                            background: isDark ? "rgba(232,25,44,.18)" : "rgba(232,25,44,.07)",
                          }}
                        >
                          <Check className="w-3 h-3" style={{ color: "#e8192c" }} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Stat chips */}
                  <div className="flex gap-3">
                    {s.stats.map(({ label, value }) => (
                      <div
                        key={label}
                        className="sv-stat"
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,.04)"
                            : "rgba(232,25,44,.03)",
                          border: isDark
                            ? "1px solid rgba(255,255,255,.07)"
                            : "1.5px solid #e2e8f0",
                        }}
                      >
                        <div
                          className="sv-display font-black"
                          style={{
                            fontSize: "1.6rem",
                            lineHeight: 1,
                            color: isDark ? "#fff" : "#0f1623",
                          }}
                        >
                          {value}
                        </div>
                        <div
                          className="sv-tag mt-1"
                          style={{
                            color: isDark ? "rgba(255,255,255,.3)" : "#94a3b8",
                            fontSize: ".6rem",
                          }}
                        >
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="pt-2 border-t"
                    style={{ borderColor: isDark ? "rgba(255,255,255,.07)" : "#f1f5f9" }}
                  >
                    <Link href={s.href} className={isDark ? "sv-btn-ghost" : "sv-btn"}>
                      Learn More <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA band ── */}
        <div
          className="sv-cta-band mt-10 p-7 lg:p-9 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ background: "#0f1623" }}
        >
          {/* Jersey stripe on the band */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.015) 18px,rgba(255,255,255,.015) 36px)",
            }}
          />
          <div className="relative z-10">
            <div
              className="sv-display font-black italic uppercase text-white mb-1"
              style={{ fontSize: "1.15rem", letterSpacing: ".03em" }}
            >
              Not sure which service you need?
            </div>
            <p className="sv-body text-slate-400 text-sm">
              Most clients use both. Let's figure out what fits your goals.
            </p>
          </div>
          <Link href="/contact" className="sv-btn relative z-10 shrink-0">
            Book a Free Call <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

      </div>
    </section>
  );
}