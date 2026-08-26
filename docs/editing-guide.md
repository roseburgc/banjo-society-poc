---
title: "Website Editing Guide"
subtitle: "How to update the [Institution] website"
author: "For content editors"
date: "August 2026"
---

# Welcome

This site is designed so you can update it yourself, with no code and no HTML. You edit
through a friendly web page called the **content editor**, click **Save**, and
your change is live in about 30 seconds.

You do **not** need to install anything. You only need:

- A **GitHub account** that has been given access to the site (your
  administrator sets this up once).
- The editor address: **`https://<your-site>/admin/`**

> If you can use a word processor and fill in a web form, you can edit this site.

---

# What you can change (and what you can't)

This is deliberate. It keeps you in control of content while protecting the
design so nothing can accidentally break.

**You can edit:**

- The text on any page
- Images on a page (upload/replace)
- Footer and contact information
- The donate box wording
- The site's colour theme (from a set of pre-approved options)
- Embedded videos

**Your administrator handles** (by design): the page layout, fonts, navigation
menu, and the donation integration. If you need one of those changed, just ask
them.

---

# Signing in

1. Go to **`https://<your-site>/admin/`**
2. Click **"Sign in with GitHub."**
3. Approve the access request (first time only).

You're now in the editor. On the left you'll see the sections you can edit:
**Pages**, **Sections**, and **Site Settings**.

---

# Editing a page

1. Click **Pages** (or **Sections**) in the left sidebar.
2. Click the page you want to edit (e.g. *About & History*).
3. Edit the fields:
   - **Title:** the page heading.
   - **Description:** a one-line summary (used for search engines).
   - **Body:** the main content. Use the toolbar for **bold**, *italic*, links,
     lists, and headings. You can switch between the rich-text view and plain
     Markdown with the toggle.
4. Click **Save** (top right).

Your change publishes automatically and is live in ~30 seconds.

---

# Adding or replacing an image

1. In a page's body, click where you want the image and choose the **image**
   button in the toolbar. Or, for a dedicated image field (like the About
   portrait), click the image field.
2. **Upload** a new image, or pick one already in the media library.
3. Save.

**Tips**

- Use reasonably sized images (aim for under ~500 KB) so pages stay fast.
- Add a **caption/attribution** if the photo requires credit (e.g. a
  Creative-Commons or archive photo).

---

# Site Settings (footer, contact, donate)

1. Click **Site Settings → Global** in the sidebar.
2. Update any of:
   - **Organization name**
   - **Footer / contact:** email, mailing address, meeting/jam info
   - **Donate widget:** button label, headline, blurb
3. Save. These appear site-wide.

---

# Changing the colour theme

1. Go to **Site Settings → Global → Theme**.
2. Choose a **Color preset** from the dropdown:
   - **Clay & Cream** (warm, default)
   - **Ink & Paper** (editorial)
   - **Forest** (deep green)
   - **Slate** (cool blue)
3. Save. The whole site re-themes.

> The presets are pre-designed and contrast-checked, so any choice will look
> good and stay readable.

---

# Embedding a video

1. Edit the page (usually in Markdown view for this).
2. Add a line like:

   ```
   {{< videoembed id="YOUTUBE_ID" title="Video title" caption="Optional caption." >}}
   ```

   The **YouTube ID** is the part after `watch?v=` in the video's URL
   (e.g. in `youtube.com/watch?v=U1RmAkwH4BY`, the ID is `U1RmAkwH4BY`).
3. Save.

If you're not comfortable with this, send your administrator the video link and
they'll add it.

---

# Publishing & undo

- **Publishing:** every **Save** publishes automatically (~30 seconds to go
  live).
- **Undo:** every change is versioned. If something goes wrong, your
  administrator can restore any previous version instantly. Nothing is ever
  truly lost.

---

# Do's and don'ts

**Do**

- Preview your wording before saving.
- Keep images optimised and captioned where needed.
- Ask your administrator for anything structural (menu, layout, new page types).

**Don't**

- Don't paste large blocks of formatted text from Word directly. Use the
  editor's formatting instead (cleaner results).
- Don't worry about "breaking the site." You only have access to safe content
  fields, and everything is recoverable.

---

# Getting help

For anything outside the fields above (a new page type, a layout change, a
navigation update, or a login that stops working), contact your **administrator**.
