// ============================================================================
// Data Layer - Abstracted API Service
// Ready to be swapped with actual fetch/axios calls to a real backend.
// ============================================================================

const MOCK_USERS = [
  { id: 'u1', name: 'Ramkishore Gupta', email: 'steno@court.in', password: 'demo123', role: 'Court Stenographer (PA)', court: 'District & Sessions Court, Lucknow · Court No. 3', status: 'Active' },
  { id: 'u2', name: 'Anjali Verma', email: 'reader@court.in', password: 'demo123', role: 'Ahlmad / Bench Clerk', court: 'District & Sessions Court, Lucknow · Court No. 3', status: 'Active' },
  { id: 'u3', name: 'Shri R.K. Mehta', email: 'admin@court.in', password: 'admin123', role: 'Presiding Officer', court: 'District & Sessions Court, Lucknow · Court No. 3', status: 'Active' }
];

const MOCK_CAUSELIST = [
  { id: 'c1', sr: '01', caseNo: 'Sessions Case No. 14/2024', type: 'Criminal', badgeClass: 'badge-criminal', partiesPrimary: 'State of U.P. v. Ramesh Kumar @ Ramu', sections: 'U/S 302, 201, 34 IPC · FIR No. 112/2024, P.S. Hazratganj', stage: 'Cross-Examination', isExamStage: true, counselP: 'Ld. APP Sh. D.K. Sharma', counselD: 'Ld. Adv. Mohit Srivastava', status: 'In Progress', statusBadge: 'badge-active', judge: 'Shri R.K. Mehta, Addl. Sessions Judge', policeStation: 'P.S. Hazratganj, Lucknow', firNo: '112/2024' },
  { id: 'c2', sr: '02', caseNo: 'C.C. No. 88/2023', type: 'Criminal', badgeClass: 'badge-criminal', partiesPrimary: 'State of U.P. v. Sunita Devi & Ors.', sections: 'U/S 498-A, 406 IPC & Sec 3/4 D.P. Act · FIR No. 45/2023', stage: 'Examination-in-Chief', isExamStage: true, counselP: 'Ld. APP Sh. P.N. Singh', counselD: 'Ld. Adv. Reena Joshi', status: 'Pending', statusBadge: 'badge-pending', judge: 'Shri R.K. Mehta, Addl. Sessions Judge', policeStation: 'P.S. Gomti Nagar, Lucknow', firNo: '45/2023' },
  { id: 'c3', sr: '03', caseNo: 'O.S. No. 231/2025', type: 'Civil', badgeClass: 'badge-civil', partiesPrimary: 'Patel Construction Pvt. Ltd. v. NOIDA Authority', sections: 'Specific Relief Act & Recovery of Dues (Commercial Suit)', stage: 'Final Arguments', isExamStage: false, counselP: 'Ld. Adv. Arun Khanna', counselD: 'Ld. Adv. S.K. Rao, Standing Counsel', status: 'Pending', statusBadge: 'badge-pending', judge: 'Shri R.K. Mehta, Addl. Sessions Judge', policeStation: 'N/A (Civil Jurisdiction)', firNo: 'Civil Suit 231/2025' },
  { id: 'c4', sr: '04', caseNo: 'W.P.(C) No. 2341/2025', type: 'Writ', badgeClass: 'badge-writ', partiesPrimary: 'Meena Kumari v. State of U.P. & Ors.', sections: 'Art. 226 Constitution of India · Retiral Dues & Gratuity', stage: 'Framing of Issues', isExamStage: false, counselP: 'Ld. Adv. Vivek Tiwari', counselD: 'Ld. CGSC Sh. A. Bajpai', status: 'Adjourned', statusBadge: 'badge-adjourned', judge: 'Shri R.K. Mehta, Addl. Sessions Judge', policeStation: 'N/A (Writ Jurisdiction)', firNo: 'Misc. App. 11/2025' },
];

const MOCK_ARCHIVE = [
  { 
    id: 'a1', caseNo: 'Sessions Case No. 89/2023', type: 'Criminal', badgeClass: 'badge-criminal', 
    title: 'State of U.P. v. Mahendra Pratap Singh', parties: 'P.S. Gomti Nagar · Sec 302, 120-B IPC', 
    excerpt: 'The delay in lodging GD entry was held not fatal where medical emergency was documented.', 
    stages: ['Chief Exam', 'Cross Exam', 'Final Arguments', 'Conviction Order'], 
    date: '18.11.2025', judge: 'Shri V.K. Chaturvedi, A.S.J.', duration: '2h 45m', sessions: '6 sessions',
    transcriptEntries: [
      { type: 'section-break', label: '— CROSS-EXAMINATION BY DEFENCE —' },
      { type: 'depo', examiner: 'Examined by Ld. Defence Counsel Sh. K.L. Sharma', time: '14:22:10', q: 'Is it correct that you did not seal the weapon at the spot of recovery?', a: 'I do not remember the exact sequence, but the Malkhana register will reflect the truth.' },
      { type: 'depo', examiner: 'Examined by Ld. Defence Counsel Sh. K.L. Sharma', time: '14:23:45', q: 'I put it to you that the weapon was planted by the police to frame my client.', a: 'It is incorrect to suggest so.' },
      { type: 'section-break', label: '— PRONOUNCEMENT OF ORDER —' },
      { type: 'entry', speaker: "HON'BLE COURT", time: '16:00:00', text: 'Having perused the material on record and the testimonies, it is evident that the prosecution has failed to prove the case beyond reasonable doubt. The accused is hereby acquitted.' }
    ]
  },
  { 
    id: 'a2', caseNo: 'C.C. No. 142/2022', type: 'Criminal', badgeClass: 'badge-criminal', 
    title: 'State v. Rajesh @ Babloo', parties: 'P.S. Alambagh · Sec 392, 397 IPC', 
    excerpt: 'Court ruled disclosure statement valid regarding the recovery of weapon under Section 27 Indian Evidence Act.', 
    stages: ['Witness Deposition', 'S.313 CrPC', 'Acquittal Order'], 
    date: '04.09.2025', judge: 'Smt. Alpana Roy', duration: '1h 30m', sessions: '4 sessions',
    transcriptEntries: [
      { type: 'section-break', label: '— WITNESS DEPOSITION —' },
      { type: 'depo', examiner: 'Examined by Ld. APP', time: '10:15:00', q: 'What happened on the night of the incident?', a: 'I saw the accused running away with a bag.' },
      { type: 'exhibit', label: 'Ex. P-1 marked — Copy of Bag Recovery Memo' },
      { type: 'entry', speaker: "HON'BLE COURT", time: '10:18:20', text: 'The witness is directed to produce the original receipt at the next date of hearing.' }
    ]
  },
];

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  login: async (email, password) => {
    await delay(500);
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    return user;
  },

  fetchCauselist: async () => {
    await delay(300);
    return MOCK_CAUSELIST;
  },

  fetchArchive: async (query = '') => {
    await delay(400);
    if (!query) return MOCK_ARCHIVE;
    return MOCK_ARCHIVE.filter(a => 
      a.caseNo.toLowerCase().includes(query.toLowerCase()) || 
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  },

  fetchUsers: async () => {
    await delay(300);
    return MOCK_USERS;
  },

  addCase: async (newCase) => {
    await delay(300);
    const id = 'c' + (MOCK_CAUSELIST.length + 1);
    const sr = (MOCK_CAUSELIST.length + 1).toString().padStart(2, '0');
    const caseObj = { id, sr, ...newCase };
    MOCK_CAUSELIST.push(caseObj);
    return caseObj;
  }
};
