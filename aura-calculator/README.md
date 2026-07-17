# 🔥 AURA CALCULATOR — The Ultimate Danger Test

> *"Your aura isn't what you say. It's what you do when nobody's watching."*

## 🌌 What Is This?

The **Aura Calculator** is a dangerous, psychologically intense 50-question quiz that quantifies your aura score across 5 behavioral dimensions. This isn't your typical personality quiz — it's a **psychometric weapon** designed to strip away your filter, catch your lies in real-time, and reveal your true aura tier.

Built with **Next.js 14**, **React Three Fiber**, **GSAP**, and **Framer Motion** — this thing hits different.

---

## ⚡ The Engine

### The 5-Phase Pressure System

The quiz operates across **5 distinct phases**, each with its own visual environment and psychological pressure mechanic:

| Phase | Questions | Theme | UI Environment |
|-------|-----------|-------|----------------|
| **Phase 1** | Q1-Q10 | Physical & Cognitive Spatial Deviation | Default Dark Mode |
| **Phase 2** | Q11-Q20 | Verbal Banter & Compression Stress | Chat Box UI Layout |
| **Phase 3** | Q21-Q30 | The Ego Trap & Transparency Decay | Glitch Crimson UI |
| **Phase 4** | Q31-Q40 | Audience Dynamics & Scenario Shifts | Spectator Ticker Active |
| **Phase 5** | Q41-Q50 | Subconscious Neural Speed Run | 2s Timer / Kinetic Inputs |

### The Truth Matrix Engine

Every answer is tracked through **Instinct Velocity** — the raw millisecond timestamp of your selection. The engine cross-references your answers against previous responses to detect **inconsistencies** and **performative behavior**.

**Key Mechanic:** If you pick a "cool" answer but took 4+ seconds to decide, the engine penalizes you. Authentic aura requires **instant execution**.

### The Scoring Formula

```
Final Aura Score = [(α + β + γ) × Streak Multiplier] − [(δ + φ)² × Inauthenticity Tax]
```

Where:
- **α (Presence)** — Passive authority and spatial control
- **β (Composure)** — Stoicism under social fire
- **γ (Social Fluidity)** — Conversational mechanics and wit
- **δ (Desperation)** — Try-hard metrics and performative vanity
- **φ (Fumble Coefficient)** — Physical clumsiness and panic responses

---

## 🎭 The 6 Aura Tiers

| Tier | Score Range | Description |
|------|-------------|-------------|
| 🌌 **ULTIMATE BEAST** | ≥ 18,000 | Absolute gravity-bending presence. You operate on pure instinct. The world bends around your choices. |
| 🔱 **GIGA CHAD** | 10,000 - 17,999 | High presence, massive physical confidence. You handle fumbles like an action star. |
| 🧘 **LOW AURA** | 2,000 - 9,999 | The functional baseline. You play life safe and retain standard respect. |
| 🚜 **AURA FARMER** | 0 - 1,999 | The try-hard. You select the coolest options but take too long. The algorithm spots the desperation. |
| 🤡 **CLOWN** | -1 to -4,000 | Public chaos incarnate. You drop items, apologize to objects, and laugh off internal screaming. |
| 💀 **NOOB** | ≤ -4,001 | Absolute aura insolvency. You run with rolling backpacks and apologize to wrong-order waiters. |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + Custom CSS
- **3D Graphics:** React Three Fiber + Three.js
- **Animations:** GSAP + Framer Motion
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the Aura Calculator.

---

## 📁 Project Structure

```
aura-calculator/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts and metadata
│   │   ├── page.tsx            # Homepage with hero, roles, and sections
│   │   └── globals.css         # Global styles and animations
│   ├── components/
│   │   ├── Homepage/           # Homepage section components
│   │   ├── Quiz/               # Quiz phase components
│   │   ├── Loading/            # Loading screen
│   │   ├── Results/            # Results dashboard
│   │   └── ui/                 # Shared UI components
│   ├── components3d/
│   │   └── CosmicScene.tsx     # 3D background
│   ├── lib/
│   │   ├── questions.ts        # 50 questions across 5 phases
│   │   ├── quizEngine.ts       # Core scoring engine
│   │   ├── truthMatrix.ts      # Truth detection system
│   │   └── tiers.ts            # Tier definitions and visuals
│   └── hooks/
│       ├── useQuiz.ts          # Quiz state management
│       └── useTimer.ts         # Timer hook for Phase 5
```

---

## 🎯 Features

- **50 Dynamic Questions** across 5 psychological pressure phases
- **Real-time Truth Detection** via Instinct Velocity tracking
- **Contextual Cross-References** to catch inconsistent answers
- **Phase-Shifting UI** that morphs as you progress
- **Spectator Ticker** in Phase 4 for audience pressure
- **2-Second Speed Run** in Phase 5 for pure instinct testing
- **Interactive 5-Axis Radar Chart** for results visualization
- **Aura Velocity Line Graph** tracking your score journey
- **6 Unique Tier Displays** with custom visual profiles
- **Dangerous Loading Screen** with anime visuals
- **3D Cosmic Background** with particles and nebula effects

---

## ⚠️ Disclaimer

This quiz is for entertainment purposes only. Aura scores are calculated through behavioral pattern analysis and should not be taken as professional psychological assessment. The "lie detection" mechanics are based on response timing patterns and answer consistency — they measure decision-making speed, not actual dishonesty.

**Made with 🔥 by Harshit Mishra**

---

## 📜 License

This project is open source and available for educational purposes.
