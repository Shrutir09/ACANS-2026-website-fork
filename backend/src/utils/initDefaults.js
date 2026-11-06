const EventSettings = require('../models/EventSettings');
const User = require('../models/User');
const config = require('../config');

async function initDefaults() {
  try {
    // 1. Check and initialize settings
    let settings = await EventSettings.findOne();
    if (!settings) {
      console.log('Seeding initial event settings...');
      settings = new EventSettings({
        eventTitle: 'ACANS 2026 | National Seminar on Advanced Computing and Nuclear Science',
        eventSubtitle: 'Advanced Computing and Nuclear Science: Emerging Technologies, Interdisciplinary Applications and Research Opportunities',
        conferenceTitle: "Indian Nuclear Society's Annual Conference",
        conferenceSubtitle: 'Nuclear Energy & Nuclear Radiation: A Boon to Mankind',
        workshopTitle: 'Advanced Computing and Nuclear Science: Emerging Technologies, Interdisciplinary Applications and Research Opportunities',
        eventStartDate: '7 December 2026',
        eventEndDate: '9 December 2026',
        datesConfirmed: true,
        datesNote: '',
        venue: 'Dr. A.P.J. Abdul Kalam Women\'s Institute of Technology (WIT), Darbhanga, Bihar',
        venueAddress: 'Lalit Narayan Mithila University Campus, Darbhanga, Bihar 846004, India',
        aboutEvent: `ACANS 2026 brings together the Indian Nuclear Society's Annual Conference and the National Seminar on "Advanced Computing and Nuclear Science: Emerging Technologies, Interdisciplinary Applications and Research Opportunities." Hosted by Dr. A.P.J. Abdul Kalam Women's Institute of Technology (WIT), a constituent unit of Lalit Narayan Mithila University (LNMU), Darbhanga, Bihar, in collaboration with the Indian Nuclear Society (INS), this landmark gathering unites leading scientists, researchers, faculty, and research scholars to explore synergies between nuclear technologies and cutting-edge computational sciences.`,
        aboutINS: `The Indian Nuclear Society (INS) is the premier professional body established in 1988 dedicated to the advancement and peaceful applications of nuclear science, technology, and allied disciplines. INS organizes its flagship annual conference to convene scientific minds from DAE units including BARC, NPCIL, BHAVINI, IGCAR, VECC, and AERB, alongside university faculties and industry partners. It serves as a prestigious national forum discussing reactor safety, advanced computing, nuclear medicine, radiation technology, and clean energy transition.`,
        aboutLNMU: `Lalit Narayan Mithila University (LNMU), established in 1972, is an esteemed state university situated in the historic city of Darbhanga, Bihar. Named in honour of the illustrious leader and philosopher Lalit Narayan Mishra, LNMU is a major hub of higher learning and research in North Bihar, providing quality education across arts, science, commerce, law, medicine, and engineering through numerous constituent and affiliated institutions.`,
        aboutWIT: `Dr. A.P.J. Abdul Kalam Women's Institute of Technology (WIT) is a prestigious constituent unit of Lalit Narayan Mithila University (LNMU), Darbhanga, Bihar. Approved by AICTE, WIT is dedicated to empowering women through world-class technical and engineering education. Inspired by Dr. Kalam's visionary ideals of innovation and nation-building, the institute fosters rigorous academics, interdisciplinary research, and leadership in emerging technologies.`,
        fees: {
          student: 500,
          research_scholar: 750,
          faculty: 1000,
        },
        paymentMethods: {
          upi: true,
          cash: true,
          bank_transfer: true,
        },
        paymentInstructions: 'Please submit registration fees according to instructions provided by Dr. A.P.J. Abdul Kalam Women\'s Institute of Technology (WIT), LNMU. After payment via UPI, Cash, or Bank Transfer, enter your transaction reference ID and proof below for administrative verification.',
        abstractWordLimit: 250,
        abstractInstructions: 'All submissions must conform to the official ACANS 2026 extended abstract template. Contributory paper abstracts must not exceed 2 pages including figures, tables, and references. The abstract text summary below should be within the configured word limit.',
        abstractTemplateFile: 'uploads/templates/Template_for_extended_abstract_INSAC-2026.docx',
        abstractTemplateName: 'Template for extended abstract (ACANS 2026).docx',
        registrationOpen: true,
        abstractSubmissionOpen: true,
        contactEmail: 'contact@insac2026.org',
        contactPhone: '+91 6272 246579',
        accommodation: 'Details regarding university guest house and nearby hotel accommodation in Darbhanga will be announced shortly.',
        travelInfo: 'Darbhanga is well-connected by air via Darbhanga Airport (DHR) with direct flights from Delhi, Mumbai, Bengaluru, and Kolkata. It is also well-connected by rail to major Indian cities.',
        importantDates: [
          { label: 'Conference Dates', date: '7–9 December 2026', confirmed: true },
          { label: 'Abstract Submission Deadline', date: 'To be announced', confirmed: false },
          { label: 'Notification of Acceptance', date: 'To be announced', confirmed: false },
          { label: 'Registration Deadline', date: 'To be announced', confirmed: false },
        ],
        committees: [
          // Office Bearers
          { name: 'Vice Chancellor', designation: 'Chief Patron', group: 'office_bearers', role: 'Chief Patron', sortOrder: 1 },
          { name: 'Registrar', designation: 'Patron', group: 'office_bearers', role: 'Patron', sortOrder: 2 },
          { name: 'Director', designation: 'President', group: 'office_bearers', role: 'President', sortOrder: 3 },
          { name: 'Dr. Rashmi', designation: 'Convener', group: 'office_bearers', role: 'Convener', sortOrder: 4 },
          { name: 'Mrs. Charmis Mariwala', designation: 'Deputy Convener', group: 'office_bearers', role: 'Deputy Convener', sortOrder: 5 },

          // Advisory - Physics
          { name: 'Prof. Naushad Alam', department: 'Physics', group: 'advisory_physics', sortOrder: 1 },
          { name: 'Dr. Pooja Agarwal', department: 'Physics', group: 'advisory_physics', sortOrder: 2 },
          { name: 'Dr. Sumandeep Kaur', department: 'Physics', group: 'advisory_physics', sortOrder: 3 },

          // Advisory - Chemistry
          { name: 'Dr. Abhishek Rai', department: 'Chemistry', group: 'advisory_chemistry', sortOrder: 1 },
          { name: 'Dr. Arindra Sharma', department: 'Chemistry', group: 'advisory_chemistry', sortOrder: 2 },

          // Advisory - Zoology
          { name: 'Dr. Parul Banergee', department: 'Zoology', group: 'advisory_zoology', sortOrder: 1 },

          // Advisory - Botany
          { name: 'Dr. Aniket Kumar Singh', department: 'Botany', group: 'advisory_botany', sortOrder: 1 },

          // Advisory - WIT
          { name: 'Mr. Amit Kumar Mishra', institution: 'WIT', group: 'advisory_wit', sortOrder: 1 },
          { name: 'Mrs. Neha Kumari', institution: 'WIT', group: 'advisory_wit', sortOrder: 2 },
          { name: 'Mr. Ashif Habibi', institution: 'WIT', group: 'advisory_wit', sortOrder: 3 },
          { name: 'Dr. Zakirullah Shamim', institution: 'WIT', group: 'advisory_wit', sortOrder: 4 },
          { name: 'Dr. Avinash Chandra', institution: 'WIT', group: 'advisory_wit', sortOrder: 5 },

          // Organizing Committee
          { name: 'Deputy Registrar (WIT)', group: 'organizing', sortOrder: 1 },
          { name: 'A.O.', group: 'organizing', sortOrder: 2 },
          { name: 'Deputy Registrar 1 (LNMU)', group: 'organizing', sortOrder: 3 },
          { name: 'Deputy Registrar 2 (LNMU)', group: 'organizing', sortOrder: 4 },
          { name: 'All teaching faculty (WIT)', group: 'organizing', sortOrder: 5 },
        ],
        themes: [
          // Seminar Themes
          { title: 'Advanced Computing Applications in Nuclear Science', category: 'workshop', sortOrder: 1, isPublished: true },
          { title: 'AI and Digital Twins for Nuclear Reactor Monitoring and Safety', category: 'workshop', sortOrder: 2, isPublished: true },
          { title: 'Advanced Computing Applications in Healthcare and Medical Sciences', category: 'workshop', sortOrder: 3, isPublished: true },
          { title: 'Nuclear Physics and Advanced Computing in Cancer Diagnosis and Treatment', category: 'workshop', sortOrder: 4, isPublished: true },
          { title: 'Advanced Computing for Molecular and Cellular Biology', category: 'workshop', sortOrder: 5, isPublished: true },
          { title: 'Hazard Prediction and Management', category: 'workshop', sortOrder: 6, isPublished: true },
          { title: 'GeoAI and High-Performance Computing for Nuclear Power Plant Siting and Environmental Risk Assessment', category: 'workshop', sortOrder: 7, isPublished: true },
          { title: 'AI, Machine Learning, Data Science, Cloud Computing, Cybersecurity, IoT, Generative AI, and Industry 5.0', category: 'workshop', sortOrder: 8, isPublished: true },

          // INSAC Conference Topics
          { title: '700 MWe PHWR: Work Horse of DAE', category: 'conference', sortOrder: 1, isPublished: true },
          { title: 'Innovation & Challenges in Design and Validation of SMRs and BSR-220', category: 'conference', sortOrder: 2, isPublished: true },
          { title: 'PFBR: Gateway to Thorium Utilization', category: 'conference', sortOrder: 3, isPublished: true },
          { title: 'Accelerating Nuclear Power: Role of PSUs and Private Industries in National Nuclear Mission', category: 'conference', sortOrder: 4, isPublished: true },
          { title: 'Developing Human Resources for Nuclear Power Sector', category: 'conference', sortOrder: 5, isPublished: true },
          { title: 'Advances in Reactor Technology for Gen III+ Reactors', category: 'conference', sortOrder: 6, isPublished: true },
          { title: 'Advances in Nuclear Fuel Cycle Technologies (From Ore to Core)', category: 'conference', sortOrder: 7, isPublished: true },
          { title: 'Advances in Fuel Reprocessing and Waste Management', category: 'conference', sortOrder: 8, isPublished: true },
          { title: 'Statutory Role of AERB and SHANTI Act', category: 'conference', sortOrder: 9, isPublished: true },
          { title: 'Recent Developments in Nuclear Technology for Agriculture and Food Security', category: 'conference', sortOrder: 10, isPublished: true },
          { title: 'Applications of Radioisotopes, Lasers and Electron Beam in Industry', category: 'conference', sortOrder: 11, isPublished: true },
          { title: 'Nuclear Medicine: Current Challenges and Innovations', category: 'conference', sortOrder: 12, isPublished: true },
          { title: 'Recent Advances in Fusion and Accelerator Technology', category: 'conference', sortOrder: 13, isPublished: true },
        ],
      });
      await settings.save();
      console.log('Event settings seeded successfully.');
    } else {
      let settingsUpdated = false;

      // Correct previously seeded event details without replacing other settings.
      if (settings.eventStartDate === '7 December 2026' && settings.eventEndDate === '11 December 2026') {
        settings.eventEndDate = '9 December 2026';
        settings.datesConfirmed = true;
        settings.datesNote = '';
        if (Array.isArray(settings.importantDates)) {
          settings.importantDates = settings.importantDates.map((item) =>
            item.date === '7–11 December 2026'
              ? { ...item.toObject(), label: 'Conference Dates', date: '7–9 December 2026', confirmed: true }
              : item,
          );
        }
        settingsUpdated = true;
      }

      const updateText = (field, replacements) => {
        if (typeof settings[field] !== 'string') return;
        const updated = replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), settings[field]);
        if (updated !== settings[field]) {
          settings[field] = updated;
          settingsUpdated = true;
        }
      };
      updateText('eventTitle', [[/INSAC[ -]?2026/gi, 'ACANS 2026'], [/\bWorkshop\b/gi, 'Seminar']]);
      updateText('conferenceTitle', [[/\s*\(INSAC[ -]?2026\)/gi, '']]);
      updateText('aboutEvent', [[/INSAC[ -]?2026/gi, 'ACANS 2026'], [/National Workshop/gi, 'National Seminar'], [/\bWorkshop\b/gi, 'Seminar']]);
      updateText('aboutINS', [[/\bINSAC\b/gi, 'annual conference']]);
      updateText('abstractInstructions', [[/INSAC[ -]?2026/gi, 'ACANS 2026']]);
      updateText('abstractTemplateName', [[/INSAC[ -]?2026/gi, 'ACANS 2026']]);
      if (Array.isArray(settings.announcements)) {
        settings.announcements.forEach((announcement) => {
          for (const field of ['title', 'content']) {
            if (typeof announcement[field] !== 'string') continue;
            const updated = announcement[field]
              .replace(/INSAC[ -]?2026/gi, 'ACANS 2026')
              .replace(/National Workshop/gi, 'National Seminar');
            if (updated !== announcement[field]) {
              announcement[field] = updated;
              settingsUpdated = true;
            }
          }
        });
      }
      if (Array.isArray(settings.themes)) {
        settings.themes.forEach((theme) => {
          for (const field of ['title', 'description']) {
            if (typeof theme[field] !== 'string') continue;
            const updated = theme[field].replace(/National Workshop/gi, 'National Seminar');
            if (updated !== theme[field]) {
              theme[field] = updated;
              settingsUpdated = true;
            }
          }
        });
      }

      // Ensure template path is set if empty
      if (!settings.abstractTemplateFile) {
        settings.abstractTemplateFile = 'uploads/templates/Template_for_extended_abstract_INSAC-2026.docx';
        settings.abstractTemplateName = 'Template for extended abstract (ACANS 2026).docx';
        settingsUpdated = true;
      }

      if (settingsUpdated) {
        await settings.save();
      }
    }

    // 2. Provision admin user if credentials configured
    if (config.admin.email && config.admin.password) {
      const existingAdmin = await User.findOne({ email: config.admin.email.toLowerCase() });
      if (!existingAdmin) {
        await User.create({
          fullName: config.admin.name || 'System Administrator',
          email: config.admin.email.toLowerCase(),
          password: config.admin.password,
          role: 'admin',
          isEmailVerified: true,
          consentGiven: true,
        });
        console.log(`Admin user auto-provisioned: ${config.admin.email}`);
      }
    }
  } catch (error) {
    console.error('Error in initDefaults:', error.message);
  }
}

module.exports = initDefaults;
