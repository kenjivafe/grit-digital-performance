"use client";

import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "How long does it take to set up a registration system?",
    a: "Most registration systems are live within 2–4 weeks. Simpler single-event setups can go live in under 2 weeks. Timeline depends on the complexity of your forms, payment setup, and how quickly we can complete the discovery and configuration process.",
  },
  {
    q: "What payment processors do you support?",
    a: "We integrate Stripe as our primary payment processor — it supports credit cards, debit cards, Apple Pay, and Google Pay. Funds go directly to your Stripe account. We don't take a percentage of registrations — ever.",
  },
  {
    q: "Can participants register as a team or group?",
    a: "Yes. We support team and group registration flows — one person can register multiple participants in a single transaction. We can also configure team size limits, team naming, and team-based reporting.",
  },
  {
    q: "How do digital waivers work?",
    a: "Participants (or their parents/guardians) sign waivers digitally as part of the registration flow. Signatures are stored securely and accessible from your dashboard. No paper, no chasing signatures on event day.",
  },
  {
    q: "Can I run multiple events from the same system?",
    a: "Yes. Our multi-event support lets you manage your entire season from a single dashboard. Each event has its own registration link, form, capacity settings, and reporting — all connected to one participant database.",
  },
  {
    q: "What happens if an event is cancelled or a participant needs a refund?",
    a: "Stripe handles refunds directly — full or partial refunds can be issued from your Stripe dashboard in minutes. We can also configure automatic refund rules into the registration flow if needed.",
  },
  {
    q: "Do you take a percentage of registrations?",
    a: "No. We charge a flat project fee for building and setting up your system. Stripe charges a standard processing fee (typically 2.9% + $0.30 per transaction), but that goes to Stripe — not us. There are no hidden per-registration cuts.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .rfq-display { font-family:'Barlow Condensed',sans-serif; }
        .rfq-body    { font-family:'Barlow',sans-serif; }
        .rfq-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }
        .rfq-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .rfq-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }
        .rfq-row { border-bottom:1px solid #f1f5f9; transition:background .18s; }
        .rfq-row:first-child { border-top:1px solid #f1f5f9; }
        .rfq-row:hover { background:#fafafa; }
        .rfq-btn {
          width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px;
          padding:20px 0; cursor:pointer; text-align:left; background:transparent; border:none;
        }
        .rfq-q {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.04em; font-size:1.05rem;
          color:#0f1623; line-height:1.2; transition:color .18s;
        }
        .rfq-row:hover .rfq-q { color:#e8192c; }
        .rfq-icon {
          width:28px; height:28px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));
          background:#f1f5f9; transition:background .18s,transform .3s;
        }
        .rfq-icon.open { background:#e8192c; transform:rotate(45deg); }
        @keyframes rfq-open { from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);} }
        .rfq-answer { animation:rfq-open .25s cubic-bezier(.22,1,.36,1) both; padding-bottom:20px; }
        .rfq-num {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          font-size:.7rem; color:#cbd5e1; width:28px; flex-shrink:0; padding-top:2px;
        }
        .rfq-cta-btn {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex; align-items:center; gap:8px;
          padding:12px 26px; white-space:nowrap;
        }
        .rfq-cta-btn:hover { background:#b91220; transform:translateX(3px); }
      `}</style>

      <div className="rfq-halftone absolute inset-0 z-0" />
      <div className="rfq-jersey  absolute inset-0 z-0" />
      <div className="absolute left-0 top-0 bottom-0 w-0.75 hidden lg:block"
        style={{ background: "linear-gradient(to bottom,#e8192c,rgba(232,25,44,.1))" }} />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="rfq-tag" style={{ color: "#e8192c" }}>FAQ</span>
            </div>
            <h2 className="rfq-display font-black uppercase text-[#0f1623] leading-[.92]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}>
              Registration
              <br />
              <span style={{ WebkitTextStroke: "2.5px #0f1623", color: "transparent" }}>
                Questions.
              </span>
            </h2>
          </div>
          <p className="rfq-body text-slate-500 max-w-xs leading-relaxed text-sm lg:text-right lg:pb-1">
            Still have questions?{" "}
            <Link href="/contact" className="text-[#e8192c] font-semibold hover:underline">
              Reach out directly
            </Link>{" "}
            — we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="max-w-4xl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="rfq-row">
                <button className="rfq-btn"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}>
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="rfq-num pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <div className="rfq-q">{faq.q}</div>
                  </div>
                  <div className={`rfq-icon ${isOpen ? "open" : ""}`}>
                    <Plus className="w-3.5 h-3.5" style={{ color: isOpen ? "#fff" : "#94a3b8" }} />
                  </div>
                </button>
                {isOpen && (
                  <div className="rfq-answer pl-11 pr-10">
                    <p className="rfq-body text-slate-500 leading-relaxed" style={{ fontSize: ".95rem" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-100"
          style={{
            background: "#f8f9fb",
            clipPath: "polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px))",
          }}>
          <div>
            <div className="rfq-display font-black uppercase text-[#0f1623] mb-1"
              style={{ fontSize: "1.3rem", letterSpacing: ".03em" }}>
              Ready to streamline your events?
            </div>
            <p className="rfq-body text-slate-500 text-sm">
              Book a free call and we'll scope your registration system together.
            </p>
          </div>
          <Link href="/contact" className="rfq-cta-btn shrink-0">
            Book a Call <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}