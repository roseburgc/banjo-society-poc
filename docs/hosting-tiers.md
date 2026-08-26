---
title: "Hosting & Platform Tiers"
subtitle: "Free vs. controlled paid: a supported approach"
author: "Prepared for [Institution]"
date: "August 2026"
---

# The short version

The proposed stack (GitHub + Cloudflare) is enterprise-grade **even on its free
tiers:** the same infrastructure that serves major companies. But "free" can
read as "hobby project" to a board, and it doesn't come with a **support
commitment**. So this document lays out both a fully-free path and a
**controlled paid path** that buys four things an institution genuinely wants:

- **A support SLA:** a vendor obligation to respond, not just a community forum.
- **Security:** a managed Web Application Firewall (WAF).
- **Accountability:** richer analytics and audit/governance features.
- **Optics:** a defensible, paid, supported posture.

Even the controlled paid path typically lands **at or below** current
BlueHost/WordPress spend, with dramatically less maintenance.

> Pricing below is current as of **August 2026**; confirm current rates before
> finalising (sources listed at the end).

---

# GitHub tiers

GitHub stores the website's content and history (and is its backup).

| Tier | Price | What it adds | Support |
|------|-------|--------------|---------|
| **Free** | $0 | Unlimited private repos & collaborators; branch protection on *public* repos; 2,000 Actions min/mo | Community forum |
| **Team** | $4 / user / mo | Branch protection & **required reviews** on private repos, CODEOWNERS, 3,000 Actions min/mo | Web/email support |
| **Enterprise** | from $21 / user / mo | SSO/SAML, audit-log API, 50,000 Actions min/mo | 24/7 premium options |

**Nonprofit advantage:** verified 501(c)(3) organisations get the **Team plan
free** through *GitHub for Nonprofits* (or 25% off Enterprise). So [Institution]
can have Team-tier **governance features (required reviews, protected
branches) at no cost**. This is a strong, easy credibility point: paid-tier
controls, funded by the nonprofit program.

---

# Cloudflare tiers

Cloudflare builds and hosts the site and serves it worldwide.

| Tier | Price | What it adds | Support |
|------|-------|--------------|---------|
| **Pages Free** | $0 | Unlimited bandwidth & requests, 500 builds/mo, global CDN, automatic SSL, DDoS protection | Community |
| **Workers Paid** | $5 / mo | 5,000 builds/mo, higher limits (headroom for frequent edits / future functions) | Community |
| **Pro** (per domain) | $20 / mo (annual) · $25 monthly | **WAF with managed rulesets**, image optimization (Polish/Mirage), **enhanced analytics**, 20 WAF custom rules | Faster (email/chat) |
| **Business** (per domain) | $200 / mo (annual) · $250 monthly | Custom WAF rules, **100% uptime SLA**, prioritised support | Priority |

For an informational nonprofit site, **Pro is the meaningful "controlled paid"
step**: it adds the managed WAF (security), better analytics (accountability),
and quicker support, without the Business-tier cost (aimed at
e-commerce/SaaS).

---

# Two recommended configurations

## Option A: Lean (fully free)

| Component | Tier | Cost |
|-----------|------|------|
| GitHub | Team (free via Nonprofits) | $0 |
| Cloudflare | Pages Free | $0 |
| **Total** | | **$0 / mo** |

Genuinely production-grade. Best when budget is the top priority. Trade-off: no
support SLA, no managed WAF, community-only support.

## Option B: Controlled Paid *(recommended for the pitch)*

| Component | Tier | Cost |
|-----------|------|------|
| GitHub | Team (free via Nonprofits) | $0 |
| Cloudflare | **Pro** (1 domain) | ~$20 / mo |
| Cloudflare | Workers Paid (build headroom) | $5 / mo *(optional)* |
| **Total** | | **~$20–25 / mo (~$240–300 / yr)** |

Adds the managed **WAF**, **enhanced analytics**, **faster support**, and a
credible paid posture, while GitHub governance stays free via the nonprofit
program.

---

# Cost comparison vs. today

| Solution | Typical annual cost | Maintenance burden |
|----------|--------------------|--------------------|
| **BlueHost + WordPress** (current) | ~$150–400/yr (hosting + renewals; more with premium plugins/security) | High. Updates, plugins, security patching, backups |
| **Option A: Lean** | **$0** | Minimal. No server, no database, no patching |
| **Option B: Controlled Paid** | **~$240–300** | Minimal, plus a support SLA and managed WAF |

Even Option B is **comparable to or cheaper than** the current setup, and both
options remove the ongoing WordPress maintenance/security burden entirely.

---

# Could we serve it from a host we already have?

A fair question: the site is just static files, so almost any web host can serve
it, including BlueHost or a host like Reclaim. The distinction that matters is
**build-and-serve vs. serve-only.**

- **Managed static hosts** (Cloudflare Pages, Netlify, GitHub Pages) watch the
  Git repo, **build the site automatically on every edit**, and serve it from a
  global CDN. This is what makes the editor workflow "save and it is live."
- **Shared hosts** (BlueHost, Reclaim) **serve files** but do not build Hugo for
  you. To use one, you add an external build step (e.g. GitHub Actions) that
  compiles the site and copies the files to the host by FTP or Git. It works, but
  it is more moving parts, and you still have no global CDN.

| Option | Cost | Auto-build on edit | Global CDN | Notes |
|--------|------|--------------------|-----------|-------|
| **Cloudflare Pages** | Free, or ~$20/mo Pro | Yes, built in | Yes | Purpose-built; recommended |
| **GitHub Pages** | Free | Via Actions workflow | Yes | No `_redirects`; private repo needs a paid plan |
| **Netlify** | Free, or $19/mo | Yes, built in | Yes | 100 GB/mo free bandwidth cap |
| **BlueHost** (current) | ~$9/mo renewal (~$108/yr) | No; needs Actions + FTP deploy | No | cPanel/LAMP; keeps the renewal pricing and account upkeep you are leaving |
| **Reclaim Hosting** | ~$36/yr | Via cPanel Git or Actions | No | Education / "own your data" ethos; cheap and friendly; still no CDN or built-in pipeline |
| **AWS S3 + CloudFront** | A few $/yr (usage) | Via Actions | Yes | Cheapest at scale, but complex AWS setup |

**BlueHost specifically:** you can drop the built files into `public_html` and it
will serve them. But you keep paying shared-hosting renewal prices (roughly
$9/mo after intro rates), keep managing a cPanel/LAMP account, and get no CDN.
That is paying more for less than a purpose-built static host, and it keeps you
on the very treadmill this migration is meant to end.

**Reclaim specifically:** a credible, low-cost option (~$36/yr) with a strong
"own your data" and education ethos, plus cPanel Git support that can auto-deploy
on push. If the institution wants a single, values-aligned vendor and is happy
without a global CDN, Reclaim plus a small GitHub Actions build step is a
reasonable alternative to Cloudflare Pages. It is cheaper than BlueHost and
friendlier, but it is still serve-only and lacks the integrated build, preview,
and CDN of a purpose-built static host.

**Bottom line:** serving from an existing shared host is possible and, in
Reclaim's case, even attractive on cost and ethos. But the purpose-built static
hosts remain the simplest and fastest: free or near-free, a global CDN, and the
automatic build-on-edit pipeline that makes the editor experience seamless.

---

# What each paid dollar buys (the board's questions)

- **"Is anyone accountable if it breaks?"** → Cloudflare Pro adds a faster
  support channel; Business adds a 100% uptime SLA if ever needed.
- **"Is it secure?"** → Static sites already have almost no attack surface; Pro
  adds a **managed WAF** on top, plus DDoS protection at every tier.
- **"Can we see how it's doing?"** → Pro's enhanced analytics; GitHub's history
  is a full audit trail of every change.
- **"Are we depending on one person / a free hobby account?"** → No: accounts
  are **institution-owned** with a second owner; GitHub Team governance
  (required reviews) is free via the nonprofit program.

---

# Recommendation

Adopt **Option B (Controlled Paid)** for launch: GitHub Team (free, nonprofit)
for governance, and **Cloudflare Pro (~$20/mo)** for the WAF, analytics, and
support posture. It answers the board's accountability and security questions,
presents as a serious supported solution, and still costs the same or less than
BlueHost/WordPress, with a fraction of the upkeep. Downgrading to the fully-free
Option A later is a one-click change with no migration.

---

# Sources

- GitHub pricing: <https://github.com/pricing>
- GitHub for Nonprofits: <https://github.com/solutions/industry/nonprofits>
- Cloudflare Pages / Workers pricing: <https://developers.cloudflare.com/workers/platform/pricing/>
- Cloudflare plan comparison (Pro/Business): <https://www.cloudflare.com/plans/>

*Figures current as of August 2026; verify before final circulation.*
