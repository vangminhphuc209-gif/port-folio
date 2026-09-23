# Vàng Minh Phúc — Interactive Portfolio

A dark editorial personal portfolio built with **Next.js, React, TypeScript, Tailwind CSS, Motion and Lenis**.

The project is designed around a premium hero composition with a giant `01`, a central portrait, a glass introduction card, stacked project previews, custom cursor, mouse glow, subtle parallax, smooth scrolling and responsive sections.

## Features

- Dark editorial / premium visual direction
- Giant typography and layered hero composition
- Central portrait with subtle mouse parallax
- Stacked 3D-tilt project cards
- Custom cursor on desktop
- Mouse-follow ambient glow
- Smooth scrolling with Lenis
- Text and section reveal animations
- Responsive navigation and mobile drawer
- About, Skills, Projects and Contact sections
- Facebook, Instagram and Email icon buttons
- `prefers-reduced-motion` support
- Next.js metadata / Open Graph basics
- Ready for Vercel deployment

## Requirements

- Node.js 22 recommended
- npm 10+

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production build

```bash
npm run build
npm start
```

## Main content file

Most personal content is centralized in:

```text
data/portfolio.ts
```

Edit this file to change:

- Name
- Role
- Hero heading
- Location
- Email
- Introduction
- About text
- Skills
- Project content
- Facebook / Instagram URLs

## Important: add your Facebook and Instagram links

The social URLs are intentionally left empty because no exact profile URLs were provided.

Open:

```text
data/portfolio.ts
```

Then change:

```ts
social: {
  facebook: "https://facebook.com/YOUR_PROFILE",
  instagram: "https://instagram.com/YOUR_USERNAME",
},
```

Until these values are configured, the Facebook and Instagram icons remain visible but disabled, so the site never sends visitors to the wrong profile.

## Replace the portrait

Current placeholder:

```text
public/profile/portrait-main.png
```

Replace it with your own transparent or clean-background portrait using the same filename.

Recommended image:

- PNG or WebP
- transparent background if possible
- half body or full body
- high resolution
- portrait orientation

If you change the filename, also update:

```text
components/hero/HeroPortrait.tsx
```

## Replace project images

Current demo images:

```text
public/projects/project-01.png
public/projects/project-02.png
public/projects/project-03.png
```

Replace them with your real screenshots and update project information in:

```text
data/portfolio.ts
```

The demo projects are clearly portfolio placeholders; they are not presented as real client work.

## Folder structure

```text
vang-minh-phuc-portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── effects/
│   ├── hero/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── data/
│   └── portfolio.ts
├── public/
│   ├── icons/
│   ├── profile/
│   └── projects/
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Deploy to Vercel for free

1. Create a GitHub repository.
2. Push this project to GitHub.
3. Sign in to Vercel.
4. Choose **Add New → Project**.
5. Import the GitHub repository.
6. Vercel should detect Next.js automatically.
7. Click **Deploy**.

You do not need to manage a VPS, Nginx, PM2 or SSL manually for this portfolio.

## Before publishing

Recommended checklist:

- Replace the placeholder portrait.
- Replace demo project images and project descriptions.
- Add exact Facebook and Instagram profile URLs.
- Update `metadataBase` inside `app/layout.tsx` after you know your final domain.
- Run `npm run build` locally once dependencies are installed.
- Test keyboard navigation and mobile layout.

## Design notes

The site intentionally avoids excessive neon, strong brand colors and heavy glassmorphism. Motion is kept subtle and most pointer effects are disabled on touch devices or when the user has reduced-motion enabled.

## Portrait pose animations

The hero portrait now uses a small pose pack in `public/profile/poses/`.

- `portrait-idle.png` — default state
- `portrait-look-left.png` — cursor on the left
- `portrait-look-right.png` — cursor on the right
- `portrait-lean-left.png` — cursor at the far-left edge
- `portrait-arms-crossed.png` — About / Skills navigation hover
- `portrait-point-right.png` — project interactions

The pose state is coordinated through `lib/portraitPose.ts`. To add another pose, add the image under `public/profile/poses/`, extend the `PortraitPose` type, add it to `poseImages` in `components/hero/HeroPortrait.tsx`, then trigger it with `setPortraitPose("your-pose")`.
