# Lee Charles Portfolio

Source for [leecharlesdev.com](https://www.leecharlesdev.com), my personal portfolio.

## Highlights

- **No UI library.** Every component is hand-written React with plain CSS, built on a small
  design-token system (`src/styles/tokens.css`).
- **Real-time WebGL.** three.js scenes driven by custom GLSL:
  - a noise-displaced, custom-lit orb over a domain-warped backdrop in the hero
  - a shader transition between screenshots in the selected-work showcase
  - a pointer-reactive waveform behind the contact section and the 404 page
- **Progressive enhancement.** three.js is code-split and lazy-loaded. If WebGL is unavailable,
  CSS fallbacks show instead. Scenes pause off screen and honour `prefers-reduced-motion`.
- **Accessible by default.** Semantic markup, skip link, visible focus states, keyboard-reachable
  interactions.

## Tech stack

- React 18 + React Router
- three.js with hand-written GLSL shaders
- Plain CSS (custom properties, Grid, Flexbox)
- Create React App tooling, deployed to GitHub Pages

## Project structure

```
src/
  components/
    home/       Home page sections (Hero, About, FeaturedWork, ...)
    layout/     Header, Footer, Layout, ScrollManager
    projects/   ProjectCard
    ui/         Button, Icon, Reveal, CountUp, SectionHeader
  data/         Site content: profile.js and projects.js
  hooks/        useInView, useMediaQuery, useMagnetic, useSpotlight, ...
  pages/        Route components
  styles/       tokens.css (design tokens) and base.css (reset + utilities)
  webgl/
    glsl/       Shared shader chunks (noise, palette)
    scenes/     Scene factories: heroScene, showcaseScene, signalScene
    useThreeCanvas.js   Renderer lifecycle hook (resize, visibility, disposal)
```

Each component keeps its styles in a sibling `.css` file using BEM-style class names.

### Editing content

Projects live in `src/data/projects.js`; bio, stats, skills, and experience live in
`src/data/profile.js`. Adding a project there adds it to the index and gives it a page at
`/projects/<slug>`.

## Running locally

```
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

```
npm test
```

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes it
to GitHub Pages. `public/404.html` forwards deep links (for example `/projects/devtracker`) to
the app so client-side routes survive a refresh.

## Contact

Lee Charles — [LinkedIn](https://www.linkedin.com/in/lee-charles-98324910b/)
