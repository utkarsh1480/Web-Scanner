# 🌐 Web Scanner

A modern, full-featured website analysis tool that grades your website's **performance, SEO, accessibility, and security** in seconds — powered by Google's PageSpeed Insights API.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

---

## ✨ Features

- **🔍 Website Analysis** — Enter any URL and get detailed scores for Performance, Accessibility, Best Practices, and SEO using Google's Lighthouse/PageSpeed Insights API.
- **📊 Visual Score Dashboard** — Beautiful circular progress indicators and score cards with color-coded grades (green/yellow/red).
- **📧 Email Reports** — Automatically sends analysis results to the user's email via EmailJS.
- **🌍 Multi-Language Support** — Full internationalization with 6 languages: English, German, Spanish, French, Japanese, and Portuguese.
- **🌙 Dark/Light Theme** — Theme toggle in the navbar with smooth transitions, persisted via localStorage.
- **📱 Fully Responsive** — Mobile-first design with collapsible navigation and adaptive layouts.
- **⚡ Fast & Lightweight** — Optimized Vite build (~142 KB gzipped), no unnecessary API calls on load.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework with Context API for global state |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling with dark mode support |
| **shadcn/ui** | Pre-built accessible UI components (Radix primitives) |
| **Lucide React** | Icon library |
| **React Router v6** | Client-side routing |
| **EmailJS** | Email delivery for analysis reports |
| **Google PageSpeed API** | Website performance analysis engine |

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Main layout — shared navbar, footer, routing
├── main.jsx                 # App entry point with providers
├── index.css                # Global styles + CSS variables (light/dark)
├── Context/
│   ├── LanguageContext.jsx   # Multi-language translations (6 languages)
│   ├── ThemeContext.jsx      # Dark/light theme toggle with localStorage
│   └── context.jsx           # PageSpeed data context
└── components/
    ├── WebsiteGrader.jsx     # Homepage — URL input, API call, feature cards
    ├── Lighthouse.jsx        # Analysis results dashboard
    ├── Contact.jsx           # Contact form with EmailJS integration
    ├── Servicepage.jsx       # Services showcase page
    ├── SiteGrade.jsx         # Detailed site grade breakdown
    ├── scorecard.jsx         # Individual score card component
    └── ui/                   # shadcn/ui components (Button, Card, Input, etc.)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/utkarsh1480/web-scanner.git
cd web-scanner

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 🌐 Deployment (Vercel)

This project is pre-configured for Vercel deployment with SPA routing support.

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — just click **Deploy**

The included `vercel.json` handles client-side routing rewrites automatically.

---

## 🔑 Environment / API Keys

The app uses the following external services:

| Service | Purpose | Configuration |
|---|---|---|
| **Google PageSpeed Insights** | Website analysis | Public API (no key required for basic usage) |
| **EmailJS** | Send email reports | Service ID, Template ID, and Public Key in `WebsiteGrader.jsx` |

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| **Home** | `/` | URL input form, feature cards, contact links |
| **Lighthouse** | `/lighthouse` | Analysis results with scores and detailed breakdown |
| **Services** | `/cms` | Web development services showcase |
| **Contact** | `/contact` | Contact form with email delivery |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
