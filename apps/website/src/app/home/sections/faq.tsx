"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

// Only what Tailwind cannot express: @keyframes, parent-context hover selectors,
// clip-path, clamp() font sizes, @import.
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900&family=Barlow:wght@400;500;600&display=swap');

  .font-barlow           { font-family: 'Barlow', sans-serif; }
  .font-barlow-condensed { font-family: 'Barlow Condensed', sans-serif; }

  /* Fluid font sizes */
  .text-section-heading { font-size: clamp(2.4rem, 5vw, 5rem); }

  /* Clip-path shapes */
  .clip-pill    { clip-path: polygon(0 0,calc(100% - 7px)  0,100% 7px, 100% 100%,7px  100%,0 calc(100% - 7px)); }
  .clip-icon    { clip-path: polygon(0 0,calc(100% - 6px)  0,100% 6px, 100% 100%,6px  100%,0 calc(100% - 6px)); }
  .clip-btn     { clip-path: polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px)); }
  .clip-cta-box { clip-path: polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px)); }

  /* Answer open animation */
  @keyframes faq-open {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .faq-answer { animation: faq-open .25s cubic-bezier(.22,1,.36,1) both; }

  /* Question color swap on row hover (parent-context selector) */
  .faq-row:hover .faq-question { color: #e8192c; }
`;

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
    <section className="font-barlow relative overflow-hidden bg-white">
      <style>{GLOBAL_CSS}</style>

      {/* Left red accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
        style={{ background: "linear-gradient(to bottom, #e8192c, rgba(232,25,44,.1))" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0 bg-[#e8192c]" />
              <span className="font-barlow-condensed font-bold uppercase text-[.68rem] tracking-[.16em] text-[#e8192c]">
                Got Questions
              </span>
            </div>
            <h2 className="font-barlow-condensed font-black uppercase text-[#0f1623] leading-[.92] tracking-[.01em] text-section-heading">
              Frequently
              <br />
              <span className="text-stroke-black">
                Asked.
              </span>
            </h2>
          </div>
          <p className="font-barlow text-slate-500 max-w-xs leading-relaxed text-sm lg:text-right lg:pb-1">
            Can't find what you're looking for?{" "}
            <Link href="/contact" className="text-[#e8192c] font-semibold hover:underline">
              Reach out directly
            </Link>{" "}
            and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* ── Category filter pills ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`clip-pill font-barlow-condensed font-bold uppercase tracking-[.08em] text-[.75rem] px-4 py-[7px] border-[1.5px] whitespace-nowrap transition-all duration-180 cursor-pointer ${activeCategory === cat
                ? "bg-[#e8192c] border-[#e8192c] text-white"
                : "bg-white border-slate-200 text-slate-400 hover:border-[rgba(232,25,44,.3)] hover:text-[#0f1623]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── FAQ list ── */}
        <div className="max-w-4xl">
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={`${activeCategory}-${i}`}
                className="faq-row border-b border-slate-100 first:border-t first:border-slate-100 transition-colors duration-180 hover:bg-[#fafafa]"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 py-5 cursor-pointer text-left bg-transparent border-none"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Row number */}
                    <span className="font-barlow-condensed font-black italic text-[.7rem] text-slate-300 w-7 shrink-0 pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      {activeCategory === "All" && (
                        <div className="font-barlow-condensed font-bold uppercase text-[.58rem] tracking-[.14em] text-[#e8192c] opacity-70 mb-1">
                          {faq.category}
                        </div>
                      )}
                      <div className="faq-question font-barlow-condensed font-bold uppercase tracking-[.04em] text-[1.05rem] text-[#0f1623] leading-[1.2] transition-colors duration-180">
                        {faq.question}
                      </div>
                    </div>
                  </div>

                  {/* Toggle icon */}
                  <div
                    className={`clip-icon w-7 h-7 shrink-0 flex items-center justify-center transition-[background,transform] duration-300 ${isOpen ? "bg-[#e8192c] rotate-45" : "bg-slate-100"
                      }`}
                  >
                    <Plus className={`w-3.5 h-3.5 ${isOpen ? "text-white" : "text-slate-400"}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer pl-11 pr-10 pb-5">
                    <p className="font-barlow text-slate-500 leading-relaxed text-[.95rem]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="clip-cta-box mt-16 p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[#f8f9fb] border border-slate-100">
          <div>
            <div className="font-barlow-condensed font-black uppercase text-[#0f1623] text-[1.3rem] tracking-[.03em] mb-1">
              Still have questions?
            </div>
            <p className="font-barlow text-slate-500 text-sm">
              Our team is ready to walk you through everything — websites, registrations, or both.
            </p>
          </div>
          <Link
            href="/contact"
            className="clip-btn font-barlow-condensed font-bold uppercase tracking-[.09em] text-base bg-[#e8192c] text-white shrink-0 inline-flex items-center gap-2 px-[26px] py-3 whitespace-nowrap transition-[background,transform] duration-180 hover:bg-[#b91220] hover:translate-x-[3px]"
          >
            Talk to Us <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

      </div>
    </section>
  );
}