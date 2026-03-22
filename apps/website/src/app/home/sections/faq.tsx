"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "General",
    question: "What does GRIT Digital Performance actually do?",
    answer:
      "We're a digital performance agency specializing in two core services: building high-impact marketing websites and developing event registration systems for sports organizations, schools, and camps. Whether you need a new online presence or a seamless way to manage registrations and payments, we build the digital infrastructure that lets your organization perform at its best.",
  },
  {
    category: "General",
    question: "What types of organizations do you work with?",
    answer:
      "We work with a wide range of clients — youth travel teams, school athletic programs, summer sports camps, amateur leagues, and local businesses looking to grow online. If you need a marketing website that converts visitors or a registration system that handles sign-ups at scale, we're built for you.",
  },
  {
    category: "General",
    question: "How long does a typical project take?",
    answer:
      "Website projects are typically completed in 4–8 weeks depending on scope. Registration systems take 2–4 weeks. If you need both, we can run them in parallel. We'll give you a precise timeline during our discovery call once we understand your goals.",
  },
  {
    category: "Website Development",
    question: "Do you build on a specific platform or CMS?",
    answer:
      "We build primarily on Next.js for performance and scalability, and WordPress for clients who want easy self-management. Every site is mobile-first, fast-loading, and optimized for search engines out of the box. We recommend the right platform based on your team's technical comfort and long-term goals.",
  },
  {
    category: "Website Development",
    question: "Will I be able to update my website content myself?",
    answer:
      "Yes — every website we build includes a content management system so your team can update schedules, news, staff pages, and more without touching any code. We also provide onboarding and documentation so your team is confident from day one.",
  },
  {
    category: "Event Registration",
    question: "What payment processors do you support?",
    answer:
      "We integrate with Stripe and PayPal out of the box, supporting credit cards, debit cards, and digital wallets. We can also accommodate custom payment setups depending on your organization's structure or existing accounts.",
  },
  {
    category: "Event Registration",
    question: "Can your registration system handle large events?",
    answer:
      "Absolutely. Our platform has processed over 100,000 registrations and is built to scale. Whether you're running a 50-person camp or a 5,000-person tournament, the system handles sign-ups, waivers, payments, check-ins, and confirmations without breaking a sweat.",
  },
  {
    category: "Pricing",
    question: "How does pricing work?",
    answer:
      "We offer clear, project-based pricing with no surprise invoices. Website projects typically start at $2,500 and registration systems from $1,500. Clients who need both often bundle for better value. You'll receive a fixed quote before any work begins.",
  },
  {
    category: "Pricing",
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We offer monthly maintenance and support plans covering updates, security patches, performance monitoring, and priority support — for both websites and registration systems. We're not a build-and-disappear agency; we're your long-term digital partner.",
  },
];

const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = faqs.filter(
    (f) => activeCategory === "All" || f.category === activeCategory,
  );

  return (
    <section className="relative overflow-hidden" style={{ background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900&family=Barlow:wght@400;500;600&display=swap');

        .faq-display { font-family:'Barlow Condensed',sans-serif; }
        .faq-body    { font-family:'Barlow',sans-serif; }

        .faq-tag {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700;text-transform:uppercase;
          font-size:.68rem;letter-spacing:.16em;
        }

        .faq-pill {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700;text-transform:uppercase;
          letter-spacing:.08em;font-size:.75rem;
          padding:7px 16px;
          border:1.5px solid #e2e8f0;
          color:#94a3b8;
          background:#fff;
          clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px));
          transition:all .18s;
          cursor:pointer;
          white-space:nowrap;
        }
        .faq-pill:hover {
          border-color:rgba(232,25,44,.3);
          color:#0f1623;
        }
        .faq-pill.active {
          background:#e8192c;
          border-color:#e8192c;
          color:#fff;
        }

        .faq-row {
          border-bottom:1px solid #f1f5f9;
          transition:background .18s;
        }
        .faq-row:first-child { border-top:1px solid #f1f5f9; }
        .faq-row:hover { background:#fafafa; }

        .faq-question-btn {
          width:100%;display:flex;align-items:center;
          justify-content:space-between;gap:16px;
          padding:20px 0;cursor:pointer;text-align:left;
          background:transparent;border:none;
        }

        .faq-question {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700;text-transform:uppercase;
          letter-spacing:.04em;font-size:1.05rem;
          color:#0f1623;line-height:1.2;
          transition:color .18s;
        }
        .faq-row:hover .faq-question { color:#e8192c; }

        .faq-icon-wrap {
          width:28px;height:28px;flex-shrink:0;
          display:flex;align-items:center;justify-content:center;
          clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));
          background:#f1f5f9;
          transition:background .18s,transform .3s;
        }
        .faq-icon-wrap.open {
          background:#e8192c;
          transform:rotate(45deg);
        }

        @keyframes faq-open {
          from{opacity:0;transform:translateY(-6px);}
          to{opacity:1;transform:translateY(0);}
        }
        .faq-answer {
          animation:faq-open .25s cubic-bezier(.22,1,.36,1) both;
          padding-bottom:20px;
        }

        .faq-cat-badge {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700;text-transform:uppercase;
          font-size:.58rem;letter-spacing:.14em;
          color:#e8192c;opacity:.7;
          white-space:nowrap;
        }

        .faq-cta-btn {
          font-family:'Barlow Condensed',sans-serif;font-weight:700;
          text-transform:uppercase;letter-spacing:.09em;font-size:1rem;
          background:#e8192c;color:#fff;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex;align-items:center;gap:8px;
          padding:12px 26px;white-space:nowrap;
        }
        .faq-cta-btn:hover { background:#b91220; transform:translateX(3px); }

        .faq-num {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900;font-style:italic;
          font-size:.7rem;color:#cbd5e1;
          width:28px;flex-shrink:0;padding-top:2px;
        }
      `}</style>

      {/* Left red accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.75 hidden lg:block"
        style={{ background: "linear-gradient(to bottom, #e8192c, rgba(232,25,44,.1))" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="faq-tag" style={{ color: "#e8192c" }}>Got Questions</span>
            </div>
            <h2
              className="faq-display font-black uppercase text-[#0f1623] leading-[.92]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Frequently
              <br />
              <span style={{ WebkitTextStroke: "2.5px #0f1623", color: "transparent" }}>
                Asked.
              </span>
            </h2>
          </div>
          <p className="faq-body text-slate-500 max-w-xs leading-relaxed text-sm lg:text-right lg:pb-1">
            Can't find what you're looking for?{" "}
            <Link href="/contact" className="text-[#e8192c] font-semibold hover:underline">
              Reach out directly
            </Link>{" "}
            and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`faq-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="max-w-4xl">
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={`${activeCategory}-${i}`} className="faq-row">
                <button
                  className="faq-question-btn"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="faq-num pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1 min-w-0">
                      {activeCategory === "All" && (
                        <div className="faq-cat-badge mb-1">{faq.category}</div>
                      )}
                      <div className="faq-question">{faq.question}</div>
                    </div>
                  </div>
                  <div className={`faq-icon-wrap ${isOpen ? "open" : ""}`}>
                    <Plus className="w-3.5 h-3.5" style={{ color: isOpen ? "#fff" : "#94a3b8" }} />
                  </div>
                </button>
                {isOpen && (
                  <div className="faq-answer pl-11 pr-10">
                    <p className="faq-body text-slate-500 leading-relaxed" style={{ fontSize: ".95rem" }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-16 p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-100"
          style={{
            background: "#f8f9fb",
            clipPath: "polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px))",
          }}
        >
          <div>
            <div
              className="faq-display font-black uppercase text-[#0f1623] mb-1"
              style={{ fontSize: "1.3rem", letterSpacing: ".03em" }}
            >
              Still have questions?
            </div>
            <p className="faq-body text-slate-500 text-sm">
              Our team is ready to walk you through everything — websites, registrations, or both.
            </p>
          </div>
          <Link href="/contact" className="faq-cta-btn shrink-0">
            Talk to Us <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}