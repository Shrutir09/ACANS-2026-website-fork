export function normalizeEventText(value: string): string {
  if (/joint event brings together|Indian Nuclear Society[’']s Annual Conference/i.test(value)) {
    return 'ACANS 2026 is the National Seminar on "Advanced Computing and Nuclear Science: Emerging Technologies, Interdisciplinary Applications and Research Opportunities." It is hosted by Dr. A.P.J. Abdul Kalam Women\'s Institute of Technology (WIT), a constituent unit of Lalit Narayan Mithila University (LNMU), Darbhanga, Bihar, in collaboration with the Indian Nuclear Society (INS). The seminar brings together researchers, academicians, scientists, and industry professionals to explore the intersections of nuclear science and advanced computing.';
  }
  return value
    .replace(/\bINSAC[ -]?2026\b/gi, 'ACANS 2026')
    .replace(/\bINSAC\b/gi, 'ACANS 2026')
    .replace(/\bNational Workshop\b/gi, 'National Seminar')
    .replace(/\bWorkshop\b/gi, 'Seminar');
}

export function normalizeOrganizationText(value: string): string {
  if (/annual\s+annual conference|ACANS 2026 brings together/i.test(value)) {
    return 'The Indian Nuclear Society (INS) is a professional body dedicated to the advancement and peaceful applications of nuclear science, technology, and allied disciplines. INS collaborates with WIT, LNMU in organizing ACANS 2026. Separately, INS organizes its own annual conference and other scientific forums.';
  }
  return normalizeEventText(value)
    .replace(/\bannual ACANS 2026 conference\b/gi, 'annual conference')
    .replace(/\bACANS 2026 serves\b/gi, 'The annual conference serves')
    .replace(/\bannual conference \(ACANS 2026\)/gi, 'annual conference');
}
