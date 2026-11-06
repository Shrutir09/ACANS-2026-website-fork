export function normalizeEventText(value: string): string {
  return value
    .replace(/\bINSAC[ -]?2026\b/gi, 'ACANS 2026')
    .replace(/\bINSAC\b/gi, 'ACANS 2026')
    .replace(/\bNational Workshop\b/gi, 'National Seminar')
    .replace(/\bWorkshop\b/gi, 'Seminar');
}

export function normalizeOrganizationText(value: string): string {
  return normalizeEventText(value)
    .replace(/\bannual ACANS 2026 conference\b/gi, 'annual conference')
    .replace(/\bACANS 2026 serves\b/gi, 'The annual conference serves')
    .replace(/\bannual conference \(ACANS 2026\)/gi, 'annual conference');
}
