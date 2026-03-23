"use client";

import { Linkedin, Twitter, Globe } from "lucide-react";

const team = [
  {
    name: "KD",
    fullRole: "Founder & Operations / Business Relations",
    shortRole: "Operations & Business Relations",
    bio: "The engine behind GRIT. KD manages day-to-day operations and builds the client partnerships that keep the agency running at full speed. If something needs to get done, KD makes sure it does.",
    initials: "KD",
    color: "#e8192c",
    socials: { linkedin: "#", twitter: "#", web: "#" },
  },
  {
    name: "Kenji",
    fullRole: "Founder & Backend Architect",
    shortRole: "Backend & Infrastructure",
    bio: "The infrastructure behind everything we ship. Kenji owns backend development, API architecture, and DevOps — making sure every system GRIT builds is fast, secure, and built to scale.",
    initials: "KJ",
    color: "#1c2638",
    socials: { linkedin: "#", twitter: "#", web: "#" },
  },
  {
    name: "Mark",
    fullRole: "Founder & Lead Web Developer",
    shortRole: "Lead Web Developer",
    bio: "GRIT's lead builder. Mark focuses on high-impact, custom client builds — turning project briefs into fast, polished websites that perform. Every pixel and every line of code is intentional.",
    initials: "MK",
    color: "#b91220",
    socials: { linkedin: "#", twitter: "#", web: "#" },
  },
  {
    name: "Arjay",
    fullRole: "Founder & Web Developer / SEO",
    shortRole: "Development & SEO",
    bio: "The force multiplier. Arjay drives development support across the team while owning GRIT's SEO strategy — ensuring every site we launch doesn't just look great but gets found.",
    initials: "AJ",
    color: "#243044",
    socials: { linkedin: "#", twitter: "#", web: "#" },
  },
];

export default function Team() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0f1623" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .at-display { font-family:'Barlow Condensed',sans-serif; }
        .at-body    { font-family:'Barlow',sans-serif; }
        .at-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .at-halftone {
          background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .at-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.016) 18px,rgba(255,255,255,.016) 36px);
          pointer-events:none;
        }

        /* Team card */
        .at-card {
          position:relative; overflow:hidden;
          background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.08);
          clip-path:polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,18px 100%,0 calc(100% - 18px));
          transition:transform .25s ease, border-color .25s ease, background .25s ease;
          display:flex; flex-direction:column;
        }
        .at-card:hover {
          transform:translateY(-6px);
          border-color:rgba(232,25,44,.35);
          background:rgba(255,255,255,.055);
        }
        .at-card::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
          background:#e8192c; transform:scaleX(0); transform-origin:left;
          transition:transform .35s cubic-bezier(.22,1,.36,1);
        }
        .at-card:hover::after { transform:scaleX(1); }

        /* Avatar */
        .at-avatar {
          width:100%; aspect-ratio:1;
          display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden; flex-shrink:0;
        }
        .at-avatar-pattern {
          position:absolute; inset:0;
          background-image:repeating-linear-gradient(
            -45deg,transparent,transparent 5px,
            rgba(255,255,255,.04) 5px,rgba(255,255,255,.04) 10px
          );
        }
        /* Jersey stripe on avatar */
        .at-avatar-stripe {
          position:absolute; inset:0;
          background-image:repeating-linear-gradient(
            -55deg,transparent,transparent 14px,
            rgba(255,255,255,.03) 14px,rgba(255,255,255,.03) 28px
          );
        }
        .at-avatar-initials {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900; font-style:italic; text-transform:uppercase;
          font-size:3.5rem; color:rgba(255,255,255,.55);
          position:relative; z-index:1;
          text-shadow:0 2px 12px rgba(0,0,0,.3);
        }
        .at-photo-label {
          position:absolute; bottom:10px; left:50%; transform:translateX(-50%);
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.52rem; letter-spacing:.14em;
          color:rgba(255,255,255,.22); white-space:nowrap;
          background:rgba(0,0,0,.35); padding:3px 8px;
          clip-path:polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px));
        }

        /* Social links */
        .at-social {
          width:30px; height:30px;
          clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));
          display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,.06); color:rgba(255,255,255,.35);
          transition:background .18s,color .18s,transform .18s;
        }
        .at-social:hover { background:#e8192c; color:#fff; transform:translateY(-2px); }

        /* Ghost initials */
        .at-ghost {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.04);
          position:absolute; bottom:-10px; right:-6px;
          font-size:7rem; line-height:1;
          user-select:none; pointer-events:none; white-space:nowrap;
        }

        /* Role pill */
        .at-role-pill {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.62rem; letter-spacing:.12em;
          color:#e8192c; display:inline-block;
          background:rgba(232,25,44,.1);
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          padding:3px 10px;
        }

        /* Hiring strip */
        .at-hiring {
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
          background:rgba(232,25,44,.08); border:1px solid rgba(232,25,44,.2);
        }
      `}</style>

      <div className="at-halftone absolute inset-0 z-0" />
      <div className="at-jersey  absolute inset-0 z-0" />

      <div className="absolute z-0 pointer-events-none" style={{
        top: "-10%", right: "-5%", width: "35vw", height: "35vw", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
      }} />
      <div className="absolute z-0 pointer-events-none" style={{
        bottom: "-10%", left: "-5%", width: "28vw", height: "28vw", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,25,44,.05) 0%,transparent 65%)",
      }} />

      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="at-tag" style={{ color: "#e8192c" }}>The People</span>
            </div>
            <h2
              className="at-display font-black uppercase text-white leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Meet the
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Founders.
              </span>
            </h2>
          </div>
          <p className="at-body text-sm leading-relaxed lg:text-right lg:pb-1 max-w-xs"
            style={{ color: "rgba(255,255,255,.35)" }}>
            Four founders. Four disciplines. One agency built to perform.
          </p>
        </div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member) => (
            <div key={member.name} className="at-card">
              <div className="at-ghost" aria-hidden="true">{member.initials}</div>

              {/* Avatar */}
              <div className="at-avatar" style={{ background: member.color }}>
                <div className="at-avatar-pattern" />
                <div className="at-avatar-stripe" />
                <span className="at-avatar-initials">{member.initials}</span>
                <div className="at-photo-label">Photo Placeholder</div>
              </div>

              {/* Info */}
              <div className="relative z-10 p-6 flex flex-col flex-1">
                {/* Role pill */}
                <div className="at-role-pill mb-3">{member.shortRole}</div>

                {/* Name */}
                <h3
                  className="at-display font-black uppercase text-white leading-none mb-3"
                  style={{ fontSize: "clamp(1.5rem,2.2vw,1.9rem)", letterSpacing: ".03em" }}
                >
                  {member.name}
                </h3>

                <div className="w-8 h-0.5 mb-3" style={{ background: "rgba(232,25,44,.4)" }} />

                {/* Bio */}
                <p className="at-body text-sm leading-relaxed flex-1 mb-5"
                  style={{ color: "rgba(255,255,255,.4)" }}>
                  {member.bio}
                </p>

                {/* Socials */}
                <div className="flex gap-2">
                  <a href={member.socials.linkedin} aria-label="LinkedIn" className="at-social">
                    <Linkedin style={{ width: 13, height: 13 }} />
                  </a>
                  <a href={member.socials.twitter} aria-label="Twitter" className="at-social">
                    <Twitter style={{ width: 13, height: 13 }} />
                  </a>
                  <a href={member.socials.web} aria-label="Website" className="at-social">
                    <Globe style={{ width: 13, height: 13 }} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hiring strip */}
        <div className="at-hiring mt-10 p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="at-display font-black italic uppercase text-white mb-1"
              style={{ fontSize: "1.1rem", letterSpacing: ".03em" }}>
              Growing the Team
            </div>
            <p className="at-body text-sm" style={{ color: "rgba(255,255,255,.4)" }}>
              We're always looking for talented people who care about sports and digital craft.
            </p>
          </div>
          <a
            href="mailto:info@gritdigitalperformance.com"
            className="at-tag shrink-0"
            style={{ color: "#e8192c", fontSize: ".65rem" }}
          >
            Say Hello →
          </a>
        </div>

      </div>
    </section>
  );
}