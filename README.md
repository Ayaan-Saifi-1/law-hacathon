# Law-Hackathon: Indian Courts Digital Stenography & Real-Time Transcription

An institutional-grade digital courtroom record-keeping and real-time stenography workspace built for Indian judicial proceedings (District Courts, High Courts, and Supreme Court of India).

## Key Features

- **Live Speech-to-Text & Real-time Speaker Diarization**: Multi-speaker transcription tracking Court, Judge, Defense, Prosecution, and Witnesses.
- **Section Breaks & Procedural Framing**: Examination-in-Chief, Cross-Examination, Re-Examination, Arguments, and Exhibit tagging.
- **Cause List & Daily Board**: Integrated daily case proceedings, CNR lookup, courtroom assignments, and urgency filters.
- **Roznama & Order Generation**: Automated daily order sheets and precedent archival with export to PDF / Certified Copy format.
- **Institutional UI/UX**: Specially tailored high-legibility theme designed to reduce eye strain during prolonged courtroom sessions.

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailored CSS design tokens for institutional courtroom aesthetics
- **Architecture**: Modular mock data bridges with pluggable WebSocket/REST integration for backend STT pipelines.

## Getting Started

```bash
npm install
npm run dev
```
