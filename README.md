# AIN — Arjun Intelligence Network

> A portfolio built as an operating system, not a webpage.

Live: [arjunpakhan.dev]([https://arjunpakhan.dev](https://arjun-intelligence-network.vercel.app/))

---

## Overview

AIN is a multi-layer intelligence system that functions as 
a personal portfolio for Arjun Pakhan — CS student at NMIMS 
Mukesh Patel School of Technology, specializing in 
Cybersecurity, Machine Learning, GPU Computing, and 
Distributed Systems.

The site is structured as an operational command network. 
Visitors don't browse a portfolio — they navigate a system.

---

## Architecture — 8 Layers

| Layer | Name | Purpose |
|-------|------|---------|
| 0 | Boot Sequence | System initialization with particle hero |
| 1 | Command Center | About + multi-agent system overview |
| 2 | Security Operations | Cybersecurity projects + live threat map |
| 3 | Research Lab | ML research + confusion matrix + feature explorer |
| 4 | Systems Thinking | Intelligence briefs + reasoning tree |
| 5 | Memory Core | Knowledge graph + research notes |
| 5b | Research Lab | Hidden interactive ML demos |
| 6 | Terminal | CLI contact interface |

**Keyboard shortcuts:** `1–7` to navigate layers · `T` for timeline · `R` for recruiter mode · `Esc` to close overlays

---

## Projects Featured

**SENTINEL — Secure Distributed IDS**
- 3.5M CICFlowMeter network flow records
- 10 attack classes · 99.7% detection accuracy
- Stack: Java · Flask · Random Forest · XGBoost · 
  Isolation Forest · AES-256 · FedAvg
- IEEE paper submitted

**CERBERUS — IoT Malware Detection**
- CIC-YNU-IoTMal 2026 dataset · 455K+ samples
- 8 malware classes · ~88% XGBoost accuracy
- 57% dimensionality reduction via hybrid feature selection
- IEEE/Scopus submission in progress

**UPI Gen Z Spending Behaviour**
- Neurofinance research paper (co-authored, 2024)
- Key finding: 70% of Gen Z UPI transactions under ₹500
- Peak fraud window: 7–10 PM
- Guided by Dr. Sugam Shivhare, NMIMS

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| 3D | Three.js + React Three Fiber |
| Data Viz | D3.js 7 |
| Deployment | Vercel |

---

## Content Architecture

All dynamic content lives in `public/data/` — 

public/data/
├── certifications.json   ← add new certs here
├── linkedin-posts.json   ← add new posts here
└── build-log.json        ← weekly build updates
no code changes needed to update portfolio content:

To update: edit JSON on GitHub → Vercel auto-deploys 
in ~30 seconds.

---

## Local Development

```bash
npm install
npm run dev
```

Production build:
```bash
npm run build
```

---

## Features

- Live network threat visualizer with attack simulation
- Interactive confusion matrix (IoT malware research data)
- Feature importance explorer with 3 hybrid subsets
- GPU vs CPU parallel processing race visualizer
- UPI behavioral bias quiz (based on neurofinance research)
- AES-256 CBC encryption live demo
- D3 force-directed knowledge graph with timeline scrubber
- Recruiter mode (press R) — role-filtered resume view
- Dynamic resume download per role profile
- Hidden research lab layer

---

## Connect

- LinkedIn: [linkedin.com/in/arjunpakhan](https://linkedin.com/in/arjunpakhan)
- GitHub: [github.com/ArjunPakhan](https://github.com/ArjunPakhan)
- Email: arjun@arjunpakhan.dev

---

*Built between IEEE research papers.*
