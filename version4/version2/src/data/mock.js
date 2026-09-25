/* ==========================================================================
   LexRecord — Judicial Case Processing & Precedent Archive
   Mock Datasets (District & Sessions Court, Tis Hazari / New Delhi)
   ========================================================================== */

export const MOCK_USERS = [
  {
    id: "steno-01",
    name: "Rajeshwar Sharma",
    role: "Stenographer Gr-I",
    court: "Court No. 4, Tis Hazari",
    avatar: "RS",
    defaultRoute: "/causelist",
  },
  {
    id: "reader-01",
    name: "Sunil K. Verma",
    role: "Court Reader / Peshkar",
    court: "Court No. 4, Tis Hazari",
    avatar: "SV",
    defaultRoute: "/causelist",
  },
  {
    id: "admin-01",
    name: "Justice K. M. Joseph (Retd.) / Registrar Bench",
    role: "Registrar / Bench Admin",
    court: "Principal Bench Admin",
    avatar: "KJ",
    defaultRoute: "/admin",
  },
];

export const PROCEEDING_STAGES = [
  "Examination-in-Chief",
  "Cross-Examination",
  "Re-Examination",
  "Section 313 CrPC Statement",
  "Arguments on Bail",
  "Framing of Charges",
  "Order / Judgment Dictation",
];

export const MOCK_CAUSELIST = [
  {
    id: "case-01",
    itemNo: "01",
    caseNo: "Sessions Case No. 14/2024",
    cnr: "DLCT01-002934-2024",
    courtRoom: "Court No. 4",
    judge: "Sh. A. K. Garg, Ld. ASJ",
    petitioner: "State (NCT of Delhi)",
    respondent: "Vikas @ Vicky & Anr.",
    advocateP: "Sh. R. S. Negi, Ld. Addl. PP",
    advocateR: "Sh. Ramesh Gupta, Senior Adv.",
    sections: "U/s 302/34 IPC & 25/54/59 Arms Act",
    stage: "Cross-Examination",
    time: "10:30 AM",
    status: "IN_PROGRESS", // IN_PROGRESS | SCHEDULED | CONCLUDED | ADJOURNED
    exhibitsCount: 6,
    depositionsCount: 18,
    witnessName: "PW-2 SI Vikram Rathore (IO)",
  },
  {
    id: "case-02",
    itemNo: "02",
    caseNo: "Crl. Rev. Pet. 89/2023",
    cnr: "DLCT01-001248-2023",
    courtRoom: "Court No. 4",
    judge: "Sh. A. K. Garg, Ld. ASJ",
    petitioner: "M/s Apex Logistics Pvt. Ltd.",
    respondent: "Rajinder Prasad & Ors.",
    advocateP: "Ms. Meenakshi Lekhi, Adv.",
    advocateR: "Sh. P. K. Dey, Adv.",
    sections: "U/s 397/401 CrPC r/w 420 IPC",
    stage: "Arguments on Bail",
    time: "11:45 AM",
    status: "SCHEDULED",
    exhibitsCount: 2,
    depositionsCount: 0,
    witnessName: "N/A",
  },
  {
    id: "case-03",
    itemNo: "03",
    caseNo: "Sessions Case No. 204/2023",
    cnr: "DLCT01-007890-2023",
    courtRoom: "Court No. 4",
    judge: "Sh. A. K. Garg, Ld. ASJ",
    petitioner: "State (Govt. of NCT)",
    respondent: "Mohammed Arif & 3 Ors.",
    advocateP: "Sh. R. S. Negi, Ld. Addl. PP",
    advocateR: "Sh. Salman Khurshid, Adv.",
    sections: "U/s 307/120-B IPC",
    stage: "Examination-in-Chief",
    time: "02:00 PM",
    status: "SCHEDULED",
    exhibitsCount: 4,
    depositionsCount: 8,
    witnessName: "PW-1 Dr. Rajesh Sharma",
  },
  {
    id: "case-04",
    itemNo: "04",
    caseNo: "Misc. Crl. App. 45/2024",
    cnr: "DLCT01-003310-2024",
    courtRoom: "Court No. 4",
    judge: "Sh. A. K. Garg, Ld. ASJ",
    petitioner: "Smt. Sunita Devi",
    respondent: "Satish Kumar & State",
    advocateP: "Sh. Alok Tripathi, Adv.",
    advocateR: "Sh. D. K. Sharma, Adv.",
    sections: "U/s 498-A/406/34 IPC",
    stage: "Framing of Charges",
    time: "03:15 PM",
    status: "SCHEDULED",
    exhibitsCount: 0,
    depositionsCount: 0,
    witnessName: "N/A",
  },
  {
    id: "case-05",
    itemNo: "05",
    caseNo: "Bail App. No. 1120/2024",
    cnr: "DLCT01-004552-2024",
    courtRoom: "Court No. 4",
    judge: "Sh. A. K. Garg, Ld. ASJ",
    petitioner: "Harpreet Singh Dhillon",
    respondent: "State (Cyber Cell)",
    advocateP: "Sh. K. T. S. Tulsi, Sr. Adv.",
    advocateR: "Sh. R. S. Negi, Ld. Addl. PP",
    sections: "U/s 419/420 IPC & 66-D IT Act",
    stage: "Order / Judgment Dictation",
    time: "04:00 PM",
    status: "CONCLUDED",
    exhibitsCount: 3,
    depositionsCount: 4,
    witnessName: "N/A",
  },
];

export const MOCK_WITNESSES = [
  {
    id: "wit-01",
    code: "PW-1",
    name: "Dr. Rajesh Sharma",
    role: "Chief Medical Officer, Aruna Asaf Ali Hospital",
    status: "Completed",
    exhibits: ["Ex. PW-1/A (MLC Report No. 894/23)", "Ex. PW-1/B (Post-Mortem Findings)"],
  },
  {
    id: "wit-02",
    code: "PW-2",
    name: "SI Vikram Rathore",
    role: "Investigating Officer, PS Kashmere Gate",
    status: "Under Deposition",
    exhibits: ["Ex. PW-2/A (Site Plan with Mark-A to C)", "Ex. PW-2/B (Seizure Memo of Weapon)"],
  },
  {
    id: "wit-03",
    code: "DW-1",
    name: "Anand Verma",
    role: "Alibi Witness / Defense",
    status: "Summoned for next date",
    exhibits: [],
  },
];

export const MOCK_TRANSCRIPT = [
  {
    id: "tr-001",
    timestamp: "10:30:14 AM",
    speaker: "court",
    speakerLabel: "HON'BLE COURT",
    text: "Matter called out. State versus Vikas @ Vicky and another. Ld. Addl. Public Prosecutor is present for the State. Sh. Ramesh Gupta, Ld. Senior Counsel represents accused Vikas who is produced from judicial custody. Let PW-2 SI Vikram Rathore step into the witness box.",
    type: "regular",
  },
  {
    id: "tr-002",
    timestamp: "10:31:02 AM",
    speaker: "court",
    speakerLabel: "HON'BLE COURT",
    text: "Oath administered to witness PW-2 SI Vikram Rathore as per Indian Oaths Act, 1969.",
    type: "regular",
  },
  {
    id: "tr-003",
    timestamp: "10:31:40 AM",
    type: "section_break",
    stage: "Cross-Examination of PW-2 (Continued by Defense)",
  },
  {
    id: "tr-004",
    timestamp: "10:32:05 AM",
    speaker: "defence",
    speakerLabel: "LD. DEFENCE COUNSEL",
    witnessName: "PW-2 SI Vikram Rathore",
    question: "Officer Rathore, please refer to your GD entry No. 42-A dated 14th November 2023. At what precise time did you reach the spot at Mori Gate?",
    answer: "I received DD No. 42-A at 21:15 hours and reached the spot along with Constable Sunil at approximately 21:35 hours.",
    type: "depo",
  },
  {
    id: "tr-005",
    timestamp: "10:33:18 AM",
    speaker: "defence",
    speakerLabel: "LD. DEFENCE COUNSEL",
    witnessName: "PW-2 SI Vikram Rathore",
    question: "Was there any public witness present at the time you sealed the country-made pistol recovered from the bush near the pavement?",
    answer: "I requested several passersby and shopkeepers of the adjacent market to join the recovery proceedings, but all of them declined citing urgency and personal commitments.",
    type: "depo",
  },
  {
    id: "tr-006",
    timestamp: "10:34:02 AM",
    type: "exhibit",
    exhibitNo: "Ex. PW-2/B",
    title: "Seizure Memo of Country-Made Firearm (.315 bore)",
    marker: "Admitted into record by Hon'ble Court without objection on admissibility; formal proof subject to Ballistic report.",
  },
  {
    id: "tr-007",
    timestamp: "10:35:10 AM",
    speaker: "app",
    speakerLabel: "LD. ADDL. PUBLIC PROSECUTOR",
    text: "Objection, Your Honour. The learned senior counsel is repeating the question regarding public witness notice under Section 160 CrPC which has already been clarified by the witness at page 4 of his cross-examination.",
    type: "regular",
  },
  {
    id: "tr-008",
    timestamp: "10:35:45 AM",
    speaker: "court",
    speakerLabel: "HON'BLE COURT",
    text: "Objection noted and overruled. Ld. Counsel may proceed to conclude this line of questioning within five minutes.",
    type: "regular",
  },
  {
    id: "tr-009",
    timestamp: "10:36:20 AM",
    speaker: "defence",
    speakerLabel: "LD. DEFENCE COUNSEL",
    witnessName: "PW-2 SI Vikram Rathore",
    question: "Did you serve any written notice under Section 100(8) CrPC upon those public persons who refused to join the seizure proceedings?",
    answer: "No, I did not serve any written notice due to paucity of time and emergent preservation of forensic evidence at the crime scene.",
    type: "depo",
  },
];

export const MOCK_ROZNAMA = [
  {
    id: "roz-01",
    itemNo: "01",
    caseNo: "Sessions Case No. 14/2024",
    petitioner: "State",
    respondent: "Vikas @ Vicky",
    proceedings: "PW-2 SI Vikram Rathore present and cross-examined in part. Ex. PW-2/B marked on record. Cross-examination deferred at request of defense counsel till 02:30 PM.",
    nextDate: "23-09-2026 (2:30 PM)",
    stage: "Cross-Examination (Contd.)",
  },
  {
    id: "roz-02",
    itemNo: "02",
    caseNo: "Crl. Rev. Pet. 89/2023",
    petitioner: "Apex Logistics",
    respondent: "Rajinder Prasad",
    proceedings: "Proxy counsel appeared for respondent seeking adjournment on grounds of indisposition of main counsel. Allowed subject to payment of Rs. 2,000 cost to DLSA.",
    nextDate: "14-10-2026",
    stage: "Arguments on Bail",
  },
  {
    id: "roz-03",
    itemNo: "03",
    caseNo: "Sessions Case No. 204/2023",
    petitioner: "State",
    respondent: "Mohammed Arif",
    proceedings: "Summons issued to PW-3 Dr. Anita Deshmukh through DCP concerned returnable on next date.",
    nextDate: "28-10-2026",
    stage: "Prosecution Evidence",
  },
  {
    id: "roz-04",
    itemNo: "04",
    caseNo: "Misc. Crl. App. 45/2024",
    petitioner: "Sunita Devi",
    respondent: "Satish Kumar",
    proceedings: "Parties referred to Delhi Mediation Centre, Tis Hazari Courts for exploration of amicable settlement. Report awaited.",
    nextDate: "05-11-2026",
    stage: "Mediation Proceedings",
  },
  {
    id: "roz-05",
    itemNo: "05",
    caseNo: "Bail App. No. 1120/2024",
    petitioner: "Harpreet Singh",
    respondent: "State",
    proceedings: "Arguments heard. Detailed order dictated in open court. Regular bail granted subject to furnishing personal bond of Rs. 50,000/- with one surety of like amount.",
    nextDate: "Disposed Of",
    stage: "Order Dictation (Disposed)",
  },
];

export const MOCK_ARCHIVE = [
  {
    id: "arch-01",
    caseNo: "Sessions Case No. 14/2024",
    title: "State vs. Vikas @ Vicky & Anr.",
    court: "Court No. 4, Tis Hazari Courts, Delhi",
    judge: "Sh. A. K. Garg, Ld. Additional Sessions Judge",
    cnr: "DLCT01-002934-2024",
    date: "23-09-2026",
    stage: "Part-Heard Trial (Evidence)",
    sections: "Sections 302, 34 IPC & Section 25 Arms Act",
    stats: {
      exhibits: 6,
      depositions: 18,
      orders: 4,
      witnesses: 2,
    },
    summary:
      "Trial proceeding relating to alleged firearm discharge near Kashmere Gate. PW-2 SI Vikram Rathore (IO) under extensive cross-examination on non-joining of independent public witnesses during seizure memo execution and forensic ballistic transit integrity.",
    precedentsCited: [
      "State of Rajasthan v. Teja Ram (1999) 3 SCC 507 — Failure to join independent witness not fatal to prosecution case.",
      "Pradeep Kumar v. State of Haryana (2020) SCC OnLine SC 892 — Substantive firearm recovery evidence under Section 27 Evidence Act.",
    ],
    fullText: `IN THE COURT OF SH. A. K. GARG, LD. ADDITIONAL SESSIONS JUDGE-03,
CENTRAL DISTRICT, TIS HAZARI COURTS, DELHI

Sessions Case No.: 14/2024
CNR No.: DLCT01-002934-2024
FIR No.: 412/2023
Police Station: Kashmere Gate
Under Section: 302/34 IPC & 25/54/59 Arms Act

STATE (GOVT. OF NCT OF DELHI)
VERSUS
VIKAS @ VICKY & ANR.

RECORD OF DEPOSITION & DAILY ORDER (23-09-2026)
PW-2 SI Vikram Rathore, S/o Late Sh. Mahender Rathore, Age 42 years, Posted as Sub-Inspector, Police Station Kashmere Gate, Delhi.

ON S.A.
CROSS-EXAMINATION BY SH. RAMESH GUPTA, LD. SENIOR COUNSEL FOR ACCUSED VIKAS.

Q. Officer Rathore, please refer to your GD entry No. 42-A dated 14th November 2023. At what precise time did you reach the spot at Mori Gate?
Ans. I received DD No. 42-A at 21:15 hours and reached the spot along with Constable Sunil at approximately 21:35 hours.

Q. Was there any public witness present at the time you sealed the country-made pistol recovered from the bush near the pavement?
Ans. I requested several passersby and shopkeepers of the adjacent market to join the recovery proceedings, but all of them declined citing urgency and personal commitments.

[Court Exhibit Marked: Ex. PW-2/B - Seizure Memo of Country-Made Firearm (.315 bore) with two live cartridges]

Q. Did you serve any written notice under Section 100(8) CrPC upon those public persons who refused to join the seizure proceedings?
Ans. No, I did not serve any written notice due to paucity of time and emergent preservation of forensic evidence at the crime scene.

At this stage, at 11:30 AM, Ld. Senior Counsel requests deferment till post-lunch session due to hearing before Hon'ble High Court of Delhi.
Heard. Request allowed. Be put up for remaining cross-examination at 02:30 PM today sharp.

(A. K. GARG)
Additional Sessions Judge-03
Tis Hazari Courts, Delhi / 23.09.2026`,
  },
  {
    id: "arch-02",
    caseNo: "Sessions Case No. 204/2023",
    title: "State vs. Mohammed Arif & Ors.",
    court: "Court No. 4, Tis Hazari Courts, Delhi",
    judge: "Sh. A. K. Garg, Ld. Additional Sessions Judge",
    cnr: "DLCT01-007890-2023",
    date: "18-09-2026",
    stage: "Prosecution Evidence",
    sections: "Sections 307, 120-B IPC",
    stats: {
      exhibits: 4,
      depositions: 8,
      orders: 6,
      witnesses: 1,
    },
    summary:
      "Examination-in-chief of Medical Officer PW-1 Dr. Rajesh Sharma. Nature of grievous sharp-edged weapon injuries verified as dangerous to life in ordinary course of nature.",
    precedentsCited: [
      "State of Maharashtra v. Balram Bama Patil (1983) 2 SCC 28 — Proof of intention under S. 307 IPC irrespective of injury severity.",
    ],
    fullText: `IN THE COURT OF SH. A. K. GARG, ASJ-03, TIS HAZARI, DELHI
SC No. 204/2023: State v. Mohammed Arif
Examination-in-chief of PW-1 Dr. Rajesh Sharma, CMO. MLC No. 894/23 marked as Ex. PW-1/A. Doctor identified his signatures and affirmed that injury was incised wound on cervical spine. Cross deferred.`,
  },
  {
    id: "arch-03",
    caseNo: "Bail App. No. 1120/2024",
    title: "Harpreet Singh Dhillon vs. State (Cyber Cell)",
    court: "Court No. 4, Tis Hazari Courts, Delhi",
    judge: "Sh. A. K. Garg, Ld. Additional Sessions Judge",
    cnr: "DLCT01-004552-2024",
    date: "22-09-2026",
    stage: "Bail Disposal",
    sections: "Sections 419, 420 IPC & Section 66-D IT Act",
    stats: {
      exhibits: 3,
      depositions: 0,
      orders: 2,
      witnesses: 0,
    },
    summary:
      "Regular bail application argued extensively on digital audit logs, IP header verification, and non-compliance of Section 41-A CrPC mandate per Arnesh Kumar guidelines.",
    precedentsCited: [
      "Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 — Mandatory guidelines on arrest under offenses punishable with less than 7 years.",
      "Satender Kumar Antil v. CBI (2022) 10 SCC 51 — Guidelines on bail classifications and undertrial liberties.",
    ],
    fullText: `IN THE COURT OF SH. A. K. GARG, ASJ-03, TIS HAZARI, DELHI
Bail App. No. 1120/2024: Harpreet Singh v. State
Order dictated: Investigation complete, charge-sheet filed, applicant in custody since 94 days. Bail granted on Rs. 50,000 surety.`,
  },
  {
    id: "arch-04",
    caseNo: "Crl. Rev. Pet. 89/2023",
    title: "M/s Apex Logistics Pvt. Ltd. vs. Rajinder Prasad",
    court: "Court No. 4, Tis Hazari Courts, Delhi",
    judge: "Sh. A. K. Garg, Ld. Additional Sessions Judge",
    cnr: "DLCT01-001248-2023",
    date: "10-09-2026",
    stage: "Revision Arguments",
    sections: "Sections 397/401 CrPC r/w 420 IPC",
    stats: {
      exhibits: 2,
      depositions: 0,
      orders: 5,
      witnesses: 0,
    },
    summary:
      "Revision against summoning order passed by Ld. Metropolitan Magistrate in a commercial freight consignment dispute alleging breach of trust vs. civil breach of contract.",
    precedentsCited: [
      "Hriday Narain v. State of Bihar (2000) — Distinguishing civil breach from cheating at inception.",
    ],
    fullText: `IN THE COURT OF SH. A. K. GARG, ASJ-03, TIS HAZARI, DELHI
Crl. Rev. Pet. 89/2023: Apex Logistics v. Rajinder Prasad
Trial court record requisitioned and perused. Arguments part-heard.`,
  },
  {
    id: "arch-05",
    caseNo: "Sessions Case No. 88/2022",
    title: "State vs. Gurpreet Singh @ Gopi",
    court: "Court No. 4, Tis Hazari Courts, Delhi",
    judge: "Sh. A. K. Garg, Ld. Additional Sessions Judge",
    cnr: "DLCT01-008120-2022",
    date: "04-08-2026",
    stage: "Judgment Pronounced",
    sections: "Sections 392, 397 IPC",
    stats: {
      exhibits: 14,
      depositions: 32,
      orders: 19,
      witnesses: 6,
    },
    summary:
      "Armed robbery at GT Karnal Road petrol station. Conviction recorded based on test identification parade (TIP) corroboration and recovered currency denomination match.",
    precedentsCited: [
      "Ravi @ Ravichandran v. State (2007) 15 SCC 372 — Evidentiary weight of TIP in armed robbery trials.",
    ],
    fullText: `IN THE COURT OF SH. A. K. GARG, ASJ-03, TIS HAZARI, DELHI
SC No. 88/2022: State v. Gurpreet Singh
Final Judgment: Accused Gurpreet Singh found guilty U/s 392 r/w 397 IPC. Convicted. Sentence hearing adjourned to 11.08.2026.`,
  },
  {
    id: "arch-06",
    caseNo: "Crl. Case No. 512/2024",
    title: "State (EOW) vs. Rakesh Jhunjhunwala & Ors.",
    court: "Court No. 4, Tis Hazari Courts, Delhi",
    judge: "Sh. A. K. Garg, Ld. Additional Sessions Judge",
    cnr: "DLCT01-009943-2024",
    date: "28-07-2026",
    stage: "Framing of Charges",
    sections: "Sections 409, 420, 120-B IPC",
    stats: {
      exhibits: 22,
      depositions: 0,
      orders: 8,
      witnesses: 0,
    },
    summary:
      "Multi-crore cooperative society deposit siphoning. Defense argued lack of direct entrustment under Section 409 IPC against non-executive directors.",
    precedentsCited: [
      "S.M.S. Pharmaceuticals Ltd. v. Neeta Bhalla (2005) 8 SCC 89 — Specific vicarious liability averments requirement.",
    ],
    fullText: `IN THE COURT OF SH. A. K. GARG, ASJ-03, TIS HAZARI, DELHI
CC No. 512/2024: State (EOW) v. Rakesh Jhunjhunwala
Order on charge: Prima facie case made out U/s 420/120-B IPC against A-1 to A-3. Discharged U/s 409 IPC. Formal charges framed.`,
  },
  {
    id: "arch-07",
    caseNo: "Sessions Case No. 341/2023",
    title: "State vs. Deepak Kumar",
    court: "Court No. 4, Tis Hazari Courts, Delhi",
    judge: "Sh. A. K. Garg, Ld. Additional Sessions Judge",
    cnr: "DLCT01-004412-2023",
    date: "15-07-2026",
    stage: "Statement U/s 313 CrPC",
    sections: "Section 304 Part-II IPC",
    stats: {
      exhibits: 8,
      depositions: 12,
      orders: 11,
      witnesses: 4,
    },
    summary:
      "Fatal vehicular collision on Ring Road. All 42 incriminating prosecution circumstances put to the accused under Section 313 CrPC. Accused pleaded false implication and elected to lead defense evidence.",
    precedentsCited: [
      "Reena Hazarika v. State of Assam (2019) 13 SCC 289 — Duty of trial court to examine defense explanation in S. 313 statement.",
    ],
    fullText: `IN THE COURT OF SH. A. K. GARG, ASJ-03, TIS HAZARI, DELHI
SC No. 341/2023: State v. Deepak Kumar
Accused examined U/s 313 CrPC. Total 42 questions framed and put. Accused stated brake failure occurred. DE opted. List on 02.08.2026 for DWs.`,
  },
  {
    id: "arch-08",
    caseNo: "Sessions Case No. 91/2024",
    title: "State vs. Amit Sharma & Anr.",
    court: "Court No. 4, Tis Hazari Courts, Delhi",
    judge: "Sh. A. K. Garg, Ld. Additional Sessions Judge",
    cnr: "DLCT01-003189-2024",
    date: "02-07-2026",
    stage: "Order on Evidence Admissibility",
    sections: "Sections 376-D, 506 IPC",
    stats: {
      exhibits: 5,
      depositions: 6,
      orders: 7,
      witnesses: 2,
    },
    summary:
      "Admissibility of electronic WhatsApp audio conversations and CDR cellular triangulation in absence of Section 65-B Indian Evidence Act certificate at filing stage.",
    precedentsCited: [
      "Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020) 7 SCC 1 — Mandatory nature of Section 65-B(4) certificate for secondary electronic records.",
    ],
    fullText: `IN THE COURT OF SH. A. K. GARG, ASJ-03, TIS HAZARI, DELHI
SC No. 91/2024: State v. Amit Sharma
Order: Prosecution granted 2 weeks liberty to procure Section 65-B certificate from Nodal Officer Bharti Airtel. Audio playback deferred.`,
  },
];
