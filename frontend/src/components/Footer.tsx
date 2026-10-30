import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#071529',
      color: '#cbd5e1',
      borderTop: '3px solid #0f294a',
      marginTop: 'auto',
      paddingTop: '2.5rem',
      paddingBottom: '1.5rem',
    }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          {/* Col 1: Joint Event Information */}
          <div style={{ gridColumn: 'span 2' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.15rem', marginBottom: '0.4rem', fontWeight: 700 }}>
              INSAC 2026 &amp; Advanced Computing Conference
            </h3>
            <div style={{ fontSize: '0.85rem', color: '#fcd34d', marginBottom: '0.75rem', fontWeight: 600 }}>
              National Workshop on &ldquo;Advanced Computing and Nuclear Science: Emerging Technologies, Interdisciplinary Applications and Research Opportunities&rdquo;
            </div>

            <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '1rem' }}>
              Jointly organized by <strong>Dr. A.P.J. Abdul Kalam Women&apos;s Institute of Technology (WIT)</strong>, a constituent unit of <strong>Lalit Narayan Mithila University (LNMU)</strong>, Darbhanga, Bihar, in collaboration with the <strong>Indian Nuclear Society (INS)</strong>.
            </p>

            <div style={{
              display: 'inline-block',
              backgroundColor: '#0f294a',
              border: '1px solid #1e3a8a',
              borderRadius: '3px',
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              color: '#fcd34d',
            }}>
              <strong>Proposed Conference Dates:</strong> 7–11 December 2026 <em>(Subject to approval)</em>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><Link href="/" style={{ color: '#cbd5e1' }}>Home</Link></li>
              <li><Link href="/about" style={{ color: '#cbd5e1' }}>About the Joint Conference</Link></li>
              <li><Link href="/themes" style={{ color: '#cbd5e1' }}>Technical Themes &amp; Tracks</Link></li>
              <li><Link href="/committees" style={{ color: '#cbd5e1' }}>Organizing &amp; Advisory Committees</Link></li>
              <li><Link href="/information" style={{ color: '#cbd5e1' }}>Registration Guidelines &amp; Fees</Link></li>
              <li><Link href="/abstract-submission" style={{ color: '#cbd5e1' }}>Extended Abstract Submission</Link></li>
            </ul>
          </div>

          {/* Col 3: Host Venue, Contact & Campus Map */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Host Venue &amp; Secretariat
            </h4>
            <p style={{ fontSize: '0.825rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '0.5rem' }}>
              Dr. A.P.J. Abdul Kalam WIT<br />
              Lalit Narayan Mithila University Campus,<br />
              Darbhanga, Bihar – 846004, India
            </p>
            <p style={{ fontSize: '0.825rem', color: '#cbd5e1', marginBottom: '0.85rem' }}>
              Email: <a href="mailto:contact@insac2026.org" style={{ color: '#fcd34d' }}>contact@insac2026.org</a>
            </p>

            {/* Find Our Campus Section */}
            <div style={{ marginTop: '0.85rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.45rem',
              }}>
                <h5 style={{
                  color: '#fcd34d',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  margin: 0,
                }}>
                  Find Our Campus
                </h5>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Dr.+APJ+Abdul+Kalam+Women%27s+Institute+of+Technology,+Kadirabad,+Darbhanga&destination_place_id=ChIJMx0Smnue05EV2NH6jIpu3_8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: '#67e8f9',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                  aria-label="Get Directions to WIT Campus on Google Maps"
                >
                  <span>Get Directions</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>

              {/* Embedded Google Map */}
              <div style={{
                width: '100%',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid #1e3a8a',
                backgroundColor: '#0a1e38',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
              }}>
                <iframe
                  title="Dr. APJ Abdul Kalam Women's Institute of Technology (WIT) Campus Location"
                  src="https://maps.google.com/maps?q=Dr.+APJ+Abdul+Kalam+Women%27s+Institute+of+Technology,+Kadirabad,+Darbhanga,+Bihar+846008&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="145"
                  style={{
                    border: 0,
                    display: 'block',
                    width: '100%',
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '0.35rem',
                fontSize: '0.72rem',
                color: '#94a3b8',
              }}>
                <span>Raj Kila, Kadirabad, Darbhanga</span>
                <a
                  href="https://share.google/sqx0TwT6yvwKnIDEP"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#cbd5e1', textDecoration: 'underline' }}
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.785rem',
          color: '#64748b',
        }}>
          <div>
            &copy; 2026 INSAC-2026 Joint Conference. Dr. A.P.J. Abdul Kalam WIT (LNMU) &amp; Indian Nuclear Society. All rights reserved.
          </div>
          <div>
            Designed for Academic Conference Management
          </div>
        </div>
      </div>
    </footer>
  );
}
