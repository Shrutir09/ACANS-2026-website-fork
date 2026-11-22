'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { EventSettings, Registration } from '../../types';
import { officialThemes, officialThemeTitle } from '../../lib/officialThemes';
import TemplateDownloadCard from '../../components/TemplateDownloadCard';
import WordCounter from '../../components/WordCounter';
import SuccessModal from '../../components/SuccessModal';

function AbstractSubmissionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [accessLoading, setAccessLoading] = useState(true);
  const [accessError, setAccessError] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);

  const [settings, setSettings] = useState<EventSettings | null>(null);
  const requestedTheme = officialThemeTitle(searchParams.get('theme'));
  const initialTheme = officialThemes.some(theme => theme.title === requestedTheme)
    ? requestedTheme
    : officialThemes[0].title;

  const [formData, setFormData] = useState({
    title: '',
    abstractText: '',
    authorName: '',
    coAuthors: '',
    institution: '',
    department: '',
    researchTheme: initialTheme,
    keywords: '',
    contactEmail: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submissionData = {
    ...formData,
    authorName: formData.authorName || user?.fullName || '',
    contactEmail: formData.contactEmail || user?.email || '',
    institution: formData.institution || user?.institution || '',
    department: formData.department || user?.department || '',
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      const currentPath = `${window.location.pathname}${window.location.search}`;
      router.replace(`/login?next=${encodeURIComponent(currentPath)}`);
      return;
    }

    let active = true;
    api.getMyRegistration()
      .then((registrationRes) => {
        if (!active) return;
        setRegistration(registrationRes.registration);
      })
      .catch((err: unknown) => {
        if (active) setAccessError(err instanceof Error ? err.message : 'Unable to verify your registration status. Please try again.');
      })
      .finally(() => {
        if (active) setAccessLoading(false);
      });
    return () => { active = false; };
  }, [authLoading, user, router]);

  // Load event settings for the configured abstract word limit.
  useEffect(() => {
    api.getPublicSettings().then(res => {
      setSettings(res.settings);
    }).catch(err => console.error('Error fetching settings:', err));
  }, []);

  // Count words helper
  const wordLimit = Math.min(settings?.abstractWordLimit || 250, 250);
  const wordCount = formData.abstractText.trim()
    ? formData.abstractText.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user || !registration || loading) {
      return;
    }

    if (!acknowledged) {
      setError('Please confirm that you have completed the payment before submitting your abstract.');
      return;
    }

    if (wordCount > wordLimit) {
      setError(`Abstract summary text exceeds the limit of ${wordLimit} words (currently ${wordCount} words). Please condense your text and refer to the official template for formatting guidance.`);
      return;
    }

    setLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('abstractText', formData.abstractText);
      formPayload.append('authorName', submissionData.authorName);
      formPayload.append('coAuthors', formData.coAuthors);
      formPayload.append('institution', submissionData.institution);
      formPayload.append('department', submissionData.department);
      formPayload.append('researchTheme', formData.researchTheme);
      formPayload.append('keywords', formData.keywords);
      formPayload.append('contactEmail', submissionData.contactEmail);
      const res = await api.submitAbstract(formPayload);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || 'Submission could not be confirmed. Please try again.');
      }

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed. Please check required fields.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

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
            <span>Abstract Submission</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: '#ffffff', marginBottom: '0.35rem', fontWeight: 700 }}>
            Abstract Submission
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '750px', fontSize: '0.95rem' }}>
            Submit your research contribution to ACANS 2026: Advanced Computing and Nuclear Science.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-narrow">
          {/* Download Official Template Highlight */}
          <div style={{ marginBottom: '2.5rem' }}>
            <TemplateDownloadCard />
          </div>

          <div className="alert alert-info" style={{ marginBottom: '2rem', borderLeft: '4px solid #b45309' }}>
            <strong>Important abstract notice:</strong> Submit by <strong>3 December 2026</strong>. Registration remains open after this date, subject to arrangements. Late abstracts (after 3rd of December) will not be considered for publication.
          </div>

          {accessLoading || authLoading ? <div className="alert alert-info">Checking your participant registration…</div> : null}
          {accessError && <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>{accessError}</div>}
          {error && <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>{error}</div>}

          {!accessLoading && !authLoading && !accessError && user && !registration && (
            <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
              <strong>Complete participant registration before submitting an abstract.</strong>{' '}
              <Link href="/register" className="btn btn-primary btn-sm" style={{ marginLeft: '0.5rem' }}>Go to Registration</Link>
            </div>
          )}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)', marginBottom: '1.5rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.75rem' }}>
              Abstract Submission Form
            </h2>

            {registration && !accessLoading && !accessError ? (
            <form onSubmit={handleSubmit} onInvalidCapture={(event) => {
              if (event.target instanceof HTMLInputElement && event.target.type === 'checkbox') {
                setError('Please confirm that you have completed the payment before submitting your abstract.');
              }
            }}>
              <section aria-labelledby="payment-confirmation-heading" style={{ marginBottom: '1.75rem', padding: '1.25rem', border: '1px solid #bfdbfe', borderRadius: '8px', background: '#eff6ff' }}>
                <h3 id="payment-confirmation-heading" style={{ color: '#1e3a8a', marginBottom: '0.75rem' }}>Payment Confirmation</h3>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: 'var(--slate-800)', lineHeight: 1.5 }}>
                  <input type="checkbox" required checked={acknowledged} onChange={(event) => {
                    setAcknowledged(event.target.checked);
                    if (event.target.checked) setError('');
                  }} style={{ marginTop: '0.25rem' }} />
                  <span>I have completed the payment.</span>
                </label>
              </section>
              <div className="form-group">
                <label className="form-label" htmlFor="abstract-title">Paper / Abstract Title *</label>
                <input
                  id="abstract-title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="ALL CAPITAL, Times New Roman format (as in template)"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="researchTheme">Research Theme / Topic *</label>
                <select
                  id="researchTheme"
                  name="researchTheme"
                  required
                  value={formData.researchTheme}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">-- Select Relevant Research Theme --</option>
                  {officialThemes.map((t, idx) => (
                    <option key={idx} value={t.title}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="authorName">Presenting Author Name *</label>
                  <input
                    id="authorName"
                    name="authorName"
                    type="text"
                    required
                    value={submissionData.authorName}
                    onChange={handleInputChange}
                    placeholder="Full name of presenting author"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactEmail">Contact / Corresponding Email *</label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    required
                    value={submissionData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="author@institution.edu"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="coAuthors">Co-Author(s) Details</label>
                <input
                  id="coAuthors"
                  name="coAuthors"
                  type="text"
                  value={formData.coAuthors}
                  onChange={handleInputChange}
                  placeholder="e.g. Author 2 (Dept, Inst), Author 3 (Dept, Inst)"
                  className="form-control"
                />
                <div className="form-hint">List all co-authors with affiliations separated by commas.</div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="abs-institution">Institution / Organization *</label>
                  <input
                    id="abs-institution"
                    name="institution"
                    type="text"
                    required
                    value={submissionData.institution}
                    onChange={handleInputChange}
                    placeholder="e.g. Dr. A.P.J. Abdul Kalam WIT, BARC, IIT"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="abs-department">Department</label>
                  <input
                    id="abs-department"
                    name="department"
                    type="text"
                    value={submissionData.department}
                    onChange={handleInputChange}
                    placeholder="e.g. Computer Science & Engineering"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="keywords">Keywords *</label>
                <input
                  id="keywords"
                  name="keywords"
                  type="text"
                  required
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="e.g. Nuclear Science, AI Digital Twins, Reactor Safety, High Performance Computing"
                  className="form-control"
                />
                <div className="form-hint">At least four (4) keywords as required by the official template.</div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label" htmlFor="abstractText">Abstract Summary Text *</label>
                  <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                    Max {wordLimit} words
                  </span>
                </div>
                <textarea
                  id="abstractText"
                  name="abstractText"
                  required
                  rows={6}
                  value={formData.abstractText}
                  onChange={handleInputChange}
                  placeholder="Paste or write the structured summary of your research (Introduction, Methods, Results, Conclusions)..."
                  className="form-control"
                />
                {/* Live Word Counter */}
                <WordCounter currentCount={wordCount} maxLimit={wordLimit} />
              </div>

              <button
                type="submit"
                disabled={loading || success || !user || wordCount > wordLimit || !registration}
                className="btn btn-teal btn-lg"
                style={{ width: '100%', marginTop: '1rem' }}
                id="submit-abstract-btn"
              >
                {loading ? 'Submitting Abstract...' : 'Submit Abstract'}
              </button>
            </form>
            ) : null}
          </div>
        </div>
      </section>
      {success && <SuccessModal
        heading="Abstract submitted successfully"
        message="Your abstract has been submitted successfully! You will receive an acknowledgement email after verification."
        onClose={() => setSuccess(false)}
      />}
    </div>
  );
}

export default function AbstractSubmissionPage() {
  return (
    <Suspense fallback={<div style={{ padding: '5rem', textAlign: 'center' }}>Loading submission form...</div>}>
      <AbstractSubmissionContent />
    </Suspense>
  );
}

