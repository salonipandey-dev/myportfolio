# Saloni Pandey · Portfolio

A responsive personal portfolio built with semantic HTML, CSS, and vanilla JavaScript. It presents my projects, skills, education and project experience, and contact details for recruiters.

## Run locally

Clone the repository and open its folder:

```sh
git clone https://github.com/salonipandey-dev/myportfolio.git
cd myportfolio
```

Open `index.html` in a browser for a quick preview. To preview over HTTP, run the command for your system from the repository folder:

**Windows (PowerShell or Command Prompt):**

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

**macOS or Linux:**

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

If your Python installation uses the `python` command, use it in place of `py` or `python3`.

Then visit [http://127.0.0.1:8000](http://127.0.0.1:8000). Keep the terminal open while previewing; press `Ctrl+C` to stop the server.

No dependency installation or build step is required.

## Files

| File                          | Purpose                                                       |
| ----------------------------- | ------------------------------------------------------------- |
| `index.html`                  | Homepage content and inline pixel-art SVGs                    |
| `styleprofile.css`            | Color tokens, layout, and responsive styles                   |
| `script.js`                   | Mobile menu, copy email, active-section links, scroll reveals |
| `imagep.png.jpeg`, `images/`  | Original photo, hero portrait crop, MedAssist screenshot      |
| `favicon.svg`                 | Portfolio favicon                                             |
| `profile.html`, `redirect.js` | Compatibility entry for older portfolio links                 |

## Design

A near-black canvas with emerald (`--emerald`) and antique gold (`--gold`) accents. All colors are CSS variables at the top of `styleprofile.css`. The page runs in this order: a centered hero with my portrait (`images/portrait-hero.webp`, a square crop of `imagep.png.jpeg`), About with an animated pixel-art coffee mug, Skills, Education & Project Experience, Projects, and Contact.

- Skill tags are solid when the skill is used in a project and dashed when I am currently learning it.
- MedAssist is featured first with a real application screenshot on fictional data. The other project previews are decorative pixel art, not screenshots.
- Contact uses a direct "Email Me" `mailto:` action plus an optional copy button. There is no form backend, and the Content Security Policy blocks form submissions.
- Keyboard focus is visible, the mobile menu works with the keyboard and closes on Escape, and the steam, sparkle, and reveal animations stop with `prefers-reduced-motion`.
- Content and navigation work without JavaScript.

## Updating content

Edit text, skills, timeline entries, projects, and contact links in `index.html`. Only list dates you can show in a repository or certificate. To add a project, copy an existing `<article class="card project-card">`. For a screenshot preview, save a WebP under `images/` and follow the MedAssist card's `<img>` markup. When a skill moves from learning to used, remove its `tag-learning` class.

## Checks

Format with Prettier (`npx prettier --check index.html styleprofile.css script.js README.md`). Before publishing a change, preview the page at 390px and 1440px widths (plus 768px and 1024px), test the mobile menu with the keyboard, and confirm the page still reads well with JavaScript disabled.

## Publishing

The site is ready for a static host. For GitHub Pages, select the intended branch and its root folder in the repository's Pages settings. `index.html` is the homepage; `profile.html` keeps old links working. This README does not imply that hosting is already configured.

After the site has a public URL, add `<link rel="canonical">`, `og:url`, and an absolute `og:image` URL to the `<head>` of `index.html` so link previews show the right page and image.

## Contact

- [GitHub](https://github.com/salonipandey-dev)
- [LinkedIn](https://www.linkedin.com/in/saloni-pandey-56b216290/)
- [Email](mailto:salonipandey0716@gmail.com)
