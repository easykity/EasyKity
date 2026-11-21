# EasyKity — Responsive Website Starter

**Tagline:** Everything Made Easy.

A responsive multi-page starter for EasyKity, built with HTML, CSS and vanilla JavaScript.

## Included
- `index.html`, `about.html`, `contact.html`
- Six matching tool-category landing pages under `tools/`
- Shared navigation and footer design across all pages
- Desktop, tablet and mobile responsive layouts
- Light/dark theme toggle (saved in localStorage)
- Homepage tool search/filter
- Contact form demo (front-end only)
- Shared CSS and JavaScript assets
- SVG EK brand mark and favicon

## Run locally
Open `index.html` in a browser. No build step is required.

## Deploy to GitHub Pages
1. Create a GitHub repository named `EasyKity` (or your preferred repository name).
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/ (root)`, then save.

## Important notes
- The contact form is a front-end demo. Connect Formspree, EmailJS or your own backend to receive messages.
- Tool-category pages are starter placeholders; individual tools can be added inside their matching folders.
- Google Fonts are loaded remotely; system fonts remain as fallback.
- Only use properly licensed streams and media sources if adding entertainment/live TV features.

## Tool development standard
- Default theme is dark; visitor preference is saved.
- The exact official logo is `assets/logo/favicon.png`.
- Read `TOOL-DESIGN-GUIDE.md` before asking an AI to build a new tool.
- Duplicate `tools/_template/tool-page-template.html` and replace placeholders when creating a new tool page.


## File Share P2P
- Page: `tools/entertainment-tools/file-share-p2p.html`
- Homepage icon: `assets/images/tools/file-share-p2p.svg`
- Folder selection and folder drag/drop are packaged into a ZIP archive before being sent through the existing PeerJS/WebRTC file-streaming protocol. The receiver saves the ZIP and can extract it to restore the folder structure.
