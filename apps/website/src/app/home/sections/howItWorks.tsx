"use client";

import { Fragment } from "react";
import { ArrowRight, Search, Rocket, LifeBuoy } from "lucide-react";
import Link from "next/link";

// Only what Tailwind cannot express: @keyframes, ::after pseudo, parent-context
// hover selectors, clip-path, clamp() font sizes, @import.
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

  .font-barlow           { font-family: 'Barlow', sans-serif; }
  .font-barlow-condensed { font-family: 'Barlow Condensed', sans-serif; }

  /* Fluid font sizes */
  .text-section-heading { font-size: clamp(2.4rem, 5vw, 5rem); }
  .text-card-title      { font-size: clamp(1.4rem, 2.2vw, 1.9rem); }

  /* Clip-path shapes */
  .clip-card { clip-path: polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,18px 100%,0 calc(100% - 18px)); }
  .clip-btn  { clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px)); }
  .clip-icon { clip-path: polygon(0 0,calc(100% - 9px)  0,100% 9px, 100% 100%,9px  100%,0 calc(100% - 9px)); }
  .clip-band { clip-path: polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px)); }

  /* Card hover: lift */
  .hw-card {
    transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease;
  }
  .hw-card:hover {
    transform: translateY(-7px);
    box-shadow: 0 32px 64px rgba(0,0,0,.1);
  }

  /* Top bar draws in on hover (transform-origin: left) */
  .hw-card-bar {
    height: 3px;
    background: linear-gradient(to right, #e8192c, rgba(232,25,44,.25));
    transform-origin: left;
    transform: scaleX(0);
    transition: transform .4s cubic-bezier(.22,1,.36,1);
  }
  .hw-card:hover .hw-card-bar { transform: scaleX(1); }

  /* Icon background + color swap on parent hover */
  .hw-icon { transition: background .2s, color .2s; }
  .hw-card:hover .hw-icon {
    background: #e8192c !important;
    color: #fff !important;
  }

  /* Detail dot color swap on parent hover */
  .hw-detail-dot { transition: background .2s; }
  .hw-card:hover .hw-detail-dot { background: #e8192c; }
`;

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
    <section className="font-barlow relative overflow-hidden bg-[#f8f9fb]">
      <style>{GLOBAL_CSS}</style>

      {/* Halftone texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,.04) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Jersey diagonal stripes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, transparent, transparent 18px, rgba(0,0,0,.015) 18px, rgba(0,0,0,.015) 36px)",
        }}
      />

      {/* Top red bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e8192c]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0 bg-[#e8192c]" />
              <span className="font-barlow-condensed font-bold uppercase text-[.68rem] tracking-[.18em] text-[#e8192c]">
                The Process
              </span>
            </div>
            <h2 className="font-barlow-condensed font-black uppercase text-[#0f1623] leading-[.9] tracking-[.01em] text-section-heading">
              How We
              <br />
              <span
                className="italic text-stroke-black"
              >
                Work.
              </span>
            </h2>
          </div>
          <p className="font-barlow text-slate-500 max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            A simple, transparent process — from first call to long-term partnership. No guesswork, no surprises.
          </p>
        </div>

        {/* ── Step cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_40px_1fr_40px_1fr] gap-4 lg:gap-0 items-stretch">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              {/* Card */}
              <div className="hw-card clip-card relative overflow-hidden flex flex-col bg-white border border-slate-200">
                {/* Animated top bar */}
                <div className="hw-card-bar" />

                {/* Ghost number */}
                <div
                  aria-hidden="true"
                  className="font-barlow-condensed font-black italic absolute bottom-[-20px] right-[-10px] text-[9rem] leading-none select-none pointer-events-none whitespace-nowrap"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(232,25,44,.06)",
                  }}
                >
                  {step.number}
                </div>

                <div className="relative z-10 p-8 flex flex-col gap-5 flex-1">

                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div
                      className="hw-icon clip-icon w-12 h-12 flex items-center justify-center shrink-0 bg-[rgba(232,25,44,.07)] text-[#e8192c]"
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-barlow-condensed font-black italic text-[.75rem] tracking-[.06em] text-black/20 mb-0.5">
                        {step.number}
                      </div>
                      <h3 className="font-barlow-condensed font-black uppercase text-[#0f1623] leading-none tracking-[.02em] text-card-title">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div className="font-barlow-condensed font-bold italic uppercase text-[.95rem] tracking-[.05em] text-[#e8192c] border-l-[3px] border-[#e8192c] pl-[10px]">
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <p className="font-barlow text-slate-500 leading-relaxed text-[.92rem]">
                    {step.description}
                  </p>

                  {/* Detail list */}
                  <ul className="space-y-2 flex-1">
                    {step.details.map((d) => (
                      <li key={d} className="font-barlow flex items-center gap-[.6rem] text-[.82rem] text-slate-500">
                        <span className="hw-detail-dot w-[5px] h-[5px] rounded-full shrink-0 bg-[rgba(232,25,44,.3)]" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Optional CTA on last card */}
                  {step.cta && (
                    <div className="pt-4 border-t border-slate-100 mt-2">
                      <Link
                        href={step.cta}
                        className="clip-btn font-barlow-condensed font-bold uppercase tracking-[.09em] text-[.9rem] bg-[#e8192c] text-white inline-flex items-center gap-[7px] px-[22px] py-[10px] whitespace-nowrap transition-[background,transform] duration-180 hover:bg-[#b91220] hover:translate-x-[3px]"
                      >
                        Get Started <ArrowRight className="w-4 h-4 shrink-0" />
                      </Link>
                    </div>
                  )}

                </div>
              </div>

              {/* Connector arrow — between cards only */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center shrink-0">
                  <ArrowRight className="w-5 h-5 text-[rgba(232,25,44,.3)]" />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* ── Bottom band ── */}
        <div className="clip-band relative mt-12 p-7 lg:p-9 flex flex-col sm:flex-row items-center justify-between gap-5 bg-[#0f1623]">
          {/* Jersey texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-55deg, transparent, transparent 18px, rgba(255,255,255,.015) 18px, rgba(255,255,255,.015) 36px)",
            }}
          />

          <div className="relative z-10">
            <div className="font-barlow-condensed font-black italic uppercase text-white text-[1.1rem] tracking-[.03em] mb-1">
              Ready to kick things off?
            </div>
            <p className="font-barlow text-slate-400 text-sm">
              Most projects start within a week of the first call.
            </p>
          </div>

          <Link
            href="/contact"
            className="clip-btn relative z-10 shrink-0 font-barlow-condensed font-bold uppercase tracking-[.09em] text-[.9rem] bg-[#e8192c] text-white inline-flex items-center gap-[7px] px-[22px] py-[10px] whitespace-nowrap transition-[background,transform] duration-180 hover:bg-[#b91220] hover:translate-x-[3px]"
          >
            Book a Discovery Call <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

      </div>
    </section>
  );
}