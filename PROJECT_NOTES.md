# Project Notes

## Identity

- Name: Vàng Minh Phúc
- Role: Frontend Developer
- Date of birth: 05/11/2009
- Location: Mường Tè, Lai Châu, Vietnam
- Contact: vangminhphuc209@gmail.com

## Visual direction

- Dark minimal / editorial / premium
- Giant `01` behind portrait
- Central portrait
- Left-side hero typography and glass biography card
- Right-side stacked project cards on desktop
- Mouse glow
- Custom cursor
- Portrait parallax
- Project card tilt
- Smooth scroll
- Text reveal and section reveal

## Social links

Facebook and Instagram profile URLs were not provided at build time. They are intentionally left blank in `data/portfolio.ts` instead of being guessed.

## Asset placeholders

The included portrait and project images are generated local placeholders so the project is complete and does not depend on remote image URLs. Replace them with personal assets when ready.

## Portrait pose animation update

The hero now uses six transparent portrait pose assets from `public/profile/poses/`:

- `portrait-idle.png`
- `portrait-look-left.png`
- `portrait-look-right.png`
- `portrait-lean-left.png`
- `portrait-arms-crossed.png`
- `portrait-point-right.png`

Interaction mapping:

- Cursor left/right: portrait looks toward that side.
- Cursor at the far-left edge: lean-left pose.
- Hover the project stack or “View projects”: point-right pose.
- Hover About / Skills: arms-crossed pose.
- Hover Contact / Let’s talk: look-right pose.
- Leaving a forced interaction returns control to mouse-position poses.

Pose transitions use short opacity + blur + scale crossfades, while the whole portrait still uses spring-based parallax. Reduced-motion users keep a simplified experience.
