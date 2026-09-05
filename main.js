/* ==========================================================================
   Zhiyu Bao — personal site
   --------------------------------------------------------------------------
   Four small things, no dependencies:
     1. the mobile menu button
     2. highlighting the nav link for whichever section you are reading
     3. carrying the current section across a language switch
     4. keeping the copyright year current

   The site works perfectly well with JavaScript disabled — every one of these
   is an enhancement, not a requirement.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. MOBILE MENU
     The button is hidden by CSS above 68rem, so this only matters on phones
     and small tablets. It opens the panel, and closes again when you pick a
     link, press Escape, or widen the window back to desktop.
     ---------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.setAttribute("data-open", String(open));
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      setMenu(!open);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });

    window.matchMedia("(min-width: 68.01rem)").addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });
  }

  /* ------------------------------------------------------------------------
     2. ACTIVE SECTION IN THE NAV
     Watches each section and marks the matching nav link with
     aria-current="true", which the CSS turns into an accent underline.
     If you add a section, nothing needs changing here — it reads the nav.
     ---------------------------------------------------------------------- */
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav__list a[href^="#"]')
  );

  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  function setCurrent(id) {
    links.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var ratios = new Map();

    // Ignore the strip hidden behind the fixed header, and the bottom third of
    // the viewport, so the "current" section is the one you are actually
    // reading rather than the one just creeping into view.
    var headerHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h")
    ) * 16 || 68;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        var bestId = null;
        var bestRatio = 0;
        ratios.forEach(function (ratio, id) {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
        });

        if (bestId) setCurrent(bestId);
      },
      {
        rootMargin: "-" + Math.round(headerHeight) + "px 0px -35% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    );

    sections.forEach(function (section) { observer.observe(section); });

    // At the very bottom of the page the last section is often too short to
    // win on ratio, so mark it explicitly.
    window.addEventListener("scroll", function () {
      var atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (atBottom) setCurrent(sections[sections.length - 1].id);
    }, { passive: true });

    // Respond immediately on click rather than waiting for the scroll to land.
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        setCurrent(link.getAttribute("href").slice(1));
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. LANGUAGE SWITCH KEEPS YOUR PLACE
     The section ids are identical across all three language pages, so if you
     are reading #projects in English and switch to German, you land on
     #projects rather than at the top. The base href is captured once, so
     clicking twice cannot append two hashes.
     ---------------------------------------------------------------------- */
  Array.prototype.forEach.call(
    document.querySelectorAll(".lang a[href]"),
    function (link) {
      var base = link.getAttribute("href");
      link.addEventListener("click", function () {
        link.setAttribute("href", base + window.location.hash);
      });
    }
  );

  /* ------------------------------------------------------------------------
     4. COPYRIGHT YEAR
     Fills in <span data-year> in the footer so it never goes stale.
     ---------------------------------------------------------------------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
