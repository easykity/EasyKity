# EasyKity — Tool UI Design System & AI Build Prompt

এই ডকুমেন্টটি EasyKity-তে ভবিষ্যতে প্রতিটি নতুন Tool বানানোর সময় AI-কে দিন। লক্ষ্য: সব Tool-এর কাজ আলাদা হলেও UI/UX যেন একই ব্র্যান্ড, একই Layout System এবং একই মান বজায় রাখে।

## 1. Brand assets — fixed rules

- Brand name: **EasyKity**
- Tagline: **Everything Made Easy.**
- Official logo and favicon: `assets/logo/favicon.png`
- Header/footer-এও এই একই `favicon.png` ব্যবহার করুন; নতুন EK logo আঁকবেন না, বিকল্প logo বানাবেন না।
- Primary: `#315EEB`
- Secondary / gradient: `#8B5CF6`
- Accent cyan: `#18C8EF`
- Dark page background: `#0C1220`
- Dark surface/card: `#151E30`
- Light page background: `#F6F8FC`
- Light surface/card: `#FFFFFF`
- Border: dark `#29354A`, light `#E7EBF3`
- Text: dark mode `#EEF2FF`; light mode `#111827`
- Muted text: dark `#A7B1C5`; light `#667085`

## 2. Theme rules

- **Dark mode is the default** for first-time visitors.
- Remember the visitor's manual theme selection in `localStorage` using key `easykity-theme`.
- Theme toggle must work on every page and be consistent.
- Never hard-code white/black backgrounds or text inside a tool component. Use shared CSS variables (`--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--brand`, `--brand2`).
- Check all controls, placeholders, borders, disabled states, dialogs, drop zones, results, and error messages in both themes.
- Avoid a flash of light theme on initial page load.

## 3. Shared page layout

Every tool page must have:
1. Same sticky site header as the homepage (official logo, EasyKity wordmark, Home/Tools/About/Contact links, theme toggle, mobile menu).
2. Breadcrumb: `Home / Tool Category / Tool Name`.
3. Tool introduction: category label, tool name, one-sentence description, optional small tool icon.
4. Main workspace inside a rounded card.
5. Clear primary action button using blue-to-purple gradient.
6. Helpful instructions / supported formats / privacy note where relevant.
7. FAQ or short tips section when useful.
8. Same footer as all other pages.
9. Responsive layout: mobile first, then tablet and desktop.

## 4. Tool page visual rules

- Main content max-width: around `1100–1160px`; centered.
- Main workspace radius: `20–24px`.
- Cards: radius `16–22px`, subtle border, soft shadow.
- Spacing should be consistent: 8px rhythm (8, 12, 16, 24, 32).
- Buttons: radius `12–14px`, clear hover/focus/disabled/loading states.
- Inputs: minimum height 44px, readable labels, visible focus ring.
- Tool icon: use a dedicated SVG/PNG stored under `assets/images/tools/`; do not use random emoji as the final brand icon.
- Card icon artwork should be square, simple, recognizable at 48–64px, and match the blue/purple/cyan palette.
- Use CSS transitions for hover (about 180–300ms), slight lift, gradient border glow, and a subtle click ripple.
- Do not animate constantly. Respect `prefers-reduced-motion`.
- Keep text readable; do not sacrifice usability for effects.

## 5. Homepage tool card system

A tool card must contain:
- Icon image path (local file or an explicitly supplied image URL)
- Tool title
- Short description
- Category
- Destination page URL
- Optional status label (New / Beta / Coming soon)

Card must be clickable as one link and open the tool's own page. Use the same `.tool-card` CSS class. Use local images under `assets/images/tools/` when possible. If a remote image URL is used, confirm it is stable and publicly accessible.

Example:
```html
<a class="tool-card" data-tool-card href="tools/image-tools/image-resizer.html">
  <div class="tool-icon">
    <img src="assets/images/tools/image-resizer.svg" alt="" loading="lazy">
  </div>
  <h3>Image Resizer</h3>
  <p>Resize images to your preferred dimensions.</p>
  <span class="card-arrow">Open tool →</span>
</a>
```

## 6. Folder and file naming

- Tool pages go inside their matching category folder.
- Use lowercase kebab-case filenames.
- Example: `tools/image-tools/image-resizer.html`
- Tool-specific CSS/JS can go in `assets/css/tools/` and `assets/js/tools/` if it grows large.
- Shared site CSS/JS must remain shared; do not duplicate the entire header/footer/theme code per tool.
- Use relative paths correctly from nested tool pages (`../../assets/...`).

## 7. Functionality and quality rules

- Build the actual working tool, not only a visual mockup.
- Validate inputs and show friendly error messages.
- Show loading/progress state for longer tasks.
- Provide a result preview and clear Download/Export/Reset actions where relevant.
- Handle empty input, invalid file types, large files, and mobile screen sizes.
- Prefer browser-side processing for privacy where practical.
- Never upload or transmit user files unless the product explicitly requires it and the user is informed.
- Do not add fake buttons or pretend functionality.
- Do not add unlicensed streams, copyrighted media, or unsafe features.
- Keep accessibility: semantic HTML, labels, keyboard operation, visible focus, alt text.
- Test in Chrome desktop and a narrow mobile viewport.
- Check console for errors and verify all relative links.

---

# Copy/paste prompt for AI

You are a senior front-end engineer and product UI designer working on the existing **EasyKity** website. Build the requested tool as a fully working, production-minded feature that fits the existing EasyKity design system.

**First inspect and follow these existing project files**: `assets/css/style.css`, `assets/css/responsive.css`, `assets/css/themes.css`, `assets/js/app.js`, `assets/js/theme.js`, and `assets/logo/favicon.png`. Do not replace the website architecture or redesign the shared site shell.

### Brand requirements
- Brand: EasyKity — “Everything Made Easy.”
- Use `assets/logo/favicon.png` as the exact official logo in the header and favicon. Do not invent or redraw a logo.
- Use the existing blue/purple/cyan palette and shared CSS variables.
- Dark mode must be the initial default; preserve the existing theme toggle and localStorage preference.
- The tool page must look correct in both dark and light modes.

### Page design requirements
- Match the existing homepage header, navigation, mobile menu, footer, typography, spacing, border radius, cards, buttons and responsive behavior.
- Add breadcrumb, category eyebrow, clear tool title, concise description, and a dedicated tool workspace card.
- Use a dedicated icon image from `assets/images/tools/` in both the homepage card and the tool page.
- Tool workspace should use the shared classes/design tokens; do not create an unrelated visual style.
- Include elegant but restrained card hover lift, animated gradient border, click ripple, button hover/focus states and smooth transitions.
- Respect `prefers-reduced-motion`.
- Design mobile-first and ensure there is no horizontal overflow.

### Functional requirements
- Implement the requested tool completely. Do not provide a non-functional mockup.
- Include validation, empty/error states, success/result state, reset and download/export when appropriate.
- Explain file limits and privacy behavior when files are involved.
- Use browser-side processing when practical; do not send user files to a server without clearly stating this.
- Keep code readable and use semantic HTML, accessible labels and keyboard support.

### Deliverables
1. Create the tool page at: `[WRITE EXACT FILE PATH HERE]`.
2. Create or update its icon at: `[WRITE ICON PATH HERE]`.
3. Add the homepage card linking to the exact tool page, with icon image, title, short description and category.
4. Reuse the shared CSS/JS wherever possible; only add tool-specific CSS/JS when necessary.
5. Return the complete code for every created/updated file and explain exactly where each file belongs.
6. Give a short test checklist for desktop, mobile, dark mode, light mode, and the tool's main workflow.

### Tool specification
- Tool name: `[TOOL NAME]`
- Category: `[CATEGORY]`
- What it does: `[DESCRIBE THE TOOL]`
- Inputs: `[FILES / TEXT / OPTIONS]`
- Outputs: `[RESULT / DOWNLOAD FORMAT]`
- Special rules: `[ANY LIMITS OR REQUIREMENTS]`

Do not start coding until you have mapped the requested tool to the existing EasyKity folders and confirmed the homepage card destination. Then implement it consistently.
