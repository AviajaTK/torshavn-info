# Tórshavn Visitor Information App

## Overview
This app helps track visitor queries and age ranges in Tórshavn, using Flowcore for data logging.

## Features
- Log visitor queries (Føroyingur/Ferðafólk)
- Track age ranges
- Admin dashboard for viewing logs
- Export to CSV

## Deployment Instructions

### Local Development
1. Clone the repository
2. Run `npm install`
3. Create `.env.local` with your Flowcore API key
4. Run `npm run dev`

### Vercel Deployment
1. Fork this repository
2. Create a Vercel account at [vercel.com](https://vercel.com)
3. Connect your GitHub repository to Vercel
4. Add environment variable:
   - Name: `FLOWCORE_API_KEY`
   - Value: Your Flowcore API key
5. Deploy!

## Technical Stack
- Next.js
- TypeScript
- Flowcore Integration
- Tailwind CSS

## Architecture
- Three-layer architecture
- Server-side API routes
- Client-side components
- Flowcore data logging

---

_Trigger Vercel deployment_
