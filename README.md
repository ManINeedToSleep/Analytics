# RYLYTICS - Analytics Dashboard

A personal analytics dashboard built with Next.js 15, designed specifically for RYLY to track, visualize, and analyze her data in real-time. This private web application provides customized insights and reporting tailored to her individual needs.

## 🚀 Features

**AI-Powered Insights Engine**
AI analyzes community health in real-time. Segments users. Finds growth opportunities. Tracks engagement patterns.

**Interactive Dashboard**
Shows data in real-time. Can customize metrics and KPIs. Works on all devices. Has dark/light mode.

**Advanced Analytics**
Tracks community metrics. Shows how users behave. Finds trends. Makes reports automatically.

**Smart Notifications**
Sends alerts in real-time. Can choose what notifications you want. Uses priority system for important stuff.

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **UI Components**: 
  - shadcn/ui
  - Radix UI
  - Tailwind CSS
- **State Management**: React Hooks
- **Data Visualization**: Recharts
- **Form Handling**: React Hook Form + Zod
- **Styling**: Tailwind CSS + CSS Modules

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd analytics
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
analytics/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── analytics/        # Analytics-specific components
│   ├── dashboard/        # Dashboard components
│   └── ui/              # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and services
├── public/              # Static assets
└── styles/              # Global styles
```

## 🚀 Deployment

The application is configured for deployment on Vercel:

```bash
npm run build
npm run start
```

## 🔐 Security

- No PII (Personally Identifiable Information) processing
- Secure authentication system
- Environment variable protection
- Regular security audits
