"use client";

import { Fragment } from "react";
import { ArrowRight, Search, Rocket, LifeBuoy } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery Call",
    subtitle: "We learn your world.",
    description:
      "We start with a focused 30-minute call to understand your organization, goals, and challenges. No fluff — just the right questions so we can build exactly what you need.",
    details: [
      "Understand your goals & audience",
      "Audit your current digital presence",
      "Identify the right service fit",
      "Deliver a clear project scope",
    ],
    cta: null,
  },
  {
    number: "02",
    icon: Rocket,
    title: "Build & Launch",
    subtitle: "We get to work.",
    description:
      "Once the scope is locked, our team builds fast and communicates clearly. You'll see progress at every stage — no black boxes, no surprises. We ship on time.",
    details: [
      "Design & development sprints",
      "Regular check-ins & previews",
      "Revisions until it's right",
      "Full launch support",
    ],
    cta: null,
  },
  {
    number: "03",
    icon: LifeBuoy,
    title: "Grow & Support",
    subtitle: "We stay in your corner.",
    description:
      "After launch we don't disappear. We offer ongoing maintenance, performance monitoring, and support plans — so your site and systems keep performing long-term.",
    details: [
      "Monthly maintenance plans",
      "Performance & uptime monitoring",
      "Priority support access",
      "Ongoing growth consulting",
    ],
    cta: "/contact",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .hw-display { font-family:'Barlow Condensed',sans-serif; }
        .hw-body    { font-family:'Barlow',sans-serif; }

        .hw-tag {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700; text-transform:uppercase;
          font-size:.68rem; letter-spacing:.18em;
        }

        /* Same halftone + jersey as other light sections */
        .hw-halftone {
          background-image: radial-gradient(circle, rgba(0,0,0,.04) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events:none;
        }
        .hw-jersey {
          background-image: repeating-linear-gradient(
            -55deg, transparent, transparent 18px,
            rgba(0,0,0,.015) 18px, rgba(0,0,0,.015) 36px
          );
          pointer-events:none;
        }

        /* ── Step card ── */
        .hw-card {
          position:relative; overflow:hidden;
          background:#fff;
          border:1.5px solid #e2e8f0;
          clip-path:polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,18px 100%,0 calc(100% - 18px));
          transition:transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease;
          display:flex; flex-direction:column;
        }
        .hw-card:hover {
          transform:translateY(-7px);
          box-shadow:0 32px 64px rgba(0,0,0,.1);
        }

        /* Top bar draws in on hover */
        .hw-card-bar {
          height:3px;
          background:linear-gradient(to right,#e8192c,rgba(232,25,44,.25));
          transform-origin:left; transform:scaleX(0);
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .hw-card:hover .hw-card-bar { transform:scaleX(1); }

        /* Ghost number */
        .hw-ghost {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900; font-style:italic;
          color:transparent;
          -webkit-text-stroke:1.5px rgba(232,25,44,.06);
          line-height:1; user-select:none; pointer-events:none;
          position:absolute; bottom:-20px; right:-10px;
          font-size:9rem; white-space:nowrap;
        }

        /* Number badge */
        .hw-num-badge {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900; font-style:italic;
          font-size:.75rem; letter-spacing:.06em;
          color:rgba(0,0,0,.18);
        }

        /* Icon wrap */
        .hw-icon {
          clip-path:polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,9px 100%,0 calc(100% - 9px));
          width:48px; height:48px;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0;
          background:rgba(232,25,44,.07); color:#e8192c;
          transition:background .2s, color .2s;
        }
        .hw-card:hover .hw-icon {
          background:#e8192c; color:#fff;
        }

        /* Detail list */
        .hw-detail {
          font-family:'Barlow',sans-serif;
          display:flex; align-items:center; gap:.6rem;
          font-size:.82rem; color:#64748b;
          transition:color .15s;
        }
        .hw-detail-dot {
          width:5px; height:5px; border-radius:50%;
          background:rgba(232,25,44,.3); flex-shrink:0;
          transition:background .2s;
        }
        .hw-card:hover .hw-detail-dot { background:#e8192c; }

        /* Connector arrow between cards */
        .hw-connector {
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; color:rgba(232,25,44,.35);
        }

        /* CTA button */
        .hw-btn {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:.9rem;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          transition:background .18s, transform .18s;
          display:inline-flex; align-items:center; gap:7px;
          padding:10px 22px; white-space:nowrap;
        }
        .hw-btn:hover { background:#b91220; transform:translateX(3px); }

        /* Step number counter line */
        .hw-step-line {
          position:absolute; top:0; left:50%;
          width:1px; height:100%;
          background:linear-gradient(to bottom,rgba(232,25,44,.15),rgba(232,25,44,.05));
          transform:translateX(-50%);
          pointer-events:none;
        }

        /* Subtitle */
        .hw-subtitle {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700; font-style:italic; text-transform:uppercase;
          font-size:.95rem; letter-spacing:.05em; color:#e8192c;
          border-left:3px solid #e8192c; padding-left:10px;
        }

        /* Bottom CTA band */
        .hw-band {
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
        }
      `}</style>

      {/* Texture */}
      <div className="hw-halftone absolute inset-0 pointer-events-none" />
      <div className="hw-jersey  absolute inset-0 pointer-events-none" />

      {/* Top red bar */}
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="hw-tag" style={{ color: "#e8192c" }}>The Process</span>
            </div>
            <h2
              className="hw-display font-black uppercase text-[#0f1623] leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              How We
              <br />
              <span
                className="italic"
                style={{ WebkitTextStroke: "2.5px #0f1623", color: "transparent" }}
              >
                Work.
              </span>
            </h2>
          </div>
          <p className="hw-body text-slate-500 max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            A simple, transparent process — from first call to long-term partnership. No guesswork, no surprises.
          </p>
        </div>

        {/* ── Step cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_40px_1fr_40px_1fr] gap-4 lg:gap-0 items-stretch">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              {/* Card */}
              <div className="hw-card">
                {/* Animated top bar */}
                <div className="hw-card-bar" />

                {/* Ghost number */}
                <div className="hw-ghost" aria-hidden="true">{step.number}</div>

                <div className="relative z-10 p-8 flex flex-col gap-5 flex-1">

                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="hw-icon">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="hw-num-badge mb-0.5">{step.number}</div>
                      <h3
                        className="hw-display font-black uppercase text-[#0f1623] leading-none"
                        style={{ fontSize: "clamp(1.4rem,2.2vw,1.9rem)", letterSpacing: ".02em" }}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div className="hw-subtitle">{step.subtitle}</div>

                  {/* Description */}
                  <p className="hw-body text-slate-500 leading-relaxed" style={{ fontSize: ".92rem" }}>
                    {step.description}
                  </p>

                  {/* Detail list */}
                  <ul className="space-y-2 flex-1">
                    {step.details.map((d) => (
                      <li key={d} className="hw-detail">
                        <span className="hw-detail-dot" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Optional CTA on last card */}
                  {step.cta && (
                    <div className="pt-4 border-t border-slate-100 mt-2">
                      <Link href={step.cta} className="hw-btn">
                        Get Started <ArrowRight className="w-4 h-4 shrink-0" />
                      </Link>
                    </div>
                  )}

                </div>
              </div>

              {/* Connector arrow — between cards only */}
              {i < steps.length - 1 && (
                <div className="hw-connector hidden lg:flex">
                  <ArrowRight
                    className="w-5 h-5"
                    style={{ color: "rgba(232,25,44,.3)" }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* ── Bottom band ── */}
        <div
          className="hw-band mt-12 p-7 lg:p-9 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ background: "#0f1623" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.015) 18px,rgba(255,255,255,.015) 36px)",
            }}
          />
          <div className="relative z-10">
            <div
              className="hw-display font-black italic uppercase text-white mb-1"
              style={{ fontSize: "1.1rem", letterSpacing: ".03em" }}
            >
              Ready to kick things off?
            </div>
            <p className="hw-body text-slate-400 text-sm">
              Most projects start within a week of the first call.
            </p>
          </div>
          <Link href="/contact" className="hw-btn relative z-10 shrink-0">
            Book a Discovery Call <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

      </div>
    </section>
  );
}