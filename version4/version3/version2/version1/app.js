/**
 * LexRecord — Court Stenographer Automation & Judicial Precedent System
 * Designed for Indian District & Sessions Courts
 * 
 * Frontend Presentation Layer
 */

// ============================================================================
// State Management
// ============================================================================
const state = {
  currentView: 'login',           // 'login' | 'causelist' | 'workspace' | 'archive' | 'admin'
  currentUser: null,              // Logged in user object
  activeCase: null,               // Currently selected case object
  isRecording: false,             // Recording state indicator
  activeStage: 'Cross-Examination', // Current court procedural stage
  exhibitCount: 3,                // Current marked exhibit counter
  exhibitList: ['PW-1/A', 'PW-1/B', 'PW-2/A'],
  witnessList: [
    { name: 'Ramesh Yadav, Sub-Inspector', meta: 'PW-3 · Prosecution Witness' },
    { name: 'Dr. Sunita Pathak, CMO', meta: 'PW-4 · Expert Medical Witness' },
    { name: 'Anil Kumar Mishra, Shopkeeper', meta: 'DW-1 · Defence Witness' }
  ],
  activeWitnessIndex: 0,
  elapsedSeconds: 842,            // Initial seed clock (14m 02s)
  timerInterval: null,
  currentNotes: 'Witness admits to arriving at spot at 23:45 hrs. Defence focusing on discrepancy in GD entry No. 42.',
  adminActiveTab: 'users',        // 'users' | 'causelists' | 'allcases' | 'roznama' | 'settings'
  archiveSearchQuery: '',
  activeModal: null,
  roznamaDate: '2026-09-23'
};

// ============================================================================
// Seed Data (Tailored for Indian Judicial Context)
// ============================================================================
const MOCK_USERS = [
  {
    id: 'u1',
    name: 'Ramkishore Gupta',
    email: 'steno@court.in',
    password: 'demo123',
    role: 'Stenographer',
    court: 'District & Sessions Court, Lucknow · Court No. 3',
    status: 'Active'
  },
  {
    id: 'u2',
    name: 'Anjali Verma',
    email: 'reader@court.in',
    password: 'demo123',
    role: 'Reader / Clerk',
    court: 'District & Sessions Court, Lucknow · Court No. 3',
    status: 'Active'
  },
  {
    id: 'u3',
    name: 'Smt. Priya Sharma',
    email: 'admin@court.in',
    password: 'admin123',
    role: 'Registrar',
    court: 'District & Sessions Court, Lucknow · Court No. 3',
    status: 'Active'
  }
];

const MOCK_CAUSELIST = [
  {
    id: 'c1',
    sr: '01',
    caseNo: 'Sessions Case No. 14/2024',
    type: 'Criminal',
    badgeClass: 'badge-criminal',
    partiesPrimary: 'State of U.P. v. Ramesh Kumar @ Ramu',
    sections: 'U/S 302, 201, 34 IPC · FIR No. 112/2024, P.S. Hazratganj',
    stage: 'Cross-Examination',
    isExamStage: true,
    counselP: 'Ld. APP Sh. D.K. Sharma',
    counselD: 'Ld. Adv. Mohit Srivastava',
    status: 'In Progress',
    statusBadge: 'badge-active',
    judge: 'Shri R.K. Mehta, Addl. Sessions Judge',
    policeStation: 'P.S. Hazratganj, Lucknow',
    firNo: '112/2024'
  },
  {
    id: 'c2',
    sr: '02',
    caseNo: 'C.C. No. 88/2023',
    type: 'Criminal',
    badgeClass: 'badge-criminal',
    partiesPrimary: 'State of U.P. v. Sunita Devi & Ors.',
    sections: 'U/S 498-A, 406 IPC & Sec 3/4 D.P. Act · FIR No. 45/2023',
    stage: 'Examination-in-Chief',
    isExamStage: true,
    counselP: 'Ld. APP Sh. P.N. Singh',
    counselD: 'Ld. Adv. Reena Joshi',
    status: 'Pending',
    statusBadge: 'badge-pending',
    judge: 'Shri R.K. Mehta, Addl. Sessions Judge',
    policeStation: 'P.S. Gomti Nagar, Lucknow',
    firNo: '45/2023'
  },
  {
    id: 'c3',
    sr: '03',
    caseNo: 'O.S. No. 231/2025',
    type: 'Civil',
    badgeClass: 'badge-civil',
    partiesPrimary: 'Patel Construction Pvt. Ltd. v. NOIDA Authority',
    sections: 'Specific Relief Act & Recovery of Dues (Commercial Suit)',
    stage: 'Final Arguments',
    isExamStage: false,
    counselP: 'Ld. Adv. Arun Khanna',
    counselD: 'Ld. Adv. S.K. Rao, Standing Counsel',
    status: 'Pending',
    statusBadge: 'badge-pending',
    judge: 'Shri R.K. Mehta, Addl. Sessions Judge',
    policeStation: 'N/A (Civil Jurisdiction)',
    firNo: 'Civil Suit 231/2025'
  },
  {
    id: 'c4',
    sr: '04',
    caseNo: 'W.P.(C) No. 2341/2025',
    type: 'Writ',
    badgeClass: 'badge-writ',
    partiesPrimary: 'Meena Kumari v. State of U.P. & Ors.',
    sections: 'Art. 226 Constitution of India · Retiral Dues & Gratuity',
    stage: 'Framing of Issues',
    isExamStage: false,
    counselP: 'Ld. Adv. Vivek Tiwari',
    counselD: 'Ld. CGSC Sh. A. Bajpai',
    status: 'Adjourned',
    statusBadge: 'badge-adjourned',
    judge: 'Shri R.K. Mehta, Addl. Sessions Judge',
    policeStation: 'N/A (Writ Jurisdiction)',
    firNo: 'Misc. App. 11/2025'
  },
  {
    id: 'c5',
    sr: '05',
    caseNo: 'Bail App. No. 47/2026',
    type: 'Criminal',
    badgeClass: 'badge-criminal',
    partiesPrimary: 'Suresh Prasad v. State of U.P.',
    sections: 'U/S 439 CrPC (Sec 376 IPC) · Regular Bail Hearing',
    stage: 'Bail Arguments',
    isExamStage: false,
    counselP: 'Ld. Adv. Deepa Nair',
    counselD: 'Ld. APP Sh. D.K. Sharma',
    status: 'Pending',
    statusBadge: 'badge-pending',
    judge: 'Shri R.K. Mehta, Addl. Sessions Judge',
    policeStation: 'P.S. Alambagh, Lucknow',
    firNo: '204/2025'
  }
];

// Pre-seeded authentic courtroom deposition entries
const MOCK_INITIAL_TRANSCRIPT = [
  {
    type: 'entry',
    speaker: "HON'BLE COURT",
    time: '11:15:04',
    text: 'Let the judicial record reflect that Sessions Case No. 14 of 2024 is called out for hearing. Accused Ramesh Kumar @ Ramu is present from judicial custody with learned Defence Counsel Shri Mohit Srivastava. Learned Additional Public Prosecutor Shri D.K. Sharma is present for the State. Sub-Inspector Ramesh Yadav is called to the witness stand.'
  },
  {
    type: 'section-break',
    label: '— EXAMINATION-IN-CHIEF BY STATE (LD. APP) —'
  },
  {
    type: 'depo',
    examiner: 'Examined by Ld. APP Sh. D.K. Sharma',
    time: '11:16:22',
    q: 'Sub-Inspector Yadav, please state your current posting and whether you were on duty on the intervening night of 14th and 15th March 2024.',
    a: 'I am currently posted as Sub-Inspector at Police Station Hazratganj, Lucknow. On the night of 14th March 2024, I was on emergency duty officer roster starting from 20:00 hours to 08:00 hours the following morning.'
  },
  {
    type: 'depo',
    examiner: 'Examined by Ld. APP Sh. D.K. Sharma',
    time: '11:18:10',
    q: 'Did you receive any official transmission regarding an incident at Butler Palace Colony?',
    a: 'Yes, Sir. At approximately 23:45 hours, a telephonic PCR call flash was received at the station GD counter stating that an assault was taking place near Quarter No. 47, Butler Palace Colony. I made General Diary Entry No. 42 and immediately proceeded to the place of occurrence along with Constable Brijesh and Constable Satendra.'
  },
  {
    type: 'exhibit',
    label: 'Ex. PW-1/A marked — Original Station General Diary Entry No. 42 dt. 14.03.2024'
  },
  {
    type: 'section-break',
    label: '— CROSS-EXAMINATION BY DEFENCE COUNSEL (LD. ADV. M. SRIVASTAVA) —'
  },
  {
    type: 'depo',
    examiner: 'Cross-examined by Ld. Defence Counsel Sh. M. Srivastava',
    time: '11:21:40',
    q: 'Sub-Inspector, you stated that you received the information at 23:45 hours. Look at Exhibit PW-1/A and state why the formal First Information Report (Exhibit P-1) was registered only at 02:10 hours the next morning—an unexplained delay of nearly two and a half hours.',
    a: 'Sir, when we reached the spot, the injured victim required urgent medical attention. Our primary duty was to immediately escort him in the PCR van to King George Medical University (KGMU) Trauma Centre. The statement of the complainant could only be taken after securing the crime scene and medical triage.'
  },
  {
    type: 'entry',
    speaker: "LD. APP SH. D.K. SHARMA",
    time: '11:24:02',
    text: 'Learned Defence Counsel is attempting to mischaracterize medical emergency priority as procedural negligence, Your Honour.'
  },
  {
    type: 'entry',
    speaker: "HON'BLE COURT",
    time: '11:24:30',
    text: 'Objection noted. The witness has furnished his explanation for the timeline. Ld. Defence Counsel may proceed with specific questions regarding the spot panchnama.'
  },
  {
    type: 'exhibit',
    label: 'Ex. PW-1/B marked — Site Plan & Rough Sketch prepared by Investigating Officer'
  }
];

const MOCK_ARCHIVE = [
  {
    id: 'a1',
    caseNo: 'Sessions Case No. 89/2023',
    type: 'Criminal',
    badgeClass: 'badge-criminal',
    title: 'State of U.P. v. Mahendra Pratap Singh',
    parties: 'P.S. Gomti Nagar · Sec 302, 120-B IPC · Addl. Sessions Judge Court No. 1',
    excerpt: '...The legal principle of <span class="highlight">chain of circumstantial evidence</span> in midnight assault cases requires that every link must be conclusively established. The delay in lodging <span class="highlight">GD entry</span> was held not fatal where medical emergency was documented...',
    stages: ['Chief Exam', 'Cross Exam', 'Final Arguments', 'Conviction Order'],
    date: '18.11.2025',
    judge: 'Shri V.K. Chaturvedi, A.S.J.',
    duration: '2h 45m',
    sessions: '6 sessions'
  },
  {
    id: 'a2',
    caseNo: 'C.C. No. 142/2022',
    type: 'Criminal',
    badgeClass: 'badge-criminal',
    title: 'State v. Rajesh @ Babloo',
    parties: 'P.S. Alambagh · Sec 392, 397 IPC · Assistant Sessions Court',
    excerpt: '...Regarding the <span class="highlight">recovery of weapon</span> under Section 27 Indian Evidence Act, the absence of independent public panch witnesses during spot memo was scrutinized. Court ruled disclosure statement valid...',
    stages: ['Witness Deposition', 'S.313 CrPC', 'Acquittal Order'],
    date: '04.09.2025',
    judge: 'Smt. Alpana Roy, Addl. Chief Judicial Magistrate',
    duration: '1h 30m',
    sessions: '4 sessions'
  },
  {
    id: 'a3',
    caseNo: 'Commercial Suit No. 12/2024',
    type: 'Civil',
    badgeClass: 'badge-civil',
    title: 'Larsen & Toubro Ltd. v. Uttar Pradesh Jal Nigam',
    parties: 'Commercial Court, Lucknow · Arbitration Act Sec 34 & 37',
    excerpt: '...The scope of interference with arbitral award under Section 34 of the <span class="highlight">Arbitration and Conciliation Act</span> is limited to patent illegality appearing on the face of the award...',
    stages: ['Pleadings', 'Arguments on Award', 'Final Judgment'],
    date: '12.06.2025',
    judge: 'Shri Arvind Mishra, District Judge',
    duration: '3h 10m',
    sessions: '5 sessions'
  },
  {
    id: 'a4',
    caseNo: 'W.P.(C) No. 9182/2023',
    type: 'Writ',
    badgeClass: 'badge-writ',
    title: 'Dr. Akhilesh Chandra v. State of U.P. & KGMU',
    parties: 'High Court of Judicature at Allahabad (Lucknow Bench) · Service Matter',
    excerpt: '...Principles of <span class="highlight">natural justice</span> (Audi Alteram Partem) are violated if the inquiry report is not furnished to the delinquent employee prior to imposing punishment under CCS Rules...',
    stages: ['Interim Relief', 'Counter Affidavit', 'Disposed'],
    date: '22.03.2025',
    judge: 'Hon\'ble Justice D.K. Upadhyaya',
    duration: '1h 15m',
    sessions: '2 sessions'
  },
  {
    id: 'a5',
    caseNo: 'Criminal Appeal No. 512/2022',
    type: 'Criminal',
    badgeClass: 'badge-criminal',
    title: 'Dinesh Kumar v. State of U.P.',
    parties: 'High Court of Judicature at Allahabad · Sec 304 Part II IPC',
    excerpt: '...Where the injury was caused without premeditation in a sudden fight in the heat of passion, Exception 4 to Section 300 IPC applies. Conviction modified from <span class="highlight">Section 302 IPC</span> to Section 304 Part II...',
    stages: ['Appeal Arguments', 'Precedent Cited', 'Order Modified'],
    date: '14.01.2025',
    judge: 'Hon\'ble Justice Ramesh Sinha',
    duration: '2h 00m',
    sessions: '3 sessions'
  },
  {
    id: 'a6',
    caseNo: 'Complaint Case No. 892/2021',
    type: 'Criminal',
    badgeClass: 'badge-criminal',
    title: 'Sharma Financial Services v. M/s RealTech Infra',
    parties: 'P.S. Hazratganj · Section 138 Negotiable Instruments Act',
    excerpt: '...Statutory presumption under <span class="highlight">Section 139 NI Act</span> in favour of holder in due course was invoked. The drawer failed to raise a probable defence by preponderance of probabilities...',
    stages: ['Affidavit in Evidence', 'Cross Exam of Complainant', 'Judgment'],
    date: '08.12.2024',
    judge: 'Shri R.K. Mehta, Addl. Sessions Judge',
    duration: '45m',
    sessions: '3 sessions'
  }
];

const MOCK_ROZNAMA = [
  {
    sr: '01',
    caseNo: 'Sessions Case No. 14/2024',
    stageCompleted: 'Cross-Examination of PW-3 (Sub-Inspector Ramesh Yadav)',
    outcome: 'Part-heard · Continued to Afternoon Session',
    outcomeBadge: 'badge-active',
    nextDate: '23.09.2026 (2:00 PM)',
    signedBy: 'Shri R.K. Mehta, A.S.J.'
  },
  {
    sr: '02',
    caseNo: 'C.C. No. 88/2023',
    stageCompleted: 'Examination-in-Chief deferred on request of Ld. Counsel',
    outcome: 'Adjourned on payment of Rs. 500 costs to Legal Aid',
    outcomeBadge: 'badge-adjourned',
    nextDate: '14.10.2026',
    signedBy: 'Shri R.K. Mehta, A.S.J.'
  },
  {
    sr: '03',
    caseNo: 'O.S. No. 231/2025',
    stageCompleted: 'Written submissions filed by Standing Counsel',
    outcome: 'Reserved for Orders',
    outcomeBadge: 'badge-pending',
    nextDate: '29.09.2026',
    signedBy: 'Shri R.K. Mehta, A.S.J.'
  },
  {
    sr: '04',
    caseNo: 'W.P.(C) No. 2341/2025',
    stageCompleted: 'Framing of issues completed',
    outcome: 'Directed Petitioner to file list of witnesses within 7 days',
    outcomeBadge: 'badge-adjourned',
    nextDate: '03.11.2026',
    signedBy: 'Shri R.K. Mehta, A.S.J.'
  },
  {
    sr: '05',
    caseNo: 'Bail App. No. 47/2026',
    stageCompleted: 'Arguments heard on behalf of Applicant and State',
    outcome: 'Bail Granted on furnishing personal bond of Rs. 50,000/-',
    outcomeBadge: 'badge-civil',
    nextDate: 'Disposed',
    signedBy: 'Shri R.K. Mehta, A.S.J.'
  }
];

// ============================================================================
// Core Initialization
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Set default active case to the first matter
  state.activeCase = MOCK_CAUSELIST[0];
  state.transcriptEntries = [...MOCK_INITIAL_TRANSCRIPT];

  // Default initial view: login
  renderView('login');

  // Setup global keyboard shortcuts
  setupGlobalKeyboardShortcuts();
});

// ============================================================================
// View Router & Shell Renderers
// ============================================================================
function renderView(viewName) {
  state.currentView = viewName;
  const app = document.getElementById('app');
  app.innerHTML = '';

  if (viewName === 'login') {
    app.innerHTML = buildLoginView();
    attachLoginEvents();
    return;
  }

  // Post-login views reside inside .shell with sticky .topbar
  const shell = document.createElement('div');
  shell.className = 'shell';
  shell.innerHTML = buildTopbar();

  const mainContainer = document.createElement('main');
  mainContainer.id = 'main-view-container';

  if (viewName === 'causelist') {
    mainContainer.innerHTML = buildCauseListView();
    shell.appendChild(mainContainer);
    app.appendChild(shell);
    attachCauseListEvents();
  } else if (viewName === 'workspace') {
    mainContainer.innerHTML = buildWorkspaceView();
    shell.appendChild(mainContainer);
    app.appendChild(shell);
    attachWorkspaceEvents();
    renderTranscript();
    updateClockDisplay();
  } else if (viewName === 'archive') {
    mainContainer.innerHTML = buildArchiveView();
    shell.appendChild(mainContainer);
    app.appendChild(shell);
    attachArchiveEvents();
  } else if (viewName === 'admin') {
    mainContainer.innerHTML = buildAdminView();
    shell.appendChild(mainContainer);
    app.appendChild(shell);
    attachAdminEvents();
  }

  // Mount modal container & shortcut legend if not already present
  appendModalContainer(app);
  appendShortcutLegend(app);
  updateShortcutLegendVisibility();
  attachTopbarEvents();
}

// ============================================================================
// View Builders: Login
// ============================================================================
function buildLoginView() {
  return `
    <div class="view-login">
      <div class="login-left">
        <div class="login-left-sublabel">MINISTRY OF LAW &amp; JUSTICE · INDIA</div>
        <div class="login-divider-thin"></div>
        <div class="login-quote">
          The record of a court<br>
          is the memory<br>
          of justice.
        </div>
        <div class="login-gold-bar"></div>
        <div class="login-left-caption">
          District Court Judicial Recording &amp; Precedent Management System
        </div>
      </div>
      <div class="login-right">
        <div class="login-form-box">
          <h1 class="login-title">Sign In</h1>
          <p class="login-subtitle">Access your court docket and stenography workspace</p>

          <form id="login-form" class="login-fields">
            <div>
              <label class="field-label" for="login-email">Official Court Email</label>
              <input type="email" id="login-email" class="field-input" placeholder="e.g. steno@court.in" value="steno@court.in" required />
            </div>
            <div>
              <label class="field-label" for="login-password">Security Credentials</label>
              <input type="password" id="login-password" class="field-input" placeholder="••••••••" value="demo123" required />
              <div id="login-error" class="field-error">Invalid court credentials. Please check your credentials.</div>
            </div>
            <button type="submit" class="btn-primary" style="width: 100%; margin-top: 8px;">
              Access Workspace →
            </button>
          </form>

          <div class="login-demo-box">
            <div class="login-demo-title">Demo Court Personnel Accounts</div>
            <div class="login-demo-item" onclick="fillDemoLogin('steno@court.in', 'demo123')">
              <span class="login-demo-cred">steno@court.in / demo123</span>
              <span class="login-demo-role">Court Stenographer</span>
            </div>
            <div class="login-demo-item" onclick="fillDemoLogin('reader@court.in', 'demo123')">
              <span class="login-demo-cred">reader@court.in / demo123</span>
              <span class="login-demo-role">Reader / Bench Clerk</span>
            </div>
            <div class="login-demo-item" onclick="fillDemoLogin('admin@court.in', 'admin123')">
              <span class="login-demo-cred">admin@court.in / admin123</span>
              <span class="login-demo-role">Court Registrar (Admin)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function fillDemoLogin(email, pass) {
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  if (emailInput && passInput) {
    emailInput.value = email;
    passInput.value = pass;
  }
}

function attachLoginEvents() {
  const form = document.getElementById('login-form');
  const errorDiv = document.getElementById('login-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      state.currentUser = user;
      errorDiv.style.display = 'none';
      if (user.role === 'Registrar') {
        renderView('admin');
      } else {
        renderView('causelist');
      }
    } else {
      errorDiv.style.display = 'block';
    }
  });
}

// ============================================================================
// Topbar Builder
// ============================================================================
function buildTopbar() {
  const user = state.currentUser || MOCK_USERS[0];
  const isLive = state.isRecording;
  const isRegistrar = user.role === 'Registrar';

  return `
    <header class="topbar">
      <div class="topbar-logo-group" onclick="renderView('causelist')">
        <span class="topbar-logo">LexRecord</span>
        <div class="topbar-divider"></div>
        <span class="topbar-court-name">${user.court}</span>
      </div>

      <div class="topbar-spacer"></div>

      <!-- Live pulse indicator active when recording -->
      <div id="topbar-live-badge" class="topbar-live-badge ${isLive ? 'visible' : ''}">
        <span class="topbar-pulse-dot"></span>
        RECORDING PROCEEDINGS
      </div>

      <div class="topbar-date">23.09.2026</div>

      <div class="topbar-user-pill">
        <span>${user.name}</span>
        <span class="topbar-user-role">· ${user.role}</span>
      </div>

      <nav class="topbar-nav">
        <button class="btn-ghost" onclick="renderView('causelist')" ${state.currentView === 'causelist' ? 'style="color: var(--accent);"' : ''}>Cause List</button>
        <button class="btn-ghost" onclick="renderView('archive')" ${state.currentView === 'archive' ? 'style="color: var(--accent);"' : ''}>Precedent Archive</button>
        ${isRegistrar ? `<button class="btn-ghost" onclick="renderView('admin')" ${state.currentView === 'admin' ? 'style="color: var(--accent);"' : ''}>Administration</button>` : ''}
        <button class="btn-ghost" onclick="signOutUser()" style="color: var(--text-tertiary);">Sign Out</button>
      </nav>
    </header>
  `;
}

function attachTopbarEvents() {
  // Any special topbar wiring
}

function signOutUser() {
  stopSessionTimer();
  state.isRecording = false;
  state.currentUser = null;
  renderView('login');
}

// ============================================================================
// View Builders: Cause List (Daily Docket)
// ============================================================================
function buildCauseListView() {
  const rowsHtml = MOCK_CAUSELIST.map((item, idx) => {
    return `
      <tr onclick="openCaseInWorkspace('${item.id}')">
        <td class="td-sr">${item.sr}</td>
        <td class="td-caseno">${item.caseNo}</td>
        <td><span class="badge ${item.badgeClass}">${item.type}</span></td>
        <td>
          <div class="td-parties-primary">${item.partiesPrimary}</div>
          <div class="td-parties-sections">${item.sections}</div>
        </td>
        <td class="td-stage ${item.isExamStage ? 'highlight' : ''}">${item.stage}</td>
        <td>
          <div class="td-counsel-p">${item.counselP}</div>
          <div class="td-counsel-d">${item.counselD}</div>
        </td>
        <td><span class="badge ${item.statusBadge}">${item.status}</span></td>
        <td><span class="td-action-link">Open for Recording →</span></td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-causelist">
      <div class="causelist-header">
        <div class="causelist-title-group">
          <h1>Today's Daily Cause List</h1>
          <p>Court No. 3 · Shri R.K. Mehta, Additional Sessions Judge · Tuesday, 23 September 2026</p>
        </div>
        <div>
          <button class="btn-secondary" onclick="openModal('add-case')">
            + Add Matter to Cause List
          </button>
        </div>
      </div>

      <div class="causelist-filter-bar">
        <input type="text" id="causelist-search" class="field-input causelist-search-input" placeholder="Filter by case number, party, or counsel..." onkeyup="filterCauseList(this.value)" />
        <select class="field-input causelist-filter-select" onchange="filterCauseListByType(this.value)">
          <option value="ALL">All Case Types</option>
          <option value="Criminal">Criminal</option>
          <option value="Civil">Civil</option>
          <option value="Writ">Writ</option>
        </select>
      </div>

      <div class="causelist-table-container">
        <table class="cause-table">
          <thead>
            <tr>
              <th style="width: 44px; text-align: center;">Sr.</th>
              <th>Case Number</th>
              <th>Type</th>
              <th>Parties &amp; Charged Sections</th>
              <th>Stage of Hearing</th>
              <th>Learned Counsel</th>
              <th>Status</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody id="causelist-tbody">
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <div class="causelist-footer">
        <span>Showing ${MOCK_CAUSELIST.length} matters scheduled on board</span>
        <span>Judicial hours: 10:30 AM – 04:30 PM · Lunch Recess: 01:30 PM – 02:00 PM</span>
      </div>
    </div>
  `;
}

function filterCauseList(query) {
  const q = query.toLowerCase();
  const rows = document.querySelectorAll('#causelist-tbody tr');
  rows.forEach((r, idx) => {
    const item = MOCK_CAUSELIST[idx];
    if (!item) return;
    const match = item.caseNo.toLowerCase().includes(q) ||
                  item.partiesPrimary.toLowerCase().includes(q) ||
                  item.sections.toLowerCase().includes(q) ||
                  item.counselP.toLowerCase().includes(q) ||
                  item.counselD.toLowerCase().includes(q);
    r.style.display = match ? '' : 'none';
  });
}

function filterCauseListByType(type) {
  const rows = document.querySelectorAll('#causelist-tbody tr');
  rows.forEach((r, idx) => {
    const item = MOCK_CAUSELIST[idx];
    if (!item) return;
    if (type === 'ALL' || item.type === type) {
      r.style.display = '';
    } else {
      r.style.display = 'none';
    }
  });
}

function openCaseInWorkspace(caseId) {
  const c = MOCK_CAUSELIST.find(item => item.id === caseId);
  if (c) {
    state.activeCase = c;
    state.activeStage = c.stage;
    renderView('workspace');
  }
}

function attachCauseListEvents() {
  // Ready
}

// ============================================================================
// View Builders: Stenographer Workspace
// ============================================================================
function buildWorkspaceView() {
  const c = state.activeCase || MOCK_CAUSELIST[0];
  const isExam = isExaminationStage(state.activeStage);
  const currentWitness = state.witnessList[state.activeWitnessIndex] || state.witnessList[0];

  const exhibitTags = state.exhibitList.map(e => `<span class="exhibit-tag">${e}</span>`).join('');

  return `
    <div class="workspace">
      <!-- Top Action Bar -->
      <div class="action-bar">
        <button class="btn-ghost" onclick="renderView('causelist')">← Cause List</button>
        <div class="ab-divider"></div>
        <span class="ab-caseno">${c.caseNo}</span>
        <span class="ab-dot">·</span>

        <!-- Procedural Stage Selector -->
        <select id="stage-selector" class="field-input stage-select" onchange="handleStageChange(this.value)">
          <option value="Framing of Charges" ${state.activeStage === 'Framing of Charges' ? 'selected' : ''}>Framing of Charges</option>
          <option value="Examination-in-Chief" ${state.activeStage === 'Examination-in-Chief' ? 'selected' : ''}>Examination-in-Chief</option>
          <option value="Cross-Examination" ${state.activeStage === 'Cross-Examination' ? 'selected' : ''}>Cross-Examination</option>
          <option value="Re-Examination" ${state.activeStage === 'Re-Examination' ? 'selected' : ''}>Re-Examination</option>
          <option value="S.313 Statement" ${state.activeStage === 'S.313 Statement' ? 'selected' : ''}>S.313 CrPC Accused Statement</option>
          <option value="Final Arguments" ${state.activeStage === 'Final Arguments' ? 'selected' : ''}>Final Arguments</option>
          <option value="Bail Arguments" ${state.activeStage === 'Bail Arguments' ? 'selected' : ''}>Bail Arguments</option>
          <option value="Judicial Order" ${state.activeStage === 'Judicial Order' ? 'selected' : ''}>Pronouncement of Order</option>
        </select>

        <span id="mode-pill" class="mode-pill ${isExam ? 'qa-active' : ''}">
          ${isExam ? 'Q/A DEPOSITION MODE' : 'NARRATIVE RECORD MODE'}
        </span>

        <div class="ab-spacer"></div>

        <!-- Recording Action Button -->
        <button id="btn-record-main" class="btn-record ${state.isRecording ? 'live' : ''}" onclick="toggleRecording()">
          ${state.isRecording ? '● Live Recording' : 'Begin Recording'}
        </button>
      </div>

      <!-- Center Transcript Stage -->
      <div id="transcript-stage" class="transcript-stage">
        <div id="transcript-inner" class="transcript-inner">
          <!-- Transcript Entries rendered here -->
        </div>
      </div>

      <!-- Right Metadata & Case Management Panel -->
      <div class="panel-right">
        <!-- Section 1: Case Particulars -->
        <div class="panel-section">
          <div class="section-label">CASE DETAILS</div>
          <div class="detail-row">
            <span class="detail-key">Case No.</span>
            <span class="detail-val mono">${c.caseNo}</span>
          </div>
          <div class="detail-row">
            <span class="detail-key">FIR No.</span>
            <span class="detail-val mono">${c.firNo}</span>
          </div>
          <div class="detail-row">
            <span class="detail-key">Police Station</span>
            <span class="detail-val">${c.policeStation}</span>
          </div>
          <div class="detail-row">
            <span class="detail-key">Charged U/S</span>
            <span class="detail-val" style="color: var(--accent);">${c.sections}</span>
          </div>
          <div class="detail-row">
            <span class="detail-key">Presiding Judge</span>
            <span class="detail-val">${c.judge}</span>
          </div>
        </div>

        <!-- Section 2: Session Clock -->
        <div class="panel-section">
          <div class="section-label">ELAPSED TIME</div>
          <div id="session-clock" class="session-clock">00:00:00</div>
          <div id="session-clock-sub" class="session-clock-sub">
            ${state.isRecording ? 'Recording in progress' : 'Session paused'}
          </div>
        </div>

        <!-- Section 3: Witness on Stand -->
        <div class="panel-section">
          <div class="section-label">WITNESS ON STAND</div>
          <div id="witness-name-display" class="witness-name">${currentWitness.name}</div>
          <div id="witness-meta-display" class="witness-meta">${currentWitness.meta}</div>
          <div class="witness-nav">
            <button class="btn-secondary witness-btn" onclick="prevWitness()">← Prev</button>
            <button class="btn-secondary witness-btn" onclick="nextWitness()">Next →</button>
            <button class="btn-secondary witness-btn" onclick="openModal('add-witness')" style="margin-left: auto;">+ New</button>
          </div>
        </div>

        <!-- Section 4: Exhibits Marked -->
        <div class="panel-section">
          <div class="section-label">EXHIBITS MARKED</div>
          <div id="exhibit-count-display" class="exhibit-count">${state.exhibitList.length}</div>
          <div id="exhibit-tags-container" class="exhibit-list">
            ${exhibitTags}
          </div>
          <button class="btn-secondary" style="width: 100%; font-size: 11px;" onclick="markExhibitAction()">
            Mark Exhibit [E]
          </button>
        </div>

        <!-- Section 5: Stenographer Quick Actions -->
        <div class="panel-section">
          <div class="section-label">QUICK ACTIONS</div>
          <button class="btn-ghost quick-action-btn" onclick="insertSectionBreakAction()">
            Insert Section Marker [S]
          </button>
          <button class="btn-ghost quick-action-btn" onclick="openModal('record-order')">
            Dictate Judicial Order
          </button>
          <button class="btn-ghost quick-action-btn" onclick="adjournMatterAction()">
            Adjourn &amp; Save Roznama
          </button>
        </div>

        <!-- Section 6: Stenographer Notes -->
        <div class="panel-section">
          <div class="section-label">BENCH NOTES</div>
          <textarea class="panel-notes" id="session-notes-input" placeholder="Adjournment reason, compliance directives, judicial notes..." oninput="state.currentNotes = this.value">${state.currentNotes}</textarea>
        </div>

        <!-- Section 7: Export -->
        <div class="panel-section">
          <div class="section-label">EXPORT CERTIFIED RECORD</div>
          <div class="export-row">
            <button class="btn-secondary export-btn" onclick="exportDepositionTxt()">
              Deposition .TXT
            </button>
            <button class="btn-secondary export-btn" onclick="triggerPrintRecord()">
              Print Record
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function isExaminationStage(stage) {
  return ['Examination-in-Chief', 'Cross-Examination', 'Re-Examination'].includes(stage);
}

function handleStageChange(newStage) {
  state.activeStage = newStage;
  const isExam = isExaminationStage(newStage);

  const modePill = document.getElementById('mode-pill');
  if (modePill) {
    modePill.className = `mode-pill ${isExam ? 'qa-active' : ''}`;
    modePill.textContent = isExam ? 'Q/A DEPOSITION MODE' : 'NARRATIVE RECORD MODE';
  }

  // Insert procedural break into transcript
  addTranscriptEntry({
    type: 'section-break',
    label: `— ${newStage.toUpperCase()} —`
  });
}

function renderTranscript() {
  const container = document.getElementById('transcript-inner');
  if (!container) return;

  if (state.transcriptEntries.length === 0) {
    container.innerHTML = `
      <div class="transcript-empty">
        <div class="transcript-empty-title">Court in Session — Awaiting Recording</div>
        <div class="transcript-empty-sub">Press "Begin Recording" or hit [Space] when examination begins.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = state.transcriptEntries.map(e => formatEntryHtml(e)).join('');

  if (state.isRecording) {
    appendLiveCursor();
  }

  scrollTranscriptToBottom();
}

function formatEntryHtml(e) {
  if (e.type === 'section-break') {
    return `
      <div class="section-break">
        <span class="section-break-label">${e.label}</span>
      </div>
    `;
  }
  if (e.type === 'exhibit') {
    return `
      <div class="tx-exhibit">
        <span class="tx-exhibit-label">─── ${e.label} ───</span>
      </div>
    `;
  }
  if (e.type === 'depo') {
    return `
      <div class="tx-depo">
        <div class="tx-depo-meta">
          <span class="tx-depo-examiner">${e.examiner || 'Examination'}</span>
          <span class="tx-timestamp">${e.time || ''}</span>
        </div>
        <div class="tx-depo-pair">
          <span class="tx-qa-label">Q.</span>
          <div class="tx-qa-q">${e.q}</div>
          <span class="tx-qa-label">A.</span>
          <div class="tx-qa-a">${e.a}</div>
        </div>
      </div>
    `;
  }
  // Regular judicial speech entry
  return `
    <div class="tx-entry">
      <div class="tx-entry-meta">
        <span class="tx-speaker">${e.speaker}</span>
        <span class="tx-timestamp">${e.time || ''}</span>
      </div>
      <div class="tx-text">${e.text}</div>
    </div>
  `;
}

function appendLiveCursor() {
  const container = document.getElementById('transcript-inner');
  if (!container) return;
  const existing = document.getElementById('live-cursor-elem');
  if (existing) existing.remove();

  const cursor = document.createElement('span');
  cursor.id = 'live-cursor-elem';
  cursor.className = 'tx-cursor';

  const lastEntry = container.lastElementChild;
  if (lastEntry) {
    lastEntry.appendChild(cursor);
  }
}

function removeLiveCursor() {
  const existing = document.getElementById('live-cursor-elem');
  if (existing) existing.remove();
}

function addTranscriptEntry(entryObj) {
  /* TODO: wire to data layer — call addTranscriptEntry() whenever streamed data arrives */
  state.transcriptEntries.push(entryObj);
  const container = document.getElementById('transcript-inner');
  if (!container) return;

  // Clear empty state if present
  if (container.querySelector('.transcript-empty')) {
    container.innerHTML = '';
  }

  const div = document.createElement('div');
  div.innerHTML = formatEntryHtml(entryObj);
  const child = div.firstElementChild;
  container.appendChild(child);

  if (state.isRecording) {
    appendLiveCursor();
  }

  scrollTranscriptToBottom();
}

function scrollTranscriptToBottom() {
  const stage = document.getElementById('transcript-stage');
  if (stage) {
    stage.scrollTop = stage.scrollHeight;
  }
}

function toggleRecording() {
  state.isRecording = !state.isRecording;

  /* TODO: wire to data layer — start/stop audio capture stream */

  const btn = document.getElementById('btn-record-main');
  const topbarBadge = document.getElementById('topbar-live-badge');
  const clockSub = document.getElementById('session-clock-sub');

  if (state.isRecording) {
    if (btn) {
      btn.className = 'btn-record live';
      btn.innerHTML = '● Live Recording';
    }
    if (topbarBadge) topbarBadge.classList.add('visible');
    if (clockSub) clockSub.textContent = 'Recording in progress';
    startSessionTimer();
    appendLiveCursor();
  } else {
    if (btn) {
      btn.className = 'btn-record';
      btn.innerHTML = 'Begin Recording';
    }
    if (topbarBadge) topbarBadge.classList.remove('visible');
    if (clockSub) clockSub.textContent = 'Session paused';
    stopSessionTimer();
    removeLiveCursor();
  }
}

function startSessionTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.elapsedSeconds++;
    updateClockDisplay();
  }, 1000);
}

function stopSessionTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function updateClockDisplay() {
  const clockElem = document.getElementById('session-clock');
  if (clockElem) {
    const s = state.elapsedSeconds;
    const hrs = String(Math.floor(s / 3600)).padStart(2, '0');
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    clockElem.textContent = `${hrs}:${mins}:${secs}`;
  }
}

function markExhibitAction() {
  state.exhibitCount++;
  const label = `Ex. PW-${state.activeWitnessIndex + 1}/${String.fromCharCode(64 + (state.exhibitList.length % 26) + 1)}`;
  state.exhibitList.push(label);

  // Update UI tags
  const tagsContainer = document.getElementById('exhibit-tags-container');
  const countDisplay = document.getElementById('exhibit-count-display');
  if (tagsContainer) {
    const tag = document.createElement('span');
    tag.className = 'exhibit-tag';
    tag.textContent = label;
    tagsContainer.appendChild(tag);
  }
  if (countDisplay) {
    countDisplay.textContent = state.exhibitList.length;
  }

  addTranscriptEntry({
    type: 'exhibit',
    label: `${label} marked — Tendered by Witness in Evidence`
  });
}

function insertSectionBreakAction() {
  addTranscriptEntry({
    type: 'section-break',
    label: `— ${state.activeStage.toUpperCase()} CONTINUED —`
  });
}

function prevWitness() {
  if (state.activeWitnessIndex > 0) {
    state.activeWitnessIndex--;
    updateWitnessDisplay();
  }
}

function nextWitness() {
  if (state.activeWitnessIndex < state.witnessList.length - 1) {
    state.activeWitnessIndex++;
    updateWitnessDisplay();
  }
}

function updateWitnessDisplay() {
  const w = state.witnessList[state.activeWitnessIndex];
  const nameElem = document.getElementById('witness-name-display');
  const metaElem = document.getElementById('witness-meta-display');
  if (nameElem) nameElem.textContent = w.name;
  if (metaElem) metaElem.textContent = w.meta;

  addTranscriptEntry({
    type: 'entry',
    speaker: "HON'BLE COURT",
    time: getCurrentTimeFormatted(),
    text: `Witness ${w.name} (${w.meta}) takes the solemn affirmation in the witness box.`
  });
}

function getCurrentTimeFormatted() {
  const d = new Date();
  return d.toTimeString().split(' ')[0];
}

function adjournMatterAction() {
  /* TODO: wire to data layer — saveSessionRoznama(state.activeCase.id, state.currentNotes) */
  addTranscriptEntry({
    type: 'entry',
    speaker: "HON'BLE COURT",
    time: getCurrentTimeFormatted(),
    text: `Matter is adjourned to next procedural date for further hearing. Interim orders, if any, to continue until next listing. Case diary and record consigned to Bench Reader.`
  });
  alert(`Matter ${state.activeCase.caseNo} marked adjourned. Roznama updated.`);
}

function exportDepositionTxt() {
  const c = state.activeCase;
  const lines = [
    "================================================================================",
    "                        IN THE COURT OF SHRI R.K. MEHTA",
    "                   ADDITIONAL SESSIONS JUDGE, COURT NO. 3",
    "                               LUCKNOW, U.P.",
    `                        ${c.caseNo.toUpperCase()}`,
    "================================================================================",
    "",
    `Parties:      ${c.partiesPrimary}`,
    `Police Stn:   ${c.policeStation}`,
    `Charged U/S:  ${c.sections}`,
    `Date Heard:   23.09.2026`,
    `Stage:        ${state.activeStage}`,
    "",
    "--------------------------------------------------------------------------------",
    "                            RECORD OF PROCEEDINGS",
    "--------------------------------------------------------------------------------",
    ""
  ];

  state.transcriptEntries.forEach(e => {
    if (e.type === 'section-break') {
      lines.push("");
      lines.push(e.label);
      lines.push("");
    } else if (e.type === 'exhibit') {
      lines.push(`\n[${e.label}]\n`);
    } else if (e.type === 'depo') {
      lines.push(`Q. ${e.q}`);
      lines.push(`A. ${e.a}\n`);
    } else if (e.type === 'entry') {
      lines.push(`${e.speaker} [${e.time || ''}]:`);
      lines.push(`${e.text}\n`);
    }
  });

  lines.push("");
  lines.push("Witness read over and acknowledged to be true and correct transcript.");
  lines.push("");
  lines.push("                                            (Signature of Deponent)");
  lines.push("");
  lines.push("                                            (Shri R.K. Mehta)");
  lines.push("                                            Addl. Sessions Judge, Court No. 3");
  lines.push("                                            Date: 23.09.2026");

  const blob = new Blob([lines.join("\n")], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${c.caseNo.replace(/[\/\s]/g, '_')}_Deposition_23Sep2026.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function triggerPrintRecord() {
  window.print();
}

function attachWorkspaceEvents() {
  // Attached via inline handlers
}

// ============================================================================
// View Builders: Archive & Precedent Search
// ============================================================================
function buildArchiveView() {
  const cardsHtml = MOCK_ARCHIVE.map(item => buildArchiveCardHtml(item)).join('');

  return `
    <div class="page-archive">
      <div class="archive-header">
        <h1>Case Archive &amp; Precedent Search</h1>
        <p>Reference past cross-examinations, witness statements, and judicial rulings across all bench records</p>
      </div>

      <div class="search-primary-wrap">
        <input type="text" id="archive-search-input" class="search-primary" placeholder="Search by case number, section (e.g. 302 IPC), counsel name, legal keywords..." value="${state.archiveSearchQuery}" oninput="handleArchiveSearch(this.value)" />
      </div>

      <div class="archive-filter-strip">
        <select class="field-input archive-select" onchange="filterArchiveByJurisdiction(this.value)">
          <option value="ALL">All Jurisdictions</option>
          <option value="District">District Court Lucknow</option>
          <option value="HighCourt">High Court Allahabad</option>
          <option value="Commercial">Commercial Court</option>
        </select>

        <select class="field-input archive-select" onchange="filterArchiveByType(this.value)">
          <option value="ALL">All Case Types</option>
          <option value="Criminal">Criminal</option>
          <option value="Civil">Civil</option>
          <option value="Writ">Writ</option>
        </select>

        <select class="field-input archive-select">
          <option value="2026">Year: 2024–2026</option>
          <option value="2023">Year: 2021–2023</option>
          <option value="ALL">All Years</option>
        </select>

        <div class="archive-count" id="archive-count-label">Showing ${MOCK_ARCHIVE.length} precedent records</div>
      </div>

      <div class="archive-list" id="archive-card-list">
        ${cardsHtml}
      </div>
    </div>
  `;
}

function buildArchiveCardHtml(item) {
  const pills = item.stages.map(s => `<span class="archive-pill">${s}</span>`).join('');
  return `
    <div class="archive-card" onclick="openArchiveRecord('${item.caseNo}')">
      <div>
        <div class="archive-card-meta">
          <span class="archive-caseno">${item.caseNo}</span>
          <span class="badge ${item.badgeClass}">${item.type}</span>
        </div>
        <div class="archive-title">${item.title}</div>
        <div class="archive-parties">${item.parties}</div>
        <div class="archive-excerpt">${item.excerpt}</div>
        <div class="archive-pills">
          ${pills}
        </div>
      </div>
      <div class="archive-card-right">
        <div>
          <div class="archive-date">${item.date}</div>
          <div class="archive-judge">${item.judge}</div>
        </div>
        <div class="archive-open-link">Examine Record →</div>
      </div>
    </div>
  `;
}

function handleArchiveSearch(query) {
  state.archiveSearchQuery = query;
  const q = query.toLowerCase().trim();
  const list = document.getElementById('archive-card-list');
  const countLabel = document.getElementById('archive-count-label');
  if (!list) return;

  const filtered = MOCK_ARCHIVE.filter(item => {
    if (!q) return true;
    return item.caseNo.toLowerCase().includes(q) ||
           item.title.toLowerCase().includes(q) ||
           item.parties.toLowerCase().includes(q) ||
           item.excerpt.toLowerCase().includes(q);
  });

  list.innerHTML = filtered.map(item => buildArchiveCardHtml(item)).join('');
  if (countLabel) countLabel.textContent = `Showing ${filtered.length} precedent records`;
}

function filterArchiveByJurisdiction(val) {
  handleArchiveSearch(state.archiveSearchQuery);
}

function filterArchiveByType(val) {
  const q = state.archiveSearchQuery.toLowerCase().trim();
  const list = document.getElementById('archive-card-list');
  const countLabel = document.getElementById('archive-count-label');
  if (!list) return;

  const filtered = MOCK_ARCHIVE.filter(item => {
    const typeMatch = (val === 'ALL' || item.type === val);
    const textMatch = !q || item.caseNo.toLowerCase().includes(q) || item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q);
    return typeMatch && textMatch;
  });

  list.innerHTML = filtered.map(item => buildArchiveCardHtml(item)).join('');
  if (countLabel) countLabel.textContent = `Showing ${filtered.length} precedent records`;
}

function openArchiveRecord(caseNo) {
  alert(`Loading certified historical deposition record for ${caseNo}...`);
}

function attachArchiveEvents() {
  // Ready
}

// ============================================================================
// View Builders: Admin / Registrar Panel
// ============================================================================
function buildAdminView() {
  return `
    <div class="page-admin">
      <nav class="admin-nav">
        <div class="section-label">COURT ADMINISTRATION</div>
        <div class="admin-nav-item ${state.adminActiveTab === 'users' ? 'active' : ''}" onclick="switchAdminTab('users')">Personnel &amp; Users</div>
        <div class="admin-nav-item ${state.adminActiveTab === 'causelists' ? 'active' : ''}" onclick="switchAdminTab('causelists')">Cause List Registry</div>
        <div class="admin-nav-item ${state.adminActiveTab === 'roznama' ? 'active' : ''}" onclick="switchAdminTab('roznama')">Daily Roznama (Diary)</div>
        <div class="admin-nav-item ${state.adminActiveTab === 'allcases' ? 'active' : ''}" onclick="switchAdminTab('allcases')">Master Case Registry</div>
        <div class="admin-nav-item ${state.adminActiveTab === 'settings' ? 'active' : ''}" onclick="switchAdminTab('settings')">Court Settings</div>
      </nav>

      <div class="admin-main" id="admin-main-content">
        ${renderAdminTabContent()}
      </div>
    </div>
  `;
}

function switchAdminTab(tab) {
  state.adminActiveTab = tab;
  const container = document.getElementById('admin-main-content');
  if (container) {
    container.innerHTML = renderAdminTabContent();
  }
  document.querySelectorAll('.admin-nav-item').forEach(el => {
    el.classList.toggle('active', el.textContent.toLowerCase().includes(tab.slice(0, 4)));
  });
}

function renderAdminTabContent() {
  if (state.adminActiveTab === 'users') {
    const userRows = MOCK_USERS.map(u => `
      <tr>
        <td style="font-weight: 500; color: var(--text-primary);">${u.name}</td>
        <td style="font-family: 'JetBrains Mono'; font-size: 12px; color: var(--accent);">${u.email}</td>
        <td>${u.role}</td>
        <td style="color: var(--text-secondary); font-size: 12px;">${u.court}</td>
        <td><span class="badge badge-active">${u.status}</span></td>
        <td>
          <div class="action-link-group">
            <span class="action-link" onclick="alert('Editing user permissions')">Edit</span>
            <span class="action-link danger" onclick="alert('User session revoked')">Revoke</span>
          </div>
        </td>
      </tr>
    `).join('');

    return `
      <div class="admin-header-row">
        <h2 class="admin-header-title">Court Personnel &amp; User Management</h2>
        <button class="btn-secondary" onclick="openModal('new-user')">+ Add Personnel</button>
      </div>
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Personnel Name</th>
              <th>Official Email</th>
              <th>Designation</th>
              <th>Assigned Bench</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${userRows}
          </tbody>
        </table>
      </div>
    `;
  }

  if (state.adminActiveTab === 'roznama') {
    const roznamaRows = MOCK_ROZNAMA.map(r => `
      <tr>
        <td class="td-sr">${r.sr}</td>
        <td class="td-caseno">${r.caseNo}</td>
        <td>${r.stageCompleted}</td>
        <td><span class="badge ${r.outcomeBadge}">${r.outcome}</span></td>
        <td style="font-family: 'JetBrains Mono'; font-size: 12px;">${r.nextDate}</td>
        <td style="font-size: 11px; color: var(--text-secondary);">${r.signedBy}</td>
      </tr>
    `).join('');

    return `
      <div class="admin-header-row">
        <div>
          <h2 class="admin-header-title">Court Roznama (Daily Judicial Proceeding Diary)</h2>
          <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Certified daily dispatch log as mandated under General Rules (Civil &amp; Criminal)</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-secondary" onclick="exportRoznamaCsv()">Export Roznama .CSV</button>
        </div>
      </div>

      <div class="roznama-toolbar">
        <label class="field-label" style="margin-bottom: 0;">Date of Record:</label>
        <input type="date" class="field-input roznama-date-input" value="${state.roznamaDate}" onchange="state.roznamaDate = this.value" />
        <button class="btn-secondary" style="height: 36px;" onclick="alert('Roznama records loaded for ' + state.roznamaDate)">Load Diary</button>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">Sr.</th>
              <th>Case Number</th>
              <th>Proceedings Conducted</th>
              <th>Outcome / Daily Order</th>
              <th>Next Listing Date</th>
              <th>Signatory</th>
            </tr>
          </thead>
          <tbody>
            ${roznamaRows}
          </tbody>
        </table>
      </div>
    `;
  }

  if (state.adminActiveTab === 'causelists') {
    return `
      <div class="admin-header-row">
        <h2 class="admin-header-title">Cause List Publishing &amp; Bench Allocation</h2>
        <button class="btn-secondary" onclick="openModal('add-case')">+ Publish Tomorrow's List</button>
      </div>
      <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 20px;">
        Generate and certify daily cause lists for Court No. 3. Pinned to the official e-Courts notice board.
      </p>
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Court / Bench</th>
              <th>Presiding Judge</th>
              <th>Total Matters Listed</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-family: 'JetBrains Mono'; font-size: 12px; color: var(--accent);">23.09.2026</td>
              <td>Court No. 3 (Sessions)</td>
              <td>Shri R.K. Mehta, Addl. Sessions Judge</td>
              <td>05 Matters</td>
              <td><span class="badge badge-active">Live &amp; Active</span></td>
              <td><span class="action-link" onclick="renderView('causelist')">Open List</span></td>
            </tr>
            <tr>
              <td style="font-family: 'JetBrains Mono'; font-size: 12px; color: var(--text-tertiary);">22.09.2026</td>
              <td>Court No. 3 (Sessions)</td>
              <td>Shri R.K. Mehta, Addl. Sessions Judge</td>
              <td>12 Matters</td>
              <td><span class="badge badge-disposed">Archived</span></td>
              <td><span class="action-link" onclick="alert('Viewing archived list')">View Dispatch</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // Fallback / master case registry
  return `
    <div class="admin-header-row">
      <h2 class="admin-header-title">Master Case Registry</h2>
      <button class="btn-secondary" onclick="openModal('add-case')">+ Register New Case</button>
    </div>
    <div class="data-table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Case No.</th>
            <th>Type</th>
            <th>Parties</th>
            <th>Charged Sections</th>
            <th>Current Stage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${MOCK_CAUSELIST.map(c => `
            <tr>
              <td class="td-caseno">${c.caseNo}</td>
              <td><span class="badge ${c.badgeClass}">${c.type}</span></td>
              <td style="font-weight: 500;">${c.partiesPrimary}</td>
              <td style="font-size: 11px; color: var(--text-secondary);">${c.sections}</td>
              <td>${c.stage}</td>
              <td><span class="badge ${c.statusBadge}">${c.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function exportRoznamaCsv() {
  const rows = [
    ["Sr", "Case Number", "Stage Completed", "Outcome", "Next Date", "Signed By"]
  ];
  MOCK_ROZNAMA.forEach(r => {
    rows.push([r.sr, r.caseNo, `"${r.stageCompleted}"`, `"${r.outcome}"`, r.nextDate, `"${r.signedBy}"`]);
  });
  const csvContent = rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Roznama_Court3_${state.roznamaDate}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function attachAdminEvents() {
  // Ready
}

// ============================================================================
// Modal System
// ============================================================================
function appendModalContainer(app) {
  let overlay = document.getElementById('modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal();
    };
    app.appendChild(overlay);
  }
}

function openModal(modalType) {
  state.activeModal = modalType;
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  overlay.innerHTML = buildModalContent(modalType);
  overlay.classList.add('open');
}

function closeModal() {
  state.activeModal = null;
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.innerHTML = '';
  }
}

function buildModalContent(modalType) {
  if (modalType === 'add-case') {
    return `
      <div class="modal">
        <button class="modal-close" onclick="closeModal()">×</button>
        <h2 class="modal-title">Add Case to Cause List</h2>
        <p class="modal-sub">Schedule matter for hearing in Court No. 3</p>
        <form class="modal-form" onsubmit="handleNewCaseSubmit(event)">
          <div>
            <label class="field-label">Case Number</label>
            <input type="text" id="m-caseno" class="field-input" placeholder="e.g. Sessions Case No. 92/2026" required />
          </div>
          <div>
            <label class="field-label">Case Classification</label>
            <select id="m-casetype" class="field-input">
              <option value="Criminal">Criminal</option>
              <option value="Civil">Civil</option>
              <option value="Writ">Writ</option>
              <option value="Misc">Revision / Misc</option>
            </select>
          </div>
          <div>
            <label class="field-label">Complainant / Petitioner</label>
            <input type="text" id="m-petitioner" class="field-input" placeholder="e.g. State of U.P. or Arvind Kumar" required />
          </div>
          <div>
            <label class="field-label">Accused / Respondent</label>
            <input type="text" id="m-respondent" class="field-input" placeholder="e.g. Shyam Lal &amp; Ors." required />
          </div>
          <div>
            <label class="field-label">Act &amp; Statutory Sections</label>
            <input type="text" id="m-sections" class="field-input" placeholder="e.g. Sec 302/34 IPC" required />
          </div>
          <div>
            <label class="field-label">Listing Stage</label>
            <select id="m-stage" class="field-input">
              <option value="Examination-in-Chief">Examination-in-Chief</option>
              <option value="Cross-Examination">Cross-Examination</option>
              <option value="Framing of Charges">Framing of Charges</option>
              <option value="Final Arguments">Final Arguments</option>
              <option value="Bail Arguments">Bail Arguments</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-ghost" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn-primary">Add to Docket</button>
          </div>
        </form>
      </div>
    `;
  }

  if (modalType === 'add-witness') {
    return `
      <div class="modal">
        <button class="modal-close" onclick="closeModal()">×</button>
        <h2 class="modal-title">Record Witness Particulars</h2>
        <p class="modal-sub">Enter witness details for current deposition stage</p>
        <form class="modal-form" onsubmit="handleNewWitnessSubmit(event)">
          <div>
            <label class="field-label">Full Name &amp; Designation</label>
            <input type="text" id="m-w-name" class="field-input" placeholder="e.g. Dr. K.S. Rathore, Ballistics Expert" required />
          </div>
          <div>
            <label class="field-label">Deponent Category</label>
            <select id="m-w-type" class="field-input">
              <option value="Prosecution Witness">Prosecution Witness (PW)</option>
              <option value="Defence Witness">Defence Witness (DW)</option>
              <option value="Court Witness">Court Witness (CW)</option>
            </select>
          </div>
          <div>
            <label class="field-label">Witness Citation Code</label>
            <input type="text" id="m-w-code" class="field-input" placeholder="e.g. PW-5 or DW-2" required />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-ghost" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn-primary">Set on Stand</button>
          </div>
        </form>
      </div>
    `;
  }

  if (modalType === 'record-order') {
    return `
      <div class="modal" style="width: 540px;">
        <button class="modal-close" onclick="closeModal()">×</button>
        <h2 class="modal-title">Dictate Judicial Order Sheet</h2>
        <p class="modal-sub">Dictate bench order for ${state.activeCase.caseNo}</p>
        <form class="modal-form" onsubmit="handleRecordOrderSubmit(event)">
          <div>
            <label class="field-label">Presiding Judge</label>
            <input type="text" class="field-input" value="${state.activeCase.judge}" readonly />
          </div>
          <div>
            <label class="field-label">Order Dictation Text</label>
            <textarea id="m-order-text" class="panel-notes" style="min-height: 140px; font-size: 13px;" placeholder="Put up for orders... Ld. Counsel heard... Accused enlarged on bail subject to conditions..." required></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-ghost" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn-primary">Commit Order to Record</button>
          </div>
        </form>
      </div>
    `;
  }

  if (modalType === 'new-user') {
    return `
      <div class="modal">
        <button class="modal-close" onclick="closeModal()">×</button>
        <h2 class="modal-title">Register Court Personnel</h2>
        <p class="modal-sub">Create access credentials for court stenographer or reader</p>
        <form class="modal-form" onsubmit="handleNewUserSubmit(event)">
          <div>
            <label class="field-label">Full Name</label>
            <input type="text" id="m-u-name" class="field-input" placeholder="e.g. Suresh Chand" required />
          </div>
          <div>
            <label class="field-label">Official Court Email</label>
            <input type="email" id="m-u-email" class="field-input" placeholder="e.g. schand@court.in" required />
          </div>
          <div>
            <label class="field-label">Designation</label>
            <select id="m-u-role" class="field-input">
              <option value="Stenographer">Court Stenographer</option>
              <option value="Reader / Clerk">Reader / Bench Clerk</option>
              <option value="Registrar">Assistant Registrar</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-ghost" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn-primary">Grant Access</button>
          </div>
        </form>
      </div>
    `;
  }

  return '';
}

function handleNewCaseSubmit(e) {
  e.preventDefault();
  const caseNo = document.getElementById('m-caseno').value.trim();
  const caseType = document.getElementById('m-casetype').value;
  const p = document.getElementById('m-petitioner').value.trim();
  const r = document.getElementById('m-respondent').value.trim();
  const sec = document.getElementById('m-sections').value.trim();
  const stg = document.getElementById('m-stage').value;

  const newCase = {
    id: 'c_' + Date.now(),
    sr: String(MOCK_CAUSELIST.length + 1).padStart(2, '0'),
    caseNo: caseNo,
    type: caseType,
    badgeClass: caseType === 'Criminal' ? 'badge-criminal' : (caseType === 'Civil' ? 'badge-civil' : 'badge-writ'),
    partiesPrimary: `${p} v. ${r}`,
    sections: sec,
    stage: stg,
    isExamStage: isExaminationStage(stg),
    counselP: 'Ld. Counsel for Petitioner',
    counselD: 'Ld. Counsel for Respondent',
    status: 'Pending',
    statusBadge: 'badge-pending',
    judge: 'Shri R.K. Mehta, Addl. Sessions Judge',
    policeStation: 'District Jurisdiction',
    firNo: 'N/A'
  };

  MOCK_CAUSELIST.push(newCase);
  closeModal();

  if (state.currentView === 'causelist') {
    renderView('causelist');
  } else if (state.currentView === 'admin') {
    switchAdminTab('causelists');
  }
}

function handleNewWitnessSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('m-w-name').value.trim();
  const type = document.getElementById('m-w-type').value;
  const code = document.getElementById('m-w-code').value.trim();

  state.witnessList.push({
    name: name,
    meta: `${code} · ${type}`
  });
  state.activeWitnessIndex = state.witnessList.length - 1;

  closeModal();
  updateWitnessDisplay();
}

function handleRecordOrderSubmit(e) {
  e.preventDefault();
  const orderText = document.getElementById('m-order-text').value.trim();

  addTranscriptEntry({
    type: 'section-break',
    label: '— JUDICIAL ORDER PRONOUNCED IN OPEN COURT —'
  });

  addTranscriptEntry({
    type: 'entry',
    speaker: "HON'BLE COURT",
    time: getCurrentTimeFormatted(),
    text: orderText
  });

  closeModal();
}

function handleNewUserSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('m-u-name').value.trim();
  const email = document.getElementById('m-u-email').value.trim();
  const role = document.getElementById('m-u-role').value;

  MOCK_USERS.push({
    id: 'u_' + Date.now(),
    name: name,
    email: email,
    password: 'password123',
    role: role,
    court: 'District & Sessions Court, Lucknow · Court No. 3',
    status: 'Active'
  });

  closeModal();
  if (state.currentView === 'admin') {
    switchAdminTab('users');
  }
}

// ============================================================================
// Shortcut Legend
// ============================================================================
function appendShortcutLegend(app) {
  let legend = document.getElementById('shortcut-legend');
  if (!legend) {
    legend = document.createElement('div');
    legend.id = 'shortcut-legend';
    legend.className = 'shortcut-legend';
    legend.innerHTML = `
      <div class="shortcut-legend-title">Stenographer Hotkeys</div>
      <div class="shortcut-row">
        <span class="shortcut-key">Space</span>
        <span class="shortcut-desc">Toggle Live Recording</span>
      </div>
      <div class="shortcut-row">
        <span class="shortcut-key">E</span>
        <span class="shortcut-desc">Mark Deposition Exhibit</span>
      </div>
      <div class="shortcut-row">
        <span class="shortcut-key">S</span>
        <span class="shortcut-desc">Insert Section Marker</span>
      </div>
      <div class="shortcut-row">
        <span class="shortcut-key">Esc</span>
        <span class="shortcut-desc">Close Active Window</span>
      </div>
    `;
    app.appendChild(legend);
  }
}

function updateShortcutLegendVisibility() {
  const legend = document.getElementById('shortcut-legend');
  if (!legend) return;
  if (state.currentView === 'workspace') {
    legend.classList.add('visible');
  } else {
    legend.classList.remove('visible');
  }
}

// ============================================================================
// Global Keyboard Handler
// ============================================================================
function setupGlobalKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // If typing in input or textarea, skip shortcuts except Escape
    const tag = e.target.tagName.toLowerCase();
    const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select';

    if (e.key === 'Escape') {
      if (state.activeModal) {
        closeModal();
      }
      return;
    }

    if (isTyping) return;

    if (state.currentView === 'workspace') {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleRecording();
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        markExhibitAction();
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        insertSectionBreakAction();
      }
    }
  });
}
