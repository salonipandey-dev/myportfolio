# Saloni Pandey · Portfolio

A responsive personal portfolio built with semantic HTML, CSS, and vanilla JavaScript. It presents my projects, technical interests, and AI For Good Hackathon recognition.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. No dependency installation or build step is required.

## Files

| File                          | Purpose                                                                |
| ----------------------------- | ---------------------------------------------------------------------- |
| `index.html`                  | Homepage and portfolio content                                         |
| `styleprofile.css`            | Colors, layouts, illustrations, and responsive styles                  |
| `script.js`                   | Mobile navigation, project filtering, copy email, and section tracking |
| `mypic.jpg`                   | Original profile photo                                                 |
| `favicon.svg`                 | Portfolio favicon                                                      |
| `profile.html`, `redirect.js` | Compatibility entry for older portfolio links                          |

## Features

- Responsive editorial layout with a purple accent palette and original portrait.
- Project filtering and expandable contribution details.
- Keyboard-accessible navigation, focus indicators, skip link, and reduced-motion support.
- Content, project details, navigation, and email links work without JavaScript.
- Direct email contact and optional clipboard copying. No simulated message delivery or third-party form service.
- No runtime JavaScript dependencies. Google Fonts are optional; system fonts are the fallback.

## Updating content

Edit project descriptions, skills, recognition, and contact information in `index.html`. Project illustrations are decorative CSS artwork, not application screenshots. Add an actual repository URL for Spotify UI Clone when available; the current text intentionally does not link to an empty URL.

For email changes, update the `mailto:` links and the displayed address in `index.html`, plus the clipboard address in `script.js`. To change the visual theme, edit the variables at the top of `styleprofile.css`.

## Publishing

The site is ready for a static host. For GitHub Pages, select the intended branch and its root folder in the repository's Pages settings. `index.html` is the homepage; `profile.html` keeps old links working. This README does not imply that hosting is already configured.

## Contact

- [GitHub](https://github.com/salonipandey-dev)
- [LinkedIn](https://www.linkedin.com/in/saloni-pandey-56b216290/)
- [Email](mailto:salonipandey0716@gmail.com)
