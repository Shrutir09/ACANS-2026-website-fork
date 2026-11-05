'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="site-header" style={{ width: '100%', zIndex: 1000, position: 'relative' }}>
      {/* 1. Top Institutional Utility Strip */}
      <div style={{
        backgroundColor: '#071529',
        color: '#cbd5e1',
        fontSize: '0.785rem',
        padding: '0.35rem 0',
        borderBottom: '1px solid #1e293b',
      }}>
        <div className="container utility-strip-content">
          <div className="utility-strip-institutions">
            <span>Dr. A.P.J. Abdul Kalam Women&apos;s Institute of Technology (WIT), LNMU Darbhanga</span>
            <span className="utility-divider" style={{ color: '#64748b' }}>|</span>
            <span style={{ color: '#fcd34d' }}>In Collaboration with Indian Nuclear Society (INS)</span>
          </div>
          <div className="utility-strip-links">
            <Link href="/information#venue" style={{ color: '#cbd5e1' }}>Venue &amp; Travel</Link>
            <span className="utility-divider" style={{ color: '#64748b' }}>|</span>
            <Link href="/information#contact" style={{ color: '#cbd5e1' }}>Helpdesk</Link>
            <span className="utility-divider" style={{ color: '#64748b' }}>|</span>
            {user ? (
              <span style={{ color: '#67e8f9' }}>
                Signed in as: <strong>{user.fullName}</strong>
              </span>
            ) : (
              <Link href="/login" style={{ color: '#fcd34d', fontWeight: 600 }}>Participant Login</Link>
            )}
          </div>
        </div>
      </div>

{/* 2. Institutional Header / Masthead */}
<div className="masthead">
  <div className="container masthead-container">

    {/* INS Logo */}
    <div className="masthead-left">
      <div className="masthead-logo masthead-logo-ins">
        <img
          src="/logos/ins logo.jpeg"
          alt="Indian Nuclear Society Logo"
        />
      </div>
    </div>

    {/* Conference Details */}
    <div className="masthead-center">
      <div className="masthead-eyebrow">
        Joint National Academic Event
      </div>

      <h1 className="masthead-title">
        INDIAN NUCLEAR SOCIETY ANNUAL CONFERENCE (INSAC-2026)
      </h1>

      <div className="masthead-subtitle">
        National Seminar on &ldquo;Advanced Computing and Nuclear Science:
        Emerging Technologies, Interdisciplinary Applications and Research
        Opportunities&rdquo;
      </div>

      <div className="masthead-organizer">
        Organized by{" "}
        <strong>
          Dr. A.P.J. Abdul Kalam Women&apos;s Institute of Technology (WIT)
        </strong>
        , Lalit Narayan Mithila University (LNMU), Darbhanga, Bihar
      </div>
    </div>

    {/* LNMU and WIT Logos */}
    <div className="masthead-right">
      <div className="masthead-logo masthead-logo-lnmu">
        <img
          src="/logos/lnmu logo.jpeg"
          alt="Lalit Narayan Mithila University Logo"
        />
      </div>

      <div className="masthead-logo masthead-logo-wit">
        <img
          src="/logos/wit logo.jpeg"
          alt="Women's Institute of Technology Logo"
        />
      </div>
    </div>

  </div>
</div>

      {/* 3. Solid Academic Navigation Bar */}
      <nav style={{
        backgroundColor: '#0f294a',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Desktop Nav Items */}
          <div style={{ display: 'flex', alignItems: 'center' }} className="desktop-nav">
            <Link
              href="/"
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: isActive('/') ? '#fcd34d' : '#ffffff',
                backgroundColor: isActive('/') ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <Link
                href="/about"
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: pathname.startsWith('/about') ? '#fcd34d' : '#ffffff',
                  backgroundColor: pathname.startsWith('/about') ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                }}
              >
                About Us ▾
              </Link>

              {aboutDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '260px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0 0 4px 4px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.15)',
                  zIndex: 200,
                }}>
                  <Link
                    href="/about#joint-event"
                    style={{ display: 'block', padding: '0.65rem 1rem', fontSize: '0.85rem', color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    The Joint Academic Event
                  </Link>
                  <Link
                    href="/about#insac"
                    style={{ display: 'block', padding: '0.65rem 1rem', fontSize: '0.85rem', color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    Indian Nuclear Society (INS)
                  </Link>
                  <Link
                    href="/about#wit"
                    style={{ display: 'block', padding: '0.65rem 1rem', fontSize: '0.85rem', color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    Dr. A.P.J. Abdul Kalam WIT
                  </Link>
                  <Link
                    href="/about#lnmu"
                    style={{ display: 'block', padding: '0.65rem 1rem', fontSize: '0.85rem', color: '#1e293b' }}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    LNMU Darbhanga
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/committees"
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: isActive('/committees') ? '#fcd34d' : '#ffffff',
                backgroundColor: isActive('/committees') ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}
            >
              Committees
            </Link>

            <Link
              href="/themes"
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: isActive('/themes') ? '#fcd34d' : '#ffffff',
                backgroundColor: isActive('/themes') ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}
            >
              Themes &amp; Topics
            </Link>

            <Link
              href="/information"
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: isActive('/information') ? '#fcd34d' : '#ffffff',
                backgroundColor: isActive('/information') ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}
            >
              Registration &amp; Fee
            </Link>

            <Link
              href="/abstract-submission"
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: isActive('/abstract-submission') ? '#fcd34d' : '#ffffff',
                backgroundColor: isActive('/abstract-submission') ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}
            >
              Abstract Submission
            </Link>
          </div>

          {/* Right Action / Auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  style={{
                    backgroundColor: '#14325a',
                    color: '#ffffff',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    borderRadius: '3px',
                    border: '1px solid #334155',
                  }}
                  id="nav-dashboard-btn"
                >
                  My Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    style={{
                      backgroundColor: '#b45309',
                      color: '#ffffff',
                      padding: '0.45rem 0.85rem',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      borderRadius: '3px',
                    }}
                    id="nav-admin-btn"
                  >
                    Admin Control
                  </Link>
                )}
                <button
                  onClick={() => logout()}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#cbd5e1',
                    border: 'none',
                    padding: '0.45rem 0.6rem',
                    fontSize: '0.825rem',
                    cursor: 'pointer',
                  }}
                  id="nav-logout-btn"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{
                    color: '#ffffff',
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                  id="nav-login-btn"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  style={{
                    backgroundColor: '#b45309',
                    color: '#ffffff',
                    padding: '0.45rem 0.95rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    borderRadius: '3px',
                    letterSpacing: '0.02em',
                  }}
                  id="nav-register-btn"
                >
                  Register Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label="Toggle Navigation"
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* 4. Official Academic Announcement Ticker Bar */}
      <div className="announcement-bar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="announcement-badge">Notice</span>
          <div style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <span>★ Official Conference Paper Template (PDF) is available for download.</span>
            <span style={{ margin: '0 0.6rem', color: '#cbd5e1' }}>|</span>
            <span>★ Conference Dates: 7–9 December 2026.</span>
            <span style={{ margin: '0 0.6rem', color: '#cbd5e1' }}>|</span>
            <span>★ Registration Fee: Student ₹500, Research Scholar ₹750, Faculty ₹1,000 (Payment via UPI).</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '2px solid #0f294a',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.4rem 0', fontWeight: 600, color: '#0f294a' }}>Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.4rem 0', fontWeight: 600, color: '#0f294a' }}>About Joint Event</Link>
          <Link href="/committees" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.4rem 0', fontWeight: 600, color: '#0f294a' }}>Committees</Link>
          <Link href="/themes" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.4rem 0', fontWeight: 600, color: '#0f294a' }}>Themes &amp; Topics</Link>
          <Link href="/information" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.4rem 0', fontWeight: 600, color: '#0f294a' }}>Registration &amp; Fee Guidelines</Link>
          <Link href="/abstract-submission" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.4rem 0', fontWeight: 600, color: '#0f294a' }}>Abstract Submission</Link>
          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0.5rem 0' }} />
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-sm">My Dashboard</Link>
              {isAdmin && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="btn btn-gold btn-sm">Admin Control Panel</Link>
              )}
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn btn-secondary btn-sm">Logout</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline-navy btn-sm" style={{ flex: 1 }}>Login</Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-gold btn-sm" style={{ flex: 1 }}>Register</Link>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 960px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        @media (min-width: 961px) {
          .mobile-toggle {
            display: none !important;
          }
        }
          /* Institutional Conference Masthead */
.masthead {
  background: #ffffff;
  border-bottom: 2px solid #0f294a;
  padding: 0.55rem 0;
}

.masthead-container {
  display: grid;
  grid-template-columns: clamp(132px, 10vw, 180px) minmax(0, 1fr) clamp(132px, 10vw, 180px);
  align-items: center;
  gap: clamp(0.85rem, 1.6vw, 2rem);
}

/* Left: INS */
.masthead-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/* Right: LNMU and WIT */
.masthead-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Base Logo Container */
.masthead-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

/* INS Logo: Authoritative Institutional Rounded Badge */
.masthead-logo-ins {
  width: clamp(70px, 4.5vw, 86px);
  height: clamp(70px, 4.5vw, 86px);
  flex: 0 0 clamp(70px, 4.5vw, 86px);
  background-color: #000000;
  border-radius: 8px;
  border: 1px solid rgba(15, 41, 74, 0.18);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 2px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.masthead-logo-ins:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.masthead-logo-ins img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* LNMU Logo: Official University Circular Seal */
.masthead-logo-lnmu {
  width: clamp(64px, 3.8vw, 78px);
  height: clamp(64px, 3.8vw, 78px);
  flex: 0 0 clamp(64px, 3.8vw, 78px);
  background-color: #ffffff;
  border-radius: 50%;
  border: 1px solid rgba(15, 41, 74, 0.14);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  padding: 2px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.masthead-logo-lnmu:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.masthead-logo-lnmu img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* WIT Logo: Calibrated to match LNMU Circular Seal */
.masthead-logo-wit {
  width: clamp(64px, 3.8vw, 78px);
  height: clamp(64px, 3.8vw, 78px);
  flex: 0 0 clamp(64px, 3.8vw, 78px);
  background-color: #ffffff;
  border-radius: 50%;
  border: 1px solid rgba(15, 41, 74, 0.14);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.masthead-logo-wit:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.masthead-logo-wit img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  display: block;
}

/* Conference Details */
.masthead-center {
  min-width: 0;
  text-align: center;
  padding: 0 0.25rem;
}

.masthead-eyebrow {
  font-size: 0.72rem;
  font-weight: 700;
  color: #b45309;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.15rem;
}

.masthead-title {
  font-size: clamp(1.05rem, 1.85vw, 1.65rem);
  font-weight: 800;
  color: #0f294a;
  line-height: 1.22;
  margin: 0 0 0.2rem;
  letter-spacing: -0.01em;
}

.masthead-subtitle {
  font-size: clamp(0.78rem, 1.25vw, 0.94rem);
  font-weight: 600;
  color: #334155;
  line-height: 1.32;
}

.masthead-organizer {
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.35;
  margin-top: 0.2rem;
}

/* Tablet (<= 960px) */
@media (max-width: 960px) {
  .masthead-container {
    grid-template-columns: 120px minmax(0, 1fr) 120px;
    gap: 0.85rem;
  }

  .masthead-logo-ins {
    width: 60px;
    height: 60px;
    flex: 0 0 60px;
    border-radius: 6px;
  }

  .masthead-logo-lnmu {
    width: 56px;
    height: 56px;
    flex: 0 0 56px;
  }

  .masthead-logo-wit {
    width: 56px;
    height: 56px;
    flex: 0 0 56px;
  }

  .masthead-logo-wit img {
    width: 100%;
    height: 100%;
  }

  .masthead-right {
    gap: 0.5rem;
  }
}

/* Mobile (<= 720px) */
@media (max-width: 720px) {
  .masthead {
    padding: 0.65rem 0;
  }

  .masthead-container {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "left right"
      "center center";
    row-gap: 0.65rem;
    column-gap: 0.75rem;
  }

  .masthead-left {
    grid-area: left;
    justify-content: flex-start;
  }

  .masthead-right {
    grid-area: right;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .masthead-center {
    grid-area: center;
    padding: 0;
  }

  .masthead-logo-ins {
    width: 52px;
    height: 52px;
    flex: 0 0 52px;
    border-radius: 6px;
  }

  .masthead-logo-lnmu {
    width: 48px;
    height: 48px;
    flex: 0 0 48px;
  }

  .masthead-logo-wit {
    width: 48px;
    height: 48px;
    flex: 0 0 48px;
  }

  .masthead-logo-wit img {
    width: 100%;
    height: 100%;
  }

  .masthead-title {
    font-size: 1.05rem;
    line-height: 1.25;
  }

  .masthead-subtitle {
    font-size: 0.82rem;
  }

  .masthead-organizer {
    font-size: 0.72rem;
  }
}
`}</style>
    </header>
  );
}
