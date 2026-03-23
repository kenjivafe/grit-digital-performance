"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "Website Development", href: "/services/web-development" },
      { name: "Event Registration", href: "/services/event-registration" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,800;1,900&family=Barlow:wght@400;500;600;700&display=swap');

        .nav-root {
          font-family: 'Barlow', sans-serif;
          transition: box-shadow .3s ease, border-color .3s ease;
        }
        .nav-root.scrolled { box-shadow: 0 2px 28px rgba(0,0,0,.1); }

        .nav-link {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; text-transform: uppercase;
          letter-spacing: .08em; font-size: 1rem;
          color: #1e293b; transition: color .18s;
          position: relative; padding: 4px 0; white-space: nowrap;
        }
        .nav-link::after {
          content: ''; position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: #e8192c; transition: width .22s ease;
        }
        .nav-link:hover { color: #e8192c; }
        .nav-link:hover::after { width: 100%; }

        .nav-cta {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800; text-transform: uppercase;
          letter-spacing: .1em; font-size: .95rem;
          background: #e8192c; color: #fff;
          clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          transition: background .18s, transform .18s;
          display: inline-flex; align-items: center;
          padding: 10px 24px; white-space: nowrap;
        }
        .nav-cta:hover { background: #b91220; transform: translateX(2px); }

        /* ── Dropdown ── */
        .nav-dropdown-wrap {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          padding-top: 14px; /* visible gap — but mouse is still inside this wrapper */
          z-index: 100;
        }

        .nav-dropdown {
          width: 240px;
          background: #fff;
          border: 1px solid rgba(0,0,0,.08);
          border-top: 3px solid #e8192c;
          box-shadow: 0 12px 40px rgba(0,0,0,.12);
          clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          padding: 6px 0;
        }

        .nav-dropdown-link {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; text-transform: uppercase;
          letter-spacing: .07em; font-size: .85rem;
          color: #334155; display: block;
          padding: 10px 18px;
          transition: color .15s, background .15s, padding-left .15s;
          border-left: 2px solid transparent;
        }
        .nav-dropdown-link:hover {
          color: #e8192c;
          background: rgba(232,25,44,.04);
          border-left-color: #e8192c;
          padding-left: 26px;
        }

        .nav-drawer {
          background: #fff;
          border-top: 1px solid rgba(0,0,0,.07);
          box-shadow: 0 12px 32px rgba(0,0,0,.1);
        }
        .nav-mobile-link {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; text-transform: uppercase;
          letter-spacing: .08em; font-size: 1.1rem;
          color: #1e293b; display: flex; align-items: center;
          padding: 13px 20px;
          transition: color .15s, background .15s;
          border-left: 3px solid transparent;
        }
        .nav-mobile-link:hover {
          color: #e8192c;
          background: rgba(232,25,44,.03);
          border-left-color: #e8192c;
        }
        .nav-mobile-sub {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600; text-transform: uppercase;
          letter-spacing: .07em; font-size: .85rem;
          color: #64748b; display: block;
          padding: 9px 20px 9px 36px;
          transition: color .15s;
        }
        .nav-mobile-sub:hover { color: #e8192c; }

        .brand-logo { width: 40px; height: 40px; object-fit: contain; flex-shrink: 0; }

        .brand-name-top {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; text-transform: uppercase;
          font-size: 1.25rem; letter-spacing: .04em;
          line-height: 1; color: #0f1623;
          display: flex; align-items: baseline; gap: 5px;
        }
        .brand-name-top .digital { color: #e8192c; font-style: italic; }

        .brand-name-bottom {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600; text-transform: uppercase;
          font-size: .56rem; letter-spacing: .28em;
          color: #94a3b8; line-height: 1;
          margin-top: 3px; padding-left: 1px;
        }

        .brand-rule {
          width: 2px; height: 34px;
          background: linear-gradient(to bottom, #e8192c, rgba(232,25,44,.15));
          flex-shrink: 0;
        }
      `}</style>

      <header className={`nav-root fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 ${scrolled ? "scrolled" : ""}`}>
        {/* Top red bar */}
        <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

        <nav className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between py-3 gap-8">

            {/* ── Brand ── */}
            <Link href="/" className="flex items-center gap-3 shrink-0 no-underline">
              <img src="/logo/gritLogo2.webp" alt="Grit Digital Performance" className="brand-logo" />
              <div className="brand-rule hidden sm:block" />
              <div className="hidden sm:flex flex-col justify-center">
                <div className="brand-name-top">
                  <span>Grit</span>
                  <span className="digital">Digital</span>
                </div>
                <div className="brand-name-bottom">Performance</div>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              {navigation.map((item) =>
                item.dropdown ? (
                  /* The wrapper covers both the trigger AND the gap AND the panel,
                     so the mouse never leaves while travelling between them. */
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button className="nav-link flex items-center gap-1">
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>

                    {servicesOpen && (
                      /* nav-dropdown-wrap has padding-top equal to the visual gap.
                         The mouse moves through this padding — still inside the wrapper —
                         so onMouseLeave never fires until the mouse truly exits. */
                      <div className="nav-dropdown-wrap">
                        <div className="nav-dropdown">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="nav-dropdown-link"
                              onClick={() => setServicesOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.name} href={item.href} className="nav-link">
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* ── CTA ── */}
            <div className="hidden lg:block shrink-0">
              <Link href="/contact" className="nav-cta">Get Started</Link>
            </div>

            {/* ── Mobile burger ── */}
            <button
              className="lg:hidden p-2 text-slate-700 hover:text-red-600 transition-colors ml-auto"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* ── Mobile drawer ── */}
        {menuOpen && (
          <div className="nav-drawer lg:hidden">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <>
                    <button
                      className="nav-mobile-link w-full justify-between"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 mr-1 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {servicesOpen && (
                      <div style={{ background: "rgba(0,0,0,.02)" }}>
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="nav-mobile-sub"
                            onClick={closeAll}
                          >
                            — {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="nav-mobile-link" onClick={closeAll}>
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="mx-5 h-px" style={{ background: "rgba(0,0,0,.07)" }} />

            <div className="p-5">
              <Link href="/contact" className="nav-cta w-full justify-center" onClick={closeAll}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}