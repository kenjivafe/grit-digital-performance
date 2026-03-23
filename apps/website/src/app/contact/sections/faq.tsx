"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How quickly can you start a project?",
    a: "Most projects kick off within one week of the discovery call. Once scope and pricing are agreed, we move fast — you'll see first deliverables within days of starting.",
  },
  {
    q: "What does pricing look like?",
    a: "Website projects start at $2,500 and registration systems from $1,500. Clients who need both often bundle for better value. You'll receive a fixed quote before any work begins — no surprise invoices.",
  },
  {
    q: "Do I need to know exactly what I want before reaching out?",
    a: "Not at all. The discovery call is specifically designed to figure that out together. Many clients come in knowing only that they need 'a better website' or 'a way to handle registrations' — we take it from there.",
  },
  {
    q: "What happens after I submit the form?",
    a: "We'll review your message and reach out within 24 hours to schedule a free 30-minute discovery call. No hard sell — just a conversation to see if we're a good fit.",
  },
  {
    q: "Do you work with organizations outside of sports?",
    a: "Yes. While sports organizations are our primary focus, we also work with schools, community programs, local businesses, and any organization that needs a high-performance website or registration system.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden" style={{ background: "#0f1623" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .cfaq-display { font-family:'Barlow Condensed',sans-serif; }
        .cfaq-body    { font-family:'Barlow',sans-serif; }
        .cfaq-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .cfaq-halftone {
          background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .cfaq-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.016) 18px,rgba(255,255,255,.016) 36px);
          pointer-events:none;
        }

        .cfaq-row { border-bottom:1px solid rgba(255,255,255,.07); transition:background .18s; }
        .cfaq-row:first-child { border-top:1px solid rgba(255,255,255,.07); }
        .cfaq-row:hover { background:rgba(255,255,255,.02); }

        .cfaq-btn {
          width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px;
          padding:20px 0; cursor:pointer; text-align:left; background:transparent; border:none;
        }

        .cfaq-q {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.04em; font-size:1.05rem;
          color:rgba(255,255,255,.7); line-height:1.2; transition:color .18s;
        }
        .cfaq-row:hover .cfaq-q { color:#fff; }

        .cfaq-icon {
          width:28px; height:28px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));
          background:rgba(255,255,255,.07); transition:background .18s,transform .3s;
        }
        .cfaq-icon.open { background:#e8192c; transform:rotate(45deg); }

        @keyframes cfaq-open { from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);} }
        .cfaq-answer { animation:cfaq-open .25s cubic-bezier(.22,1,.36,1) both; padding-bottom:20px; }

        .cfaq-num {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          font-size:.7rem; color:rgba(255,255,255,.18); width:28px; flex-shrink:0; padding-top:2px;
        }
      `}</style>

      <div className="cfaq-halftone absolute inset-0 z-0" />
      <div className="cfaq-jersey  absolute inset-0 z-0" />

      {/* Bloom */}
      <div className="absolute z-0 pointer-events-none" style={{
        bottom: "-10%", right: "-5%", width: "35vw", height: "35vw", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
      }} />

      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-24">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="cfaq-tag" style={{ color: "#e8192c" }}>Before You Reach Out</span>
            </div>
            <h2
              className="cfaq-display font-black uppercase text-white leading-[.9]"
              style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
            >
              Quick
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2px #e8192c", color: "transparent" }}>
                Answers.
              </span>
            </h2>
          </div>
          <p className="cfaq-body text-sm leading-relaxed lg:text-right lg:pb-1 max-w-xs"
            style={{ color: "rgba(255,255,255,.35)" }}>
            Still have questions?{" "}
            <Link href="/faq" className="hover:underline" style={{ color: "#e8192c" }}>
              See the full FAQ
            </Link>
          </p>
        </div>

        {/* FAQ rows */}
        <div className="max-w-3xl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="cfaq-row">
                <button
                  className="cfaq-btn"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="cfaq-num">{String(i + 1).padStart(2, "0")}</span>
                    <div className="cfaq-q">{faq.q}</div>
                  </div>
                  <div className={`cfaq-icon ${isOpen ? "open" : ""}`}>
                    <Plus className="w-3.5 h-3.5" style={{ color: isOpen ? "#fff" : "rgba(255,255,255,.4)" }} />
                  </div>
                </button>
                {isOpen && (
                  <div className="cfaq-answer pl-11 pr-10">
                    <p className="cfaq-body leading-relaxed" style={{ color: "rgba(255,255,255,.45)", fontSize: ".93rem" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}