# Saloni Pandey · Portfolio

A responsive personal portfolio built with semantic HTML, CSS, and vanilla JavaScript. It presents my projects, my data analytics learning roadmap, the tools I use, and my AI For Good Hackathon recognition.

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

- Positioning that matches my career goal: Data Analyst internships and entry-level analytics roles.
- Five projects with honest labels for status (prototype, in development, practice), team or solo work, and my role in each.
- A data analytics learning roadmap that is clearly marked as a learning plan, not a proficiency claim.
- Project filtering by applied projects and interface practice, with counts calculated from the page.
- Readable type: visible, non-decorative text is at least 12px.
- Keyboard-accessible navigation, focus indicators, skip link, new-tab hints for screen readers, and reduced-motion support.
- Content, project details, navigation, and email links work without JavaScript.
- Search and sharing metadata, including Open Graph, Twitter card, and schema.org `Person` data.
- Direct email contact and optional clipboard copying. No simulated message delivery or third-party form service.
- No runtime JavaScript dependencies. Google Fonts are optional; system fonts are the fallback.

## Updating content

Edit project descriptions, skills, the learning roadmap, recognition, and contact information in `index.html`. Each project card has a `data-category` of `applied` or `practice`; the filter counts update automatically. Project illustrations are decorative CSS artwork, not application screenshots.

When an analytics case study is ready, add it as an `applied` project card and update the roadmap's "Next milestone" text.

For email changes, update the `mailto:` links and the displayed address in `index.html`. The copy button reads the displayed address, so `script.js` does not need to change. To change the visual theme, edit the variables at the top of `styleprofile.css`.

## Publishing

The site is ready for a static host. For GitHub Pages, select the intended branch and its root folder in the repository's Pages settings. `index.html` is the homepage; `profile.html` keeps old links working. This README does not imply that hosting is already configured.

After the site has a public URL, add `<link rel="canonical">`, `og:url`, and an absolute `og:image` URL to the `<head>` of `index.html` so link previews show the right page and image.

## Contact

- [GitHub](https://github.com/salonipandey-dev)
- [LinkedIn](https://www.linkedin.com/in/saloni-pandey-56b216290/)
- [Email](mailto:salonipandey0716@gmail.com)
