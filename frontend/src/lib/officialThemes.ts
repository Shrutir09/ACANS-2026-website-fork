import { EventTheme } from '../types';

export const officialThemes: EventTheme[] = [
  { title: 'Advanced Computing Applications in Nuclear Science.', category: 'workshop', sortOrder: 1, isPublished: true },
  { title: 'Artificial Intelligence and Digital Twins for Nuclear Reactor Monitoring and Safety.', category: 'workshop', sortOrder: 2, isPublished: true },
  { title: 'Advanced Computing Applications in Medical Science and Healthcare.', category: 'workshop', sortOrder: 3, isPublished: true },
  { title: 'Nuclear Physics and Advanced Computing in Cancer Diagnosis and Treatment.', category: 'workshop', sortOrder: 4, isPublished: true },
  { title: 'Advanced Computing for Molecular and Cellular Biology.', category: 'workshop', sortOrder: 5, isPublished: true },
  { title: 'Hazard Prediction, Risk Assessment, and Disaster Management.', category: 'workshop', sortOrder: 6, isPublished: true },
  { title: 'Geo AI and High-Performance Computing for Nuclear Power Plant Siting and Environmental Risk Assessment.', category: 'workshop', sortOrder: 7, isPublished: true },
  { title: 'Emerging Technologies: Artificial Intelligence, Machine Learning, Data Science, Cloud Computing, Cybersecurity, Internet of Things (IoT).', category: 'workshop', sortOrder: 8, isPublished: true },
];

export function officialThemeTitle(value?: string | null): string {
  if (!value) return '';
  const current = officialThemes.find(theme => theme.title === value);
  if (current) return current.title;

  const legacyRules: Array<[RegExp, number]> = [
    [/molecular|cellular biology/i, 4],
    [/cancer diagnosis|nuclear physics/i, 3],
    [/healthcare|medical science/i, 2],
    [/hazard prediction/i, 5],
    [/geo\s*ai|power plant siting/i, 6],
    [/digital twins?.*reactor monitoring/i, 1],
    [/generative ai|industry 5\.0|\biot\b/i, 7],
    [/advanced computing.*nuclear science/i, 0],
  ];
  const legacyMatch = legacyRules.find(([pattern]) => pattern.test(value));
  return legacyMatch ? officialThemes[legacyMatch[1]].title : 'Legacy theme (not in the official 2026 list)';
}
