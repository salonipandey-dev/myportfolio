# Saloni Pandey · Portfolio

A responsive personal portfolio built with semantic HTML, CSS, and vanilla JavaScript. It presents my projects, my data analytics learning journey, skills labeled by evidence, and my AI For Good Hackathon recognition.

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

| File                          | Purpose                                                             |
| ----------------------------- | ------------------------------------------------------------------- |
| `index.html`                  | Homepage and portfolio content                                      |
| `styleprofile.css`            | Colors, layouts, illustrations, and responsive styles               |
| `script.js`                   | Mobile menu, project filters, copy email, section tracking, reveals |
| `mypic.jpg`                   | Original profile photo (fallback for browsers without WebP)         |
| `images/`                     | Optimized WebP portrait and the MedAssist application screenshot    |
| `favicon.svg`                 | Portfolio favicon                                                   |
| `profile.html`, `redirect.js` | Compatibility entry for older portfolio links                       |

## Features

- Positioning that matches my career goal: Data Analyst internships and entry-level analytics roles.
- Five projects with honest labels for status (prototype, in development, practice), team or solo work, and my role in each. MedAssist is featured with a real application screenshot on fictional data.
- Skills labeled by evidence: **used in my projects** versus **practicing now**. Only tools that appear in my repositories are listed as used.
- A learning journey with verified milestones and a learning plan that is clearly not a proficiency claim.
- Project filtering by applied projects and interface practice, with counts calculated from the page. Links to a specific project clear the filter first.
- Inline SVG icons from one sprite in `index.html`; no icon font or external requests.
- A short hero intro and reveal-on-scroll that animate only opacity and transform, and are skipped entirely with `prefers-reduced-motion`.
- Keyboard-accessible navigation, a stacked mobile menu with 48px tap targets, visible focus, skip link, and new-tab hints for screen readers.
- Content, project details, navigation, and email links work without JavaScript.
- Search and sharing metadata, including Open Graph, Twitter card, and schema.org `Person` data.
- Direct email contact plus LinkedIn and GitHub links, and optional clipboard copying. No simulated message delivery or third-party form service.
- No runtime JavaScript dependencies. Google Fonts are optional; system fonts are the fallback.

## Updating content

Edit project descriptions, skills, the learning roadmap, recognition, and contact information in `index.html`. Each project card has a `data-category` of `applied` or `practice`; the filter counts update automatically. Project illustrations are decorative CSS artwork, not application screenshots.

Update the "Shipped so far" timeline in the Skills section when you finish a milestone. Only list dates you can show in a repository or certificate.

### Adding an analytics case study

When an analysis and dashboard are ready to review, paste this card into `.project-grid` in `index.html` and replace every placeholder with real details. The styles already exist in `styleprofile.css`. Do not publish placeholder text or estimated results.

```html
<article class="project-card case-study" data-category="applied">
  <div class="project-art data-art" aria-hidden="true">
    <div class="art-topline">
      <span>PROJECT NAME</span><span>06 / ANALYTICS</span>
    </div>
    <div class="data-bars"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="art-bottom">
      <span>Short two-line<br />caption.</span>
    </div>
  </div>
  <div class="project-body">
    <div class="project-meta">
      <span class="project-label">DATA ANALYSIS · CASE STUDY</span
      ><span class="project-badge badge-neutral">Solo project</span>
    </div>
    <h3>Project name</h3>
    <p>The problem, and who it matters to.</p>
    <dl class="case-facts">
      <div>
        <dt>Question</dt>
        <dd>The business question you answered.</dd>
      </div>
      <div>
        <dt>Data</dt>
        <dd>Source, size, and how you cleaned it.</dd>
      </div>
      <div>
        <dt>Approach</dt>
        <dd>The SQL, Python, Excel, or Power BI work.</dd>
      </div>
      <div>
        <dt>Key finding</dt>
        <dd>The result, with its real numbers.</dd>
      </div>
    </dl>
    <ul class="tags">
      <li>SQL</li>
      <li>Power BI</li>
    </ul>
    <div class="project-links">
      <a
        href="https://github.com/salonipandey-dev/REPO"
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby="new-tab-note"
        >Source code</a
      >
    </div>
  </div>
</article>
```

Then move SQL, Excel, or Power BI from **Practicing now** to **Used in my projects** in the Skills section, and update the roadmap's "Next milestone" text. To add a screenshot instead of the bar art, follow the MedAssist card: save a WebP under `images/` and use the `project-shot` figure markup.

For email changes, update the `mailto:` links and the displayed address in `index.html`. The copy button reads the displayed address, so `script.js` does not need to change. To change the visual theme, edit the variables at the top of `styleprofile.css`.

## Checks

Format with Prettier (`npx prettier --check index.html styleprofile.css script.js`). Before publishing a change, preview the page at 320px, 375px, 768px, 1024px, and 1440px widths, test the mobile menu with the keyboard, and confirm the page still reads well with JavaScript disabled.

## Publishing

The site is ready for a static host. For GitHub Pages, select the intended branch and its root folder in the repository's Pages settings. `index.html` is the homepage; `profile.html` keeps old links working. This README does not imply that hosting is already configured.

After the site has a public URL, add `<link rel="canonical">`, `og:url`, and an absolute `og:image` URL to the `<head>` of `index.html` so link previews show the right page and image.

## Contact

- [GitHub](https://github.com/salonipandey-dev)
- [LinkedIn](https://www.linkedin.com/in/saloni-pandey-56b216290/)
- [Email](mailto:salonipandey0716@gmail.com)
