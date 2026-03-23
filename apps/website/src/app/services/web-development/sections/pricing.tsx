"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    tag: "For small orgs & camps",
    price: "$2,500",
    period: "starting at",
    description: "A clean, fast, mobile-first website to establish your digital presence — built and launched in 4 weeks.",
    features: [
      "Up to 5 pages",
      "Mobile-first responsive design",
      "CMS for content updates",
      "Basic SEO setup",
      "Contact form",
      "Custom domain & hosting setup",
      "30-day post-launch support",
    ],
    cta: "Get Started",
    href: "/contact",
    highlight: false,
  },
  {
    name: "Performance",
    tag: "Most popular",
    price: "$5,000",
    period: "starting at",
    description: "A full-featured website built for growth — with advanced SEO, integrations, and a complete content management system.",
    features: [
      "Up to 12 pages",
      "Advanced SEO & schema markup",
      "CMS with full onboarding",
      "Third-party integrations",
      "Analytics & performance setup",
      "Custom domain & hosting setup",
      "60-day post-launch support",
      "Monthly maintenance plan available",
    ],
    cta: "Get Started",
    href: "/contact",
    highlight: true,
  },
  {
    name: "Custom",
    tag: "For complex needs",
    price: "Let's Talk",
    period: "custom quote",
    description: "Multi-page platforms, custom functionality, e-commerce, or event registration bundled with a website. Scoped to your needs.",
    features: [
      "Unlimited pages",
      "Custom features & functionality",
      "Event registration integration",
      "Advanced analytics dashboard",
      "Priority support & SLA",
      "Dedicated project manager",
      "Ongoing retainer available",
    ],
    cta: "Book a Call",
    href: "/contact",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0f1623" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .wpr-display { font-family:'Barlow Condensed',sans-serif; }
        .wpr-body    { font-family:'Barlow',sans-serif; }
        .wpr-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .wpr-halftone {
          background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .wpr-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.016) 18px,rgba(255,255,255,.016) 36px);
          pointer-events:none;
        }

        /* Base card */
        .wpr-card {
          position:relative; overflow:hidden;
          border:1px solid rgba(255,255,255,.08);
          clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
          display:flex; flex-direction:column;
          transition:transform .25s ease, border-color .25s ease;
        }
        .wpr-card:hover { transform:translateY(-5px); }

        .wpr-card-default {
          background:rgba(255,255,255,.03);
        }
        .wpr-card-default:hover { border-color:rgba(232,25,44,.3); }

        .wpr-card-highlight {
          background:rgba(232,25,44,.08);
          border-color:rgba(232,25,44,.35);
        }
        .wpr-card-highlight:hover { border-color:#e8192c; }

        /* Popular badge */
        .wpr-badge {
          font-family:'Barlow Condensed',sans-serif; font-weight:800;
          text-transform:uppercase; font-size:.6rem; letter-spacing:.14em;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          padding:3px 10px; display:inline-block;
        }

        .wpr-tag-pill {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.62rem; letter-spacing:.12em;
          color:rgba(255,255,255,.35); background:rgba(255,255,255,.06);
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          padding:3px 10px; display:inline-block;
        }

        /* Feature list */
        .wpr-feature {
          font-family:'Barlow',sans-serif; font-size:.85rem;
          display:flex; align-items:flex-start; gap:.6rem;
          color:rgba(255,255,255,.55);
        }
        .wpr-check {
          clip-path:polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px));
          width:18px; height:18px; flex-shrink:0; margin-top:1px;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.15);
        }

        /* CTA buttons */
        .wpr-btn-red {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          background:#e8192c; color:#fff; width:100%;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 24px;
        }
        .wpr-btn-red:hover { background:#b91220; transform:translateX(3px); }

        .wpr-btn-ghost {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          border:1.5px solid rgba(255,255,255,.18); color:#fff; width:100%;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:border-color .18s,background .18s;
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 24px;
        }
        .wpr-btn-ghost:hover { border-color:rgba(255,255,255,.5); background:rgba(255,255,255,.07); }

        .wpr-divider { height:1px; background:rgba(255,255,255,.07); }
      `}</style>

      <div className="wpr-halftone absolute inset-0 z-0" />
      <div className="wpr-jersey  absolute inset-0 z-0" />
      <div className="absolute z-0 pointer-events-none" style={{
        bottom: "-10%", right: "-5%", width: "35vw", height: "35vw", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
      }} />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="wpr-tag" style={{ color: "#e8192c" }}>Pricing</span>
            </div>
            <h2
              className="wpr-display font-black uppercase text-white leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Clear Pricing,
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                No Surprises.
              </span>
            </h2>
          </div>
          <p className="wpr-body text-sm leading-relaxed lg:text-right lg:pb-1 max-w-xs"
            style={{ color: "rgba(255,255,255,.35)" }}>
            Every project starts with a fixed quote. You'll always know exactly what you're paying before we begin.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`wpr-card ${tier.highlight ? "wpr-card-highlight" : "wpr-card-default"}`}
            >
              <div className="p-8 flex flex-col gap-6 flex-1">

                {/* Header */}
                <div>
                  <div className="mb-3">
                    {tier.highlight
                      ? <span className="wpr-badge">Most Popular</span>
                      : <span className="wpr-tag-pill">{tier.tag}</span>
                    }
                  </div>
                  <div
                    className="wpr-display font-black uppercase text-white leading-none mb-2"
                    style={{ fontSize: "1.8rem", letterSpacing: ".03em" }}
                  >
                    {tier.name}
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span
                      className="wpr-display font-black italic text-white"
                      style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", lineHeight: 1 }}
                    >
                      {tier.price}
                    </span>
                    <span className="wpr-tag" style={{ color: "rgba(255,255,255,.3)", fontSize: ".58rem" }}>
                      {tier.period}
                    </span>
                  </div>
                  <p className="wpr-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.45)" }}>
                    {tier.description}
                  </p>
                </div>

                <div className="wpr-divider" />

                {/* Features */}
                <ul className="space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="wpr-feature">
                      <div className="wpr-check">
                        <Check style={{ width: 11, height: 11, color: "#e8192c" }} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={tier.href}
                  className={tier.highlight ? "wpr-btn-red" : "wpr-btn-ghost"}
                >
                  {tier.cta} <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className="wpr-body text-center mt-8 text-sm"
          style={{ color: "rgba(255,255,255,.25)" }}
        >
          All prices are starting points. Final quotes are scoped to your specific project after a discovery call.
        </p>

      </div>
    </section>
  );
}