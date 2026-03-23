"use client";

import { CreditCard, FileSliders, CalendarRange, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: CreditCard,
    title: "Stripe Payments",
    tag: "Payment Processor",
    body: "We integrate Stripe — the world's leading payment processor — into every registration system we build. Accept credit cards, debit cards, and digital wallets. Funds go directly to your Stripe account. No middleman, no holding periods.",
    points: [
      "Credit & debit card processing",
      "Apple Pay & Google Pay support",
      "Automatic receipts & refund handling",
      "PCI-compliant & bank-level security",
      "Direct deposits to your account",
    ],
    color: "#635bff",
    initial: "S",
  },
  {
    icon: FileSliders,
    title: "Custom Registration Forms",
    tag: "Form Builder",
    body: "Every event is different — so every form should be too. We build custom registration forms that collect exactly the data your event requires, in the order that makes sense for your participants.",
    points: [
      "Unlimited custom fields",
      "Conditional logic & branching",
      "File uploads (photos, documents)",
      "Team & group registration",
      "Multi-step form flows",
    ],
    color: "#e8192c",
    initial: "F",
  },
  {
    icon: CalendarRange,
    title: "Multi-Event Support",
    tag: "Event Management",
    body: "Run your full season from a single dashboard. Create separate registration flows for each event, with individual reporting, capacity controls, and branding — all managed in one place.",
    points: [
      "Unlimited events per account",
      "Individual event dashboards",
      "Shared participant database",
      "Cross-event reporting",
      "Season pass & bundle options",
    ],
    color: "#0f1623",
    initial: "M",
  },
];

export default function Payments() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .rp-display { font-family:'Barlow Condensed',sans-serif; }
        .rp-body    { font-family:'Barlow',sans-serif; }
        .rp-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }
        .rp-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .rp-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }
        .rp-card {
          background:#fff; border:1.5px solid #e2e8f0;
          clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
          overflow:hidden; position:relative;
          transition:transform .25s ease, box-shadow .25s ease;
          display:flex; flex-direction:column;
        }
        .rp-card:hover { transform:translateY(-6px); box-shadow:0 28px 64px rgba(0,0,0,.1); }
        .rp-card-bar {
          height:4px; transform-origin:left; transform:scaleX(0);
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .rp-card:hover .rp-card-bar { transform:scaleX(1); }
        .rp-logo {
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          width:52px; height:52px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
        }
        .rp-logo-initial {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          font-size:1.8rem; color:#fff; line-height:1;
        }
        .rp-point {
          font-family:'Barlow',sans-serif; font-size:.85rem;
          display:flex; align-items:center; gap:.6rem; color:#475569;
        }
        .rp-point-dot {
          width:5px; height:5px; border-radius:50%;
          background:rgba(232,25,44,.4); flex-shrink:0;
        }
        .rp-security {
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          background:rgba(232,25,44,.06); border:1px solid rgba(232,25,44,.15);
          padding:.6rem 1rem;
          display:flex; align-items:center; gap:.6rem;
        }
        .rp-rule { height:1px; background:linear-gradient(to right,#e8192c,rgba(232,25,44,.15),transparent); }
      `}</style>

      <div className="rp-halftone absolute inset-0 z-0" />
      <div className="rp-jersey  absolute inset-0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="rp-tag" style={{ color: "#e8192c" }}>Platform Features</span>
            </div>
            <h2 className="rp-display font-black uppercase text-[#0f1623] leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}>
              Built for
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Your Event.
              </span>
            </h2>
          </div>
          <p className="rp-body text-slate-500 max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            Stripe payments, custom forms, and multi-event management — the three pillars of every registration system we build.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {highlights.map((h) => (
            <div key={h.title} className="rp-card">
              <div className="rp-card-bar" style={{ background: `linear-gradient(to right,${h.color},rgba(0,0,0,.08))` }} />
              <div className="p-8 flex flex-col gap-5 flex-1">
                <div className="flex items-center gap-4">
                  <div className="rp-logo" style={{ background: h.color }}>
                    <span className="rp-logo-initial">{h.initial}</span>
                  </div>
                  <div>
                    <div className="rp-tag mb-0.5" style={{ color: "#94a3b8", fontSize: ".58rem" }}>{h.tag}</div>
                    <div className="rp-display font-black uppercase text-[#0f1623]"
                      style={{ fontSize: "1.35rem", letterSpacing: ".03em", lineHeight: 1 }}>
                      {h.title}
                    </div>
                  </div>
                </div>

                <p className="rp-body text-slate-500 text-sm leading-relaxed">{h.body}</p>

                <div className="rp-rule" />

                <ul className="space-y-2.5 flex-1">
                  {h.points.map((p) => (
                    <li key={p} className="rp-point">
                      <span className="rp-point-dot" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Security note */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="rp-security">
            <ShieldCheck style={{ width: 16, height: 16, color: "#e8192c", flexShrink: 0 }} />
            <span className="rp-body text-slate-500 text-xs leading-relaxed">
              All payment data is handled by Stripe — PCI-DSS Level 1 compliant. We never store or touch your participants' card information.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}