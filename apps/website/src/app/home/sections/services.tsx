"use client";

import { ArrowRight, Globe, ClipboardList, Check } from "lucide-react";
import Link from "next/link";

// Only what Tailwind cannot express: @keyframes, clip-path, clamp(), @import, and
// the one pseudo-selector (.sv-card:hover .sv-icon) that needs a parent-context rule.
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

  .font-barlow           { font-family: 'Barlow', sans-serif; }
  .font-barlow-condensed { font-family: 'Barlow Condensed', sans-serif; }

  /* Fluid font sizes */
  .text-section-heading { font-size: clamp(2.4rem, 5vw, 5rem); }
  .text-card-title      { font-size: clamp(1.2rem, 2vw, 1.7rem); }

  /* Clip-path shapes */
  .clip-card   { clip-path: polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px)); }
  .clip-btn    { clip-path: polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px)); }
  .clip-icon   { clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px)); }
  .clip-check  { clip-path: polygon(0 0,calc(100% - 4px)  0,100% 4px, 100% 100%,4px  100%,0 calc(100% - 4px)); }
  .clip-stat   { clip-path: polygon(0 0,calc(100% - 7px)  0,100% 7px, 100% 100%,7px  100%,0 calc(100% - 7px)); }
  .clip-cta-band { clip-path: polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px)); }

  /* Card hover: slide the top accent bar in from the left */
  .card-bar {
    height: 3px;
    background: linear-gradient(to right, #e8192c, rgba(232,25,44,.25));
    transform-origin: left;
    transform: scaleX(0);
    transition: transform .4s cubic-bezier(.22,1,.36,1);
  }
  .sv-card:hover .card-bar { transform: scaleX(1); }

  /* Card hover: icon background + color swap (parent-context selector) */
  .sv-card:hover .sv-icon {
    background: #e8192c !important;
    color: #fff !important;
  }

  /* Card hover lift */
  .sv-card {
    transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease;
  }
  .sv-card:hover { transform: translateY(-7px); }
  .sv-card-light:hover { box-shadow: 0 32px 72px rgba(0,0,0,.10); }
  .sv-card-dark:hover  { box-shadow: 0 32px 72px rgba(0,0,0,.35); }
`;

const services = [
  {
    number: "01",
    icon: Globe,
    title: "Marketing Websites",
    tagline: "Turn Visitors Into Registered Athletes.",
    description:
      "Your website isn't just a homepage — it's your #1 recruitment tool. We build high-performance sites designed to attract, convince, and convert athletes and parents into registrations.",
    features: [
      "Custom Next.js or WordPress builds tailored for youth sports organizations",
      "Clear pathways from visit → interest → registration",
      "Mobile-first, blazing fast performance",
      "CMS so your team can self-manage",
      "SEO to help local athletes find your programs",
      "Ongoing support to keep your site performing",
    ],
    href: "/services/web-development",
    dark: true,
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Sports Operations Platform",
    tagline: "From sign-up to showtime — fully handled.",
    description:
      "A centralized sports operations platform to manage registrations, events, payments, and communications — all in one place. Built for organizations of any size, it simplifies operations while giving you full visibility from sign-up to execution.",
    features: [
      "Seamless online sign-up for athletes, teams, and participants",
      "Organize games, sessions, and events with flexible scheduling tools",
      "Send automated confirmations, reminders, and updates",
      "Access real-time data on registrations, attendance, and revenue",
      "Secure payment processing with built-in integrations",
      "Digital forms and consent management for every participant",
    ],
    href: "/services/event-registration",
    dark: true,
  },
];

export default function Services() {
  return (
    <section className="font-barlow relative overflow-hidden bg-[#f8f9fb]">
      <style>{GLOBAL_CSS}</style>

      {/* Top red bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e8192c]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <h2
              className="font-barlow-condensed font-black uppercase text-[#0f1623] leading-[.9] tracking-[.01em] text-section-heading"
            >
              Two Services.
              <br />
              <span
                className="italic text-stroke-red"
              >
                One Vision.
              </span>
            </h2>
          </div>
          <p className="font-barlow text-black max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            Everything your organization needs to grow online and run events
            with confidence — delivered under one roof.
          </p>
        </div>

        {/* ── Two-column cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative items-stretch">

          {/* Faint center slash — visual echo of hero */}
          <div
            className="absolute hidden lg:block top-0 bottom-0 pointer-events-none"
            style={{
              left: "50%",
              width: "1.5px",
              background:
                "linear-gradient(to bottom, transparent, rgba(232,25,44,.1) 30%, rgba(232,25,44,.1) 70%, transparent)",
              transform: "rotate(2deg)",
            }}
          />

          {services.map((s) => {
            const isDark = s.dark;
            return (
              <div
                key={s.number}
                className={`sv-card clip-card flex flex-col relative overflow-hidden border ${isDark
                  ? "sv-card-dark bg-[#0f1623] border-white/[.07]"
                  : "sv-card-light bg-white border-slate-200"
                  }`}
              >
                {/* Animated top accent bar */}
                <div className="card-bar" />

                {/* Ghost number */}
                <div
                  aria-hidden="true"
                  className="font-barlow-condensed font-black italic absolute bottom-[-24px] right-[-12px] text-[10rem] leading-none select-none pointer-events-none whitespace-nowrap"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: isDark
                      ? "1.5px rgba(255,255,255,.04)"
                      : "1.5px rgba(232,25,44,.05)",
                  }}
                >
                  {s.number}
                </div>

                <div className="relative z-10 p-8 lg:p-10 flex flex-col gap-6 flex-1">

                  {/* Header row */}
                  <div className="flex items-start gap-4">
                    <div
                      className="sv-icon clip-icon w-[52px] h-[52px] flex items-center justify-center shrink-0 transition-[background,color] duration-220"
                      style={{
                        background: isDark
                          ? "rgba(232,25,44,.14)"
                          : "rgba(232,25,44,.07)",
                        color: "#e8192c",
                      }}
                    >
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-barlow-condensed font-bold italic uppercase text-base tracking-[.04em] text-[#e8192c]">
                        {s.tagline}
                      </div>
                      <h3
                        className="font-barlow-condensed font-black uppercase leading-none tracking-[.02em] text-card-title"
                        style={{ color: isDark ? "#fff" : "#0f1623" }}
                      >
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="font-barlow leading-relaxed text-[.94rem]"
                    style={{
                      color: isDark ? "rgba(255,255,255,.5)" : "#64748b",
                    }}
                  >
                    {s.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2.5 flex-1">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="font-barlow flex items-start gap-[.65rem] text-sm leading-[1.4]"
                        style={{
                          color: isDark ? "rgba(255,255,255,.65)" : "#475569",
                        }}
                      >
                        <div
                          className="clip-check w-[18px] h-[18px] flex items-center justify-center shrink-0 mt-px"
                          style={{
                            background: isDark
                              ? "rgba(232,25,44,.18)"
                              : "rgba(232,25,44,.07)",
                          }}
                        >
                          <Check className="w-3 h-3 text-[#e8192c]" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div
                    className="mt-auto pt-2 border-t"
                    style={{ borderColor: "rgba(255,255,255,.07)" }}
                  >
                    <button className="clip-btn font-barlow-condensed font-bold uppercase tracking-[.09em] text-base bg-[#e8192c] text-white inline-flex items-center gap-2 px-7 py-3 whitespace-nowrap transition-[background,transform] duration-180 hover:bg-[#b91220] hover:translate-x-[3px]">
                      Get a Performance Audit{" "}
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}