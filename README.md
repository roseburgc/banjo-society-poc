# Old-Time Banjo Society — Website POC

A proof-of-concept for migrating a small, static, informational nonprofit
website **off WordPress/BlueHost** onto a modern, low-maintenance stack. Mock
content (a fictional old-time banjo nonprofit) stands in for the real site so
the framework can be evaluated before any commitment.

> **This README doubles as the technical section of the project proposal.**

---

## The stack (and why)

| Layer | Tool | Role | Why it was chosen |
|-------|------|------|-------------------|
| Content | **Markdown in Git** | Source of truth | Most portable, future-proof format; no database |
| Site generator | **Hugo** | Builds static HTML | Single self-contained binary — reproducible builds for years, no dependency rot |
| Source / backup | **GitHub (org-owned)** | Version control + backup | Every clone is a full versioned backup; institution owns the repo |
| Host | **Cloudflare Pages** | Build + global CDN + SSL | Free tier, auto-deploys on push, near-zero admin, free HTTPS |
| Editor | **Sveltia CMS** (free) or **CloudCannon** (paid) | Non-technical editing UI | Editor logs in, edits, publishes — never touches code |
| Donations | Third-party JS snippet | Donate popup | Client-side; carries over unchanged from the current site |

**The flow:** editor edits in Sveltia/CloudCannon → commits to GitHub → Cloudflare
rebuilds and deploys automatically.

## How this addresses the institution's requirements

- **Longevity** — content is plain Markdown in Git; if any single vendor
  disappears, the whole site is still in hand and re-hostable in an afternoon.
  Hugo is a single binary, so builds stay reproducible for years.
- **Backups** — Git *is* the backup: full history, distributed across GitHub +
  every clone + the host. Point-in-time recovery is `git checkout`. No backup
  plugin to configure or forget.
- **Administration** — a static site has almost no attack surface: no database,
  no server-side code, no security-patch treadmill. This removes the ongoing
  WordPress maintenance burden entirely.
- **Ownership** — the GitHub organization, Cloudflare account, and editor
  account are all owned by the institution (under a role email), with the
  administrator granted admin rights. No personal-account lock-in.

---

## Repository layout

```
poc-hugo-nonprofit/
├── hugo.toml                 # site config, nav menu, donate widget params
├── content/                  # the editable content (Markdown)
│   ├── _index.md             #   home
│   ├── about.md  contact.md  get-involved.md
│   ├── method/_index.md      #   section pages
│   └── programs/_index.md
├── layouts/                  # self-contained theme (no external dependency)
├── static/
│   ├── css/style.css
│   ├── js/donate.js          # MOCK donate popup (replaced by real snippet)
│   └── admin/                # Sveltia CMS editor (index.html + config.yml)
├── cloudcannon.config.yml    # CloudCannon editor config (paid alternative)
├── .gitignore
└── README.md
```

---

## Run it locally

```bash
brew install hugo        # one-time
cd poc-hugo-nonprofit
hugo server              # then open http://localhost:1313
```

The donate popup (circular button, bottom-right) is a **mock** — see
`static/js/donate.js`. In production it is replaced by the real donation
provider's `<script>` snippet in `layouts/partials/donate.html`.

---

## Going live — cloud setup steps

### 1. GitHub (institution-owned)
1. Create a **GitHub Organization** for the institution (not a personal repo).
2. Add a **second Owner** (a director/role account) to avoid single-person lock-in.
3. Apply for **GitHub for Nonprofits** (verified 501(c)(3) → free GitHub Team).
4. Create the repo under the org and push this project to it.

### 2. Cloudflare Pages
1. Create a Cloudflare account under an **institutional/role email**.
2. **Pages → Connect to Git →** authorize the Cloudflare GitHub App **on the org**, scoped to this repo.
3. Build settings:
   - Framework preset: **Hugo**
   - Build command: `hugo`
   - Output directory: `public`
   - Environment variable: `HUGO_VERSION` = `0.140.0` (pin for reproducible builds)
4. Deploy → verify on the `*.pages.dev` preview URL.

### 3. Domain cutover
1. Move the domain's DNS to Cloudflare (update nameservers at the registrar).
2. Add the custom domain in Pages (SSL is automatic and free).
3. Add redirects (`static/_redirects`) for any changed URLs to preserve SEO.
4. Lower DNS TTL a day ahead, cut over, and monitor. Rollback = repoint DNS.

### 4. Editor handoff
- **Sveltia (free):** set `backend.repo` in `static/admin/config.yml` to the
  org/repo, connect GitHub sign-in, and the editor uses `/admin/`.
- **CloudCannon (paid):** connect CloudCannon to the org repo; it reads
  `cloudcannon.config.yml`. Hand the editor a login — done.

### 5. Decommission
After a verification window with the new site live and correct, cancel BlueHost.

---

*Mock content throughout. Replace with the institution's real content, contact
details, and live donation snippet before launch.*
