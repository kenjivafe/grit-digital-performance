"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Single Event",
    tag: "For camps & one-off events",
    price: "$1,500",
    period: "starting at",
    description: "A complete registration system for a single event — set up, configured, and ready to go in under 2 weeks.",
    features: [
      "Free website (choose from 4 templates)",
      "Custom registration form",
      "Stripe payment processing",
      "Digital waiver collection",
      "Automated confirmation emails",
      "QR code check-in",
      "Real-time dashboard",
      "CSV export & reporting",
      "30-day post-event support",
    ],
    cta: "Get Started",
    href: "/contact",
    highlight: false,
  },
  {
    name: "Season Pass",
    tag: "Most popular",
    price: "$3,500",
    period: "starting at",
    description: "Multi-event support for organizations running a full season — leagues, tournaments, and camp series all covered.",
    features: [
      "Free website (choose from 4 templates)",
      "Up to 10 events",
      "Shared participant database",
      "Individual event dashboards",
      "Cross-event reporting",
      "Season pass & bundle options",
      "Waitlist & capacity controls",
      "Priority support all season",
      "60-day post-season support",
    ],
    cta: "Get Started",
    href: "/contact",
    highlight: true,
  },
  {
    name: "Enterprise",
    tag: "For large organizations",
    price: "Let's Talk",
    period: "custom quote",
    description: "Unlimited events, custom integrations, advanced reporting, and a dedicated support contact for high-volume organizations.",
    features: [
      "Free website (choose from 4 templates)",
      "Unlimited events",
      "Custom integrations & API access",
      "Advanced analytics & reporting",
      "White-label option",
      "Dedicated account manager",
      "SLA & uptime guarantee",
      "Custom feature development",
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

        .rprc-display { font-family:'Barlow Condensed',sans-serif; }
        .rprc-body    { font-family:'Barlow',sans-serif; }
        .rprc-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }
        .rprc-halftone {
          background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .rprc-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.016) 18px,rgba(255,255,255,.016) 36px);
          pointer-events:none;
        }
        .rprc-card {
          position:relative; overflow:hidden;
          border:1px solid rgba(255,255,255,.08);
          clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
          display:flex; flex-direction:column;
          transition:transform .25s ease, border-color .25s ease;
        }
        .rprc-card:hover { transform:translateY(-5px); }
        .rprc-card-default { background:rgba(255,255,255,.03); }
        .rprc-card-default:hover { border-color:rgba(232,25,44,.3); }
        .rprc-card-highlight {
          background:rgba(232,25,44,.08);
          border-color:rgba(232,25,44,.35);
        }
        .rprc-card-highlight:hover { border-color:#e8192c; }
        .rprc-badge {
          font-family:'Barlow Condensed',sans-serif; font-weight:800;
          text-transform:uppercase; font-size:.6rem; letter-spacing:.14em;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          padding:3px 10px; display:inline-block;
        }
        .rprc-tag-pill {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.62rem; letter-spacing:.12em;
          color:rgba(255,255,255,.35); background:rgba(255,255,255,.06);
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          padding:3px 10px; display:inline-block;
        }
        .rprc-feature {
          font-family:'Barlow',sans-serif; font-size:.85rem;
          display:flex; align-items:flex-start; gap:.6rem;
          color:rgba(255,255,255,.55);
        }
        .rprc-check {
          clip-path:polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px));
          width:18px; height:18px; flex-shrink:0; margin-top:1px;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.15);
        }
        .rprc-btn-red {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          background:#e8192c; color:#fff; width:100%;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 24px;
        }
        .rprc-btn-red:hover { background:#b91220; transform:translateX(3px); }
        .rprc-btn-ghost {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          border:1.5px solid rgba(255,255,255,.18); color:#fff; width:100%;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:border-color .18s,background .18s;
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 24px;
        }
        .rprc-btn-ghost:hover { border-color:rgba(255,255,255,.5); background:rgba(255,255,255,.07); }
        .rprc-divider { height:1px; background:rgba(255,255,255,.07); }
      `}</style>

      <div className="rprc-halftone absolute inset-0 z-0" />
      <div className="rprc-jersey  absolute inset-0 z-0" />
      <div className="absolute z-0 pointer-events-none" style={{
        bottom: "-10%", right: "-5%", width: "35vw", height: "35vw", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
      }} />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="rprc-tag" style={{ color: "#e8192c" }}>Pricing</span>
            </div>
            <h2 className="rprc-display font-black uppercase text-white leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}>
              Clear Pricing,
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                No Surprises.
              </span>
            </h2>
          </div>
          <p className="rprc-body text-sm leading-relaxed lg:text-right lg:pb-1 max-w-xs"
            style={{ color: "rgba(255,255,255,.35)" }}>
            Fixed quotes before we start. No hidden fees, no per-registration cuts — just a flat project price.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div key={tier.name} className={`rprc-card ${tier.highlight ? "rprc-card-highlight" : "rprc-card-default"}`}>
              <div className="p-8 flex flex-col gap-6 flex-1">
                <div>
                  <div className="mb-3">
                    {tier.highlight
                      ? <span className="rprc-badge">Most Popular</span>
                      : <span className="rprc-tag-pill">{tier.tag}</span>}
                  </div>
                  <div className="rprc-display font-black uppercase text-white leading-none mb-2"
                    style={{ fontSize: "1.8rem", letterSpacing: ".03em" }}>
                    {tier.name}
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="rprc-display font-black italic text-white"
                      style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", lineHeight: 1 }}>
                      {tier.price}
                    </span>
                    <span className="rprc-tag" style={{ color: "rgba(255,255,255,.3)", fontSize: ".58rem" }}>
                      {tier.period}
                    </span>
                  </div>
                  <p className="rprc-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.45)" }}>
                    {tier.description}
                  </p>
                </div>

                <div className="rprc-divider" />

                <ul className="space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="rprc-feature">
                      <div className="rprc-check">
                        <Check style={{ width: 11, height: 11, color: "#e8192c" }} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={tier.href} className={tier.highlight ? "rprc-btn-red" : "rprc-btn-ghost"}>
                  {tier.cta} <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="rprc-body text-center mt-8 text-sm" style={{ color: "rgba(255,255,255,.25)" }}>
          All prices are starting points. Final quotes are scoped after a discovery call. We don't take a cut of registrations — ever.
        </p>
      </div>
    </section>
  );
}