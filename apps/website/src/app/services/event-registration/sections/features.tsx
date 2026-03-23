"use client";

import {
  ClipboardList, CreditCard, FileText, QrCode,
  BarChart3, Mail, Users, CalendarDays,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Custom Registration Forms",
    body: "Build forms tailored to your event — collect exactly the information you need, from emergency contacts to team assignments and shirt sizes.",
  },
  {
    icon: CreditCard,
    title: "Online Payment Processing",
    body: "Accept credit cards, debit cards, and digital wallets via Stripe. Funds go directly to your account — we never hold your money.",
  },
  {
    icon: FileText,
    title: "Digital Waivers & Consent",
    body: "Collect digital signatures on waivers and consent forms during registration. No paper, no chasing parents — everything stored and accessible.",
  },
  {
    icon: QrCode,
    title: "Check-In System",
    body: "QR code-based check-in on event day. Scan from any mobile device — no special hardware required. See who's arrived in real time.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Reporting",
    body: "Live dashboards showing registrations, revenue, attendance, and more. Export to CSV anytime. Know exactly where things stand at every moment.",
  },
  {
    icon: Mail,
    title: "Automated Confirmations",
    body: "Instant confirmation emails sent to registrants on sign-up. Customizable templates with your branding, event details, and next steps.",
  },
  {
    icon: Users,
    title: "Multi-Event Support",
    body: "Run multiple events under one system. Separate registration flows, separate reporting — managed from a single dashboard.",
  },
  {
    icon: CalendarDays,
    title: "Waitlists & Capacity Control",
    body: "Set participant caps and auto-activate waitlists when spots fill. Registrants are notified automatically when a spot opens up.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .rf-display { font-family:'Barlow Condensed',sans-serif; }
        .rf-body    { font-family:'Barlow',sans-serif; }
        .rf-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }
        .rf-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .rf-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }
        .rf-card {
          background:#fff; border:1.5px solid #e2e8f0;
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
          position:relative; overflow:hidden;
          transition:transform .25s ease, box-shadow .25s ease;
        }
        .rf-card:hover { transform:translateY(-5px); box-shadow:0 24px 56px rgba(0,0,0,.09); }
        .rf-card-bar {
          height:3px;
          background:linear-gradient(to right,#e8192c,rgba(232,25,44,.2));
          transform-origin:left; transform:scaleX(0);
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .rf-card:hover .rf-card-bar { transform:scaleX(1); }
        .rf-icon {
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          width:44px; height:44px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.07); color:#e8192c;
          transition:background .2s,color .2s;
        }
        .rf-card:hover .rf-icon { background:#e8192c; color:#fff; }
        .rf-ghost {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          color:transparent; -webkit-text-stroke:1.5px rgba(232,25,44,.05);
          position:absolute; bottom:-10px; right:-4px;
          font-size:5.5rem; line-height:1;
          user-select:none; pointer-events:none; white-space:nowrap;
        }
      `}</style>

      <div className="rf-halftone absolute inset-0 z-0" />
      <div className="rf-jersey  absolute inset-0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="rf-tag" style={{ color: "#e8192c" }}>What's Included</span>
            </div>
            <h2 className="rf-display font-black uppercase text-[#0f1623] leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}>
              Everything You
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Need.
              </span>
            </h2>
          </div>
          <p className="rf-body text-slate-500 max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            One platform that handles the full registration lifecycle — from sign-up to check-in and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={f.title} className="rf-card">
              <div className="rf-card-bar" />
              <div className="rf-ghost" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
              <div className="relative z-10 p-6">
                <div className="rf-icon mb-4"><f.icon className="w-5 h-5" /></div>
                <h3 className="rf-display font-black uppercase text-[#0f1623] leading-none mb-2"
                  style={{ fontSize: "clamp(1rem,1.6vw,1.2rem)", letterSpacing: ".03em" }}>
                  {f.title}
                </h3>
                <div className="w-6 h-0.5 mb-3" style={{ background: "rgba(232,25,44,.3)" }} />
                <p className="rf-body text-slate-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}