'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────────────────────
   Static committee data (hard-coded as per requirements)
   ───────────────────────────────────────────────────────────────────────────── */

const leadershipOfficeBearers = [
  {
    role: 'Chief Patron',
    name: 'Prof. Sanjay Kumar Choudhary',
    designation: 'Vice Chancellor, LNMU',
    institution: 'Lalit Narayan Mithila University, Darbhanga',
    photo: '/images/leadership/prof-sanjay-kumar-choudhary.png',
    alt: 'Prof. Sanjay Kumar Choudhary, Vice Chancellor, LNMU',
  },
  {
    role: 'Patron',
    name: 'Dr. Divya Rani',
    designation: 'Registrar, LNMU',
    institution: 'Lalit Narayan Mithila University, Darbhanga',
    photo: '/images/leadership/dr-divya-rani.png',
    alt: 'Dr. Divya Rani, Registrar, LNMU',
  },
  {
    role: 'President',
    name: 'Dr. Amod Kumar',
    designation: 'Director, WIT',
    institution: 'Dr. A.P.J. Abdul Kalam Women\'s Institute of Technology, LNMU',
    photo: '/images/leadership/dr-amod-kumar.png',
    alt: 'Dr. Amod Kumar, Director, WIT',
  },
  {
    role: 'Convener',
    name: 'Dr. Rashmi',
    designation: 'Convener, INSAC-2026',
    institution: 'Dr. A.P.J. Abdul Kalam WIT, LNMU',
    photo: null,
    alt: 'Dr. Rashmi, Convener, INSAC-2026',
  },
  {
    role: 'Deputy Convener',
    name: 'Mrs. Charmis Mariwala',
    designation: 'Deputy Convener, INSAC-2026',
    institution: 'Dr. A.P.J. Abdul Kalam WIT, LNMU',
    photo: null,
    alt: 'Mrs. Charmis Mariwala, Deputy Convener, INSAC-2026',
  },
];

const organisingCommittee = [
  'Dr. Priyanka',
  'Mr. Krishna Murari',
  'Dr. Divya Rani',
  'Mr. Amit Mishra',
  'Ms. Kajal Kumari',
  'Ms. Prachi Bharti',
  'Dr. Rajeev Prasad',
  'Mrs. Neha Kumari',
  'Md Ashif Habibi',
  'Mr. Ganesh Kumar Paswan',
  'Dr. Rashmi Kumari',
  'Dr. M.Z. Shamim',
  'Dr. Chandrika Kumari',
  'Mr. Aashish Mishra',
  'Dr. Avinash Chandra',
  'Dr. Chandrika Kumari',
];

const advisoryCommittee = [
  {
    department: 'Department of Physics',
    members: [
      'Prof. Naushad Alam',
      'Dr. Pooja Agarwal',
      'Dr. Sumandeep Kaur',
    ],
  },
  {
    department: 'Department of Chemistry',
    members: [
      'Dr. Abhishek Rai',
      'Dr. Arindra Sharma',
    ],
  },
  {
    department: 'Department of Zoology',
    members: [
      'Dr. Parul Banergee',
    ],
  },
  {
    department: 'Department of Botany',
    members: [
      'Dr. Aniket Kumar Singh',
    ],
  },
  {
    department: 'Dr. A.P.J. Abdul Kalam Women\'s Institute of Technology',
    members: [
      'Mr. Amit Kumar Mishra',
      'Mrs. Neha Kumari',
      'Mr. Ashif Habibi',
      'Dr. Zakirullah Shamim',
      'Dr. Avinash Chandra',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Photo placeholder – shown when image file is not yet present
   ───────────────────────────────────────────────────────────────────────────── */
function PhotoPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(w => w.length > 0)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e2e8f0',
        color: '#64748b',
        fontSize: '1.6rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Leadership card – with photo support and graceful fallback
   ───────────────────────────────────────────────────────────────────────────── */
function LeadershipCard({
  role,
  name,
  designation,
  institution,
  photo,
  alt,
  highlight,
}: {
  role: string;
  name: string;
  designation: string;
  institution: string;
  photo: string | null;
  alt: string;
  highlight?: boolean;
}) {
  const [imgError, setImgError] = React.useState(false);

  const topBorderColor = highlight ? '#b45309' : '#0f294a';

  return (
    <div
      className="card"
      style={{
        borderTop: `3px solid ${topBorderColor}`,
        textAlign: 'center',
        padding: '1.5rem 1rem 1.25rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {/* Photo or Placeholder */}
      <div
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${topBorderColor}`,
          marginBottom: '0.35rem',
          flexShrink: 0,
          backgroundColor: '#e2e8f0',
        }}
      >
        {photo && !imgError ? (
          <Image
            src={photo}
            alt={alt}
            width={90}
            height={90}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <PhotoPlaceholder name={name} />
        )}
      </div>

      {/* Role badge */}
      <div
        style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: '#b45309',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          backgroundColor: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '3px',
          padding: '0.15rem 0.5rem',
        }}
      >
        {role}
      </div>

      {/* Name */}
      <h3
        style={{
          fontSize: '1.05rem',
          color: '#0f294a',
          fontWeight: 700,
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        {name}
      </h3>

      {/* Designation */}
      <div
        style={{
          fontSize: '0.825rem',
          color: '#334155',
          fontWeight: 600,
        }}
      >
        {designation}
      </div>

      {/* Institution */}
      {institution && (
        <div
          style={{
            fontSize: '0.775rem',
            color: '#64748b',
            lineHeight: 1.4,
          }}
        >
          {institution}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page component
   ───────────────────────────────────────────────────────────────────────────── */
export default function CommitteesPage() {
  return (
    <div>
      {/* Page Header */}
      <section
        style={{
          backgroundColor: '#0f294a',
          color: '#ffffff',
          padding: '2.5rem 0',
          borderBottom: '3px solid #b45309',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              fontSize: '0.825rem',
              color: '#cbd5e1',
              marginBottom: '0.5rem',
            }}
          >
            <Link href="/" style={{ color: '#fcd34d' }}>
              Home
            </Link>
            <span>/</span>
            <span>Committees</span>
          </div>
          <h1
            style={{
              fontSize: '1.85rem',
              color: '#ffffff',
              marginBottom: '0.35rem',
              fontWeight: 700,
            }}
          >
            Conference &amp; Seminar Committees
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '750px', fontSize: '0.95rem' }}>
            Distinguished academicians, office bearers, advisory panels, and organizing faculty governing INSAC 2026.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* ══════════════════════════════════════════════
                SECTION 1: Leadership & Office Bearers
                ══════════════════════════════════════════════ */}
            <div>
              <div
                style={{
                  borderBottom: '2px solid #0f294a',
                  paddingBottom: '0.4rem',
                  marginBottom: '1.5rem',
                }}
              >
                <span className="section-tag">Leadership</span>
                <h2
                  style={{
                    fontSize: '1.45rem',
                    color: '#0f294a',
                    fontWeight: 700,
                    margin: '0.25rem 0 0 0',
                  }}
                >
                  Office Bearers &amp; Patrons
                </h2>
              </div>

              {/* Top row: Chief Patron, Patron, President (with photos) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '1.25rem',
                }}
              >
                {leadershipOfficeBearers.slice(0, 3).map((m, idx) => (
                  <LeadershipCard
                    key={idx}
                    role={m.role}
                    name={m.name}
                    designation={m.designation}
                    institution={m.institution}
                    photo={m.photo}
                    alt={m.alt}
                    highlight={idx === 0}
                  />
                ))}
              </div>

              {/* Bottom row: Convener, Deputy Convener */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                  gap: '1.25rem',
                  maxWidth: '640px',
                }}
              >
                {leadershipOfficeBearers.slice(3).map((m, idx) => (
                  <LeadershipCard
                    key={idx}
                    role={m.role}
                    name={m.name}
                    designation={m.designation}
                    institution={m.institution}
                    photo={m.photo}
                    alt={m.alt}
                  />
                ))}
              </div>
            </div>

            {/* ══════════════════════════════════════════════
                SECTION 2: Organising Committee
                ══════════════════════════════════════════════ */}
            <div>
              <div
                style={{
                  borderBottom: '2px solid #0f294a',
                  paddingBottom: '0.4rem',
                  marginBottom: '1.25rem',
                }}
              >
                <span className="section-tag">Coordination</span>
                <h2
                  style={{
                    fontSize: '1.45rem',
                    color: '#0f294a',
                    fontWeight: 700,
                    margin: '0.25rem 0 0 0',
                  }}
                >
                  Organising Committee
                </h2>
              </div>
              <div className="card">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.75rem',
                  }}
                >
                  {organisingCommittee.map((name, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.75rem 0.85rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '4px',
                        border: '1px solid #e2e8f0',
                        borderLeft: '3px solid #0f294a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: '#0f294a',
                          color: '#ffffff',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: '#0f294a',
                            fontSize: '0.9rem',
                          }}
                        >
                          {name}
                        </div>
                        <div style={{ fontSize: '0.775rem', color: '#64748b' }}>
                          Organising Committee
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════
                SECTION 3: Advisory Committee (Dept-wise)
                ══════════════════════════════════════════════ */}
            <div>
              <div
                style={{
                  borderBottom: '2px solid #0f294a',
                  paddingBottom: '0.4rem',
                  marginBottom: '1.25rem',
                }}
              >
                <span className="section-tag">Panels</span>
                <h2
                  style={{
                    fontSize: '1.45rem',
                    color: '#0f294a',
                    fontWeight: 700,
                    margin: '0.25rem 0 0 0',
                  }}
                >
                  Advisory Committee by Department
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {advisoryCommittee.map((dept, deptIdx) => (
                  <div key={deptIdx} className="card">
                    <h3
                      style={{
                        fontSize: '1.05rem',
                        color: '#0f294a',
                        marginBottom: '0.75rem',
                        borderBottom: '1px solid #e2e8f0',
                        paddingBottom: '0.4rem',
                        fontWeight: 700,
                      }}
                    >
                      {dept.department}
                    </h3>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '0.75rem',
                      }}
                    >
                      {dept.members.map((member, mIdx) => (
                        <div
                          key={mIdx}
                          style={{
                            padding: '0.65rem 0.85rem',
                            backgroundColor: '#f8fafc',
                            borderRadius: '4px',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 600,
                              color: '#0f294a',
                              fontSize: '0.9rem',
                            }}
                          >
                            {member}
                          </div>
                          <div style={{ fontSize: '0.775rem', color: '#64748b' }}>
                            {dept.department.startsWith('Dr. A.P.J.')
                              ? 'WIT Darbhanga'
                              : dept.department}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
