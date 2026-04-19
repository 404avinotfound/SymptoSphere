# SymptoSphere 🌿

An intelligent disease prediction web app  rebuilt from Streamlit to a production-ready Next.js app deployable on Vercel. Fully rule-based, no API keys required.

---

## Visit 
https://symptosphere-three.vercel.app/

---

## Features

- **Conversational chat UI** — describe symptoms in natural language
- **Smart follow-up questions** — rule-based engine asks targeted questions based on your complaint
- **Relevant symptom chips** — symptoms narrowed down to your specific condition
- **Add more symptoms** — open-ended ability to expand your symptom list at any time
- **Top-3 disease prediction** — scoring algorithm matches symptoms against 60+ diseases
- **Remedy suggestions** — actionable home care tips per predicted disease
- **Zero API usage** — runs 100% locally, no external services, no API keys needed
- **No ML runtime** — prediction runs fully in-process with pure TypeScript logic
- **Vercel-ready** — Next.js 15 App Router, zero config deployment

---

## Project Structure

```
SymptoSphere/
├── app/
│   ├── layout.tsx          # Root layout + fonts + metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Tailwind + custom animations
├── components/
│   ├── ChatInterface.tsx   # Main chat shell + message state
│   ├── SymptomChips.tsx    # Selectable symptom pill buttons
│   └── DiseaseResults.tsx  # Top-3 disease cards with remedies
├── lib/
│   ├── diseaseData.ts      # Disease DB (60+ diseases), symptom map, prediction logic
│   └── chatEngine.ts       # Rule-based chat engine with 40+ keyword rule groups
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/404avinotfound/SymptoSphere.git
cd SymptoSphere
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> No `.env` file or API key is needed. The app works completely offline.

---

## Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Push this repo to GitHub
2. Go to ([https://vercel.com/new](https://symptosphere-three.vercel.app/))]
3. Import your `SymptoSphere` repository
4. Click **Deploy** — no environment variables needed

Your app will be live at `https://your-project.vercel.app`.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

---

## How It Works

### Chat Flow

```
User describes symptoms in natural language
               ↓
Rule-based chat engine matches keywords
               ↓
Targeted follow-up question asked (no API call)
               ↓
Relevant symptom chips shown (narrowed to complaint)
               ↓
User selects chips + can add more symptoms via chat
               ↓
"Predict diseases" → local scoring algorithm runs
               ↓
Top 3 diseases shown with confidence % and remedies
```

### Prediction Algorithm

A two-ratio scoring system that combines:

```
matchRatio    = matching symptoms / disease's total symptoms
coverageRatio = matching symptoms / user's selected symptoms
score         = average(matchRatio, coverageRatio) × 100
```

Results with at least 1 matching symptom are ranked and the top 3 returned. Runs instantly with no network call.

### Chat Engine

The chat engine (`lib/chatEngine.ts`) uses **40+ keyword rule groups** covering every major medical category. It:

1. Detects the symptom category from natural language input
2. Asks one targeted follow-up question
3. After 2 exchanges, displays the most relevant symptom chips

No AI or API is involved — all logic is pure TypeScript.

### Disease Database

60+ diseases across 13 categories modelled in `lib/diseaseData.ts`:

| Category | Diseases Included |
|---|---|
| Skin | Chickenpox, Eczema, Psoriasis, Allergic Reaction, Ringworm, Hives, Contact Dermatitis, Jaundice, Acne, Cellulitis |
| Respiratory | Common Cold, Influenza, COVID-19, Pneumonia, Asthma, Bronchitis, Tuberculosis, Sinusitis, Whooping Cough |
| Vector-borne | Dengue, Malaria, Typhoid, Chikungunya, Zika, Leptospirosis, Hepatitis A/B/C, Cholera, Typhus |
| Gastrointestinal | Gastroenteritis, IBS, Peptic Ulcer, Appendicitis, Celiac Disease, GERD, Crohn's Disease |
| Cardiovascular | Hypertension, Heart Attack, Angina, Heart Failure, Arrhythmia |
| Neurological | Migraine, Meningitis, Epilepsy, Stroke, Parkinson's, Alzheimer's, Multiple Sclerosis |
| Endocrine | Diabetes Type 1 & 2, Hypothyroidism, Hyperthyroidism, Anemia, Gout, Obesity |
| Musculoskeletal | Rheumatoid Arthritis, Osteoarthritis, Fibromyalgia, Osteoporosis, Sciatica |
| Urinary | UTI, Kidney Stones, Chronic Kidney Disease |
| Mental Health | Depression, Anxiety Disorder, Insomnia |
| Eye | Conjunctivitis, Glaucoma, Cataracts |
| Ear & Throat | Ear Infection, Tinnitus, Strep Throat, Tonsillitis |
| Other | PCOS, Endometriosis, Lupus, HIV/AIDS, Lung/Breast/Colorectal Cancer |

---

## Extending the Disease Database

Add new diseases in `lib/diseaseData.ts` under `DISEASE_DB`:

```ts
"Chickenpox": {
  symptoms: ["blisters","rash","itching","fever","fatigue","loss_of_appetite","redness","skin_peeling"],
  description: "A highly contagious viral infection causing itchy blister-like rash.",
  remedies: ["Antihistamines","Calamine lotion","Rest","Avoid scratching","Antiviral meds if severe"],
  color: "pink",
},
```

Add new keyword rules in `lib/chatEngine.ts` under `KEYWORD_RULES` to improve chat responses for new complaint types:

```ts
{
  keywords: ["new symptom keyword", "another phrase"],
  followUp: "A targeted follow-up question for this symptom type?",
  symptoms: ["symptom_one","symptom_two","symptom_three"],
},
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Chat Logic | Rule-based engine (pure TypeScript, zero API) |
| Prediction | Symptom overlap scoring (no ML runtime) |
| Fonts | DM Sans + DM Mono (Google Fonts) |
| Deployment | Vercel |

---

## Disclaimer

This application is intended **for educational purposes only**. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional.

---

## Author

404avinotfound — B.Tech CSE Student
