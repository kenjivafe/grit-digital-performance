import { ArrowRight, Phone } from "lucide-react";
import { Label } from "@/components/ui/label"

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0f1623" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .cta-display { font-family:'Barlow Condensed',sans-serif; }
        .cta-body    { font-family:'Barlow',sans-serif; }

        .cta-noise{
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.03;mix-blend-mode:overlay;pointer-events:none;
        }

        .cta-slab{
          position:absolute;top:0;left:0;width:46%;height:100%;
          background:#e8192c;
          clip-path:polygon(0 0,100% 0,86% 100%,0 100%);
        }

        @keyframes cta-left  { from{opacity:0;transform:translateX(-28px);}to{opacity:1;transform:translateX(0);} }
        @keyframes cta-right { from{opacity:0;transform:translateX(28px);}to{opacity:1;transform:translateX(0);} }

        .cta-al{animation:cta-left  .65s cubic-bezier(.22,1,.36,1) both;}
        .cta-ar{animation:cta-right .65s cubic-bezier(.22,1,.36,1) both;}
        .cta-d1{animation-delay:.05s;}
        .cta-d3{animation-delay:.28s;}

        .cta-btn-white{
          font-family:'Barlow Condensed',sans-serif;font-weight:700;
          text-transform:uppercase;letter-spacing:.09em;
          background:#fff;color:#e8192c;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s;
          display:inline-flex;align-items:center;justify-content:center;gap:8px;
          padding:13px 28px;font-size:1rem;white-space:nowrap;
        }
        .cta-btn-white:hover{ background:#f0f0f0; transform:translateX(3px); }

        .cta-btn-outline{
          font-family:'Barlow Condensed',sans-serif;font-weight:700;
          text-transform:uppercase;letter-spacing:.09em;color:#fff;
          border:1.5px solid rgba(255,255,255,.35);
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:border-color .18s,background .18s;
          display:inline-flex;align-items:center;justify-content:center;gap:8px;
          padding:13px 28px;font-size:1rem;white-space:nowrap;
        }
        .cta-btn-outline:hover{ border-color:rgba(255,255,255,.7); background:rgba(255,255,255,.08); }

        .cta-tag{
          font-family:'Barlow Condensed',sans-serif;font-weight:700;
          text-transform:uppercase;font-size:.68rem;letter-spacing:.16em;
        }

        .cta-stat-item{
          border-top:2px solid rgba(255,255,255,.12);
          padding-top:.9rem;
        }
      `}</style>

      <div className="cta-noise absolute inset-0 z-0" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Diagonal red slab */}
      <div className="cta-slab z-0 hidden lg:block" />

      {/* Red glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle,rgba(232,25,44,.12) 0%,transparent 65%)",
        }}
      />

      {/* Top + bottom bars */}
      <div
        className="absolute top-0 left-0 right-0 h-0.75 z-10"
        style={{ background: "#e8192c" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-0.75 z-10"
        style={{ background: "#e8192c" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — clipped so headline never bleeds into right column */}
          <div className="cta-al cta-d1 space-y-6 overflow-hidden lg:pr-8">
            {/* Tag */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-white shrink-0" />
              <span className="cta-tag text-white/70">
                Ready to compete online?
              </span>
            </div>

            {/* Headline — aggressive clamp so it stays in its lane */}
            <h2
              className="cta-display font-black italic uppercase text-white leading-[.9]"
              style={{ fontSize: "clamp(2rem,3.2vw,3.8rem)" }}
            >
              <span className="block">Champion</span>
              <span className="block">Your Digital</span>
              <span
                className="block"
                style={{ WebkitTextStroke: "2px white", color: "transparent" }}
              >
                Presence.
              </span>
            </h2>

            {/* Body */}
            <p
              className="cta-body text-white/70 leading-relaxed max-w-xs"
              style={{ fontSize: "clamp(.88rem,1.2vw,.98rem)" }}
            >
              Join{" "}
              <span className="text-white font-semibold">
                50+ sports organizations
              </span>{" "}
              that trust Grit Digital Performance to deliver results.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="cta-btn-white">
                Start Your Project <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <button className="cta-btn-outline">
                <Phone className="w-4 h-4 shrink-0" /> Schedule a Call
              </button>
            </div>
          </div>

          {/* RIGHT — self-center keeps stats away from headline level */}
          <div className="cta-ar cta-d3 flex flex-col gap-8 self-center">
            {/* Label */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-0.5 shrink-0"
                style={{ background: "#e8192c" }}
              />
              <span className="cta-tag" style={{ color: "#e8192c" }}>
                Our track record
              </span>
            </div>

            {/* 2x2 stat grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                { value: "50+", label: "Sports Organizations" },
                { value: "100K+", label: "Registrations Processed" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "$2M+", label: "Revenue Generated" },
              ].map(({ value, label }, i) => (
                <div key={i} className="cta-stat-item">
                  <div
                    className="cta-display font-black text-white"
                    style={{
                      fontSize: "clamp(1.8rem,3vw,2.6rem)",
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    className="cta-tag mt-1.5"
                    style={{ color: "rgba(255,255,255,.4)", fontSize: ".6rem" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              className="h-px"
              style={{ background: "rgba(255,255,255,.08)" }}
            />

            {/* Trust row */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex -space-x-2 shrink-0">
                {["#e8192c", "#1c2638", "#b91220", "#243044"].map((bg, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: bg, borderColor: "#0f1623" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="cta-body text-slate-500 text-sm">
                Trusted by coaches, ADs, and school admins{" "}
                <span className="text-white font-semibold">nationwide</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


