# SymptoSphere 🌿

An AI-powered symptom checker and disease prediction web app — rebuilt from Streamlit to a production-ready Next.js app deployable on Vercel.

## Features

- **Conversational chat UI** — describe symptoms in natural language
- **AI follow-up questions** — powered by Claude (Anthropic API)
- **Smart symptom chips** — relevant symptoms narrowed down from your description
- **Add more symptoms** — open-ended ability to expand your symptom list
- **Top-3 disease prediction** — rule-based ML scoring against a disease database
- **Remedy suggestions** — actionable home care tips per predicted disease
- **No external ML runtime** — prediction runs fully in-process (no Python, no joblib)
- **Vercel-ready** — Next.js 15 App Router, zero config deployment

---

## Project Structure

```
symptosphere/
├── app/
│   ├── layout.tsx          # Root layout + fonts + metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind + custom animations
│   └── api/
│       └── chat/
│           └── route.ts    # Anthropic API proxy (server-side)
├── components/
│   ├── ChatInterface.tsx   # Main chat shell + message state
│   ├── SymptomChips.tsx    # Selectable symptom pill buttons
│   └── DiseaseResults.tsx  # Top-3 disease cards with remedies
├── lib/
│   └── diseaseData.ts      # Disease DB, symptom map, prediction logic
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
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

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your key at: https://console.anthropic.com

### 3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Push this repo to GitHub
2. Go to https://vercel.com/new
3. Import your `SymptoSphere` repository
4. Under **Environment Variables**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key
5. Click **Deploy**

Done. Your app will be live at `https://your-project.vercel.app`.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel
# Follow prompts, then:
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

---

## How It Works

### Chat Flow

```
User types symptoms
       ↓
Claude API (server-side route) asks 1-2 follow-up questions
       ↓
After context is gathered → SHOW_SYMPTOMS signal
       ↓
Relevant symptom chips rendered (narrowed to complaint)
       ↓
User selects chips + optionally describes more symptoms
       ↓
Predict Diseases button → local scoring algorithm
       ↓
Top 3 diseases shown with confidence % and remedies
```

### Prediction Algorithm

The scoring is a **Jaccard-style overlap** between selected symptoms and each disease's known symptom profile:

```
score = (matching symptoms) / max(selected count, disease symptom count) × 100
```

Results are ranked and top 3 returned. No external model or API call — runs instantly in the browser/server.

### Disease Database

12 diseases currently modelled:

| Disease | Key Symptoms |
|---|---|
| Dengue Fever | fever, rash, body ache |
| Malaria | cyclical fever, chills, sweating |
| Typhoid | abdominal pain, constipation, fever |
| Common Cold | runny nose, sore throat, cough |
| Influenza | high fever, body ache, fatigue |
| COVID-19 | dry cough, shortness of breath, fatigue |
| Gastroenteritis | nausea, vomiting, diarrhea |
| Migraine | severe headache, light sensitivity |
| Pneumonia | wet cough, chest pain, breathlessness |
| Hypertension | headache, dizziness, palpitations |
| Anemia | fatigue, weakness, breathlessness |
| Diabetes | excessive thirst, frequent urination |

---

## Extending the Disease Database

Add new diseases in `lib/diseaseData.ts` under `DISEASE_DB`:

```ts
"Chickenpox": {
  symptoms: ["rash","blisters","fever","itching","fatigue","loss_of_appetite"],
  description: "A highly contagious viral infection causing itchy blisters.",
  remedies: ["Antihistamines","Calamine lotion","Rest","Avoid scratching","Antiviral meds if severe"],
  color: "pink",
},
```

Add new symptom keyword mappings in `SYMPTOM_MAP` to improve chip suggestions for new complaint types.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI Chat | Anthropic Claude (claude-sonnet-4) |
| Prediction | Rule-based scoring (no ML runtime) |
| Fonts | DM Sans + DM Mono (Google Fonts) |
| Deployment | Vercel |

---

## Disclaimer

This application is intended **for educational purposes only**. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional.

---

## Author

404avinotfound — B.Tech CSE Student
