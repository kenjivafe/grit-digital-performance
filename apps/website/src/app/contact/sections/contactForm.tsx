"use client";

import { useState } from "react";
import { ArrowRight, Mail, Phone, Facebook, Twitter, Linkedin, Instagram, CheckCircle, AlertCircle } from "lucide-react";

const serviceOptions = [
  { value: "web", label: "Marketing Website" },
  { value: "registration", label: "Event Registration" },
  { value: "both", label: "Both Services" },
  { value: "unsure", label: "Not Sure Yet" },
];

const hearOptions = [
  "Google Search", "Social Media", "Referral / Word of Mouth",
  "Sports Event", "Online Ad", "Other",
];

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "info@gritdigitalperformance.com", href: "mailto:info@gritdigitalperformance.com" },
  { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

type FormState = { name: string; email: string; service: string; message: string; hear: string; };
type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", service: "", message: "", hear: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const set = (f: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));
  const blur = (f: keyof FormState) => () => setTouched(p => ({ ...p, [f]: true }));

  const errors: Partial<Record<keyof FormState, string>> = {
    ...(touched.name && !form.name.trim() && { name: "Name is required" }),
    ...(touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && { email: "Valid email required" }),
    ...(touched.service && !form.service && { service: "Please select a service" }),
    ...(touched.message && !form.message.trim() && { message: "Message is required" }),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, service: true, message: true });
    if (Object.keys(errors).length) return;
    setStatus("submitting");
    await new Promise(r => setTimeout(r, 1400));
    setStatus("success");
  };

  return (
    <section id="contact-form" className="relative overflow-hidden" style={{ background: "#f8f9fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@400;500;600&display=swap');

        .cf-display { font-family:'Barlow Condensed',sans-serif; }
        .cf-body    { font-family:'Barlow',sans-serif; }
        .cf-tag {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.68rem; letter-spacing:.18em;
        }

        .cf-halftone {
          background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px);
          background-size:22px 22px; pointer-events:none;
        }
        .cf-jersey {
          background-image:repeating-linear-gradient(-55deg,transparent,transparent 18px,rgba(0,0,0,.012) 18px,rgba(0,0,0,.012) 36px);
          pointer-events:none;
        }

        /* Info */
        .cf-info-row { display:flex; align-items:center; gap:14px; transition:opacity .18s; cursor:pointer; }
        .cf-info-row:hover { opacity:.8; }
        .cf-info-icon {
          clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px));
          width:40px; height:40px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(232,25,44,.07); color:#e8192c;
          transition:background .18s,color .18s;
        }
        .cf-info-row:hover .cf-info-icon { background:#e8192c; color:#fff; }

        /* Social */
        .cf-social {
          width:36px; height:36px;
          clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px));
          display:flex; align-items:center; justify-content:center;
          background:rgba(15,22,35,.07); color:#64748b;
          transition:background .18s,color .18s,transform .18s;
        }
        .cf-social:hover { background:#e8192c; color:#fff; transform:translateY(-3px); }

        /* Inputs */
        .cf-label {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.72rem; letter-spacing:.14em;
          color:#475569; display:block; margin-bottom:6px;
        }
        .cf-input {
          font-family:'Barlow',sans-serif; font-size:.95rem; width:100%;
          background:#fff; border:1.5px solid #e2e8f0; color:#0f1623;
          padding:11px 14px;
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          outline:none; transition:border-color .18s,box-shadow .18s;
        }
        .cf-input:focus { border-color:#e8192c; box-shadow:0 0 0 3px rgba(232,25,44,.08); }
        .cf-input.error { border-color:#e8192c; }
        .cf-input::placeholder { color:#94a3b8; }

        .cf-select {
          font-family:'Barlow Condensed',sans-serif; font-weight:600;
          text-transform:uppercase; font-size:.85rem; letter-spacing:.05em;
          width:100%; background:#fff; border:1.5px solid #e2e8f0; color:#0f1623;
          padding:11px 36px 11px 14px;
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          outline:none; cursor:pointer; appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 14px center;
          transition:border-color .18s,box-shadow .18s;
        }
        .cf-select:focus { border-color:#e8192c; box-shadow:0 0 0 3px rgba(232,25,44,.08); }

        .cf-textarea {
          font-family:'Barlow',sans-serif; font-size:.95rem; width:100%;
          background:#fff; resize:vertical; min-height:130px;
          border:1.5px solid #e2e8f0; color:#0f1623; padding:11px 14px;
          clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          outline:none; transition:border-color .18s,box-shadow .18s;
        }
        .cf-textarea:focus { border-color:#e8192c; box-shadow:0 0 0 3px rgba(232,25,44,.08); }
        .cf-textarea.error { border-color:#e8192c; }
        .cf-textarea::placeholder { color:#94a3b8; }

        .cf-err {
          font-family:'Barlow Condensed',sans-serif; font-weight:600;
          font-size:.72rem; text-transform:uppercase; letter-spacing:.08em;
          color:#e8192c; margin-top:5px;
          display:flex; align-items:center; gap:4px;
        }

        .cf-pill {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; font-size:.78rem; letter-spacing:.07em;
          padding:8px 16px; border:1.5px solid #e2e8f0; color:#94a3b8;
          background:#fff;
          clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px));
          cursor:pointer; transition:all .18s; white-space:nowrap;
        }
        .cf-pill:hover { border-color:rgba(232,25,44,.3); color:#0f1623; }
        .cf-pill.active { background:#e8192c; border-color:#e8192c; color:#fff; }

        .cf-submit {
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          text-transform:uppercase; letter-spacing:.09em; font-size:1rem;
          background:#e8192c; color:#fff; width:100%;
          clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,11px 100%,0 calc(100% - 11px));
          transition:background .18s,transform .18s,opacity .18s;
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 32px;
        }
        .cf-submit:hover:not(:disabled) { background:#b91220; transform:translateX(3px); }
        .cf-submit:disabled { opacity:.6; cursor:not-allowed; }

        @keyframes cf-spin { to{transform:rotate(360deg);} }
        @keyframes cf-pop  { from{opacity:0;transform:scale(.93);}to{opacity:1;transform:scale(1);} }
        .cf-spinner {
          width:18px; height:18px; border-radius:50%;
          border:2px solid rgba(255,255,255,.3); border-top-color:#fff;
          animation:cf-spin .7s linear infinite; flex-shrink:0;
        }
        .cf-success { animation:cf-pop .4s cubic-bezier(.22,1,.36,1) both; }

        .cf-rule { height:1px; background:linear-gradient(to right,#e8192c,rgba(232,25,44,.15),transparent); }
      `}</style>

      <div className="cf-halftone absolute inset-0 z-0" />
      <div className="cf-jersey  absolute inset-0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "#e8192c" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">

          {/* ── Left info col ── */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 shrink-0" style={{ background: "#e8192c" }} />
                <span className="cf-tag" style={{ color: "#e8192c" }}>Reach Out</span>
              </div>
              <h2
                className="cf-display font-black uppercase text-[#0f1623] leading-[.9] mb-4"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}
              >
                We'd Love to
                <br />
                <span className="italic" style={{ WebkitTextStroke: "2px #e8192c", color: "transparent" }}>
                  Hear From You.
                </span>
              </h2>
              <p className="cf-body text-slate-500 leading-relaxed text-sm max-w-sm">
                Tell us about your project and we'll get back to you within 24 hours with clear next steps.
              </p>
            </div>

            <div className="cf-rule" />

            {/* Contact info */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="cf-info-row">
                  <div className="cf-info-icon">
                    <Icon style={{ width: 16, height: 16 }} />
                  </div>
                  <div>
                    <div className="cf-tag" style={{ color: "#94a3b8", fontSize: ".58rem" }}>{label}</div>
                    <div className="cf-display font-bold uppercase text-[#0f1623]"
                      style={{ fontSize: ".88rem", letterSpacing: ".04em" }}>
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="cf-rule" />

            {/* Socials */}
            <div>
              <div className="cf-tag mb-3" style={{ color: "#94a3b8" }}>Follow Us</div>
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="cf-social">
                    <Icon style={{ width: 15, height: 15 }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Status chip */}
            <div style={{
              background: "#fff", border: "1.5px solid #e2e8f0",
              clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
              padding: "1rem 1.2rem",
            }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: "#e8192c", boxShadow: "0 0 0 3px rgba(232,25,44,.2)" }} />
                <span className="cf-tag" style={{ color: "#e8192c", fontSize: ".6rem" }}>Typically Online</span>
              </div>
              <p className="cf-body text-slate-500 text-xs leading-relaxed">
                We respond to all inquiries within 24 hours, Monday–Friday.
              </p>
            </div>
          </div>

          {/* ── Right form col ── */}
          <div>
            {status === "success" ? (
              <div className="cf-success flex flex-col items-start gap-5 p-8" style={{
                background: "#fff", border: "1.5px solid #e2e8f0",
                clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
              }}>
                <div style={{
                  width: 52, height: 52, background: "rgba(232,25,44,.08)", color: "#e8192c",
                  clipPath: "polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,9px 100%,0 calc(100% - 9px))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <CheckCircle style={{ width: 24, height: 24 }} />
                </div>
                <div>
                  <div className="cf-display font-black italic uppercase text-[#0f1623] mb-2"
                    style={{ fontSize: "1.6rem", lineHeight: 1 }}>
                    Message Sent!
                  </div>
                  <p className="cf-body text-slate-500 text-sm leading-relaxed">
                    Thanks for reaching out. We'll be in touch within 24 hours to discuss your project.
                  </p>
                </div>
                <button className="cf-tag" style={{ color: "#e8192c", fontSize: ".65rem", cursor: "pointer" }}
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", service: "", message: "", hear: "" }); setTouched({}); }}>
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="cf-label">Name *</label>
                    <input className={`cf-input ${errors.name ? "error" : ""}`} type="text"
                      placeholder="Your full name" value={form.name}
                      onChange={set("name")} onBlur={blur("name")} />
                    {errors.name && <div className="cf-err"><AlertCircle style={{ width: 11, height: 11 }} />{errors.name}</div>}
                  </div>
                  <div>
                    <label className="cf-label">Email *</label>
                    <input className={`cf-input ${errors.email ? "error" : ""}`} type="email"
                      placeholder="you@organization.com" value={form.email}
                      onChange={set("email")} onBlur={blur("email")} />
                    {errors.email && <div className="cf-err"><AlertCircle style={{ width: 11, height: 11 }} />{errors.email}</div>}
                  </div>
                </div>

                <div>
                  <label className="cf-label">Service Interest *</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {serviceOptions.map(opt => (
                      <button key={opt.value} type="button"
                        className={`cf-pill ${form.service === opt.value ? "active" : ""}`}
                        onClick={() => { setForm(p => ({ ...p, service: opt.value })); setTouched(p => ({ ...p, service: true })); }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {errors.service && <div className="cf-err mt-2"><AlertCircle style={{ width: 11, height: 11 }} />{errors.service}</div>}
                </div>

                <div>
                  <label className="cf-label">Message *</label>
                  <textarea className={`cf-textarea ${errors.message ? "error" : ""}`}
                    placeholder="Tell us about your project, timeline, and any specific needs..."
                    value={form.message} onChange={set("message")} onBlur={blur("message")} />
                  {errors.message && <div className="cf-err"><AlertCircle style={{ width: 11, height: 11 }} />{errors.message}</div>}
                </div>

                <div>
                  <label className="cf-label">How Did You Hear About Us?</label>
                  <select className="cf-select" value={form.hear} onChange={set("hear")} onBlur={blur("hear")}>
                    <option value="">Select an option</option>
                    {hearOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="pt-2">
                  <button type="submit" className="cf-submit" disabled={status === "submitting"}>
                    {status === "submitting"
                      ? <><div className="cf-spinner" /> Sending...</>
                      : <>Send Message <ArrowRight className="w-4 h-4 shrink-0" /></>}
                  </button>
                </div>

                <p className="cf-body text-center" style={{ color: "#94a3b8", fontSize: ".75rem" }}>
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}