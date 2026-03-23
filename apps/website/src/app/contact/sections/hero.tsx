"use client";

import { useEffect, useState } from "react";

interface PageHeroProps {
  breadcrumb: string;
  titleLine1: string;
  titleLine2?: string;
  titleLine2Outline?: boolean;
  descriptor: string;
  accentWord?: string; // optional word to highlight in red
}

export default function Hero({
  breadcrumb,
  titleLine1,
  titleLine2,
  titleLine2Outline = false,
  descriptor,
}: PageHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .ph-display { font-family:'Barlow Condensed',sans-serif; }
        .ph-body    { font-family:'Barlow',sans-serif; }

        /* Same textures as homepage hero */
        .ph-halftone {
          background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .ph-jersey {
          background-image:repeating-linear-gradient(
            -55deg,transparent,transparent 18px,
            rgba(255,255,255,.016) 18px,rgba(255,255,255,.016) 36px
          );
          pointer-events:none;
        }
        .ph-grain {
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.05; mix-blend-mode:overlay; pointer-events:none;
        }
        .ph-vignette {
          background:radial-gradient(ellipse at 30% 50%,transparent 30%,rgba(5,8,14,.55) 100%);
          pointer-events:none;
        }

        /* Animations */
        @keyframes ph-up   { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        @keyframes ph-left { from{opacity:0;transform:translateX(-28px);}to{opacity:1;transform:translateX(0);} }
        @keyframes ph-fade { from{opacity:0;}to{opacity:1;} }
        @keyframes ph-bar  { from{transform:scaleY(0);}to{transform:scaleY(1);} }
        @keyframes slash-draw { from{stroke-dashoffset:2000;}to{stroke-dashoffset:0;} }

        .ph-al { animation:ph-left .65s cubic-bezier(.22,1,.36,1) both; }
        .ph-au { animation:ph-up   .6s  cubic-bezier(.22,1,.36,1) both; }
        .ph-af { animation:ph-fade .55s ease both; }
        .ph-d0{animation-delay:.05s;} .ph-d1{animation-delay:.16s;}
        .ph-d2{animation-delay:.28s;} .ph-d3{animation-delay:.42s;}
        .ph-d4{animation-delay:.56s;}

        .ph-slash {
          stroke-dasharray:2000; stroke-dashoffset:2000;
          animation:slash-draw .8s cubic-bezier(.22,1,.36,1) .1s forwards;
        }

        /* Left chapter bar */
        .ph-bar {
          position:absolute; left:0; top:0; bottom:0; width:4px;
          background:linear-gradient(to bottom,#e8192c,rgba(232,25,44,.2));
          transform-origin:top;
          animation:ph-bar .7s cubic-bezier(.22,1,.36,1) .05s both;
        }

        /* Tag / breadcrumb */
        .ph-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        /* Massive headline — bleeds toward right edge */
        .ph-headline {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900; font-style:italic; text-transform:uppercase;
          color:#fff; line-height:.88; letter-spacing:-.01em;
          font-size:clamp(4rem,10vw,11rem);
        }

        .ph-outline {
          -webkit-text-stroke:3px #e8192c;
          color:transparent;
        }

        /* Descriptor — offset bottom right */
        .ph-descriptor {
          font-family:'Barlow',sans-serif;
          font-size:.88rem; line-height:1.5;
          color:rgba(255,255,255,.4);
          max-width:260px; text-align:right;
        }

        /* Ghost oversized letter — bleeds off right */
        .ph-ghost {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900; font-style:italic; text-transform:uppercase;
          color:transparent;
          -webkit-text-stroke:1px rgba(255,255,255,.03);
          line-height:1; user-select:none; pointer-events:none;
          position:absolute; right:-2vw; bottom:-0.1em;
          font-size:clamp(10rem,22vw,22rem); white-space:nowrap;
          overflow:hidden;
        }

        /* Thin horizontal rule */
        .ph-rule {
          height:1px;
          background:linear-gradient(to right,rgba(232,25,44,.5),rgba(232,25,44,.1),transparent);
        }

        /* Page number stamp */
        .ph-stamp {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900; font-style:italic;
          font-size:.7rem; letter-spacing:.12em;
          color:rgba(255,255,255,.15);
          text-transform:uppercase;
        }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{ background: "#0f1623", minHeight: "42vh", display: "flex", flexDirection: "column" }}
      >
        {/* Texture stack */}
        <div className="ph-halftone absolute inset-0 z-0" />
        <div className="ph-jersey  absolute inset-0 z-0" />
        <div className="ph-grain   absolute inset-0 z-0" />
        <div className="ph-vignette absolute inset-0 z-0" />

        {/* Red bloom — top left */}
        <div className="absolute z-0 pointer-events-none" style={{
          top: "-20%", left: "-5%",
          width: "40vw", height: "40vw", borderRadius: "50%",
          background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
        }} />

        {/* Ghost letter — bleeds off right edge */}
        <div className="ph-ghost" aria-hidden="true">
          {(titleLine2 || titleLine1).charAt(0)}
        </div>

        {/* SVG diagonal slash — thinner, faster than homepage */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          preserveAspectRatio="none" viewBox="0 0 100 100">
          <line className="ph-slash"
            x1="75" y1="-5" x2="60" y2="105"
            stroke="#e8192c" strokeWidth=".25"
            vectorEffect="non-scaling-stroke" />
          <line
            x1="76.5" y1="-5" x2="61.5" y2="105"
            stroke="rgba(232,25,44,.08)" strokeWidth=".6"
            vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Chapter bar */}
        <div className="ph-bar" />

        {/* Top red bar */}
        <div className="absolute top-0 left-0 right-0 h-0.75 z-20" style={{ background: "#e8192c" }} />

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-8 sm:px-12 lg:px-16 py-14 lg:py-20">

          {/* Breadcrumb */}
          <div className={`flex items-center gap-3 mb-6 ${mounted ? "ph-af ph-d0" : "opacity-0"}`}>
            <span className="ph-tag" style={{ color: "rgba(255,255,255,.25)" }}>
              Grit Digital Performance
            </span>
            <span style={{ color: "rgba(232,25,44,.5)", fontSize: ".7rem" }}>/</span>
            <span className="ph-tag" style={{ color: "#e8192c" }}>
              {breadcrumb}
            </span>
          </div>

          {/* Headline + descriptor row */}
          <div className="flex items-end justify-between gap-8 flex-wrap">

            {/* Title */}
            <div className={`${mounted ? "ph-al ph-d1" : "opacity-0"}`}>
              <h1 className="ph-headline">
                <span className="block">{titleLine1}</span>
                {titleLine2 && (
                  <span
                    className={`block ${titleLine2Outline ? "ph-outline" : ""}`}
                    style={!titleLine2Outline ? { color: "#e8192c" } : {}}
                  >
                    {titleLine2}
                  </span>
                )}
              </h1>
            </div>

            {/* Descriptor — bottom right offset */}
            <div className={`${mounted ? "ph-au ph-d3" : "opacity-0"} pb-2 hidden sm:block`}>
              <p className="ph-descriptor">{descriptor}</p>
            </div>

          </div>

          {/* Rule + stamp row */}
          <div className={`flex items-center justify-between gap-4 mt-8 ${mounted ? "ph-af ph-d4" : "opacity-0"}`}>
            <div className="ph-rule flex-1" />
            <span className="ph-stamp">— {breadcrumb}</span>
          </div>

        </div>
      </section>
    </>
  );
}