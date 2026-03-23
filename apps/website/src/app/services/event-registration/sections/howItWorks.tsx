"use client";

import { Fragment } from "react";
import { ArrowRight, Settings, Share2, UserCheck, BarChart3, LifeBuoy } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Settings,
    title: "We Build Your System",
    subtitle: "Configured for your event.",
    body: "We set up your registration system — custom forms, payment processing, waiver collection, and branding — all configured to match your event's specific needs.",
    details: ["Custom form fields", "Branding & styling", "Payment setup via Stripe", "Waiver configuration"],
  },
  {
    number: "02",
    icon: Share2,
    title: "You Share the Link",
    subtitle: "One link, everything handled.",
    body: "Share your registration link anywhere — your website, social media, email. Participants register, pay, and sign waivers in one seamless flow.",
    details: ["Embeddable on your site", "Mobile-optimized flow", "Instant confirmation emails", "Secure payment processing"],
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Check-In on Event Day",
    subtitle: "Fast, paperless, accurate.",
    body: "Use QR code check-in from any mobile device. See who's arrived, who hasn't, and pull up participant details on the spot — no clipboards needed.",
    details: ["QR code scanning", "Real-time attendance view", "Participant detail lookup", "Works on any mobile device"],
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Track Everything Live",
    subtitle: "Full visibility, always.",
    body: "Monitor registrations, revenue, and attendance from your dashboard in real time. Export reports anytime. Know exactly where things stand at every stage.",
    details: ["Live registration dashboard", "Revenue reporting", "Attendance tracking", "CSV export anytime"],
  },
  {
    number: "05",
    icon: LifeBuoy,
    title: "We Support You",
    subtitle: "Before, during, and after.",
    body: "We're available throughout your event season — for setup questions, technical issues, and post-event reporting. You're never on your own.",
    details: ["Pre-event setup support", "Event-day priority support", "Post-event reporting help", "Ongoing system updates"],
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0f1623" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .rh-display { font-family:'Barlow Condensed',sans-serif; }
        .rh-body    { font-family:'Barlow',sans-serif; }
        .rh-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }
        .rh-halftone {
          background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .rh-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.016) 18px,rgba(255,255,255,.016) 36px);
          pointer-events:none;
        }
        .rh-card {
          position:relative; overflow:hidden;
          background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.08);
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
          transition:transform .25s ease, border-color .25s ease, background .25s ease;
        }
        .rh-card:hover {
          transform:translateY(-5px);
          border-color:rgba(232,25,44,.35);
          background:rgba(255,255,255,.055);
        }
        .rh-card::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
          background:#e8192c; transform:scaleX(0); transform-origin:left;
          transition:transform .35s cubic-bezier(.22,1,.36,1);
        }
        .rh-card:hover::after { transform:scaleX(1); }
        .rh-icon {
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          width:44px; height:44px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.12); color:#e8192c;
          transition:background .2s,color .2s;
        }
        .rh-card:hover .rh-icon { background:#e8192c; color:#fff; }
        .rh-num {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          font-size:.72rem; color:rgba(255,255,255,.2); letter-spacing:.06em;
        }
        .rh-ghost {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.04);
          position:absolute; bottom:-12px; right:-6px;
          font-size:6rem; line-height:1;
          user-select:none; pointer-events:none; white-space:nowrap;
        }
        .rh-detail {
          font-family:'Barlow',sans-serif; font-size:.8rem;
          display:flex; align-items:center; gap:.55rem;
          color:rgba(255,255,255,.38);
        }
        .rh-detail-dot {
          width:4px; height:4px; border-radius:50%;
          background:rgba(232,25,44,.5); flex-shrink:0;
          transition:background .2s;
        }
        .rh-card:hover .rh-detail-dot { background:#e8192c; }
        .rh-subtitle {
          font-family:'Barlow Condensed',sans-serif; font-weight:700; font-style:italic;
          text-transform:uppercase; font-size:.9rem; letter-spacing:.05em;
          color:#e8192c; border-left:3px solid #e8192c; padding-left:10px;
        }
      `}</style>

      <div className="rh-halftone absolute inset-0 z-0" />
      <div className="rh-jersey  absolute inset-0 z-0" />
      <div className="absolute z-0 pointer-events-none" style={{
        top: "-10%", left: "-5%", width: "40vw", height: "40vw", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
      }} />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="rh-tag" style={{ color: "#e8192c" }}>How It Works</span>
            </div>
            <h2 className="rh-display font-black uppercase text-white leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}>
              From Setup to
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Showtime.
              </span>
            </h2>
          </div>
          <p className="rh-body text-sm leading-relaxed lg:text-right lg:pb-1 max-w-xs"
            style={{ color: "rgba(255,255,255,.35)" }}>
            A fully managed registration system that handles everything — so you can focus on running your event.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step) => (
            <div key={step.number} className="rh-card">
              <div className="rh-ghost" aria-hidden="true">{step.number}</div>
              <div className="relative z-10 p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="rh-icon"><step.icon className="w-4 h-4" /></div>
                  <span className="rh-num">{step.number}</span>
                </div>
                <h3 className="rh-display font-black uppercase text-white leading-none"
                  style={{ fontSize: "clamp(1.1rem,1.5vw,1.35rem)", letterSpacing: ".03em" }}>
                  {step.title}
                </h3>
                <div className="rh-subtitle">{step.subtitle}</div>
                <p className="rh-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.42)" }}>
                  {step.body}
                </p>
                <ul className="space-y-2 mt-auto">
                  {step.details.map((d) => (
                    <li key={d} className="rh-detail">
                      <span className="rh-detail-dot" />{d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}