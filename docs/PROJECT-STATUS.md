# Project Status & Resume Notes

*Last updated: 2026-08-26*

A resume/handoff record for the Wenatchee Baptist Church website migration
project. Read this first when picking the work back up.

---

## What this is

Migrating the **Wenatchee Baptist Church** website (`wenatcheebaptist.com`) off
**WordPress/BlueHost** onto a modern, low-maintenance, church-owned stack:
**Hugo + Cloudflare Pages + Sveltia CMS.** A working proof-of-concept is built,
deployed, and proven; the proposal documents are drafted.

**The POC uses mock content** ("Old-Time Banjo Society") on purpose, so the real
church site is not exposed during evaluation. The stack, not the content, is what
the POC proves.

## Current status: POC complete + proposal drafted

- ✅ POC built, deployed, and verified end-to-end.
- ✅ Proposal docs written (migration plan, editing guide, hosting tiers).
- ⏳ Not yet started: real content migration, church-owned accounts, cutover.

## Key links

| What | Where |
|------|-------|
| Live POC site | <https://banjo-society-poc.pages.dev/> |
| Editor (CMS) | <https://banjo-society-poc.pages.dev/admin/> |
| GitHub repo | `roseburgc/banjo-society-poc` (personal account) |
| Local working copy | `~/poc-hugo-nonprofit` |
| Proposal docs | `docs/` (Markdown + PDF) |

## The stack

- **Hugo** (static site generator; self-contained "Modern Heritage" theme).
- **Cloudflare Pages** (build + host + global CDN + SSL).
- **Sveltia CMS** (Git-based editor at `/admin/`; sign in with GitHub, or access token).
- **Fraunces** variable serif (self-hosted, SIL OFL) + system sans.
- **GitHub** repo = content source of truth + editor backend + build trigger.

## Decisions made

- **Host: Cloudflare Pages** over Netlify (unlimited bandwidth, no metered
  overage) and GitHub Pages (no native redirects). See `hosting-tiers.md`.
- **Recommended tier: Option B "Controlled Paid"** = GitHub Free + Cloudflare Pro
  (~$20/mo) for WAF/analytics/support posture. Option A (fully free) also viable.
- **Theme: Modern Heritage** with curated, contrast-checked color presets (a
  guardrailed dropdown, not open color pickers).
- **Editor handoff:** Sveltia needs each editor to have a GitHub account. For a
  no-GitHub-account editor, CloudCannon (paid, email invite) is the fallback.

## Important findings (do not lose these)

1. **"American Domain Services" $224/yr invoice is a SCAM.** WHOIS confirms the
   real registrar is **BlueHost**. Do not pay American Domain Services; it is a
   deceptive solicitation. Consider reporting (FTC / state AG).
2. **GitHub for Nonprofits excludes religious organisations**, so the church is
   NOT eligible for free GitHub Team. Use **GitHub Free** ($0); Team is optional
   at $4/user/mo.
3. **Real total cost of ownership today ≈ $128/yr** (BlueHost hosting ~$108 +
   BlueHost .com ~$20). Proposed Lean ≈ $10/yr; Controlled Paid ≈ $250/yr.
4. **Domain re-home:** transfer `wenatcheebaptist.com` from BlueHost to
   **Cloudflare Registrar** (~$10/yr .com, at-cost) when migrating.

## Operational notes (how to work on this)

**Local dev:**
```bash
cd ~/poc-hugo-nonprofit
hugo server          # http://localhost:1313  (editor: /admin/ with test-repo backend)
```

**Deploy:** push to `main`; Cloudflare auto-builds. Avoid pushing many commits in
quick succession (it confused Cloudflare's production-alias promotion once; a
single clean build, or "Rollback to this deployment" in the dashboard, fixes it).

**Pushing to the PERSONAL account** from this work-configured machine (the SSH key
and `gh` default belong to the work account `croseburgLS`):
```bash
gh auth switch --user roseburgc
git -c credential.helper='' \
    -c credential.https://github.com.helper='!f(){ echo username=roseburgc; echo "password=$(gh auth token --user roseburgc)"; };f' \
    push origin main
gh auth switch --user croseburgLS      # restore work account when done
```

**Docs:** edit Markdown in `docs/`, then render PDFs:
```bash
bash ~/.claude/skills/scribe/render.sh docs/<name>.md docs/<name>.pdf
```
House rule: keep em-dashes to a minimum.

## Next steps (when resuming)

1. **Circulate the proposal** (docs/) to the church board; get a go decision and a
   tier choice (Option A vs B).
2. **Inventory the real BlueHost/WordPress site** (page list, URLs, assets, the
   donate snippet) per migration-plan Phase 0.
3. **Stand up church-owned accounts:** GitHub org (+ second owner), Cloudflare
   account under a church role email. Decide the personal-POC → church-owned repo
   handoff.
4. **Migrate real content** into Hugo/Sveltia; insert the real donate snippet.
5. **Domain:** ignore/report the ADS scam; plan BlueHost → Cloudflare Registrar
   transfer at cutover.
6. **Cutover** (DNS to Cloudflare, redirects, lowered TTL) then decommission
   BlueHost after a verification window.
7. **Editor onboarding:** GitHub accounts + collaborator access; hand over the
   editing guide.

## Optional polish (not blocking)

- Real hero photograph (currently header banjo mark + typographic hero).
- Real church photo for any people/history pages (CC/PD or owned).
- Dark mode (deferred; needs to coexist with the editable theme presets).
- Contact form only if ever needed (Cloudflare Worker or free service; the church
  has historically not used forms).
