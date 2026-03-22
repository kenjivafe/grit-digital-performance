import { cn } from "@repo/utils";
import { Trophy, Users, Target, TrendingUp } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  description?: string;
}

interface SportsStatsProps {
  stats?: StatItem[];
  className?: string;
}

const defaultStats: StatItem[] = [
  {
    icon: <Trophy className="w-6 h-6" />,
    value: "50+",
    label: "Organizations Served",
    description: "From youth sports teams to school athletic programs across the USA",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "100K+",
    label: "Event Registrations",
    description: "Processed seamlessly through our registration platform",
  },
  {
    icon: <Target className="w-6 h-6" />,
    value: "98%",
    label: "Client Satisfaction",
    description: "Across both website projects and registration systems",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: "300%",
    label: "Average Growth",
    description: "Digital growth reported by clients within the first year",
  },
];

/* Alternating card themes — both dark, but different tones */
const cardThemes = [
  {
    /* even — slightly elevated dark */
    bg: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.09)",
    valueColor: "#fff",
    labelColor: "#e8192c",
    descColor: "rgba(255,255,255,.4)",
    iconBg: "rgba(232,25,44,.14)",
    iconColor: "#e8192c",
    ghostStroke: "rgba(255,255,255,.05)",
    dividerBg: "rgba(232,25,44,.3)",
  },
  {
    /* odd — deeper, near-black */
    bg: "rgba(0,0,0,.25)",
    border: "1px solid rgba(255,255,255,.04)",
    valueColor: "#fff",
    labelColor: "#e8192c",
    descColor: "rgba(255,255,255,.32)",
    iconBg: "rgba(232,25,44,.1)",
    iconColor: "#e8192c",
    ghostStroke: "rgba(232,25,44,.08)",
    dividerBg: "rgba(232,25,44,.2)",
  },
];

const Stats = ({ stats = defaultStats, className }: SportsStatsProps) => {
  return (
    <section
      className={cn("relative overflow-hidden", className)}
      style={{ background: "#0f1623" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .ss-display { font-family:'Barlow Condensed',sans-serif; }
        .ss-body    { font-family:'Barlow',sans-serif; }

        /* Halftone — matches hero */
        .ss-halftone {
          background-image: radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events:none;
        }

        /* Jersey stripe — matches hero */
        .ss-jersey {
          background-image: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 18px,
            rgba(255,255,255,.015) 18px,
            rgba(255,255,255,.015) 36px
          );
          pointer-events:none;
        }

        /* Card */
        .ss-card {
          position: relative;
          overflow: hidden;
          transition: transform .22s ease, box-shadow .22s ease;
          cursor: default;
        }
        .ss-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(0,0,0,.45);
          z-index: 2;
        }

        /* Red underline reveal */
        .ss-card::after {
          content:'';
          position:absolute;bottom:0;left:0;right:0;
          height:3px;background:#e8192c;
          transform:scaleX(0);transform-origin:left;
          transition:transform .3s cubic-bezier(.22,1,.36,1);
        }
        .ss-card:hover::after { transform:scaleX(1); }

        /* Icon hover */
        .ss-card:hover .ss-icon-wrap {
          background: #e8192c !important;
          color: #fff !important;
        }
        .ss-icon-wrap { transition: background .22s ease, color .22s ease; }

        /* Ghost */
        .ss-ghost {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900;font-style:italic;
          color:transparent;line-height:1;
          user-select:none;pointer-events:none;
          position:absolute;bottom:-10px;right:-8px;
          font-size:7rem;white-space:nowrap;
        }

        .ss-value {
          font-family:'Barlow Condensed',sans-serif;
          font-style:italic;text-transform:uppercase;
          color:#fff;line-height:1;
        }

        .ss-label {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700;text-transform:uppercase;
          letter-spacing:.08em;font-size:1.4rem;
          color:#e8192c;
        }

        /* Top accent bar */
        .ss-topbar {
          position:absolute;top:0;left:0;right:0;height:4px;
          background:linear-gradient(to right,#e8192c 0%,#e8192c 30%,rgba(232,25,44,.1) 100%);
        }

        /* Red glow bloom */
        .ss-bloom {
          position:absolute;
          border-radius:50%;
          background:radial-gradient(circle,rgba(232,25,44,.09) 0%,transparent 65%);
          pointer-events:none;
        }
      `}</style>

      {/* Texture layers */}
      <div className="ss-halftone absolute inset-0 z-0" />
      <div className="ss-jersey  absolute inset-0 z-0" />

      {/* Red bloom accents */}
      <div className="ss-bloom" style={{ width: "40vw", height: "40vw", top: "-10%", left: "-5%" }} />
      <div className="ss-bloom" style={{ width: "30vw", height: "30vw", bottom: "-10%", right: "5%" }} />

      {/* Top accent bar */}
      <div className="ss-topbar" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20">

        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span
                className="ss-display font-bold uppercase text-xs tracking-[.18em]"
                style={{ color: "#e8192c" }}
              >
                Proven Track Record
              </span>
            </div>
            <h2
              className="ss-display font-black italic uppercase leading-[.9]"
              style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", color: "#fff" }}
            >
              Numbers That
              <br />
              <span
                style={{
                  WebkitTextStroke: "2px #e8192c",
                  color: "transparent",
                }}
              >
                Speak for Themselves
              </span>
            </h2>
          </div>
          <p
            className="ss-body text-sm leading-relaxed lg:text-right lg:pb-1 max-w-xs"
            style={{ color: "rgba(255,255,255,.4)" }}
          >
            Across marketing websites and event registration systems, we deliver
            results that move the needle.
          </p>
        </div>

        {/* Stats grid — alternating tones */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            border: "1px solid rgba(255,255,255,.07)",
            boxShadow: "0 8px 48px rgba(0,0,0,.4)",
          }}
        >
          {defaultStats.map((stat, i) => {
            const t = cardThemes[i % 2];
            return (
              <div
                key={i}
                className="ss-card p-8"
                style={{
                  background: t.bg,
                  border: t.border,
                  borderRight: i === 3 ? "none" : undefined,
                  borderBottom: i >= 2 ? "none" : undefined,
                }}
              >
                <div
                  className="ss-ghost"
                  aria-hidden="true"
                  style={{ WebkitTextStroke: `1px ${t.ghostStroke}` }}
                >
                  {stat.value}
                </div>

                <div
                  className="ss-icon-wrap w-11 h-11 flex items-center justify-center mb-5 shrink-0"
                  style={{
                    background: t.iconBg,
                    color: t.iconColor,
                    clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                  }}
                >
                  {stat.icon}
                </div>

                <div
                  className="ss-value mb-1"
                  style={{ fontSize: "clamp(2.4rem,4vw,3.2rem)", color: t.valueColor }}
                >
                  {stat.value}
                </div>

                <div className="ss-label mb-3" style={{ color: t.labelColor }}>
                  {stat.label}
                </div>

                <div className="w-8 h-0.5 mb-3" style={{ background: t.dividerBg }} />

                {stat.description && (
                  <p className="ss-body text-sm leading-relaxed" style={{ color: t.descColor }}>
                    {stat.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom trust strip */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}
        >
          <p className="ss-body text-sm text-center sm:text-left" style={{ color: "rgba(255,255,255,.35)" }}>
            Trusted by coaches, athletic directors, school admins, and camp organizers{" "}
            <span style={{ color: "rgba(255,255,255,.75)", fontWeight: 600 }}>nationwide</span>
          </p>
          <div className="flex items-center gap-2">
            {["#e8192c", "#1c2638", "#b91220", "#243044", "#0f1623"].map((bg, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                style={{
                  background: bg,
                  borderColor: "#0f1623",
                  boxShadow: "0 0 0 1px rgba(255,255,255,.08)",
                  marginLeft: i > 0 ? -8 : 0,
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            <span
              className="ss-display font-bold uppercase text-xs tracking-wider ml-3"
              style={{ color: "rgba(255,255,255,.3)" }}
            >
              50+ Organizations
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Stats;