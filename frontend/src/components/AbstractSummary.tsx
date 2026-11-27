'use client';

import React from 'react';
import { Abstract } from '../types';
import StatusBadge from './StatusBadge';
import { officialThemeTitle } from '../lib/officialThemes';

type AbstractSummaryProps = {
  abstract: Abstract;
};

export default function AbstractSummary({ abstract }: AbstractSummaryProps) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal-600)' }}>
          Ref: {abstract.abstractRef}
        </span>
        <StatusBadge status={abstract.status} />
      </div>

      <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
        {abstract.title}
      </h3>

      <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginBottom: '0.75rem' }}>
        Theme: <strong>{officialThemeTitle(abstract.researchTheme)}</strong>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.6', marginBottom: '1rem', backgroundColor: 'var(--slate-50)', padding: '0.75rem', borderRadius: '6px' }}>
        {abstract.abstractText}
      </p>

      {abstract.attachmentOriginalName && (
        <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1rem' }}>
          📎 Attachment: <strong>{abstract.attachmentOriginalName}</strong>
        </div>
      )}
    </div>
  );
}
