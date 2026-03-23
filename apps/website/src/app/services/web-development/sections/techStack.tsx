"use client";

const stack = [
  {
    name: "Next.js",
    category: "Framework",
    description: "Our primary framework for production websites. Server-side rendering, static generation, and edge-ready — Next.js gives every site we build a performance edge out of the box.",
    why: "Fast by default, SEO-friendly, scales effortlessly.",
    color: "#0f1623",
    initial: "N",
  },
  {
    name: "React",
    category: "UI Library",
    description: "The foundation of every interactive element we build. React's component model lets us build reusable, maintainable interfaces that are easy to extend as your organization grows.",
    why: "Reusable components, maintainable codebase.",
    color: "#1c2638",
    initial: "R",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    description: "Utility-first CSS that lets us move fast without sacrificing design precision. Every layout is responsive by default, and every style decision is deliberate.",
    why: "Mobile-first, fast iteration, consistent design system.",
    color: "#0e7490",
    initial: "T",
  },
  {
    name: "Vercel",
    category: "Hosting & Deployment",
    description: "We deploy to Vercel's global edge network for lightning-fast load times worldwide. Automatic deployments, preview branches, and zero-downtime updates included.",
    why: "Global CDN, automatic deploys, 99.99% uptime.",
    color: "#e8192c",
    initial: "V",
  },
];

export default function TechStack() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .wt-display { font-family:'Barlow Condensed',sans-serif; }
        .wt-body    { font-family:'Barlow',sans-serif; }
        .wt-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .wt-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .wt-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }

        /* Tech card */
        .wt-card {
          background:#fff; border:1.5px solid #e2e8f0;
          clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
          position:relative; overflow:hidden;
          transition:transform .25s ease, box-shadow .25s ease;
          display:flex; flex-direction:column;
        }
        .wt-card:hover { transform:translateY(-6px); box-shadow:0 28px 64px rgba(0,0,0,.1); }

        .wt-card-bar {
          height:3px; transform-origin:left; transform:scaleX(0);
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .wt-card:hover .wt-card-bar { transform:scaleX(1); }

        /* Tech logo block */
        .wt-logo {
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          width:56px; height:56px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
        }
        .wt-logo-initial {
          font-family:'Barlow Condensed',sans-serif; font-weight:900; font-style:italic;
          font-size:1.8rem; color:#fff; line-height:1;
        }

        /* Why chip */
        .wt-why {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.65rem; letter-spacing:.1em;
          color:#e8192c; background:rgba(232,25,44,.07);
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          padding:3px 10px; display:inline-block;
        }

        .wt-rule { height:1px; background:linear-gradient(to right,#e8192c,rgba(232,25,44,.15),transparent); }
      `}</style>

      <div className="wt-halftone absolute inset-0 z-0" />
      <div className="wt-jersey  absolute inset-0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
              <span className="wt-tag" style={{ color: "#e8192c" }}>Tech Stack</span>
            </div>
            <h2
              className="wt-display font-black uppercase text-[#0f1623] leading-[.9]"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", letterSpacing: ".01em" }}
            >
              Built With the
              <br />
              <span className="italic" style={{ WebkitTextStroke: "2.5px #e8192c", color: "transparent" }}>
                Best.
              </span>
            </h2>
          </div>
          <p className="wt-body text-slate-500 max-w-sm leading-relaxed text-sm lg:text-right lg:pb-1">
            We chose our stack deliberately — every tool earns its place by making your site faster, more reliable, and easier to maintain.
          </p>
        </div>

        {/* Stack grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stack.map((tech) => (
            <div key={tech.name} className="wt-card">
              <div
                className="wt-card-bar"
                style={{ background: `linear-gradient(to right,${tech.color},rgba(0,0,0,.1))` }}
              />
              <div className="p-7 flex flex-col gap-5 flex-1">

                {/* Logo + name */}
                <div className="flex items-center gap-4">
                  <div className="wt-logo" style={{ background: tech.color }}>
                    <span className="wt-logo-initial">{tech.initial}</span>
                  </div>
                  <div>
                    <div className="wt-tag" style={{ color: "#94a3b8", fontSize: ".58rem" }}>{tech.category}</div>
                    <div
                      className="wt-display font-black uppercase text-[#0f1623]"
                      style={{ fontSize: "1.35rem", letterSpacing: ".03em", lineHeight: 1 }}
                    >
                      {tech.name}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="wt-body text-slate-500 text-sm leading-relaxed flex-1">
                  {tech.description}
                </p>

                {/* Why chip */}
                <div>
                  <div className="wt-rule mb-3" />
                  <span className="wt-why">{tech.why}</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}