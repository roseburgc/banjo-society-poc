---
title: "Website Migration Plan"
subtitle: "WordPress / BlueHost → Hugo + Cloudflare Pages"
author: "Prepared for [Institution]"
date: "August 2026"
---

# Overview

This plan moves the [Institution] website off WordPress/BlueHost onto a modern,
low-maintenance, institution-owned stack: **content in Git, built by Hugo,
hosted on Cloudflare Pages, edited through a friendly web CMS (Sveltia).**

A working proof-of-concept already exists and is deployed, so this is a
*migration*, not an experiment. The architecture, editor workflow, theming, and
media embedding are all proven.

## Goals

- **Eliminate maintenance overhead:** no database, no plugins, no security
  patch treadmill.
- **Durability:** content lives as plain text in Git; portable and re-hostable
  in an afternoon if any vendor changes.
- **Cost control:** at or below current BlueHost/WordPress spend (see the
  *Hosting & Platform Tiers* document).
- **Editor-friendly:** a non-technical editor can update content, images, and
  theme without touching code.
- **Institution ownership:** all accounts and content owned by [Institution],
  not any individual.

## Guiding principles

- **Source is truth:** the Git repository is the single, versioned source; it
  is also the backup.
- **Static by default:** near-zero attack surface.
- **No lock-in:** Markdown + Hugo are open and portable.
- **Reversible cutover:** DNS change is the only irreversible-feeling step, and
  it rolls back by repointing DNS.

---

# Phases

Each phase lists its tasks, the owner, a rough effort estimate, and the exit
criteria (the "done" checkpoint) that gates the next phase.

## Phase 0: Preparation & inventory
**Owner:** Administrator · **Effort:** ~0.5–1 day

- Inventory every page/URL on the current site (crawl with `wget --mirror` or
  HTTrack).
- Record the existing URL structure (to preserve or redirect for SEO).
- Collect all assets (images, documents) and the third-party donate snippet.
- **Verify the domain's actual registrar via WHOIS** and locate its login. Note:
  a ~$224/yr bill from "American Domain Services" is far above market and may be a
  renewal solicitation rather than the real registrar. Confirm before paying.

**Exit criteria:** complete page list, asset archive, URL map, and confirmed
registrar access.

## Phase 1: Build & theme
**Owner:** Administrator · **Effort:** mostly complete (POC)

- The Hugo site, "Modern Heritage" theme, editor configuration, and media
  embedding are built and proven in the POC.
- Remaining: adapt page structure/content model to the real site's needs.

**Exit criteria:** local build renders the real site's page set cleanly.

## Phase 2: Institution accounts & ownership
**Owner:** Administrator · **Effort:** ~0.5 day

- Create the **GitHub Organization** owned by [Institution] (not a personal
  account); add a **second owner** to avoid single-person lock-in.
- Apply for **GitHub for Nonprofits** (free Team plan for verified 501(c)(3)s).
- Create the **Cloudflare account** under an institutional/role email.
- Decide the tier (see *Hosting & Platform Tiers*).

**Exit criteria:** org + repo created, Cloudflare account ready, ownership
documented.

## Phase 3: Content migration
**Owner:** Administrator (+ editor for review) · **Effort:** ~1–3 days
(scales with page count)

- Convert each page's content to Markdown in the repo.
- Move images into the media library; add captions/attribution where required.
- Wire global values (footer/contact, donate copy) into Site Settings.
- Insert the real donate snippet and any video embeds.

**Exit criteria:** all real content present; local build matches intended site.

## Phase 4: Staging review & sign-off
**Owner:** Editor + stakeholders · **Effort:** ~2–5 days (calendar, for review)

- Deploy to the Cloudflare preview/`*.pages.dev` URL.
- Stakeholders review content, links, images, mobile layout, accessibility.
- Editor does a trial edit end-to-end (login → change → publish).

**Exit criteria:** written stakeholder sign-off on the staged site.

## Phase 5: Domain & DNS cutover
**Owner:** Administrator · **Effort:** ~0.5 day + monitoring

- Move the domain's DNS to Cloudflare (update nameservers at the registrar).
- **Transfer the domain registration to an at-cost registrar** (Cloudflare
  Registrar, ~$8.50/yr for .org): unlock the domain at the current registrar,
  obtain the EPP/auth code, and initiate the transfer. This ends the ~$224/yr
  bill and consolidates DNS + registration in one place.
- Add the custom domain in Cloudflare Pages (automatic, free SSL).
- Add redirects (`_redirects`) for any changed URLs to preserve SEO.
- **Lower the DNS TTL 24h ahead**, cut over, and monitor.

**Exit criteria:** production domain serves the new site over HTTPS; redirects
verified; no broken links.

## Phase 6: Decommission
**Owner:** Administrator · **Effort:** ~0.5 day

- Run a verification window (≈1 week) with the new site live.
- Export a final backup of the old WordPress site for the archive.
- Cancel BlueHost/WordPress hosting.
- Hand the editor their login and the *Editing Guide*.

**Exit criteria:** old hosting cancelled; editor onboarded; archive stored.

---

# Rollback strategy

- **Before cutover:** the old site remains untouched and live; the new site is
  only on the preview URL. Zero risk.
- **At cutover:** the only real change is DNS. If anything is wrong, repoint DNS
  back to BlueHost. Propagation is fast because the TTL was lowered in advance.
- **After cutover:** every prior version is recoverable via Git (`git checkout`);
  Cloudflare keeps prior deployments that can be re-promoted instantly.

---

# Risks & mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Broken inbound links / lost SEO | Medium | URL map in Phase 0; `_redirects` in Phase 5 |
| Editor struggles with the CMS | Low | *Editing Guide* + a 30-min walkthrough |
| DNS cutover confusion | Low | Lower TTL ahead; rollback = repoint DNS |
| Vendor change (host/CMS) | Low | Content is portable Markdown in Git |
| Single-person dependency | Medium | Institution-owned org + second owner |

---

# Roles

| Role | Responsibility |
|------|----------------|
| **Administrator** | Setup, migration, cutover, ongoing technical care (minimal) |
| **Editor(s)** | Day-to-day content updates via the CMS |
| **Stakeholders / board** | Review and sign-off at Phase 4; tier decision |

---

# Rough timeline

A small informational site (≈6–15 pages) is realistically a **1–2 week**
elapsed effort, most of which is content review and stakeholder sign-off. The
technical work is a few days. The POC has already retired the highest-risk
unknowns.
