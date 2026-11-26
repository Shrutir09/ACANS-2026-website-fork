'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { Abstract, EventSettings, Registration } from '../../types';
import { officialThemes, officialThemeTitle } from '../../lib/officialThemes';
import TemplateDownloadCard from '../../components/TemplateDownloadCard';
import WordCounter from '../../components/WordCounter';
import SuccessModal from '../../components/SuccessModal';
import OfficialPaymentDetails from '../../components/OfficialPaymentDetails';
import AbstractSummary from '../../components/AbstractSummary';

function AbstractSubmissionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [existingAbstract, setExistingAbstract] = useState<Abstract | null>(null);
  const [abstractLoading, setAbstractLoading] = useState(true);
  const [accessLoading, setAccessLoading] = useState(true);
  const [accessError, setAccessError] = useState('');
  const [paymentConfirmation, setPaymentConfirmation] = useState<'yes' | 'no' | ''>('');
  const [payerUpiId, setPayerUpiId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [paymentStepComplete, setPaymentStepComplete] = useState(false);
  const [showOfficialPayment, setShowOfficialPayment] = useState(false);

  const [settings, setSettings] = useState<EventSettings | null>(null);
  const requestedTheme = officialThemeTitle(searchParams.get('theme'));
  const editModeRequested = searchParams.get('mode') === 'edit';
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
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [editComplete, setEditComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const submissionData = {
    ...formData,
    authorName: formData.authorName || user?.fullName || '',
    contactEmail: formData.contactEmail || user?.email || '',
    institution: formData.institution || user?.institution || '',
    department: formData.department || user?.department || '',
  };
  const isEditing = Boolean(existingAbstract && editModeRequested && !editComplete);

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

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;

    let active = true;
    api.getMyAbstract()
      .then((res) => {
        if (!active) return;

        if (res.abstract) {
          const abstract = res.abstract;
          setExistingAbstract(abstract);
          setFormData({
            title: abstract.title || '',
            abstractText: abstract.abstractText || '',
            authorName: abstract.authorName || '',
            coAuthors: abstract.coAuthors || '',
            institution: abstract.institution || '',
            department: abstract.department || '',
            researchTheme: abstract.researchTheme || initialTheme,
            keywords: abstract.keywords || '',
            contactEmail: abstract.contactEmail || '',
          });
          setPaymentStepComplete(true);
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setAccessError(err instanceof Error ? err.message : 'Unable to load your existing abstract.');
        }
      })
      .finally(() => {
        if (active) setAbstractLoading(false);
      });

    return () => { active = false; };
  }, [authLoading, user, initialTheme]);

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

  const handlePaymentContinue = () => {
    setPaymentError('');
    if (paymentConfirmation !== 'yes') {
      setPaymentError('Select “Yes, I have completed the payment” before continuing.');
      return;
    }

    const normalizedPayerUpiId = payerUpiId.trim();
    if (!normalizedPayerUpiId) {
      setPaymentError('Enter the Payer UPI ID and Transaction ID/UTR Number used for the registration payment.');
      return;
    }
    if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+$/.test(normalizedPayerUpiId)) {
      setPaymentError('Enter a valid UPI ID in the format name@bank.');
      return;
    }

    const normalizedTransactionId = transactionId.trim();
    if (!normalizedTransactionId) {
      setPaymentError('Enter the Transaction ID / UTR Number used for the payment.');
      return;
    }
    if (!/^[A-Za-z0-9][A-Za-z0-9._/-]{5,34}$/.test(normalizedTransactionId)) {
      setPaymentError('Enter a valid UTR / Transaction ID using 6–35 letters, numbers, or . _ / - characters.');
      return;
    }

    setShowOfficialPayment(false);
    setPaymentStepComplete(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPaymentError('');
    setUpdateSuccess(false);

    if (!user || !registration || loading) {
      return;
    }

    if (!existingAbstract && (
      paymentConfirmation !== 'yes' ||
      !paymentStepComplete ||
      !payerUpiId.trim() ||
      !transactionId.trim()
    )) {
      setPaymentError('Complete the payment-details step before submitting your abstract.');
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
      const res = existingAbstract
        ? await api.updateMyAbstract(existingAbstract._id, formPayload)
        : await api.submitAbstract(formPayload);

      if (res.success) {
        setExistingAbstract(res.abstract);
        if (existingAbstract) {
          setEditComplete(true);
          setUpdateSuccess(true);
          router.replace('/abstract-submission');
        } else {
          setSuccess(true);
        }
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
          {paymentStepComplete && !existingAbstract && (
            <>
              <div style={{ marginBottom: '2.5rem' }}>
                <TemplateDownloadCard />
              </div>
              <div className="alert alert-info" style={{ marginBottom: '2rem', borderLeft: '4px solid #b45309' }}>
                <strong>Important abstract notice:</strong> Submit by <strong>3 December 2026</strong>. Registration remains open after this date, subject to arrangements. Late abstracts (after 3rd of December) will not be considered for publication.
              </div>
            </>
          )}

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
            {existingAbstract && !isEditing ? (
              <>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)', marginBottom: '1.5rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.75rem' }}>
                  Your Abstract
                </h2>
                <AbstractSummary abstract={existingAbstract} />
              </>
            ) : (
              <>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)', marginBottom: '1.5rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.75rem' }}>
              {existingAbstract ? 'Edit Your Abstract' : paymentStepComplete ? 'Abstract Submission Form' : 'Payment Confirmation'}
            </h2>
{abstractLoading && (
              <div className="alert alert-info">
                Checking your existing abstract...
              </div>
            )}
            {registration && !accessLoading && !abstractLoading && !accessError ? (
              (paymentStepComplete || existingAbstract) ? (
            <>
            {updateSuccess && <div className="alert alert-success" role="status">Your abstract was updated successfully.</div>}
            <form onSubmit={handleSubmit}>
              {!existingAbstract && (
                <>
                  <button type="button" className="btn btn-outline-navy btn-sm" style={{ marginBottom: '1.25rem' }} onClick={() => setPaymentStepComplete(false)}>
                    Back to Payment Confirmation
                  </button>
                  <div className="form-hint" style={{ marginBottom: '1.25rem' }}>
                    Payment details entered here are for this frontend submission flow only and do not verify payment.
                  </div>
                </>
              )}
              {/* Existing abstract submission fields and API flow remain unchanged. */}
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
                <select id="researchTheme" name="researchTheme" required value={formData.researchTheme} onChange={handleInputChange} className="form-control">
                  <option value="">-- Select Relevant Research Theme --</option>
                  {officialThemes.map((t, idx) => <option key={idx} value={t.title}>{t.title}</option>)}
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="authorName">Presenting Author Name *</label>
                  <input id="authorName" name="authorName" type="text" required value={submissionData.authorName} onChange={handleInputChange} placeholder="Full name of presenting author" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contactEmail">Contact / Corresponding Email *</label>
                  <input id="contactEmail" name="contactEmail" type="email" required value={submissionData.contactEmail} onChange={handleInputChange} placeholder="author@institution.edu" className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="coAuthors">Co-Author(s) Details</label>
                <input id="coAuthors" name="coAuthors" type="text" value={formData.coAuthors} onChange={handleInputChange} placeholder="e.g. Author 2 (Dept, Inst), Author 3 (Dept, Inst)" className="form-control" />
                <div className="form-hint">List all co-authors with affiliations separated by commas.</div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="abs-institution">Institution / Organization *</label>
                  <input id="abs-institution" name="institution" type="text" required value={submissionData.institution} onChange={handleInputChange} placeholder="e.g. Dr. A.P.J. Abdul Kalam WIT, BARC, IIT" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="abs-department">Department</label>
                  <input id="abs-department" name="department" type="text" value={submissionData.department} onChange={handleInputChange} placeholder="e.g. Computer Science & Engineering" className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="keywords">Keywords *</label>
                <input id="keywords" name="keywords" type="text" required value={formData.keywords} onChange={handleInputChange} placeholder="e.g. Nuclear Science, AI Digital Twins, Reactor Safety, High Performance Computing" className="form-control" />
                <div className="form-hint">At least four (4) keywords as required by the official template.</div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label" htmlFor="abstractText">Abstract Summary Text *</label>
                  <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Max {wordLimit} words</span>
                </div>
                <textarea id="abstractText" name="abstractText" required rows={6} value={formData.abstractText} onChange={handleInputChange} placeholder="Paste or write the structured summary of your research (Introduction, Methods, Results, Conclusions)..." className="form-control" />
                <WordCounter currentCount={wordCount} maxLimit={wordLimit} />
              </div>

              <button type="submit" disabled={loading || success || !user || wordCount > wordLimit || !registration} className="btn btn-teal btn-lg" style={{ width: '100%', marginTop: '1rem' }} id="submit-abstract-btn">
                {loading ? (existingAbstract ? 'Updating Abstract...' : 'Submitting Abstract...') : existingAbstract ? 'Update Abstract' : 'Submit Abstract'}
              </button>
            </form>
            </>
            ) : (
            <section aria-labelledby="payment-confirmation-heading" style={{ padding: '1.25rem', border: '1px solid #bfdbfe', borderRadius: '8px', background: '#eff6ff' }}>
                <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend id="payment-confirmation-heading" style={{ marginBottom: '0.75rem', color: 'var(--slate-800)', fontWeight: 600 }}>Have you completed the registration payment?</legend>
                  <div style={{ display: 'grid', gap: '0.65rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: 'var(--slate-800)', lineHeight: 1.5 }}>
                      <input type="radio" name="paymentConfirmation" value="yes" required checked={paymentConfirmation === 'yes'} onChange={() => {
                        setPaymentConfirmation('yes');
                        setPaymentStepComplete(false);
                        setPaymentError('');
                        setShowOfficialPayment(false);
                      }} style={{ marginTop: '0.25rem' }} />
                      <span>Yes, I have completed the payment.</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: 'var(--slate-800)', lineHeight: 1.5 }}>
                      <input type="radio" name="paymentConfirmation" value="no" required checked={paymentConfirmation === 'no'} onChange={() => {
                        setPaymentConfirmation('no');
                        setPaymentStepComplete(false);
                        setPaymentError('');
                      }} style={{ marginTop: '0.25rem' }} />
                      <span>No, I have not completed the payment.</span>
                    </label>
                  </div>
                </fieldset>
                {paymentConfirmation === 'yes' && (
                  <div style={{ marginTop: '1.25rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="payerUpiId">Payer UPI ID *</label>
                      <input id="payerUpiId" type="text" required autoComplete="off" value={payerUpiId} onChange={(event) => { setPayerUpiId(event.target.value); setPaymentError(''); }} placeholder="e.g. name@bank" className="form-control" aria-invalid={Boolean(paymentError)} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label" htmlFor="transactionId">Transaction ID / UTR Number *</label>
                      <input id="transactionId" type="text" required minLength={6} maxLength={35} autoComplete="off" value={transactionId} onChange={(event) => { setTransactionId(event.target.value); setPaymentError(''); }} placeholder="Enter your UTR / Transaction ID" className="form-control" aria-invalid={Boolean(paymentError)} />
                    </div>
                    <button type="button" onClick={handlePaymentContinue} className="btn btn-teal">Continue to Abstract Submission</button>
                  </div>
                )}
                {paymentConfirmation === 'no' && (
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ marginBottom: '0.75rem', color: 'var(--slate-800)', lineHeight: 1.6 }}>
                      Please complete your registration payment first. After making the payment, fill out the Payment Report form. Once completed, return here, confirm your payment, and proceed with abstract submission.
                    </p>
                    <button type="button" onClick={() => setShowOfficialPayment(value => !value)} className="btn btn-primary">
                      {showOfficialPayment ? 'Hide Payment Details' : 'Pay Now'}
                    </button>
                    {showOfficialPayment && <OfficialPaymentDetails title="Official ACANS 2026 Payment Details" showAction={false} />}
                  </div>
                )}
                {paymentError && <div className="alert alert-danger" role="alert" style={{ marginTop: '1rem', marginBottom: 0 }}>{paymentError}</div>}
              </section>
            )
            ) : null}
              </>
            )}
          </div>
        </div>
      </section>
      {(success || updateSuccess) && <SuccessModal
        heading={updateSuccess ? 'Abstract Updated Successfully' : 'Abstract Submitted Successfully'}
        message={updateSuccess
          ? 'Your abstract has been updated successfully.'
          : 'Your abstract has been submitted successfully. This is your submission acknowledgement.'}
        onClose={() => {
          setSuccess(false);
          setUpdateSuccess(false);
        }}
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

