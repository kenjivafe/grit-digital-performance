import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Website Development", href: "/services/web-development" },
      { name: "Event Registration", href: "/services/event-registration" },
      { name: "Sports Consulting", href: "/services/consulting" },
      { name: "Digital Marketing", href: "/services/marketing" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Events", href: "/events" },
      { name: "Blog", href: "/blog" },
    ],
    support: [
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "FAQ", href: "/faq" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const contactItems = [
    { icon: Mail, text: "info@gritdigitalperformance.com" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: MapPin, text: "Denver, CO" },
  ];

  return (
    <footer style={{ background: "#080d14", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .ft-display { font-family:'Barlow Condensed',sans-serif; }
        .ft-body    { font-family:'Barlow',sans-serif; }

        /* Texture — same as hero */
        .ft-halftone {
          background-image: radial-gradient(circle, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events:none;
        }
        .ft-jersey {
          background-image: repeating-linear-gradient(
            -55deg, transparent, transparent 18px,
            rgba(255,255,255,.014) 18px, rgba(255,255,255,.014) 36px
          );
          pointer-events:none;
        }
        .ft-grain {
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.04; mix-blend-mode:overlay; pointer-events:none;
        }

        /* Tag */
        .ft-tag {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:700; text-transform:uppercase;
          font-size:.65rem; letter-spacing:.18em;
        }

        /* Nav heading */
        .ft-heading {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:800; text-transform:uppercase;
          font-size:.95rem; letter-spacing:.1em;
          color:#fff;
        }

        /* Nav link */
        .ft-link {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:600; text-transform:uppercase;
          font-size:.85rem; letter-spacing:.07em;
          color:rgba(255,255,255,.38);
          transition: color .18s, padding-left .18s;
          display:flex; align-items:center; gap:5px;
        }
        .ft-link:hover { color:#e8192c; padding-left:4px; }
        .ft-link:hover .ft-link-dot { background:#e8192c; }

        .ft-link-dot {
          width:4px; height:4px; border-radius:50%;
          background:rgba(255,255,255,.2);
          flex-shrink:0;
          transition:background .18s;
        }

        /* Contact row */
        .ft-contact-row {
          display:flex; align-items:center; gap:10px;
          transition:color .18s;
        }
        .ft-contact-row:hover { color:#fff !important; }
        .ft-contact-icon {
          clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px));
          width:30px; height:30px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.12); color:#e8192c;
          transition:background .18s, color .18s;
        }
        .ft-contact-row:hover .ft-contact-icon {
          background:#e8192c; color:#fff;
        }

        /* Social icon */
        .ft-social {
          width:38px; height:38px;
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,.05);
          color:rgba(255,255,255,.4);
          transition:background .18s, color .18s, transform .18s;
        }
        .ft-social:hover {
          background:#e8192c; color:#fff;
          transform:translateY(-3px);
        }

        /* CTA band */
        .ft-cta {
          clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
        }
        .ft-cta-btn {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          background:#e8192c; color:#fff;
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          transition:background .18s, transform .18s;
          display:inline-flex; align-items:center; gap:8px;
          padding:12px 24px; white-space:nowrap;
        }
        .ft-cta-btn:hover { background:#b91220; transform:translateX(3px); }

        /* Divider */
        .ft-divider {
          height:1px;
          background:linear-gradient(to right,rgba(232,25,44,.4),rgba(255,255,255,.06),transparent);
        }

        /* Bottom bar */
        .ft-bottom {
          border-top:1px solid rgba(255,255,255,.06);
        }

        /* Ghost brand name */
        .ft-ghost {
          font-family:'Barlow Condensed',sans-serif;
          font-weight:900; font-style:italic; text-transform:uppercase;
          color:transparent;
          -webkit-text-stroke:1px rgba(255,255,255,.04);
          user-select:none; pointer-events:none;
          line-height:1; white-space:nowrap;
          position:absolute; bottom:-12px; right:-8px;
          font-size:clamp(4rem,8vw,8rem);
        }

        /* Live pulse */
        @keyframes ft-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.7); }
        }
        .ft-pulse {
          width:7px; height:7px; border-radius:50%; background:#e8192c;
          animation:ft-pulse 1.6s ease-in-out infinite;
          flex-shrink:0;
        }
      `}</style>

      {/* Texture stack */}
      <div className="ft-halftone absolute inset-0 z-0" />
      <div className="ft-jersey  absolute inset-0 z-0" />
      <div className="ft-grain   absolute inset-0 z-0" />

      {/* Red bloom top-left */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          top: "-15%", left: "-8%",
          width: "45vw", height: "45vw", borderRadius: "50%",
          background: "radial-gradient(circle,rgba(232,25,44,.07) 0%,transparent 65%)",
        }}
      />

      {/* Top red bar */}
      <div className="absolute top-0 left-0 right-0 h-0.75 z-10" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── PRE-FOOTER CTA BAND ── */}
        <div
          className="ft-cta relative overflow-hidden mb-14 mt-14 p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ background: "rgba(232,25,44,.1)", border: "1px solid rgba(232,25,44,.2)" }}
        >
          {/* Jersey stripe on band */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(255,255,255,.012) 18px,rgba(255,255,255,.012) 36px)",
            }}
          />
          <div className="relative z-10">
            <div
              className="ft-display font-black italic uppercase text-white mb-1"
              style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)", letterSpacing: ".02em", lineHeight: 1 }}
            >
              Ready to Perform?
            </div>
            <p className="ft-body text-sm" style={{ color: "rgba(255,255,255,.45)" }}>
              Let's build something your organization can be proud of.
            </p>
          </div>
          <Link href="/contact" className="ft-cta-btn relative z-10 shrink-0">
            Start a Project <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

        {/* ── MAIN FOOTER GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-12">

          {/* ── Brand column ── */}
          <div className="relative">
            {/* Ghost brand name */}
            <div className="ft-ghost" aria-hidden="true">GRIT</div>

            <div className="relative z-10">
              {/* Logo */}
              <div className="mb-5">
                <img
                  src="/logo/gritLogo2.webp"
                  alt="Grit Digital Performance"
                  className="h-12 w-auto"
                />
              </div>

              {/* Tag */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
                <span className="ft-tag" style={{ color: "#e8192c" }}>Digital Performance Agency</span>
              </div>

              {/* Body */}
              <p
                className="ft-body text-sm leading-relaxed mb-6"
                style={{ color: "rgba(255,255,255,.38)", maxWidth: "300px" }}
              >
                We build marketing websites and event registration systems for sports organizations, schools, and camps — engineered to perform.
              </p>

              {/* Contact */}
              <div className="space-y-3 mb-6">
                {contactItems.map(({ icon: Icon, text }) => (
                  <div key={text} className="ft-contact-row" style={{ color: "rgba(255,255,255,.38)" }}>
                    <div className="ft-contact-icon">
                      <Icon style={{ width: 13, height: 13 }} />
                    </div>
                    <span
                      className="ft-display font-semibold uppercase"
                      style={{ fontSize: ".8rem", letterSpacing: ".05em" }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="ft-social">
                    <Icon style={{ width: 16, height: 16 }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Nav columns ── */}
          {[
            { heading: "Services", links: footerLinks.services },
            { heading: "Company", links: footerLinks.company },
            { heading: "Support", links: footerLinks.support },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <div className="ft-divider mb-5" />
              <h3 className="ft-heading mb-5">{heading}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="ft-link">
                      <span className="ft-link-dot" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ft-bottom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="ft-display font-bold uppercase text-center md:text-left"
            style={{ fontSize: ".78rem", letterSpacing: ".08em", color: "rgba(255,255,255,.25)" }}
          >
            © {currentYear} Grit Digital Performance. All rights reserved.
          </p>

          <div className="flex items-center gap-5 flex-wrap justify-center">
            <span
              className="ft-display font-bold uppercase"
              style={{ fontSize: ".72rem", letterSpacing: ".08em", color: "rgba(255,255,255,.2)" }}
            >
              Specializing in Sports Organization Digital Solutions
            </span>
            <div className="flex items-center gap-2">
              <div className="ft-pulse" />
              <span
                className="ft-display font-bold uppercase"
                style={{ fontSize: ".72rem", letterSpacing: ".1em", color: "#e8192c" }}
              >
                Always On
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;