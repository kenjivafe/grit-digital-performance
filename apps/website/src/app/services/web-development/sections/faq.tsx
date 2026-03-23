"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "Do you build on a specific platform or CMS?",
    a: "We primarily build on Next.js for performance and scalability, and WordPress for clients who want easier self-management. We'll recommend the right fit based on your team's technical comfort level and long-term goals during our discovery call.",
  },
  {
    q: "How long does a website project take?",
    a: "Most websites launch in 4–8 weeks depending on scope and how quickly feedback is provided. Simpler sites (under 5 pages) can go live in as little as 3 weeks. We give you a precise timeline once scope is locked.",
  },
  {
    q: "Will I be able to update the site myself?",
    a: "Yes. Every website we build includes a CMS so your team can update content — schedules, rosters, news, photos — without touching code. We also provide full onboarding and documentation so you're confident from day one.",
  },
  {
    q: "Is SEO included?",
    a: "Yes. Every site includes foundational SEO: semantic HTML structure, meta tags, Open Graph, sitemap, schema markup, and performance optimization. For more advanced SEO strategy and ongoing optimization, ask about our SEO retainer.",
  },
  {
    q: "Do you handle hosting and domain setup?",
    a: "Yes. We set up and configure your hosting on Vercel's global edge network and handle all DNS configuration. You own the domain and the hosting account — we just set it up for you.",
  },
  {
    q: "What happens if I need changes after launch?",
    a: "All projects include a post-launch support window. Beyond that, we offer monthly maintenance and support plans that cover content updates, security patches, performance monitoring, and priority support.",
  },
  {
    q: "Can you redesign an existing website?",
    a: "Absolutely. Redesigns follow the same process as new builds — discovery, design, development, launch. We can also migrate your existing content and preserve your SEO during the transition.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .wfq-display { font-family:'Barlow Condensed',sans-serif; }
        .wfq-body    { font-family:'Barlow',sans-serif; }
        .wfq-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .wfq-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .wfq-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }

        .wfq-row { border-bottom:1px solid #f1f5f9; transition:background .18s; }
        .wfq-row:first-child { border-top:1px solid #f1f5f9; }
        .wfq-row:hover { background:#fafafa; }

        .wfq-btn {
          width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px;
          padding:20px 0; cursor:pointer; text-align:left; background:transparent; border:none;
        }

        .wfq-q {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.04em; font-size:1.05rem;
          color:#0f1623; line-height:1.2; transition:color .18s;
        }
        .wfq-row:hover .wfq-q { color:#e8192c; }

        .wfq-icon {
          width:28px; height:28px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));
          background:#f1f5f9; transition:background .18s,transform .3s;
        }
        .wfq-icon.open { background:#e8192c; transform:rotate(45deg); }

        @keyframes wfq-open { from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);} }
        .wfq-answer { animation:wfq-open .25s cubic-bezier(.22,1,.36,1) both; padding-bottom:20px; }

        .wfq-num {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          font-size:.7rem; color:#cbd5e1; width:28px; flex-shrink:0; padding-top:2px;
        }

        .wfq-cta-btn {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex; align-items:center; gap:8px;
          padding:12px 26px; white-space:nowrap;
        }
        .wfq-cta-btn:hover { background:#b91220; transform:translateX(3px); }
      `}</style>

      <div className="wfq-halftone absolute inset-0 z-0" />
      <div className="wfq-jersey  absolute inset-0 z-0" />
      <div className="absolute left-0 top-0 bottom-0 w-0.75 hidden lg:block"
        style={{ background: "linear-gradient(to bottom,#e8192c,rgba(232,25,44,.1))" }} />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="wfq-tag" style={{ color: "#e8192c" }}>FAQ</span>
            </div>
            <h2
              className="wfq-display font-black uppercase text-[#0f1623] leading-[.92]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Web Dev
              <br />
              <span style={{ WebkitTextStroke: "2.5px #0f1623", color: "transparent" }}>
                Questions.
              </span>
            </h2>
          </div>
          <p className="wfq-body text-slate-500 max-w-xs leading-relaxed text-sm lg:text-right lg:pb-1">
            Still have questions?{" "}
            <Link href="/contact" className="text-[#e8192c] font-semibold hover:underline">
              Reach out directly
            </Link>{" "}
            — we'll get back to you within 24 hours.
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-4xl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="wfq-row">
                <button
                  className="wfq-btn"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="wfq-num pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <div className="wfq-q">{faq.q}</div>
                  </div>
                  <div className={`wfq-icon ${isOpen ? "open" : ""}`}>
                    <Plus className="w-3.5 h-3.5" style={{ color: isOpen ? "#fff" : "#94a3b8" }} />
                  </div>
                </button>
                {isOpen && (
                  <div className="wfq-answer pl-11 pr-10">
                    <p className="wfq-body text-slate-500 leading-relaxed" style={{ fontSize: ".95rem" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-100"
          style={{
            background: "#f8f9fb",
            clipPath: "polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px))",
          }}
        >
          <div>
            <div
              className="wfq-display font-black uppercase text-[#0f1623] mb-1"
              style={{ fontSize: "1.3rem", letterSpacing: ".03em" }}
            >
              Ready to start your project?
            </div>
            <p className="wfq-body text-slate-500 text-sm">
              Book a free discovery call and we'll scope your project together.
            </p>
          </div>
          <Link href="/contact" className="wfq-cta-btn shrink-0">
            Book a Call <Plus className="w-4 h-4 shrink-0 rotate-45" />
          </Link>
        </div>

      </div>
    </section>
  );
}