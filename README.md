# Ibrahim Olawale — COS 106 Portfolio & Academic Planner

A five-page student portfolio for COS 106: Introduction to Web Technologies at Miva Open University. It presents Ibrahim Olawale's web design, web development and brand design work, alongside his B.Sc. Software Engineering studies (100 Level, 2026–Present).

Built with semantic HTML, external CSS and vanilla JavaScript. No framework, build step, backend or production package installation is required.

## Contents

- [Run locally](#run-locally)
- [Project structure](#project-structure)
- [Pages and features](#pages-and-features)
- [Design approach](#design-approach)
- [JavaScript and data](#javascript-and-data)
- [Accessibility and assets](#accessibility-and-assets)
- [Verification](#verification)
- [Publishing and submission](#publishing-and-submission)
- [Separate project report](#separate-project-report)

## Run locally

Open index.html for a quick preview. For consistent browser storage and behaviour, open this folder in VS Code with Live Server, or run:

```sh
python -m http.server 8000
```

Visit http://localhost:8000. Python is only a local-server option; it is not required by the deployed site. Keep the same browser and origin when checking planner persistence. Different ports, domains and direct file previews can use different storage areas.

## Project structure

```text
ibrahim-portfolio-homepage/
|-- index.html                 Home
|-- about.html                 Biography, experience, education and audio
|-- projects.html              Selected projects
|-- planner.html               Academic task planner
|-- contact.html               Contact details and validation demo
|-- css/
|   |-- styles.css             Shared styles and components
|   `-- pages.css              Page layouts and responsive refinements
|-- js/
|   |-- main.js                Navigation and shared interface behaviour
|   |-- portfolio-core.js      Task records, storage and validation
|   |-- planner.js             Planner DOM interactions
|   |-- contact.js             Form feedback and phone input filtering
|   `-- audio.js               Introduction-player visibility
|-- images/                    Local WebP delivery images
|   `-- tools/                 SVG logos, source list and attribution
|-- media/
|   |-- introduction.mp4       Recorded introduction
|   `-- introduction-transcript.txt
`-- README.md                  Project documentation
```

This structure reflects the cleaned publishing folder. The PDF, report-generation scripts, original artwork and earlier screenshots are stored separately and are not repository files.

All five pages share the external stylesheets. Page scripts supply the relevant interactions. Only the five HTML pages, css/, js/, images/, media/ and this README are included in the publishing folder. Tests and development configuration are stored separately in ../portfolio-private-archive/development/.

## Pages and features

| Page | Content and behaviour |
| --- | --- |
| Home | Introduction, photographic hero, What I do, About preview, Tools I use, ProtenConnect/Keed/Prodan FX previews and shared CTA. |
| About | Biography, career aspiration, skills, interests, professional timeline, education table, recorded introduction, transcript and shared CTA. |
| Projects | Three project descriptions with local artwork, public project/case-study links and shared CTA. ProtenConnect is explicitly in development. |
| Academic planner | Prefilled sample coursework, course/task/date input, newest-first tasks, completion/reopening, deletion, counts and usage guide. |
| Contact | Public email, Lagos location and LinkedIn/Behance/GitHub links, plus a form demonstrating required-field, email and digits-only phone validation. |

Experience includes Creative Editor at Proten International (November 2024–Present), ongoing freelance Brand Designer work at Wale Design Co., past contract Graphic Designer work at Movam Technologies Limited (October 2023–September 2024), and earlier Wildfire experience. Education records the current Miva programme; the unfinished YABATECH programme is excluded.

ProtenConnect work covers research, roadmap planning, design and development. Keed and Prodan FX showcase brand identity work. External project/profile links open in new tabs with noopener/noreferrer; local page navigation stays in the current tab.

## Design approach

The IO. text mark, emerald studio portraits, dark navigation/footer and lime actions form a consistent identity across the site.

| Colour | Value | Use |
| --- | --- | --- |
| Ink | #15191b | Header, footer and dark text |
| Lime | #ccf568 | Primary actions and emphasis |
| Paper | #f9faf7 | Page background |
| White | #ffffff | Surface areas |
| Heading green | #557531 | Supporting heading accents |
| Reading copy | #4e5d54 | Body text refinements |

Work Sans is used for headings; Inter for body copy, controls and tool labels. Arial/sans-serif fallbacks remain available. Large headings scale with the viewport, while body text has generous line height. Tool labels use regular 400 weight.

The centred content container is capped at 1220px. Grid and Flexbox organise content, with an 8/16/24/32/48px spacing scale. Baseline section spacing adapts from 80px to 64px to 48px, with extra space around selected Home sections. Rounded buttons and image corners repeat the visual language. Creative and development tools occupy separate horizontal rows.

Page-specific media queries reduce columns and gaps, adapt the mobile menu, and stack content on phones. Portraits and copy separate where needed for legibility. Tool rows and the education table can scroll within their own regions. The CTA is repeated on Home, About and Projects.

## JavaScript and data

### Academic planner

Tasks contain an ID, course, title, due date, completion state and sample flag. Input is trimmed and requires a course, task and valid date. New tasks are inserted first. Completion can be toggled and tasks can be removed.

The localStorage key is `ibrahim-academic-planner-v1`. Samples seed only when the key is missing. A saved empty array remains empty after refresh. Unavailable or malformed storage keeps the interface usable for the session and displays a limitation notice; unreadable data is not silently overwritten. Tasks do not sync across browsers or devices. Clearing site data resets stored tasks.

User task text is inserted with textContent so HTML-like input is displayed literally rather than interpreted as markup.

### Contact demo

Name, email, phone and message are required. JavaScript checks nonempty values and email format. Phone input filters typed/pasted characters to digits, and the shared validator independently rejects nondigits, including + signs. Errors appear beside fields, aria-invalid is updated and focus moves to the first invalid field.

A valid submission explicitly states that no message was sent. The form does not send email or store submitted messages. Visitors can use the public email link to make contact.

### Shared interactions

The mobile menu tracks aria-expanded, supports Escape and closes after selection/outside clicks. Shared scripts handle header state, reveal effects and copyright year. Reduced-motion preferences disable reveal animation. About uses the browser's native audio controls.

## Accessibility and assets

- Semantic header, navigation, main and footer landmarks, a skip link and one h1 per page.
- Visible keyboard focus, associated form labels, field errors and live task-status feedback.
- A semantic education table and a transcript accompanying the recorded introduction.
- Responsive layouts and reduced-motion support.

Portraits, project artwork and the recording were supplied by Ibrahim Olawale. Delivery images are local optimized WebP files, with small project thumbnails. The measured ten-image set was reduced from 17,619,102 bytes to 581,262 bytes (96.7% smaller); this is an asset-size reduction, not a measured page-load speed score.

Tool logos are served locally as SVG files. Their origins and source-reported licence details are recorded in images/tools/sources.json and the accompanying README. Brand marks belong to their respective owners. Fonts are requested through Google Fonts with system fallbacks. The website does not depend on the private archive.

## Verification

Tests and development settings are archived in ../portfolio-private-archive/development/ and are not part of the publishing folder. The final checks before moving them passed all 7 logic/resource/markup tests. Previous browser verification passed 24 scenarios and captured 20 responsive screenshots at 320, 375, 768 and 1440px without captured JavaScript errors.

The archived checks cover task creation and storage, contact validation, markup, local links, CSS backgrounds, mobile navigation, overflow, images, audio playback and safe task text. To rerun the existing scripts, temporarily restore tests/ and any needed development settings to their original paths, run the commands below from the website folder, then move them back out before publishing:

```sh
node --test tests/logic.test.cjs tests/assessment.test.cjs
node tests/browser.test.cjs
```

Browser checks require Playwright and installed Google Chrome and generate verification/ screenshots. These are development tools, not website dependencies. Local checks do not constitute official W3C certification or a complete accessibility audit.

## Publishing and submission

Published and checked on 14 November 2026.

- Website: https://olawaleib21.github.io/ibrahim-portfolio/
- Repository: https://github.com/Olawaleib21/ibrahim-portfolio

Live Chrome checks passed for all five pages, local styles/scripts/images, mobile navigation at 375px without page overflow, audio playback, planner actions and persistence, and contact validation with truthful demo feedback. No JavaScript errors were captured.

1. Use this folder's contents as the repository root so index.html is directly at the root.
2. Commit only the five HTML pages, css/, js/, images/, media/ and README.md. Review the staged file list before pushing.
3. Keep the separate PDF, private archive, source artwork, CV, classmate report, audit notes and generated screenshots out of GitHub. Tests, configuration files and the PDF are physically outside the publishing folder. Review the upload selection carefully; there is no .gitignore inside this folder.
4. Enable GitHub Pages for the selected branch and root folder.
5. Verify the public URL, including the repository subpath: all pages, navigation, images, audio, external links, keyboard access, phone layouts, planner persistence and contact validation.
6. Add the verified repository URL and hosted website URL to the separate assessment PDF. Submit the PDF and both links by 15 November 2026.

The contact form remains a validation demonstration and planner storage remains browser-local after publishing. External links were manually checked by the student on 14 November 2026; the hosted site was also checked on 14 November 2026.

## Separate project report

The 21-page report is stored outside the repository at:

```text
../portfolio-private-archive/docs/Ibrahim-Olawale-COS106-Project-Report.pdf
```

It documents assessment coverage, the cleaned project structure, design identity/colour/typography/spacing, shared header/CTA/footer screenshots, the five pages, syntax-highlighted JavaScript excerpts, testing, performance, accessibility, publishing and references. It is submitted separately and is not published to GitHub. The verified website and repository URLs have been added to it.

Report-generation and verification scripts are in the private archive's docs/ folder. They read current website code from this folder and report assets/evidence from the archive. Regeneration requires Python with ReportLab, Pygments, pypdfium2, pypdf, pdfplumber and Pillow, plus the Windows fonts referenced by the scripts. Review rendered pages and pagination after changes.

The private archive also retains original images, earlier screenshots, audit notes and a manifest of moved files. Image-maintenance scripts may need their original input paths restored before use. Do not upload that sibling archive. The supplied classmate report guided documentation organisation only; project content, screenshots and implementation explanations describe this portfolio.
