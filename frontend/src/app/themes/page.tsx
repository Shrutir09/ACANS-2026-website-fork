'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { officialThemes } from '../../lib/officialThemes';

export default function ThemesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const themes = officialThemes;

  const filteredThemes = themes.filter(theme => {
    return theme.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      {/* Page Header */}
      <section style={{
        backgroundColor: '#0f294a',
        color: '#ffffff',
        padding: '2.5rem 0',
        borderBottom: '3px solid #b45309',
      }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.825rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: '#fcd34d' }}>Home</Link>
            <span>/</span>
            <span>Themes &amp; Topics</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: '#ffffff', marginBottom: '0.35rem', fontWeight: 700 }}>
            Technical Themes &amp; Research Topics
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '750px', fontSize: '0.95rem' }}>
            Explore the eight official ACANS 2026 research themes.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          {/* Controls: Search & Filter */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.75rem',
            backgroundColor: '#f8fafc',
            padding: '1rem',
            borderRadius: '4px',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="badge badge-submitted">{themes.length} Official Themes</span>
            </div>

            <div style={{ flex: '1 1 260px', minWidth: 0, maxWidth: '100%' }}>
              <input
                type="text"
                placeholder="Search topics by keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                aria-label="Search conference themes"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          {/* Theme Cards Grid */}
          <div className="grid-2">
            {filteredThemes.map((theme, index) => (
              <div
                key={theme.title}
                className="card card-interactive"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '3px solid #0f294a',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: theme.category === 'workshop' ? '#0d5f57' : '#0f294a',
                      backgroundColor: theme.category === 'workshop' ? '#f0fdf4' : '#f8fafc',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '3px',
                      border: '1px solid #e2e8f0',
                      textTransform: 'uppercase',
                    }}>
                      Official Theme
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      #{index + 1}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', color: '#0f294a', lineHeight: 1.4, marginBottom: '0.4rem', fontWeight: 700 }}>
                    {theme.title}
                  </h3>

                </div>

                <div style={{ marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Contributory Abstract</span>
                  {user && <Link
                    href={`/abstract-submission?theme=${encodeURIComponent(theme.title)}`}
                    className="btn btn-sm btn-outline-navy"
                  >
                    Submit Abstract →
                  </Link>}
                </div>
              </div>
            ))}
          </div>

          {filteredThemes.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
              No themes found matching your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
