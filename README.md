# Personal Portfolio Website

A macOS-inspired personal portfolio and resume site built with Vite, React, and TypeScript.

## Features

- Desktop-style macOS shell with floating windows and dock
- Notes app for personal bio, experience, education, skills, and outside-of-work content
- Resume preview using a static PDF asset
- Photo gallery with album support and local image assets
- Responsive mobile/tablet layout for smaller screens
- Static deployment-friendly setup

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide icons

## Project Structure

- `src/App.tsx` — app shell and responsive viewport logic
- `src/data/portfolioData.ts` — main content source for profile, experience, education, skills, photos, and outside-of-work data
- `src/components/apps/` — app-specific screens like Notes, Resume, Photos, Mail, Settings, and Terminal
- `public/` — static assets including `resume.pdf` and local images

## Local Development

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Production Build

```bash
npm run build
```

The production output is generated in the `dist/` folder.

## Updating Content

### Resume

Update the PDF at:

- `public/resume.pdf`

This file is the source of truth for the resume content and download.

### About / Experience / Education / Skills

Update the content in:

- `src/data/portfolioData.ts`

This file controls:

- personal info
- experience entries
- education entries
- skill categories
- outside-of-work content
- photo metadata and albums

### Photos

Add local photo files in:

- `public/images/`

Then reference them in:

- `src/data/portfolioData.ts`

### Profile photo

Add or replace:

- `public/images/profile-photo.jpeg`

and update the `profileImage` path in `PERSONAL_INFO` if needed.

## Deployment

This site is static and can be deployed on:

- GitHub Pages
- Netlify
- Vercel
- any static hosting service

For GitHub Pages, build the site and deploy the contents of the `dist/` folder.

## Notes

- The app is intentionally static and content-driven.
- Resume and image updates should be committed alongside the repo changes.
- The mobile version is designed as a compact iPhone-style shell, while the desktop version keeps the macOS-inspired window experience.
