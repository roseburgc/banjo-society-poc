/* ── MOCK DONATE POPUP ───────────────────────────────────────────────────────
 * Reproduces the "small circular pop-up" donate widget from the current site,
 * as a self-contained stand-in for the POC. No network calls, no dependencies.
 *
 * IN PRODUCTION: this file and layouts/partials/donate.html are replaced by the
 * real donation provider's <script> snippet. The point of the POC is only to
 * prove the placement/behavior carries over unchanged from WordPress to Hugo.
 * ------------------------------------------------------------------------------ */
(function () {
  var cfg = document.getElementById("donate-config") || {};
  var d = (cfg.dataset || {});
  var label = d.label || "Donate";
  var headline = d.headline || "Support us";
  var blurb = d.blurb || "";

  var fab = document.createElement("button");
  fab.className = "donate-fab";
  fab.type = "button";
  fab.setAttribute("aria-label", label);
  fab.textContent = "♥ " + label;

  var pop = document.createElement("div");
  pop.className = "donate-pop";
  pop.hidden = true;
  pop.innerHTML =
    '<button class="close" aria-label="Close">×</button>' +
    "<h4>" + headline + "</h4>" +
    "<p>" + blurb + "</p>" +
    '<a class="btn" href="#" onclick="return false;">Give now</a>' +
    '<p class="mock-note">Mock widget — replaced by the live donation provider snippet in production.</p>';

  function toggle(show) { pop.hidden = (show === undefined) ? !pop.hidden : !show; }
  fab.addEventListener("click", function () { toggle(); });
  pop.querySelector(".close").addEventListener("click", function () { toggle(false); });

  document.body.appendChild(pop);
  document.body.appendChild(fab);
})();
